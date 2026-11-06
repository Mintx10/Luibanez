-- Run once in Supabase SQL Editor as the database owner. Keeps all legacy data.
begin;
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
do $$ begin
 if exists(select 1 from pg_extension e join pg_namespace n on n.oid=e.extnamespace where e.extname='pgcrypto' and n.nspname<>'extensions') then alter extension pgcrypto set schema extensions; end if;
end $$;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

-- The old tables trusted local profile IDs. Stop public access without deleting them.
do $$ declare t text; begin
  foreach t in array array['perfiles','documentos_pdf','preguntas_cache'] loop
    if to_regclass('public.' || t) is not null then
      execute format('revoke all on table public.%I from public, anon, authenticated', t);
      execute format('alter table public.%I enable row level security', t);
    end if;
  end loop;
end $$;

create table public.study_profiles (
  id uuid primary key references auth.users on delete cascade default auth.uid(),
  apodo text not null check (length(apodo) between 1 and 80),
  carrera text not null default 'General' check (carrera in ('General','Medicina','Licenciatura en Finanzas')),
  avatar text not null default '👤' check (length(avatar) <= 32),
  tipo_avatar text not null default 'emoji' check(tipo_avatar in ('emoji','foto','imagen')),
  foto_data_url text not null default '' check(length(foto_data_url)<=300000),
  updated_at timestamptz not null default now()
);
create table public.study_documents (
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  id text not null check (length(id) between 1 and 200),
  nombre text not null check (length(nombre) between 1 and 500),
  paginas integer not null default 1 check (paginas > 0),
  palabras integer not null default 0 check (palabras >= 0),
  texto text not null check (octet_length(texto) <= 4000000),
  activo boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (user_id,id)
);
alter table public.study_profiles enable row level security;
alter table public.study_documents enable row level security;
create policy own_profile on public.study_profiles for all to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy own_documents on public.study_documents for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
revoke all on public.study_profiles, public.study_documents from anon;
grant select,insert,update,delete on public.study_profiles, public.study_documents to authenticated;

create table private.ai_quota (
  bucket text primary key,
  window_start timestamptz not null,
  requests integer not null
);
create function public.consume_ai_quota(p_user_id uuid, p_ip_hash text) returns boolean
language plpgsql security definer set search_path = '' as $$
declare u integer; i integer; begin
  if p_user_id is null or p_ip_hash !~ '^[0-9a-f]{64}$' then raise exception 'Invalid quota identity'; end if;
  -- Always acquire locks in the same order; both counters are persistent across instances.
  insert into private.ai_quota as q values ('ip:' || p_ip_hash, now(), 1)
    on conflict(bucket) do update set window_start = case when q.window_start <= now()-interval '1 minute' then now() else q.window_start end,
    requests = case when q.window_start <= now()-interval '1 minute' then 1 else least(q.requests+1,100000) end returning requests into i;
  insert into private.ai_quota as q values ('user:' || p_user_id, now(), 1)
    on conflict(bucket) do update set window_start = case when q.window_start <= now()-interval '1 minute' then now() else q.window_start end,
    requests = case when q.window_start <= now()-interval '1 minute' then 1 else least(q.requests+1,100000) end returning requests into u;
  delete from private.ai_quota where window_start < now()-interval '1 day';
  return u <= 15 and i <= 40;
end $$;
revoke all on function public.consume_ai_quota(uuid,text) from public, anon, authenticated;
grant execute on function public.consume_ai_quota(uuid,text) to service_role;

create table public.study_rooms (
  code text primary key check (code ~ '^[A-Z2-9]{5,8}$'),
  host_id uuid not null references auth.users on delete cascade,
  name text not null check (length(name) between 1 and 100),
  public boolean not null default true,
  requires_password boolean not null default false,
  config jsonb not null default '{}',
  status text not null default 'waiting' check (status in ('waiting','playing','closed')),
  turn_user_id uuid references auth.users,
  turn_number integer not null default 0,
  snapshot jsonb,
  expires_at timestamptz not null default now()+interval '2 minutes',
  created_at timestamptz not null default now()
);
create table private.study_room_secrets (
  room_code text primary key references public.study_rooms on delete cascade,
  password_hash text
);
create table public.study_room_members (
  room_code text not null references public.study_rooms on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  apodo text not null,
  avatar text not null default '👤',
  ready boolean not null default false,
  active boolean not null default true,
  points integer not null default 0 check (points >= 0),
  streak integer not null default 0 check (streak>=0),
  joined_at timestamptz not null default now(),
  seen_at timestamptz not null default now(),
  primary key(room_code,user_id)
);
create table public.study_room_events (
  id bigint generated always as identity primary key,
  room_code text not null references public.study_rooms on delete cascade,
  actor_id uuid not null references auth.users on delete cascade,
  payload jsonb not null,
  created_at timestamptz not null default now()
);
create index on public.study_room_events(room_code,id);
create index on public.study_room_members(user_id,room_code) where active;
create index on public.study_rooms(expires_at) where status <> 'closed';

create function private.is_room_member(p_code text) returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.study_room_members m join public.study_rooms r on r.code=m.room_code
 where m.room_code=p_code and m.user_id=auth.uid() and m.active and r.status<>'closed' and r.expires_at>now())
$$;
grant usage on schema private to authenticated;
grant execute on function private.is_room_member(text) to authenticated;
revoke all on function private.is_room_member(text) from public,anon;
alter table public.study_rooms enable row level security;
alter table public.study_room_members enable row level security;
alter table public.study_room_events enable row level security;
create policy visible_room on public.study_rooms for select to authenticated using ((public and status='waiting' and expires_at>now()) or private.is_room_member(code));
create policy room_members on public.study_room_members for select to authenticated using(private.is_room_member(room_code));
create policy room_events on public.study_room_events for select to authenticated using(private.is_room_member(room_code));
-- Mutations are RPC-only: clients cannot write identities, turn state or points.
revoke all on public.study_rooms, public.study_room_members, public.study_room_events from anon,authenticated;
grant select(code,host_id,name,public,requires_password,config,status,expires_at,created_at) on public.study_rooms to authenticated;
grant select on public.study_room_members,public.study_room_events to authenticated;
create view public.study_public_rooms with (security_invoker=true) as
  select code,name,host_id,requires_password,config,expires_at from public.study_rooms where public and status='waiting' and expires_at>now();
grant select on public.study_public_rooms to authenticated;

create function public.study_create_room(p_code text,p_name text,p_password text,p_public boolean,p_config jsonb) returns void
language plpgsql security definer set search_path = '' as $$
declare p public.study_profiles; begin
  if auth.uid() is null then raise exception 'Iniciá sesión.'; end if;
  if p_code !~ '^[A-Z2-9]{5,8}$' or length(p_name) not between 1 and 100 or length(p_password)>128 or octet_length(p_config::text)>10000 then raise exception 'Configuración de sala inválida.'; end if;
  if coalesce(p_config->>'juego','') not in ('bolillero','bomba','impostor','memotest','triatlon') or coalesce(p_config->>'formatoModo','') not in ('versus','coop') then raise exception 'Juego o modalidad inválidos.'; end if;
  if (select count(*) from public.study_rooms where host_id=auth.uid() and status<>'closed' and expires_at>now())>=3 then raise exception 'Cerrá una de tus salas antes de crear otra.'; end if;
  select * into p from public.study_profiles where id=auth.uid();
  if not found then raise exception 'Sincronizá tu perfil antes de crear una sala.'; end if;
  insert into public.study_rooms(code,host_id,name,public,requires_password,config) values(p_code,auth.uid(),p_name,p_public,p_password<>'',p_config);
  insert into private.study_room_secrets values(p_code,case when p_password<>'' then extensions.crypt(p_password,extensions.gen_salt('bf',10)) else null end);
  insert into public.study_room_members(room_code,user_id,apodo,avatar,ready) values(p_code,auth.uid(),p.apodo,p.avatar,true);
  -- Bounded retention; expired rows never appear in discovery or pass authorization.
  delete from public.study_rooms where expires_at<now()-interval '1 day';
end $$;

create table private.study_join_attempts (user_id uuid primary key references auth.users on delete cascade, started_at timestamptz not null default now(), attempts integer not null default 1);
create function public.study_join_room(p_code text,p_password text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r public.study_rooms; p public.study_profiles; hashed text; v_attempts integer; begin
  if auth.uid() is null then raise exception 'Iniciá sesión.'; end if;
  insert into private.study_join_attempts as a(user_id) values(auth.uid()) on conflict(user_id) do update
    set attempts=case when a.started_at<now()-interval '1 minute' then 1 else a.attempts+1 end,
    started_at=case when a.started_at<now()-interval '1 minute' then now() else a.started_at end returning a.attempts into v_attempts;
  -- Errors return as data so failed password attempts commit their rate-limit count.
  if v_attempts>20 then return jsonb_build_object('error','Demasiados intentos. Esperá un minuto.'); end if;
  select * into r from public.study_rooms where code=p_code for update;
  if not found or r.status='closed' or r.expires_at<now() then return jsonb_build_object('error','Sala no disponible.'); end if;
  if exists(select 1 from public.study_room_members where room_code=p_code and user_id=auth.uid() and active) then return jsonb_build_object('ok',true); end if;
  if r.status<>'waiting' then return jsonb_build_object('error','La partida ya empezó.'); end if;
  select password_hash into hashed from private.study_room_secrets where room_code=p_code;
  if hashed is not null and extensions.crypt(coalesce(p_password,''),hashed) is distinct from hashed then return jsonb_build_object('error','Contraseña de sala incorrecta.'); end if;
  if (select count(*) from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes')>=8 then return jsonb_build_object('error','La sala está llena.'); end if;
  select * into p from public.study_profiles where id=auth.uid();
  if not found then raise exception 'Sincronizá tu perfil antes de entrar.'; end if;
  insert into public.study_room_members(room_code,user_id,apodo,avatar) values(p_code,auth.uid(),p.apodo,p.avatar)
    on conflict(room_code,user_id) do update set active=true,ready=false,seen_at=now();
  return jsonb_build_object('ok',true);
end $$;

create function public.study_read_room(p_code text) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare r public.study_rooms; members jsonb; begin
  if not private.is_room_member(p_code) then raise exception 'No pertenecés a esta sala o la sala expiró.'; end if;
  select * into r from public.study_rooms where code=p_code;
  select coalesce(jsonb_agg(jsonb_build_object('id',user_id,'apodo',apodo,'nombre',apodo,'avatar',avatar,'tipoAvatar','emoji','listo',ready,'esHost',user_id=r.host_id,'puntos',points) order by joined_at),'[]') into members
    from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes';
  return jsonb_build_object('members',members,'config',r.config,'status',r.status,'snapshot',r.snapshot,'cursor',(select coalesce(max(id),0) from public.study_room_events where room_code=p_code));
end $$;
create function public.study_room_heartbeat(p_code text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_room_member(p_code) then raise exception 'Sala no disponible.'; end if;
  update public.study_room_members set seen_at=now() where room_code=p_code and user_id=auth.uid();
  update public.study_rooms set expires_at=now()+interval '2 minutes' where code=p_code and host_id=auth.uid();
end $$;
create function public.study_leave_room(p_code text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  update public.study_room_members set active=false where room_code=p_code and user_id=auth.uid();
  update public.study_rooms set status='closed',expires_at=now() where code=p_code and host_id=auth.uid();
end $$;

create table private.study_votes (
 room_code text references public.study_rooms on delete cascade,turn_number integer,user_id uuid references auth.users on delete cascade,vote integer not null check(vote in (0,5,10)),primary key(room_code,turn_number,user_id)
);
create table private.study_vote_results (
 room_code text references public.study_rooms on delete cascade,turn_number integer,points integer not null,primary key(room_code,turn_number)
);
create function public.study_send_room_event(p_code text,p_payload jsonb) returns bigint
language plpgsql security definer set search_path = '' as $$
declare r public.study_rooms; kind text:=p_payload->>'tipo'; event_id bigint; uid uuid:=auth.uid(); voters integer; earned integer; c10 integer; c5 integer; c0 integer; begin
  if not private.is_room_member(p_code) then raise exception 'No pertenecés a esta sala.'; end if;
  if jsonb_typeof(p_payload)<>'object' or kind is null then raise exception 'Mensaje inválido.'; end if;
  select * into r from public.study_rooms where code=p_code for update;
  if octet_length(p_payload::text)>1500000 then raise exception 'Mensaje demasiado grande.'; end if;
  if (select count(*) from public.study_room_events where actor_id=uid and created_at>now()-interval '1 minute')>=120 then raise exception 'Demasiadas acciones. Esperá unos segundos.'; end if;
  if kind in ('SINCRONIZAR_SALA','INICIO_BOMBA_ONLINE','INICIO_PARTIDA_ONLINE','SYNC_ESTADO_ACTUAL','TURNO_INICIAR_OFICIAL','RESULTADO_VOTACION','ROBO_DISPONIBLE','ROBO_INICIADO_OFICIAL','ROBO_CALIFICADO','FIN_PARTIDA_ONLINE','FIN_RONDA_ONLINE','VOLVER_LOBBY_ONLINE','BOMBA_VOLVER_LOBBY','AVANZAR_SIGUIENTE_RONDA','RULETA_GIRAR','CRONO_PAUSAR','CRONO_REANUDAR','COOP_UPDATE_PUNTOS') then
    if uid<>r.host_id then raise exception 'Esta acción corresponde al anfitrión.'; end if;
  elsif kind not in ('JUGADOR_READY_STATUS','CHAT_MSG','PING_SALA','SOLICITAR_ESTADO_SALA','VOTO_EMITIDO','ROBO_RECLAMADO','SALIDA_JUGADOR','BOMBA_PROGRESO','BOMBA_DESACTIVADA','BOMBA_DETONADA','COOP_BOMBA_FASE','COOP_BOMBA_FALLO','COOP_BOMBA_CONGELAR','COOP_BOMBA_PISTA','COOP_PEDIR_RELEVO','COOP_TOMAR_RELEVO','FIN_EXPOSICION_ORAL','CEDER_TURNO_ORADOR','LADRON_TERMINO_ROBO') then raise exception 'Acción desconocida.'; end if;
  -- Identity fields are assigned server-side, including legacy renderer aliases.
  p_payload:=p_payload || jsonb_build_object('actorId',uid,'senderId',uid);
  if kind in ('JUGADOR_READY_STATUS','BOMBA_PROGRESO','BOMBA_DESACTIVADA','BOMBA_DETONADA','SALIDA_JUGADOR','SOLICITAR_ESTADO_SALA') then p_payload:=p_payload || jsonb_build_object('jugadorId',uid); end if;
  if kind='VOTO_EMITIDO' then p_payload:=p_payload || jsonb_build_object('votanteId',uid); end if;
  if kind='ROBO_RECLAMADO' then p_payload:=p_payload || jsonb_build_object('ladronId',uid); end if;
  if kind='CHAT_MSG' then
    p_payload:=jsonb_set(p_payload,'{msg}',coalesce(p_payload->'msg','{}') || jsonb_build_object('jugadorId',uid,'senderId',uid));
  end if;
  if kind='JUGADOR_READY_STATUS' then
    if r.status<>'waiting' then raise exception 'La partida ya empezó.'; end if;
    update public.study_room_members set ready=coalesce((p_payload->>'listo')::boolean,false) where room_code=p_code and user_id=uid;
  end if;
  if kind in ('INICIO_BOMBA_ONLINE','INICIO_PARTIDA_ONLINE') then
    if r.status<>'waiting' then raise exception 'La partida ya empezó.'; end if;
    if exists(select 1 from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes' and not ready) then raise exception 'Faltan jugadores por confirmar.'; end if;
    update public.study_rooms set status='playing',snapshot=p_payload where code=p_code;
  end if;
  if kind='TURNO_INICIAR_OFICIAL' then
    if r.status<>'playing' then raise exception 'La partida no está activa.'; end if;
    if not exists(select 1 from public.study_room_members where room_code=p_code and user_id=(p_payload->>'jugadorId')::uuid and active) then raise exception 'Jugador de turno inválido.'; end if;
    update public.study_rooms set turn_user_id=(p_payload->>'jugadorId')::uuid,turn_number=turn_number+1 where code=p_code;
  end if;
  if kind in ('FIN_EXPOSICION_ORAL','CEDER_TURNO_ORADOR') and uid is distinct from r.turn_user_id and uid<>r.host_id then raise exception 'No es tu turno.'; end if;
  if kind='VOTO_EMITIDO' then
    if r.status<>'playing' or r.turn_user_id is null or uid=r.turn_user_id then raise exception 'No podés votar este turno.'; end if;
    earned:=case p_payload->>'voto' when '10' then 10 when '5' then 5 when '0' then 0 else null end;
    if earned is null then raise exception 'Voto inválido.'; end if;
    if exists(select 1 from private.study_vote_results where room_code=p_code and turn_number=r.turn_number) then raise exception 'Este turno ya fue evaluado.'; end if;
    insert into private.study_votes values(p_code,r.turn_number,uid,earned);
  end if;
  if kind='RESULTADO_VOTACION' then
    select count(*),count(*) filter(where vote=10),count(*) filter(where vote=5),count(*) filter(where vote=0) into voters,c10,c5,c0 from private.study_votes where room_code=p_code and turn_number=r.turn_number;
    if voters=0 then raise exception 'Faltan votos para puntuar.'; end if;
    if voters<(select count(*) from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes' and user_id<>r.turn_user_id) then raise exception 'Faltan votos de los participantes activos.'; end if;
    earned:=case when c0>c10 and c0>c5 then 0 when c5>=c10 then 5 else 10 end;
    insert into private.study_vote_results values(p_code,r.turn_number,earned);
    update public.study_room_members set streak=case when earned=10 then streak+1 else 0 end where room_code=p_code and user_id=r.turn_user_id;
    if earned=10 and r.config#>>'{reglas,rachaFuego}'='true' and (select streak from public.study_room_members where room_code=p_code and user_id=r.turn_user_id)>=2 then earned:=earned+20; end if;
    update public.study_room_members set points=points+earned where room_code=p_code and user_id=r.turn_user_id;
    -- Prevent awarding this turn twice.
    delete from private.study_votes where room_code=p_code and turn_number=r.turn_number;
    p_payload:=p_payload || jsonb_build_object('puntosGanados',earned,'decision',case when earned>=10 then 'impecable' when earned=5 then 'ayuda' else 'paso' end,'count10',c10,'count5',c5,'count0',c0,'verified',true);
  end if;
  if kind='SYNC_ESTADO_ACTUAL' then update public.study_rooms set snapshot=p_payload where code=p_code; end if;
  if kind in ('VOLVER_LOBBY_ONLINE','BOMBA_VOLVER_LOBBY') then update public.study_rooms set status='waiting',snapshot=null,turn_user_id=null where code=p_code; end if;
  if kind='FIN_PARTIDA_ONLINE' then
    if r.status<>'playing' then raise exception 'No hay una partida activa para finalizar.'; end if;
    if r.config->>'juego'='bolillero' then
      -- Table is installed by 202611050002; clients never supply these scores.
      insert into public.study_verified_results(room_code,user_id,game,points) select p_code,user_id,'bolillero',points from public.study_room_members where room_code=p_code;
    end if;
    update public.study_rooms set status='waiting',snapshot=null,turn_user_id=null where code=p_code;
  end if;
  insert into public.study_room_events(room_code,actor_id,payload) values(p_code,uid,p_payload) returning id into event_id;
  return event_id;
end $$;

-- Explicit grants: PostgreSQL grants EXECUTE to PUBLIC by default.
do $$ declare f record; begin
 for f in select p.oid::regprocedure as signature from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname like 'study_%' loop
  execute format('revoke all on function %s from public,anon',f.signature);
  execute format('grant execute on function %s to authenticated',f.signature);
 end loop;
end $$;
do $$ begin
 if exists(select 1 from pg_publication where pubname='supabase_realtime') then
  alter publication supabase_realtime add table public.study_room_events,public.study_room_members;
 end if;
end $$;
commit;
