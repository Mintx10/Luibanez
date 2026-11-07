-- Passwords remain managed by Supabase Auth. This registry never stores passwords
-- or recovery keys, and cannot be read or called by a browser role.
begin;
create table private.study_username_accounts (
 username text primary key check(username ~ '^[a-z0-9][a-z0-9_]{2,29}$'),
 user_id uuid not null unique references auth.users(id) on delete cascade,
 recovery_hash text not null check(recovery_hash ~ '^[0-9a-f]{64}$'),
 created_at timestamptz not null default now()
);
alter table private.study_username_accounts enable row level security;
revoke all on private.study_username_accounts from public,anon,authenticated;

create function public.study_account_lookup(p_username text) returns jsonb
language sql security definer set search_path='' as $$
 select jsonb_build_object('user_id',user_id,'recovery_hash',recovery_hash)
 from private.study_username_accounts where username=p_username
$$;
create function public.study_account_register(p_username text,p_user_id uuid,p_recovery_hash text) returns void
language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from auth.users where id=p_user_id and not coalesce(is_anonymous,false)
  and email_confirmed_at is not null and raw_app_meta_data->>'study_auth'='username') then
  raise exception 'Invalid server-provisioned account';
 end if;
 insert into private.study_username_accounts(username,user_id,recovery_hash) values(p_username,p_user_id,p_recovery_hash);
end $$;
create function public.study_account_quota(p_ip_hash text,p_name_hash text,p_action text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare q jsonb;
begin
 if p_ip_hash !~ '^[0-9a-f]{64}$' or p_name_hash !~ '^[0-9a-f]{64}$' or p_action not in ('register','login','recover') then raise exception 'Invalid quota';end if;
 q:=private.consume_quota_bucket('account:ip:'||p_ip_hash,30,interval '10 minutes');
 if not (q->>'allowed')::boolean then return q;end if;
 q:=private.consume_quota_bucket('account:name:'||p_name_hash,10,interval '10 minutes');
 if not (q->>'allowed')::boolean then return q;end if;
 if p_action='register' then return private.consume_quota_bucket('account:signup:'||p_ip_hash,5,interval '1 day',true);end if;
 return q;
end $$;
revoke all on function public.study_account_lookup(text),public.study_account_register(text,uuid,text),public.study_account_quota(text,text,text) from public,anon,authenticated;
grant execute on function public.study_account_lookup(text),public.study_account_register(text,uuid,text),public.study_account_quota(text,text,text) to service_role;

-- Existing verified email accounts keep their access. Username accounts must also
-- have completed the server-only registry transaction, never user_metadata.
create or replace function private.is_student() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from auth.users u where u.id=auth.uid() and not coalesce(u.is_anonymous,false)
 and u.email_confirmed_at is not null and (coalesce(u.raw_app_meta_data->>'study_auth','')<>'username'
 or exists(select 1 from private.study_username_accounts a where a.user_id=u.id)))
$$;
commit;
