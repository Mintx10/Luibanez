begin;
create table private.study_games (
 room_code text primary key references public.study_rooms on delete cascade,
 rounds jsonb not null,
 deadline timestamptz not null,
 max_errors integer not null default 3
 ,started_at timestamptz not null default now()
);
create table private.study_game_progress (
 room_code text references public.study_rooms on delete cascade,
 user_id uuid references auth.users on delete cascade,
 round_index integer not null default 0,
 points integer not null default 0,
 mistakes integer not null default 0,
 version integer not null default 0,
 open_cards jsonb not null default '[]',
 matched_cards jsonb not null default '[]',
 turn_user_id uuid references auth.users,
 complete boolean not null default false,
 hint_used boolean not null default false,
 freeze_used boolean not null default false,
 cut_used boolean not null default false,
 primary key(room_code,user_id)
);
create table public.study_verified_results (
 id bigint generated always as identity primary key,
 room_code text references public.study_rooms on delete set null,
 user_id uuid references auth.users on delete cascade not null,
 game text not null,
 points integer not null,
 completed_at timestamptz not null default now()
);
alter table public.study_verified_results enable row level security;
create policy own_verified_results on public.study_verified_results for select to authenticated using(user_id=auth.uid());
revoke all on public.study_verified_results from public,anon,authenticated;
grant select on public.study_verified_results to authenticated;

create function public.study_start_game(p_code text,p_rounds jsonb) returns void
language plpgsql security definer set search_path='' as $$
declare r public.study_rooms; task jsonb; prepared jsonb:='[]'; cards jsonb; pair jsonb; idx integer; seconds integer; begin
 if not private.is_room_member(p_code) then raise exception 'No pertenecés a esta sala.'; end if;
 select * into r from public.study_rooms where code=p_code for update;
 if r.host_id<>auth.uid() or r.status<>'waiting' then raise exception 'Solo el anfitrión puede iniciar una partida nueva.'; end if;
 if r.config->>'juego'='bolillero' then raise exception 'Usá el modo de exposición oral.'; end if;
 if jsonb_typeof(p_rounds) is distinct from 'array' or jsonb_array_length(p_rounds) not between 1 and 30 or octet_length(p_rounds::text)>100000 then raise exception 'Material de juego inválido.'; end if;
 if exists(select 1 from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes' and not ready) then raise exception 'Faltan jugadores por confirmar.'; end if;
 for task in select value from jsonb_array_elements(p_rounds) loop
  if task->>'type'='quiz' then
   if coalesce(length(task->>'question'),0) not between 1 and 2000 or jsonb_typeof(task->'options') is distinct from 'array' or jsonb_array_length(task->'options')<>4 or not coalesce((task->>'correct') ~ '^[0-3]$',false) then raise exception 'Pregunta inválida.'; end if;
   if exists(select 1 from jsonb_array_elements(task->'options') v where jsonb_typeof(v)<>'string' or length(v#>>'{}') not between 1 and 2000) or (select count(distinct value) from jsonb_array_elements(task->'options'))<>4 then raise exception 'Opciones inválidas.'; end if;
  elsif task->>'type'='memory' then
   if jsonb_typeof(task->'pairs') is distinct from 'array' or jsonb_array_length(task->'pairs') not between 2 and 12 then raise exception 'Pares inválidos.'; end if;
   cards:='[]';idx:=0;
   for pair in select value from jsonb_array_elements(task->'pairs') loop
    if coalesce(length(pair->>'concept'),0)=0 or coalesce(length(pair->>'definition'),0)=0 then raise exception 'Par incompleto.'; end if;
    cards:=cards || jsonb_build_array(jsonb_build_object('pair',idx,'text',pair->>'concept'),jsonb_build_object('pair',idx,'text',pair->>'definition'));idx:=idx+1;
   end loop;
   select jsonb_agg(value order by random()) into cards from jsonb_array_elements(cards);
   task:=jsonb_build_object('type','memory','cards',cards,'title',task->>'title');
  else raise exception 'Actividad desconocida.'; end if;
  prepared:=prepared || jsonb_build_array(task);
 end loop;
 seconds:=least(3600,greatest(30,coalesce((r.config->>'tiempoTurnoSegundos')::integer,90)));
 if r.config->>'juego'='triatlon' then seconds:=seconds*3; end if;
 insert into private.study_games(room_code,rounds,deadline,max_errors) values(p_code,prepared,now()+make_interval(secs=>seconds),case when r.config->>'juego'='bomba' and not (r.config->>'formatoModo'='coop' and r.config#>>'{bomba,vidasEscuadron}'='false') then least(10,greatest(1,coalesce((r.config#>>'{bomba,maxFallos}')::integer,3))) else 100 end)
 on conflict(room_code) do update set rounds=excluded.rounds,deadline=excluded.deadline,max_errors=excluded.max_errors,started_at=now();
 delete from private.study_game_progress where room_code=p_code;
 insert into private.study_game_progress(room_code,user_id,turn_user_id)
 select p_code,user_id,r.host_id from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes' and (r.config->>'formatoModo'<>'coop' or user_id=r.host_id);
 update public.study_room_members set points=0 where room_code=p_code;
 update public.study_rooms set status='playing',snapshot=jsonb_build_object('tipo','SECURE_GAME_CHANGED') where code=p_code;
 insert into public.study_room_events(room_code,actor_id,payload) values(p_code,auth.uid(),jsonb_build_object('tipo','SECURE_GAME_CHANGED'));
end $$;

create function public.study_game_state(p_code text) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare r public.study_rooms; g private.study_games; p private.study_game_progress; task jsonb; cards jsonb; owner_id uuid; idx integer; begin
 if not private.is_room_member(p_code) then raise exception 'No pertenecés a esta sala.'; end if;
 select * into r from public.study_rooms where code=p_code;
 select * into g from private.study_games where room_code=p_code;
 if not found then return null; end if;
 owner_id:=case when r.config->>'formatoModo'='coop' then r.host_id else auth.uid() end;
 select * into p from private.study_game_progress where room_code=p_code and user_id=owner_id;
 if not found then return null; end if;
 task:=g.rounds->p.round_index;
 if task->>'type'='memory' then
  cards:='[]';idx:=0;
  for task in select value from jsonb_array_elements(g.rounds->p.round_index->'cards') loop
   cards:=cards || jsonb_build_array(jsonb_build_object('text',case when p.open_cards @> to_jsonb(idx) or p.matched_cards @> to_jsonb(idx) or (r.config#>>'{memotest,vistazo}'='true' and now()<g.started_at+interval '3 seconds') then task->>'text' else '' end,'matched',p.matched_cards @> to_jsonb(idx),'open',p.open_cards @> to_jsonb(idx)));idx:=idx+1;
  end loop;
  task:=g.rounds->p.round_index;
 end if;
 return jsonb_build_object('game',r.config->>'juego','mode',r.config->>'formatoModo','roundIndex',p.round_index,'totalRounds',jsonb_array_length(g.rounds),'type',task->>'type','title',task->>'title','question',task->>'question','options',task->'options','cards',cards,'turnUserId',p.turn_user_id,'points',p.points,'mistakes',p.mistakes,'complete',p.complete,'expired',g.deadline<=now(),'deadline',g.deadline,'version',p.version,'hintUsed',p.hint_used,'freezeUsed',p.freeze_used,'cutUsed',p.cut_used,
 'cutAllowed',r.config->>'juego'<>'bomba' or coalesce((r.config#>>'{bomba,cortacables}')::boolean,true),
 'hint',case when p.hint_used then task->>'explanation' else null end,'removedOptions',case when p.cut_used then (select jsonb_agg(i) from (select i from generate_series(0,3) i where i<>(task->>'correct')::integer limit 2) t) else null end,
 'players',(select coalesce(jsonb_agg(jsonb_build_object('name',m.apodo,'points',m.points,'complete',coalesce(gp.complete,false)) order by m.points desc,m.joined_at),'[]') from public.study_room_members m left join private.study_game_progress gp on gp.room_code=m.room_code and gp.user_id=case when r.config->>'formatoModo'='coop' then r.host_id else m.user_id end where m.room_code=p_code and m.active));
end $$;

create function public.study_game_action(p_code text,p_version integer,p_action text,p_index integer default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare r public.study_rooms; g private.study_games; p private.study_game_progress; task jsonb; owner_id uuid; first_card integer; advanced boolean:=false; uid uuid:=auth.uid(); multiplier integer:=1; begin
 if not private.is_room_member(p_code) then raise exception 'No pertenecés a esta sala.'; end if;
 select * into r from public.study_rooms where code=p_code for update;
 if r.status<>'playing' then raise exception 'La partida no está activa.'; end if;
 select * into g from private.study_games where room_code=p_code;
 owner_id:=case when r.config->>'formatoModo'='coop' then r.host_id else uid end;
 select * into p from private.study_game_progress where room_code=p_code and user_id=owner_id for update;
 if not found then raise exception 'No participás de esta partida.'; end if;
 if p.version is distinct from p_version then return public.study_game_state(p_code); end if;
 if p.complete then return public.study_game_state(p_code); end if;
 if g.deadline<=now() then p.complete:=true;
 else
  task:=g.rounds->p.round_index;
  if r.config->>'juego'='triatlon' and r.config#>>'{triatlon,multiplicador}'='true' then multiplier:=case when task->>'type'='memory' then 3 when task->>'title' like 'Impostor%' then 2 else 1 end; end if;
  if p_action='freeze' then
   if p.freeze_used then raise exception 'Ya usaste la pausa extra.'; end if;
   p.freeze_used:=true;update private.study_games set deadline=deadline+interval '15 seconds' where room_code=p_code;
  elsif p_action='hint' then
   if p.hint_used then raise exception 'Ya usaste la pista.'; end if;
   p.hint_used:=true;p.points:=greatest(0,p.points-5);
  elsif p_action='cut' and task->>'type'='quiz' then
   if r.config->>'juego'='bomba' and r.config#>>'{bomba,cortacables}'='false' then raise exception 'El cortacables está desactivado en esta sala.'; end if;
   if p.cut_used then raise exception 'Ya usaste el cortacables.'; end if;
   p.cut_used:=true;p.points:=greatest(0,p.points-5);
  elsif p_action='answer' and task->>'type'='quiz' then
   if p_index is null or p_index not between 0 and 3 then raise exception 'Opción inválida.'; end if;
   if p_index=(task->>'correct')::integer then
    p.points:=p.points+10*multiplier;
    if r.config->>'juego'='impostor' and r.config#>>'{impostor,bonusVeloz}'='true' and now()<g.started_at+(g.deadline-g.started_at)/2 then p.points:=p.points+5; end if;
    p.round_index:=p.round_index+1;advanced:=true;
   else p.mistakes:=p.mistakes+1;
    if r.config->>'juego'='impostor' and r.config#>>'{impostor,penalizacion}'='true' then p.points:=greatest(0,p.points-5); end if;
    if r.config->>'juego'<>'bomba' then p.round_index:=p.round_index+1;advanced:=true; end if;
   end if;
  elsif p_action='flip' and task->>'type'='memory' then
   if r.config->>'formatoModo'='coop' and p.turn_user_id<>uid then raise exception 'Esperá tu turno.'; end if;
   if p_index is null or p_index<0 or p_index>=jsonb_array_length(task->'cards') or p.matched_cards @> to_jsonb(p_index) then raise exception 'Carta inválida.'; end if;
   if jsonb_array_length(p.open_cards)=2 then p.open_cards:='[]'; end if;
   if p.open_cards @> to_jsonb(p_index) then return public.study_game_state(p_code); end if;
   p.open_cards:=p.open_cards || to_jsonb(p_index);
   if jsonb_array_length(p.open_cards)=2 then
    first_card:=(p.open_cards->>0)::integer;
    if task->'cards'->first_card->>'pair'=task->'cards'->p_index->>'pair' then
     p.matched_cards:=p.matched_cards || p.open_cards;p.open_cards:='[]';p.points:=p.points+10*multiplier;
     if jsonb_array_length(p.matched_cards)=jsonb_array_length(task->'cards') then p.round_index:=p.round_index+1;p.matched_cards:='[]';advanced:=true; end if;
    else
     p.mistakes:=p.mistakes+1;
     if r.config->>'formatoModo'='coop' then
      select user_id into p.turn_user_id from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes' and user_id>uid order by user_id limit 1;
      if p.turn_user_id is null then select user_id into p.turn_user_id from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes' order by user_id limit 1; end if;
     end if;
    end if;
   end if;
   if r.config->>'formatoModo'='coop' and r.config#>>'{memotest,rachaTurno}'='false' and jsonb_array_length(p.open_cards)=0 then
    select user_id into p.turn_user_id from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes' and user_id>uid order by user_id limit 1;
    if p.turn_user_id is null then select user_id into p.turn_user_id from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes' order by user_id limit 1; end if;
   end if;
  else raise exception 'Acción inválida para esta actividad.'; end if;
  if advanced then p.hint_used:=false;p.cut_used:=false;end if;
  p.complete:=p.round_index>=jsonb_array_length(g.rounds) or p.mistakes>=g.max_errors;
  if p.complete and p.round_index>=jsonb_array_length(g.rounds) and r.config->>'juego'='bomba' and r.config#>>'{bomba,bonusPrimerDesactivador}'='true' and not exists(select 1 from private.study_game_progress where room_code=p_code and complete) then p.points:=p.points+10; end if;
 end if;
 update private.study_game_progress set round_index=p.round_index,points=p.points,mistakes=p.mistakes,version=version+1,open_cards=p.open_cards,matched_cards=p.matched_cards,turn_user_id=p.turn_user_id,complete=p.complete,hint_used=p.hint_used,freeze_used=p.freeze_used,cut_used=p.cut_used where room_code=p_code and user_id=owner_id;
 update public.study_room_members set points=p.points where room_code=p_code and (r.config->>'formatoModo'='coop' or user_id=uid);
 if p.complete then
  insert into public.study_verified_results(room_code,user_id,game,points) select p_code,user_id,r.config->>'juego',p.points from public.study_room_members where room_code=p_code and (r.config->>'formatoModo'='coop' or user_id=uid);
 end if;
 insert into public.study_room_events(room_code,actor_id,payload) values(p_code,uid,jsonb_build_object('tipo','SECURE_GAME_CHANGED'));
 return public.study_game_state(p_code);
end $$;
revoke all on function public.study_start_game(text,jsonb), public.study_game_state(text),public.study_game_action(text,integer,text,integer) from public,anon;
grant execute on function public.study_start_game(text,jsonb), public.study_game_state(text),public.study_game_action(text,integer,text,integer) to authenticated;
commit;
