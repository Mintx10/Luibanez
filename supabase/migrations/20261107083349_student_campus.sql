-- Preview migration; validate on an isolated database before activation.
begin;
create function private.is_student() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from auth.users where id=auth.uid() and not coalesce(is_anonymous,false) and email_confirmed_at is not null) $$;
revoke all on function private.is_student() from public,anon;
grant execute on function private.is_student() to authenticated;
create table public.study_careers(id text primary key,name text not null,profile_value text unique not null);
create table public.study_subjects(id text primary key,career_id text not null references public.study_careers,name text not null,unique(career_id,id));
insert into public.study_careers values ('finanzas','Finanzas','Licenciatura en Finanzas'),('medicina','Medicina','Medicina'),('marketing','Marketing','Marketing'),('veterinaria','Veterinaria','Veterinaria'),('psicologia','Psicología','Psicología'),('sistemas','Ingeniería en Sistemas','Ingeniería en Sistemas');
insert into public.study_subjects values ('finanzas-filosofia-y-etica','finanzas','Filosofía y Ética'),('finanzas-sistema-financiero-internacional','finanzas','Sistema Financiero Internacional'),('finanzas-historia-economica-mundial','finanzas','Historia Económica Mundial'),('finanzas-estadistica','finanzas','Estadística'),('finanzas-contabilidad','finanzas','Contabilidad'),('finanzas-matematica-financiera','finanzas','Matemática Financiera'),('finanzas-microeconomia','finanzas','Microeconomía'),('finanzas-macroeconomia','finanzas','Macroeconomía'),('finanzas-finanzas-corporativas','finanzas','Finanzas Corporativas'),('finanzas-inversiones','finanzas','Inversiones'),('finanzas-derivados-financieros','finanzas','Derivados Financieros'),('finanzas-econometria','finanzas','Econometría'),('medicina-anatomia','medicina','Anatomía'),('medicina-histologia-y-embriologia','medicina','Histología y Embriología'),('medicina-bioquimica','medicina','Bioquímica'),('medicina-fisiologia','medicina','Fisiología'),('medicina-microbiologia','medicina','Microbiología'),('medicina-inmunologia','medicina','Inmunología'),('medicina-patologia','medicina','Patología'),('medicina-semiologia','medicina','Semiología'),('medicina-medicina-interna','medicina','Medicina Interna'),('medicina-farmacologia-i','medicina','Farmacología I'),('medicina-farmacologia-ii','medicina','Farmacología II'),('medicina-salud-publica','medicina','Salud Pública'),('marketing-fundamentos-de-marketing','marketing','Fundamentos de Marketing'),('marketing-comportamiento-del-consumidor','marketing','Comportamiento del Consumidor'),('marketing-investigacion-de-mercados','marketing','Investigación de Mercados'),('marketing-estadistica-aplicada','marketing','Estadística Aplicada'),('marketing-marketing-estrategico','marketing','Marketing Estratégico'),('marketing-branding','marketing','Branding'),('marketing-marketing-digital','marketing','Marketing Digital'),('marketing-publicidad-y-creatividad','marketing','Publicidad y Creatividad'),('marketing-gestion-de-productos','marketing','Gestión de Productos'),('marketing-precios-y-rentabilidad','marketing','Precios y Rentabilidad'),('marketing-canales-de-distribucion','marketing','Canales de Distribución'),('marketing-metricas-y-analitica','marketing','Métricas y Analítica'),('veterinaria-anatomia-animal','veterinaria','Anatomía Animal'),('veterinaria-histologia-y-embriologia','veterinaria','Histología y Embriología'),('veterinaria-fisiologia-animal','veterinaria','Fisiología Animal'),('veterinaria-bioquimica','veterinaria','Bioquímica'),('veterinaria-microbiologia-y-parasitologia','veterinaria','Microbiología y Parasitología'),('veterinaria-farmacologia-veterinaria','veterinaria','Farmacología Veterinaria'),('veterinaria-patologia-veterinaria','veterinaria','Patología Veterinaria'),('veterinaria-semiologia-veterinaria','veterinaria','Semiología Veterinaria'),('veterinaria-clinica-de-pequenos-animales','veterinaria','Clínica de Pequeños Animales'),('veterinaria-clinica-de-grandes-animales','veterinaria','Clínica de Grandes Animales'),('veterinaria-cirugia-veterinaria','veterinaria','Cirugía Veterinaria'),('veterinaria-salud-publica-y-zoonosis','veterinaria','Salud Pública y Zoonosis'),('psicologia-introduccion-a-la-psicologia','psicologia','Introducción a la Psicología'),('psicologia-historia-de-la-psicologia','psicologia','Historia de la Psicología'),('psicologia-psicologia-del-desarrollo','psicologia','Psicología del Desarrollo'),('psicologia-psicologia-cognitiva','psicologia','Psicología Cognitiva'),('psicologia-neurociencias','psicologia','Neurociencias'),('psicologia-psicologia-social','psicologia','Psicología Social'),('psicologia-metodologia-de-investigacion','psicologia','Metodología de Investigación'),('psicologia-estadistica-y-psicometria','psicologia','Estadística y Psicometría'),('psicologia-psicopatologia','psicologia','Psicopatología'),('psicologia-evaluacion-psicologica','psicologia','Evaluación Psicológica'),('psicologia-psicologia-clinica','psicologia','Psicología Clínica'),('psicologia-etica-profesional','psicologia','Ética Profesional'),('sistemas-programacion-i','sistemas','Programación I'),('sistemas-programacion-ii','sistemas','Programación II'),('sistemas-algoritmos-y-estructuras-de-datos','sistemas','Algoritmos y Estructuras de Datos'),('sistemas-matematica-discreta','sistemas','Matemática Discreta'),('sistemas-analisis-matematico','sistemas','Análisis Matemático'),('sistemas-algebra-y-geometria','sistemas','Álgebra y Geometría'),('sistemas-arquitectura-de-computadoras','sistemas','Arquitectura de Computadoras'),('sistemas-sistemas-operativos','sistemas','Sistemas Operativos'),('sistemas-bases-de-datos','sistemas','Bases de Datos'),('sistemas-redes','sistemas','Redes'),('sistemas-ingenieria-de-software','sistemas','Ingeniería de Software'),('sistemas-seguridad-informatica','sistemas','Seguridad Informática');
alter table public.study_profiles drop constraint study_profiles_carrera_check;
alter table public.study_profiles add constraint study_profiles_carrera_check check(carrera in ('General','Licenciatura en Finanzas','Medicina','Marketing','Veterinaria','Psicología','Ingeniería en Sistemas'));
create table public.study_student_tracks(user_id uuid references auth.users on delete cascade,career_id text references public.study_careers,selected_subjects text[] not null check(cardinality(selected_subjects)<=100),updated_at timestamptz not null default now(),primary key(user_id,career_id));
create table public.study_custom_subjects(id text primary key check(id ~ '^custom-[0-9a-f-]{36}$'),user_id uuid not null references auth.users on delete cascade,career_id text not null references public.study_careers,name text not null check(length(name) between 3 and 100),description text not null check(length(description)<=1000),created_at timestamptz not null default now());
create index study_custom_owner_idx on public.study_custom_subjects(user_id,career_id);
create table public.study_subject_progress(user_id uuid references auth.users on delete cascade,career_id text not null references public.study_careers,subject_id text,activity_id text check(activity_id ~ '^(unit-[1-6]|quiz|case-[1-3]|workbench|practice-(bomba|impostor|memotest|bolillero|triatlon))$'),score numeric check(score between 0 and 100),best_score numeric check(best_score between 0 and 100),detail jsonb not null check(octet_length(detail::text)<=12000),updated_at timestamptz not null,primary key(user_id,subject_id,activity_id));
create index study_subject_progress_career_idx on public.study_subject_progress(user_id,career_id,updated_at desc);
create table public.study_subject_materials(user_id uuid,career_id text not null references public.study_careers,subject_id text,document_id text,primary key(user_id,subject_id,document_id),foreign key(user_id,document_id) references public.study_documents(user_id,id) on delete cascade);
create index study_material_document_idx on public.study_subject_materials(user_id,document_id);
alter table public.study_careers enable row level security;
alter table public.study_subjects enable row level security;
create policy catalog_careers on public.study_careers for select to anon,authenticated using(true);
create policy catalog_subjects on public.study_subjects for select to anon,authenticated using(true);
grant select on public.study_careers,public.study_subjects to anon,authenticated;
do $$declare t text;begin foreach t in array array['study_student_tracks','study_custom_subjects','study_subject_progress','study_subject_materials'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('create policy own_student_data on public.%I for select to authenticated using(user_id=(select auth.uid()) and (select private.is_student()))',t);
 execute format('revoke all on public.%I from public,anon,authenticated',t);execute format('grant select on public.%I to authenticated',t);
end loop;end $$;
alter policy own_profile on public.study_profiles using(id=(select auth.uid()) and (select private.is_student())) with check(id=(select auth.uid()) and (select private.is_student()));
alter policy own_documents on public.study_documents using(user_id=(select auth.uid()) and (select private.is_student())) with check(user_id=(select auth.uid()) and (select private.is_student()));
alter policy own_verified_results on public.study_verified_results using(user_id=(select auth.uid()) and (select private.is_student()));
alter policy visible_room on public.study_rooms using((public and status='waiting' and expires_at>now() and (select private.is_student())) or private.is_room_member(code));
create function private.check_subject(p_career text,p_subject text) returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.study_subjects where id=p_subject and career_id=p_career) or exists(select 1 from public.study_custom_subjects where id=p_subject and career_id=p_career and user_id=auth.uid()) $$;
revoke all on function private.check_subject(text,text) from public,anon,authenticated;
create function public.study_activate_career(p_career text) returns void language plpgsql security definer set search_path='' as $$
declare c text;begin
 if not private.is_student() then raise exception 'Necesitás un perfil de alumno verificado.';end if;
 select profile_value into c from public.study_careers where id=p_career;if not found then raise exception 'Carrera inválida.';end if;
 insert into public.study_profiles(id,apodo,carrera) select auth.uid(),left(coalesce(nullif(raw_user_meta_data->>'apodo',''),'Estudiante'),80),c from auth.users where id=auth.uid() on conflict(id) do update set carrera=excluded.carrera,updated_at=now();
end $$;
create function public.study_save_track(p_career text,p_subjects text[]) returns void language plpgsql security definer set search_path='' as $$begin
 if not private.is_student() then raise exception 'Necesitás un perfil de alumno verificado.';end if;
 if p_subjects is null or cardinality(p_subjects)>100 or not exists(select 1 from public.study_careers where id=p_career) or exists(select 1 from unnest(p_subjects) s where not private.check_subject(p_career,s)) then raise exception 'Selección de materias inválida.';end if;
 insert into public.study_student_tracks values(auth.uid(),p_career,array(select distinct unnest(p_subjects)),now()) on conflict(user_id,career_id) do update set selected_subjects=excluded.selected_subjects,updated_at=now();
end $$;
create function public.study_save_custom_subject(p_id text,p_career text,p_name text,p_description text) returns void language plpgsql security definer set search_path='' as $$begin
 if not private.is_student() then raise exception 'Necesitás un perfil de alumno verificado.';end if;
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));
 if not exists(select 1 from public.study_custom_subjects where id=p_id and user_id=auth.uid()) and (select count(*) from public.study_custom_subjects where user_id=auth.uid())>=100 then raise exception 'Alcanzaste el límite de materias personales.';end if;
 insert into public.study_custom_subjects(id,user_id,career_id,name,description) values(p_id,auth.uid(),p_career,trim(p_name),p_description) on conflict(id) do update set name=excluded.name,description=excluded.description where study_custom_subjects.user_id=auth.uid() and study_custom_subjects.career_id=p_career;
 if not found then raise exception 'No podés modificar esta materia.';end if;
end $$;
create function public.study_record_subject_progress(p_career text,p_subject text,p_activity text,p_score numeric,p_detail jsonb,p_at timestamptz) returns void language plpgsql security definer set search_path='' as $$begin
 if not private.is_student() then raise exception 'Necesitás un perfil de alumno verificado.';end if;
 if not private.check_subject(p_career,p_subject) or p_at is null or p_at>now()+interval '5 minutes' or jsonb_typeof(p_detail) is distinct from 'object' then raise exception 'Progreso inválido. Revisá la materia y la fecha del dispositivo.';end if;
 insert into public.study_subject_progress as p values(auth.uid(),p_career,p_subject,p_activity,p_score,p_score,p_detail,p_at) on conflict(user_id,subject_id,activity_id) do update set score=excluded.score,best_score=greatest(p.best_score,excluded.score),detail=excluded.detail,updated_at=excluded.updated_at where excluded.updated_at>p.updated_at;
end $$;
create function public.study_link_subject_material(p_career text,p_subject text,p_document text) returns void language plpgsql security definer set search_path='' as $$begin
 if not private.is_student() then raise exception 'Necesitás un perfil de alumno verificado.';end if;
 if not private.check_subject(p_career,p_subject) or not exists(select 1 from public.study_documents where user_id=auth.uid() and id=p_document and deleted_at is null) then raise exception 'La materia o el documento no pertenece a tu perfil, o el documento aún no se sincronizó.';end if;
 insert into public.study_subject_materials values(auth.uid(),p_career,p_subject,p_document) on conflict do nothing;
end $$;
revoke all on function public.study_activate_career(text),public.study_save_track(text,text[]),public.study_save_custom_subject(text,text,text,text),public.study_record_subject_progress(text,text,text,numeric,jsonb,timestamptz),public.study_link_subject_material(text,text,text) from public,anon;
grant execute on function public.study_activate_career(text),public.study_save_track(text,text[]),public.study_save_custom_subject(text,text,text,text),public.study_record_subject_progress(text,text,text,numeric,jsonb,timestamptz),public.study_link_subject_material(text,text,text) to authenticated;
-- Triggers protect the unchanged legacy SECURITY DEFINER RPC contracts as well.
alter function public.study_sync_documents(jsonb) set schema private;
alter function public.study_delete_documents(text[]) set schema private;
revoke all on function private.study_sync_documents(jsonb),private.study_delete_documents(text[]) from public,anon,authenticated;
create function public.study_sync_documents(p_rows jsonb) returns void language plpgsql security definer set search_path='' as $$begin
 if not private.is_student() then raise exception 'Necesitás una cuenta de alumno verificada.';end if;
 perform private.study_sync_documents(p_rows);
end $$;
create function public.study_delete_documents(p_ids text[]) returns void language plpgsql security definer set search_path='' as $$begin
 if not private.is_student() then raise exception 'Necesitás una cuenta de alumno verificada.';end if;
 perform private.study_delete_documents(p_ids);
end $$;
revoke all on function public.study_sync_documents(jsonb),public.study_delete_documents(text[]) from public,anon;
grant execute on function public.study_sync_documents(jsonb),public.study_delete_documents(text[]) to authenticated;
create function private.require_student_write() returns trigger language plpgsql security definer set search_path='' as $$begin if not private.is_student() then raise exception 'Necesitás una cuenta de alumno verificada para esta operación.';end if;return new;end $$;
revoke all on function private.require_student_write() from public,anon,authenticated;
create trigger require_student_profile before insert or update on public.study_profiles for each row execute function private.require_student_write();
create trigger require_student_document before insert or update on public.study_documents for each row execute function private.require_student_write();
create trigger require_student_host before insert on public.study_rooms for each row execute function private.require_student_write();
create function private.skip_guest_result() returns trigger language plpgsql security definer set search_path='' as $$begin if exists(select 1 from auth.users where id=new.user_id and not coalesce(is_anonymous,false) and email_confirmed_at is not null) then return new;end if;return null;end $$;
revoke all on function private.skip_guest_result() from public,anon,authenticated;
create trigger no_permanent_guest_result before insert on public.study_verified_results for each row execute function private.skip_guest_result();
create function public.study_join_guest_room(p_code text,p_password text,p_apodo text) returns jsonb language plpgsql security definer set search_path='' as $$
declare r public.study_rooms;hashed text;n integer;begin
 if not exists(select 1 from auth.users where id=auth.uid() and is_anonymous=true) then raise exception 'Este ingreso requiere una sesión de invitado comprobada.';end if;
 perform 1 from auth.users where id=auth.uid() for update;
 if p_code is null or p_code !~ '^[A-Z2-9]{5,8}$' or p_apodo is null or length(trim(p_apodo)) not between 2 and 40 or p_password is null or length(p_password)>128 then raise exception 'Datos de ingreso inválidos.';end if;
 insert into private.study_join_attempts as a(user_id) values(auth.uid()) on conflict(user_id) do update set attempts=case when a.started_at<now()-interval '1 minute' then 1 else a.attempts+1 end,started_at=case when a.started_at<now()-interval '1 minute' then now() else a.started_at end returning a.attempts into n;
 if n>20 then return jsonb_build_object('error','Demasiados intentos. Esperá un minuto.');end if;
 select * into r from public.study_rooms where code=p_code for update;
 if not found or r.status='closed' or r.expires_at<=now() then return jsonb_build_object('error','Sala no disponible.');end if;
 if exists(select 1 from public.study_room_members where room_code=p_code and user_id=auth.uid() and active) then update public.study_room_members set seen_at=now() where room_code=p_code and user_id=auth.uid();return jsonb_build_object('ok',true);end if;
 if r.status<>'waiting' then return jsonb_build_object('error','La partida ya empezó.');end if;
 select password_hash into hashed from private.study_room_secrets where room_code=p_code;
 if hashed is not null and extensions.crypt(p_password,hashed) is distinct from hashed then return jsonb_build_object('error','Contraseña de sala incorrecta.');end if;
 if (select count(*) from public.study_room_members where room_code=p_code and active and seen_at>now()-interval '2 minutes')>=8 then return jsonb_build_object('error','La sala está llena.');end if;
 insert into public.study_room_members(room_code,user_id,apodo,avatar) values(p_code,auth.uid(),trim(p_apodo),'👤') on conflict(room_code,user_id) do update set active=true,ready=false,seen_at=now(),apodo=excluded.apodo;
 return jsonb_build_object('ok',true);
end $$;
revoke all on function public.study_join_guest_room(text,text,text) from public,anon;
grant execute on function public.study_join_guest_room(text,text,text) to authenticated;
-- Schedule hourly per audit/campus.md. Never remove an identity in an active room.
create function public.study_cleanup_guests() returns integer language plpgsql security definer set search_path='' as $$
declare candidate uuid;n integer:=0;begin
 for candidate in select id from auth.users where is_anonymous=true and created_at<now()-interval '24 hours' for update skip locked loop
  if not exists(select 1 from public.study_room_members m join public.study_rooms r on r.code=m.room_code where m.user_id=candidate and m.active and r.status<>'closed' and r.expires_at>now()) then
   update public.study_rooms set turn_user_id=null where turn_user_id=candidate;
   update private.study_game_progress set turn_user_id=null where turn_user_id=candidate;
   delete from auth.users where id=candidate;n:=n+1;
  end if;
 end loop;return n;
end $$;
revoke all on function public.study_cleanup_guests() from public,anon,authenticated;
grant execute on function public.study_cleanup_guests() to service_role;
commit;
