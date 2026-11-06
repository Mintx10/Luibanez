const fs = require('node:fs');
const { PGlite } = require('@electric-sql/pglite');
async function createBackend(users) {
  const db = new PGlite();
  await db.exec(`create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to authenticated;create schema extensions;create function extensions.gen_salt(text,integer) returns text language sql as $$select 'test'::text$$;create function extensions.crypt(text,text) returns text language sql as $$select 'test:'||$1$$;`);
  for(const user of users) await db.query('insert into auth.users values($1)',[user.id]);
  for(const name of fs.readdirSync('supabase/migrations').sort()) await db.exec(fs.readFileSync('supabase/migrations/'+name,'utf8').replace('create extension if not exists pgcrypto with schema extensions;',''));
  for(const user of users) await db.query('insert into study_profiles(id,apodo) values($1,$2)',[user.id,user.user_metadata.apodo]);
  let chain=Promise.resolve();
  async function execute(user,query,params){const operation=chain.then(async()=>{await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[user.id]);await db.exec('set role authenticated');return db.query(query,params)});chain=operation.catch(()=>{});return operation;}
  async function connect(page,user){
    await page.route('**/__study_test_backend',async route=>{
      try{
        const request=route.request().postDataJSON();let data;
        if(request.rpc){
          const allowed=['study_create_room','study_join_room','study_read_room','study_room_heartbeat','study_leave_room','study_send_room_event','study_start_game','study_game_state','study_game_action'];
          if(!allowed.includes(request.rpc))throw Error('Unknown RPC');
          const args=Object.entries(request.args||{});
          const call=args.map(([key],i)=>{if(!/^p_\w+$/.test(key))throw Error('Invalid argument');return `${key} => $${i+1}`}).join(',');
          data=(await execute(user,`select ${request.rpc}(${call}) as data`,args.map(([,value])=>value))).rows[0].data;
        }else{
          const {table,operations}=request;
          if(['study_profiles','study_documents'].includes(table)){data=[];}
          else{
            if(!['study_public_rooms','study_room_events','study_verified_results'].includes(table))throw Error('Unknown table');
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
