'use strict';
const {randomUUID,createHash,timingSafeEqual}=require('node:crypto');
const {HttpError}=require('./ai-validation.cjs');
const {allowedOrigins}=require('./api-security.cjs');
const catalog=require('../catalog.json');
const internalEmail=id=>`${id}@accounts.luibanez.invalid`;
const hash=value=>createHash('sha256').update(value).digest('hex');
function validate(body){
 if(typeof body==='string'){if(Buffer.byteLength(body)>16000)throw new HttpError(413,'BODY_TOO_LARGE','La solicitud es demasiado grande.');try{body=JSON.parse(body);}catch{throw new HttpError(400,'INVALID_JSON','La solicitud no es válida.');}}
 if(!body||Array.isArray(body)||typeof body!=='object'||Buffer.byteLength(JSON.stringify(body))>16000)throw new HttpError(400,'INVALID_INPUT','La solicitud no es válida.');
 const {action,password,captchaToken,recoveryKey}=body,username=typeof body.username==='string'?body.username.trim().toLowerCase():'';
 if(!['register','login','recover'].includes(action))throw new HttpError(400,'INVALID_ACTION','La operación no es válida.');
 if(!/^[a-z0-9][a-z0-9_]{2,29}$/.test(username))throw new HttpError(400,'INVALID_USERNAME','Usá un usuario de 3 a 30 letras, números o guion bajo, sin espacios ni tildes.');
 // Supabase bcrypt accepts at most 72 bytes. Never silently truncate a password.
 if(typeof password!=='string'||password.length<6||Buffer.byteLength(password)>72)throw new HttpError(400,'INVALID_PASSWORD','Usá una contraseña de al menos 6 caracteres y hasta 72 bytes.');
 if(typeof captchaToken!=='string'||!captchaToken||captchaToken.length>2048)throw new HttpError(400,'CAPTCHA_REQUIRED','Completá la verificación de seguridad.');
 if(action!=='login'&&(typeof recoveryKey!=='string'||!/^[A-Za-z0-9_-]{32}$/.test(recoveryKey)))throw new HttpError(400,'INVALID_RECOVERY_KEY','La clave de recuperación no es válida.');
 let metadata;
 if(action==='register'){
  const career=catalog.careers.find(c=>c.id===body.carrera||c.value===body.carrera);
  const apodo=typeof body.apodo==='string'?body.apodo.trim():'';
  if(!career||apodo.length<2||apodo.length>80||!Array.isArray(body.selectedSubjects)||!body.selectedSubjects.length||body.selectedSubjects.length>12||body.selectedSubjects.some(id=>!career.subjects.some(s=>s.id===id)))throw new HttpError(400,'INVALID_PROFILE','Revisá tu apodo, carrera y materias.');
  metadata={apodo,carrera:career.value,selected_subjects:[...new Set(body.selectedSubjects)],avatar:'👤',username};
 }
 return {action,password,captchaToken,recoveryKey,username,metadata};
}
async function accountAction(req,env=process.env,request=fetch){
 const input=validate(req.body);
 const {SUPABASE_URL:url,SUPABASE_SERVICE_ROLE_KEY:key,TURNSTILE_SECRET_KEY:secret,RATE_LIMIT_SALT:salt}=env;
 if(!url||!key||!secret||!salt||salt.length<32)throw new HttpError(503,'ACCOUNT_NOT_CONFIGURED','El acceso sin correo todavía no está habilitado. Falta terminar la configuración de seguridad del sitio.');
 const deadline=AbortSignal.timeout(25000);
 async function call(path,body,method='POST'){
  let resp;try{resp=await request(url+path,{method,headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},...(body!==undefined?{body:JSON.stringify(body)}:{}),signal:deadline});}catch{throw new HttpError(503,'ACCOUNT_UNAVAILABLE','No se pudo completar la operación. Reintentá con el mismo usuario y clave de recuperación.');}
  let data;try{data=await resp.json();}catch{data=null;}
  return {ok:resp.ok,status:resp.status,data};
 }
 const ip=String(req.headers['x-vercel-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
 const quota=await call('/rest/v1/rpc/study_account_quota',{p_ip_hash:hash(salt+':'+ip),p_name_hash:hash(salt+':'+input.username),p_action:input.action});
 if(!quota.ok||typeof quota.data?.allowed!=='boolean')throw new HttpError(503,'QUOTA_UNAVAILABLE','No se pudo comprobar el límite de acceso. Reintentá.');
 if(!quota.data.allowed){const error=new HttpError(429,'RATE_LIMIT_EXCEEDED','Demasiados intentos. Esperá unos minutos.');error.retryAfter=Math.max(1,Math.min(86400,quota.data.retry_after||600));throw error;}
 let captcha;
 try{const resp=await request('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret,response:input.captchaToken,remoteip:ip}),signal:deadline});captcha=resp.ok?await resp.json():null;}catch{throw new HttpError(503,'CAPTCHA_UNAVAILABLE','La verificación de seguridad no respondió. Reintentá.');}
 const hostnames=new Set([...allowedOrigins(env)].map(origin=>new URL(origin).hostname));
 if(!captcha?.success||!hostnames.has(captcha.hostname))throw new HttpError(400,'CAPTCHA_FAILED','La verificación de seguridad venció o no es válida. Reintentá.');
 const found=await call('/rest/v1/rpc/study_account_lookup',{p_username:input.username});
 if(!found.ok)throw new HttpError(503,'ACCOUNT_UNAVAILABLE','El acceso a las cuentas no está disponible. Reintentá.');
 const existing=found.data;
 const recoveryMatches=existing?.recovery_hash&&input.recoveryKey&&/^[0-9a-f]{64}$/.test(existing.recovery_hash)&&timingSafeEqual(Buffer.from(existing.recovery_hash,'hex'),Buffer.from(hash(input.recoveryKey),'hex'));
 if(input.action==='register'){
  // Idempotent retry after a lost response: the saved recovery key proves ownership.
  if(existing){if(recoveryMatches)return {ok:true,username:input.username};throw new HttpError(409,'USERNAME_TAKEN','Ese usuario ya está en uso. Elegí otro.');}
  const id=randomUUID();
  const created=await call('/auth/v1/admin/users',{id,email:internalEmail(id),password:input.password,email_confirm:true,user_metadata:input.metadata,app_metadata:{study_auth:'username'}});
  if(!created.ok||created.data?.id!==id)throw new HttpError(503,'ACCOUNT_CREATE_FAILED','No se pudo crear la cuenta. Reintentá con las mismas credenciales.');
  const saved=await call('/rest/v1/rpc/study_account_register',{p_username:input.username,p_user_id:id,p_recovery_hash:hash(input.recoveryKey)});
  if(!saved.ok){
   // Delete only this request's new, sessionless account; never an existing student.
   await call('/auth/v1/admin/users/'+id,undefined,'DELETE');
   throw new HttpError(saved.data?.code==='23505'?409:503,'ACCOUNT_CREATE_FAILED',saved.data?.code==='23505'?'Ese usuario ya está en uso. Elegí otro.':'No se pudo guardar la cuenta. Reintentá con las mismas credenciales.');
  }
  return {ok:true,username:input.username};
 }
 if(input.action==='recover'){
  if(!recoveryMatches)throw new HttpError(401,'INVALID_CREDENTIALS','El usuario o la clave de recuperación no son correctos.');
  const updated=await call('/auth/v1/admin/users/'+existing.user_id,{password:input.password},'PUT');
  if(!updated.ok)throw new HttpError(503,'ACCOUNT_RECOVERY_FAILED','No se pudo cambiar la contraseña. Conservá tu clave y reintentá.');
  return {ok:true};
 }
 // Admin authorization exempts Supabase's second CAPTCHA check. The token was
 // already verified above, once. The password is still checked by Supabase Auth.
 const login=await call('/auth/v1/token?grant_type=password',{email:internalEmail(existing?.user_id||randomUUID()),password:input.password});
 if(!existing||!login.ok||login.data?.user?.id!==existing.user_id||!login.data?.access_token||!login.data?.refresh_token)throw new HttpError(401,'INVALID_CREDENTIALS','El usuario o la contraseña no son correctos.');
 return {ok:true,session:{access_token:login.data.access_token,refresh_token:login.data.refresh_token}};
}
module.exports={accountAction,validate};
