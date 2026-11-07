const fs = require('node:fs');
const { PGlite } = require('@electric-sql/pglite');
async function createBackend(users) {
  const db = new PGlite();
  await db.exec(`create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key,is_anonymous boolean not null default false,email_confirmed_at timestamptz default now(),created_at timestamptz default now(),raw_app_meta_data jsonb default '{}',raw_user_meta_data jsonb default '{}');create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to authenticated;create schema extensions;create function extensions.gen_salt(text,integer) returns text language sql as $$select 'test'::text$$;create function extensions.crypt(text,text) returns text language sql as $$select 'test:'||$1$$;`);
  for(const user of users) await db.query('insert into auth.users(id) values($1)',[user.id]);
  for(const name of fs.readdirSync('supabase/migrations').sort()) await db.exec(fs.readFileSync('supabase/migrations/'+name,'utf8').replace('create extension if not exists pgcrypto with schema extensions;',''));
  for(const user of users){await db.query("select set_config('request.jwt.claim.sub',$1,false)",[user.id]);if(user.is_anonymous)await db.query('update auth.users set is_anonymous=true,email_confirmed_at=null where id=$1',[user.id]);else await db.query('insert into study_profiles(id,apodo,carrera) values($1,$2,$3)',[user.id,user.user_metadata.apodo,user.user_metadata.carrera]);}
  let chain=Promise.resolve();
  async function execute(user,query,params){const operation=chain.then(async()=>{await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[user.id]);await db.exec('set role authenticated');return db.query(query,params)});chain=operation.catch(()=>{});return operation;}
  async function connect(page,user){
    await page.route('**/__study_test_backend',async route=>{
      try{
        const request=route.request().postDataJSON();let data;
        if(request.rpc){
          const allowed=['study_create_room','study_join_room','study_read_room','study_room_heartbeat','study_leave_room','study_send_room_event','study_start_game','study_game_state','study_game_action','study_activate_career','study_save_track','study_save_custom_subject','study_record_subject_progress','study_link_subject_material','study_join_guest_room'];
          if(!allowed.includes(request.rpc))throw Error('Unknown RPC');
          const args=Object.entries(request.args||{});
          const call=args.map(([key],i)=>{if(!/^p_\w+$/.test(key))throw Error('Invalid argument');return `${key} => $${i+1}`}).join(',');
          data=(await execute(user,`select ${request.rpc}(${call}) as data`,args.map(([,value])=>value))).rows[0].data;
        }else{
          const {table,operations}=request;
          if(table==='study_profiles'){data=(await execute(user,'select * from study_profiles where id=$1',[user.id])).rows;}else if(table==='study_documents'){data=[];}
          else{
            if(!['study_public_rooms','study_room_events','study_verified_results','study_student_tracks','study_custom_subjects','study_subject_progress','study_subject_materials'].includes(table))throw Error('Unknown table');
            const filters=operations.filter(op=>['eq','gt'].includes(op[0]));const params=[];
            const conditions=filters.map(([op,key,value])=>{if(!/^[a-z_]+$/.test(key))throw Error('Invalid column');params.push(value);return `"${key}"${op==='eq'?'=':'>'}$${params.length}`});
            let query=`select * from ${table}`+(conditions.length?' where '+conditions.join(' and '):'');
            if(table==='study_room_events')query+=' order by id asc';query+=' limit 200';data=(await execute(user,query,params)).rows;
          }
        }
        await route.fulfill({json:{data,error:null}});
      }catch(error){await route.fulfill({json:{data:null,error:{message:error.message,code:error.code}}});}
    });
  }
  return {connect,db,close:()=>db.close()};
}
module.exports={createBackend};
