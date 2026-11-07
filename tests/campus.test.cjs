const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const {PGlite}=require('@electric-sql/pglite');
test('all 72 subjects contain six units, twelve valid questions, three solved cases and a usable workshop',async()=>{
 const {careers,subjects,loadSubject}=await import('../modules/campus/catalog.mjs');const {evaluateExpression}=await import('../modules/math.mjs');
 assert.equal(careers.length,6);assert.equal(subjects.length,72);assert.equal(new Set(subjects.map(s=>s.id)).size,72);
 for(const career of careers)assert.equal(career.subjects.length,12);
 for(const entry of subjects){const subject=await loadSubject(entry.id);assert.equal(subject.units.length,6,entry.id);assert.equal(subject.questions.length,12);assert.equal(subject.cases.length,3);
  for(const unit of subject.units){assert.ok(unit.objective&&unit.explanation&&unit.application);assert.ok(unit.references.every(r=>new URL(r.url).protocol==='https:'));}
  for(const q of subject.questions){assert.equal(new Set(q.options).size,4,entry.id);assert.ok(q.correct>=0&&q.correct<4&&q.explanation);}
  for(const c of subject.cases)assert.ok(c.solution&&c.prompt&&c.criteria.length>=2,entry.id);
  const a=subject.activity;assert.ok(['numeric','flow','canvas','trace','clinical','evidence','map'].includes(a.type),a.type);
  if(a.type==='numeric'){const expression=a.expression.replace(/\b[abc]\b/g,k=>`(${a.fields.find(f=>f.id===k).value})`);assert.ok(Number.isFinite(evaluateExpression(expression)),entry.id+': '+expression);}
 }
});
test('campus migration enforces ownership, guest restrictions, independent careers and temporary cleanup',async t=>{
 const db=new PGlite();t.after(()=>db.close());const alice='11111111-1111-4111-8111-111111111111',bob='22222222-2222-4222-8222-222222222222',guest='33333333-3333-4333-8333-333333333333';
 await db.exec(`create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key,is_anonymous boolean default false,email_confirmed_at timestamptz default now(),created_at timestamptz default now(),raw_app_meta_data jsonb default '{}',raw_user_meta_data jsonb default '{}');create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to authenticated;create schema extensions;create function extensions.gen_salt(text,integer) returns text language sql as $$select 'test'::text$$;create function extensions.crypt(text,text) returns text language sql as $$select 'test:'||$1$$;insert into auth.users(id) values('${alice}'),('${bob}'),('${guest}');update auth.users set is_anonymous=true,email_confirmed_at=null where id='${guest}';`);
 for(const name of fs.readdirSync('supabase/migrations').filter(name=>!name.endsWith('_campus_cleanup_schedule.sql')).sort())await db.exec(fs.readFileSync('supabase/migrations/'+name,'utf8').replace('create extension if not exists pgcrypto with schema extensions;',''));
 async function as(user,sql){await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[user]);await db.exec('set role authenticated');return db.exec(sql);}
 await as(alice,`select study_activate_career('sistemas');select study_save_track('sistemas',array['sistemas-programacion-i']);select study_record_subject_progress('sistemas','sistemas-programacion-i','quiz',50,'{}',now());select study_activate_career('medicina');select study_save_track('medicina',array['medicina-anatomia']);`);
 assert.equal((await as(alice,'select * from study_student_tracks'))[0].rows.length,2);
 assert.equal((await as(bob,'select * from study_student_tracks'))[0].rows.length,0);
 await assert.rejects(()=>as(bob,`select study_save_track('medicina',array['sistemas-programacion-i'])`));
 await as(alice,`select study_save_custom_subject('custom-44444444-4444-4444-8444-444444444444','medicina','Personal','Mis apuntes')`);
 await assert.rejects(()=>as(bob,`select study_save_track('medicina',array['custom-44444444-4444-4444-8444-444444444444'])`));
 for(const sql of [`select study_activate_career('sistemas')`,`insert into study_profiles(id,apodo) values('${guest}','Invitado')`,`select study_sync_documents('[]')`,`select study_save_track('sistemas',array[]::text[])`,`select study_record_subject_progress('sistemas','sistemas-programacion-i','quiz',100,'{}',now())`])await assert.rejects(()=>as(guest,sql),sql);
 await as(alice,`select study_create_room('ABCDE','Sala','secreto',true,'{"juego":"bolillero","formatoModo":"versus"}')`);
 await assert.rejects(()=>as(guest,`select study_create_room('FGHJK','No','',true,'{"juego":"bolillero","formatoModo":"versus"}')`));
 assert.match(JSON.stringify(await as(guest,`select study_join_guest_room('ABCDE','incorrecta','Visitante')`)),/incorrecta/);
 assert.match(JSON.stringify(await as(guest,`select study_join_guest_room('ABCDE','secreto','Visitante')`)),/true/);
 await assert.rejects(()=>as(guest,`select study_send_room_event('ABCDE','{"tipo":"INICIAR_PARTIDA"}')`));
 assert.equal((await as(guest,`select * from study_profiles`))[0].rows.length,0);
 await db.exec('reset role');await db.exec(`insert into study_verified_results(user_id,game,points) values('${guest}','bolillero',100);update auth.users set created_at=now()-interval '2 days' where id='${guest}';`);
 assert.equal((await db.query('select * from study_verified_results')).rows.length,0);
 assert.equal((await db.query('select study_cleanup_guests() n')).rows[0].n,0);
 await as(guest,`select study_leave_room('ABCDE')`);await db.exec('reset role');assert.equal((await db.query('select study_cleanup_guests() n')).rows[0].n,1);
 // Username registry: pending Auth users cannot acquire student privileges,
 // and neither guest nor signed-in browsers can read recovery hashes or map IDs.
 const pending='55555555-5555-4555-8555-555555555555';
 await db.query(`insert into auth.users(id,raw_app_meta_data) values($1,'{"study_auth":"username"}')`,[pending]);
 await assert.rejects(()=>as(pending,`select study_activate_career('sistemas')`));
 await assert.rejects(()=>as(alice,`select study_account_lookup('new_student')`));
 await assert.rejects(()=>as(alice,`select * from private.study_username_accounts`));
 await assert.rejects(()=>as(alice,`select study_account_register('new_student','${pending}','${'a'.repeat(64)}')`));
 await db.exec('reset role');await db.exec('set role service_role');
 await db.query('select study_account_register($1,$2,$3)',['new_student',pending,'a'.repeat(64)]);
 assert.equal((await db.query('select study_account_lookup($1) account',['new_student'])).rows[0].account.user_id,pending);
 const ip='b'.repeat(64),name='c'.repeat(64);
 for(let i=0;i<5;i++)assert.equal((await db.query('select study_account_quota($1,$2,$3) q',[ip,name,'register'])).rows[0].q.allowed,true);
 assert.equal((await db.query('select study_account_quota($1,$2,$3) q',[ip,name,'register'])).rows[0].q.allowed,false);
 await assert.rejects(()=>db.query('select study_account_register($1,$2,$3)',['other_user',pending,'a'.repeat(64)]));
 await as(pending,`select study_activate_career('sistemas')`);
 assert.equal((await as(bob,`select * from study_student_tracks where user_id='${pending}'`))[0].rows.length,0);
});
