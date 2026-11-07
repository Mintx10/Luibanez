const {test}=require('node:test');
const assert=require('node:assert/strict');
const {createHash}=require('node:crypto');
const {accountAction,validate}=require('../lib/accounts.cjs');
const env={SUPABASE_URL:'https://project.supabase.co',SUPABASE_SERVICE_ROLE_KEY:'server-secret',TURNSTILE_SECRET_KEY:'captcha-secret',RATE_LIMIT_SALT:'s'.repeat(64)};
const key='a'.repeat(32),hash=value=>createHash('sha256').update(value).digest('hex');
const registration={action:'register',username:'Alumno_1',password:'UnaClaveSegura123!',recoveryKey:key,apodo:'Alumno',carrera:'sistemas',selectedSubjects:['sistemas-programacion-i'],captchaToken:'captcha'};
const req=body=>({headers:{origin:'https://luibanez.vercel.app'},socket:{remoteAddress:'127.0.0.1'},body});
function backend(overrides={}){
 const calls=[];let id;
 const request=async(url,options)=>{
  const body=options.body?JSON.parse(options.body):null;calls.push({url,options,body});
  for(const [path,handler] of Object.entries(overrides))if(url.includes(path))return handler(body,options,calls);
  if(url.includes('study_account_quota'))return Response.json({allowed:true});
  if(url.includes('siteverify'))return Response.json({success:true,hostname:'luibanez.vercel.app'});
  if(url.includes('study_account_lookup'))return Response.json(null);
  if(url.endsWith('/auth/v1/admin/users')){id=body.id;return Response.json({id});}
  if(url.includes('study_account_register'))return new Response(null,{status:204});
  throw Error('Unexpected request '+url);
 };
 return {request,calls};
}
test('username registration validates profile, strong passwords and recovery secret without any email input',()=>{
 assert.equal(validate(registration).username,'alumno_1');
 for(const patch of [{username:'a@b.com'},{username:'../admin'},{password:'corta'},{password:'á'.repeat(40)},{recoveryKey:'short'},{selectedSubjects:['medicina-anatomia']},{selectedSubjects:[]},{apodo:'x'},{captchaToken:''}])assert.throws(()=>validate({...registration,...patch}));
 assert.throws(()=>validate('x'.repeat(16001)),{code:'BODY_TOO_LARGE'});
});
test('signup creates an independent Auth identity, stores only recovery hash and returns no private credential',async()=>{
 const {request,calls}=backend();const result=await accountAction(req(registration),env,request);
 assert.deepEqual(result,{ok:true,username:'alumno_1'});
 const created=calls.find(c=>c.url.endsWith('/auth/v1/admin/users')).body;
 assert.match(created.email,/^[0-9a-f-]+@accounts\.luibanez\.invalid$/);assert.equal(created.email_confirm,true);assert.equal(created.password,registration.password);assert.deepEqual(created.app_metadata,{study_auth:'username'});
 assert.equal(calls.find(c=>c.url.includes('study_account_register')).body.p_recovery_hash,hash(key));
 assert.ok(!JSON.stringify(result).includes(key));assert.ok(!JSON.stringify(created.user_metadata).includes(key));
 assert.equal(calls.filter(c=>c.url.includes('siteverify')).length,1);
});
test('missing config, persistent quotas and CAPTCHA failure prevent account creation',async()=>{
 await assert.rejects(()=>accountAction(req(registration),{...env,TURNSTILE_SECRET_KEY:''},()=>{throw Error('no network')}),{code:'ACCOUNT_NOT_CONFIGURED'});
 for(const [path,data,code] of [['study_account_quota',{allowed:false,retry_after:42},'RATE_LIMIT_EXCEEDED'],['siteverify',{success:false},'CAPTCHA_FAILED'],['siteverify',{success:true,hostname:'attacker.example'},'CAPTCHA_FAILED']]){
  const {request,calls}=backend({[path]:()=>Response.json(data)});await assert.rejects(()=>accountAction(req(registration),env,request),{code});assert.ok(!calls.some(c=>c.url.includes('/admin/users')));
 }
});
test('retry of committed signup is idempotent only with matching recovery proof; a collision cleans up only the new account',async()=>{
 const existing={user_id:'11111111-1111-4111-8111-111111111111',recovery_hash:hash(key)};
 let stub=backend({study_account_lookup:()=>Response.json(existing)});
 assert.deepEqual(await accountAction(req(registration),env,stub.request),{ok:true,username:'alumno_1'});assert.ok(!stub.calls.some(c=>c.url.includes('/admin/users')));
 await assert.rejects(()=>accountAction(req({...registration,recoveryKey:'b'.repeat(32)}),env,stub.request),{code:'USERNAME_TAKEN'});
 stub=backend({study_account_register:()=>Response.json({code:'23505'},{status:409}),'/auth/v1/admin/users/':()=>Response.json({})});
 await assert.rejects(()=>accountAction(req(registration),env,stub.request),{status:409});
 const removed=stub.calls.find(c=>c.options.method==='DELETE'),created=stub.calls.find(c=>c.url.endsWith('/admin/users')).body;assert.ok(removed.url.endsWith('/'+created.id));
});
test('login delegates password verification to Auth and returns only real session tokens',async()=>{
 const id='11111111-1111-4111-8111-111111111111';
 const {request,calls}=backend({study_account_lookup:()=>Response.json({user_id:id,recovery_hash:hash(key)}),'/token?':(body,options)=>{assert.equal(body.email,id+'@accounts.luibanez.invalid');assert.equal(options.headers.Authorization,'Bearer server-secret');return Response.json({user:{id},access_token:'access',refresh_token:'refresh',unneeded:'secret'});}});
 assert.deepEqual(await accountAction(req({...registration,action:'login'}),env,request),{ok:true,session:{access_token:'access',refresh_token:'refresh'}});
 assert.equal(calls.filter(c=>c.url.includes('siteverify')).length,1);
 const unknown=backend({'/token?':()=>Response.json({error:'provider error'},{status:400})});await assert.rejects(()=>accountAction(req({...registration,action:'login'}),env,unknown.request),{code:'INVALID_CREDENTIALS'});
});
test('recovery requires the high entropy secret, leaves it usable on provider failure, and never sends mail',async()=>{
 const id='11111111-1111-4111-8111-111111111111';
 const overrides={study_account_lookup:()=>Response.json({user_id:id,recovery_hash:hash(key)}),'/auth/v1/admin/users/':()=>Response.json({id})};
 let stub=backend(overrides);assert.deepEqual(await accountAction(req({...registration,action:'recover'}),env,stub.request),{ok:true});
 assert.deepEqual(stub.calls.find(c=>c.options.method==='PUT').body,{password:registration.password});assert.ok(!stub.calls.some(c=>/recover$|signup$/.test(c.url)));
 stub=backend({...overrides,'/auth/v1/admin/users/':()=>Response.json({error:'detail'},{status:500})});await assert.rejects(()=>accountAction(req({...registration,action:'recover'}),env,stub.request),{code:'ACCOUNT_RECOVERY_FAILED'});
 stub=backend(overrides);await assert.rejects(()=>accountAction(req({...registration,action:'recover',recoveryKey:'b'.repeat(32)}),env,stub.request),{code:'INVALID_CREDENTIALS'});assert.ok(!stub.calls.some(c=>c.options.method==='PUT'));
});
test('account endpoint rejects cross-origin, non-json and oversized requests without network calls',async()=>{
 const handler=require('../api/account.js');
 for(const [request,status] of [[{method:'POST',headers:{origin:'https://evil.example'}},403],[{method:'POST',headers:{'content-type':'text/plain'}},415],[{method:'POST',headers:{'content-type':'application/json','content-length':20000}},413]]){
  const res={setHeader(){},status(code){this.code=code;return this},json(body){this.body=body;return this}};await handler(request,res);assert.equal(res.code,status);
 }
});
