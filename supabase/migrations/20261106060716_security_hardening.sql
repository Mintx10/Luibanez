begin;
-- Quarantine legacy tables without deleting their academic data.
do $$ declare t text; p record; seq text; begin
 foreach t in array array['perfiles','documentos_pdf','preguntas_cache','Luibanez'] loop
  if to_regclass(format('public.%I',t)) is not null then
   execute format('revoke all on table public.%I from public,anon,authenticated',t);
   for p in select policyname from pg_policies where schemaname='public' and tablename=t loop
    execute format('drop policy %I on public.%I',p.policyname,t);
   end loop;
  end if;
 end loop;
 for seq in select format('%I.%I',n.nspname,c.relname) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind='S' loop
  execute format('revoke all on sequence %s from public,anon,authenticated',seq);
 end loop;
end $$;

-- Internal rows remain inaccessible even if a future grant is added accidentally.
do $$ declare t text; begin
 foreach t in array array['ai_quota','study_games','study_game_progress','study_join_attempts','study_room_secrets','study_votes','study_vote_results'] loop
  execute format('alter table private.%I enable row level security',t);
 end loop;
end $$;
revoke all on all tables in schema private from public,anon,authenticated;
revoke all on all functions in schema private from public,anon,authenticated;
grant execute on function private.is_room_member(text) to authenticated;
alter default privileges in schema private revoke all on tables from public,anon,authenticated;
alter default privileges in schema private revoke execute on functions from public,anon,authenticated;
alter default privileges in schema public revoke execute on functions from public,anon,authenticated;
-- Supabase may inherit global defaults in addition to schema-specific defaults.
alter default privileges revoke all on tables from public,anon,authenticated;
alter default privileges revoke execute on functions from public,anon,authenticated;
alter default privileges revoke all on sequences from public,anon,authenticated;
alter default privileges in schema public revoke all on tables from public,anon,authenticated;
alter default privileges in schema public revoke all on sequences from public,anon,authenticated;
revoke all on public.study_profiles,public.study_documents,public.study_public_rooms from public,anon,authenticated;
grant select,insert,update on public.study_profiles to authenticated;
grant select on public.study_documents,public.study_public_rooms to authenticated;

create or replace function public.study_create_room(p_code text,p_name text,p_password text,p_public boolean,p_config jsonb) returns void
language plpgsql security definer set search_path = '' as $$
declare p public.study_profiles; begin
  if auth.uid() is null then raise exception 'Iniciá sesión.'; end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));
  if (select count(*) from public.study_rooms where host_id=auth.uid() and created_at>now()-interval '1 minute')>=10 or (select count(*) from public.study_rooms where host_id=auth.uid() and created_at>now()-interval '1 day')>=100 then raise exception 'Alcanzaste el límite de creación de salas. Reintentá más tarde.'; end if;
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


-- Documents are mutated only by checked RPCs; direct writes cannot bypass limits.
revoke insert,update,delete,truncate,references,trigger on public.study_documents from authenticated;
alter policy own_documents on public.study_documents using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
alter policy own_profile on public.study_profiles using(id=(select auth.uid())) with check(id=(select auth.uid()));
alter policy own_verified_results on public.study_verified_results using(user_id=(select auth.uid()));

create index if not exists study_quota_window_idx on private.ai_quota(window_start);
create index if not exists study_progress_user_idx on private.study_game_progress(user_id);
create index if not exists study_progress_turn_idx on private.study_game_progress(turn_user_id);
create index if not exists study_votes_user_idx on private.study_votes(user_id);
create index if not exists study_events_actor_created_idx on public.study_room_events(actor_id,created_at);
create index if not exists study_rooms_host_idx on public.study_rooms(host_id,created_at);
create index if not exists study_rooms_turn_idx on public.study_rooms(turn_user_id);
create index if not exists study_results_room_idx on public.study_verified_results(room_code);
create index if not exists study_results_user_completed_idx on public.study_verified_results(user_id,completed_at desc);

create or replace function public.study_sync_documents(p_rows jsonb) returns void
language plpgsql security definer set search_path='' as $$
declare row_data jsonb; uid uuid:=auth.uid(); begin
 if uid is null then raise exception 'Iniciá sesión.'; end if;
 if jsonb_typeof(p_rows) is distinct from 'array' or jsonb_array_length(p_rows)>200 or octet_length(p_rows::text)>8000000 then raise exception 'Colección inválida o demasiado grande.'; end if;
 perform pg_advisory_xact_lock(hashtextextended(uid::text,0));
 for row_data in select value from jsonb_array_elements(p_rows) loop
  if (row_data->>'updated_at')::timestamptz>now()+interval '5 minutes' then raise exception 'Revisá la fecha de tu dispositivo antes de sincronizar.'; end if;
  insert into public.study_documents as stored(user_id,id,nombre,paginas,palabras,texto,activo,updated_at)
  values(uid,row_data->>'id',row_data->>'nombre',(row_data->>'paginas')::integer,(row_data->>'palabras')::integer,row_data->>'texto',coalesce((row_data->>'activo')::boolean,true),(row_data->>'updated_at')::timestamptz)
  on conflict(user_id,id) do update set nombre=excluded.nombre,paginas=excluded.paginas,palabras=excluded.palabras,texto=excluded.texto,activo=excluded.activo,updated_at=excluded.updated_at,deleted_at=null
  where excluded.updated_at>stored.updated_at;
 end loop;
 if (select count(*) from public.study_documents where user_id=uid and deleted_at is null)>200 or (select count(*) from public.study_documents where user_id=uid)>2000 or (select coalesce(sum(octet_length(texto)),0) from public.study_documents where user_id=uid)>100000000 then
  raise exception 'Tu nube admite 200 documentos activos, 2000 registros incluyendo borrados y 100 MB de texto. Los originales locales se conservan.';
 end if;
end $$;

-- Persistent minute AND daily limits. Only the Vercel server may consume quotas.
create function private.consume_quota_bucket(p_bucket text,p_limit integer,p_window interval,p_day boolean default false) returns jsonb
language plpgsql set search_path='' as $$
declare q private.ai_quota; start_time timestamptz:=case when p_day then date_trunc('day',now() at time zone 'UTC') at time zone 'UTC' else now() end; begin
 insert into private.ai_quota as stored values(p_bucket,start_time,1)
 on conflict(bucket) do update set
  window_start=case when stored.window_start<=now()-p_window or (p_day and stored.window_start<start_time) then start_time else stored.window_start end,
  requests=case when stored.window_start<=now()-p_window or (p_day and stored.window_start<start_time) then 1 else least(stored.requests+1,100000) end
 returning * into q;
 return jsonb_build_object('allowed',q.requests<=p_limit,'retry_after',greatest(1,ceil(extract(epoch from q.window_start+p_window-now()))::integer));
end $$;
revoke all on function private.consume_quota_bucket(text,integer,interval,boolean) from public,anon,authenticated;
create function public.consume_ai_quota_v2(p_user_id uuid,p_ip_hash text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare decision jsonb; begin
 if p_user_id is null or p_ip_hash is null or p_ip_hash !~ '^[0-9a-f]{64}$' then raise exception 'Invalid quota identity'; end if;
 -- Always lock buckets in this order. Stop before creating additional buckets on rejection.
 decision:=private.consume_quota_bucket('ip:'||p_ip_hash,40,interval '1 minute');
 if not (decision->>'allowed')::boolean then return decision||'{"reason":"minute"}'; end if;
 decision:=private.consume_quota_bucket('user:'||p_user_id,15,interval '1 minute');
 if not (decision->>'allowed')::boolean then return decision||'{"reason":"minute"}'; end if;
 decision:=private.consume_quota_bucket('daily-ip:'||p_ip_hash,1000,interval '1 day',true);
 if not (decision->>'allowed')::boolean then return decision||'{"reason":"daily"}'; end if;
 decision:=private.consume_quota_bucket('daily-user:'||p_user_id,200,interval '1 day',true);
 if not (decision->>'allowed')::boolean then return decision||'{"reason":"daily"}'; end if;
 delete from private.ai_quota where window_start<now()-interval '2 days';
 return jsonb_build_object('allowed',true,'retry_after',0);
end $$;
revoke all on function public.consume_ai_quota_v2(uuid,text) from public,anon,authenticated;
grant execute on function public.consume_ai_quota_v2(uuid,text) to service_role;
-- Preserve compatibility during the short database/application rollout window.
create or replace function public.consume_ai_quota(p_user_id uuid,p_ip_hash text) returns boolean
language sql security definer set search_path='' as $$select (public.consume_ai_quota_v2(p_user_id,p_ip_hash)->>'allowed')::boolean$$;
revoke all on function public.consume_ai_quota(uuid,text) from public,anon,authenticated;
grant execute on function public.consume_ai_quota(uuid,text) to service_role;
commit;
