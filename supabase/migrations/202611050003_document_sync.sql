begin;
alter table public.study_documents add column deleted_at timestamptz;
create function public.study_sync_documents(p_rows jsonb) returns void
language plpgsql security definer set search_path='' as $$
declare row_data jsonb; begin
 if auth.uid() is null then raise exception 'Iniciá sesión.'; end if;
 if jsonb_typeof(p_rows) is distinct from 'array' or jsonb_array_length(p_rows)>200 then raise exception 'Colección inválida.'; end if;
 for row_data in select value from jsonb_array_elements(p_rows) loop
  insert into public.study_documents as stored(user_id,id,nombre,paginas,palabras,texto,activo,updated_at)
  values(auth.uid(),row_data->>'id',row_data->>'nombre',(row_data->>'paginas')::integer,(row_data->>'palabras')::integer,row_data->>'texto',coalesce((row_data->>'activo')::boolean,true),(row_data->>'updated_at')::timestamptz)
  on conflict(user_id,id) do update set nombre=excluded.nombre,paginas=excluded.paginas,palabras=excluded.palabras,texto=excluded.texto,activo=excluded.activo,updated_at=excluded.updated_at,deleted_at=null
  where excluded.updated_at>stored.updated_at;
 end loop;
end $$;
create function public.study_delete_documents(p_ids text[]) returns void
language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Iniciá sesión.'; end if;
 if cardinality(p_ids)>200 then raise exception 'Demasiados documentos en una operación.'; end if;
 -- Keep a minimal deletion marker so an old/offline snapshot cannot resurrect a file.
 -- The document body is erased immediately.
 update public.study_documents set texto='',activo=false,deleted_at=clock_timestamp(),updated_at=clock_timestamp() where user_id=auth.uid() and id=any(p_ids);
end $$;
revoke all on function public.study_sync_documents(jsonb),public.study_delete_documents(text[]) from public,anon;
grant execute on function public.study_sync_documents(jsonb),public.study_delete_documents(text[]) to authenticated;
commit;
