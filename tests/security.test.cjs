const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {parse}=require('parse5');
const {allowedOrigins}=require('../lib/api-security.cjs');
const {authorize}=require('../lib/api-access.cjs');
const env={SUPABASE_URL:'https://example.supabase.co',SUPABASE_ANON_KEY:'public',SUPABASE_SERVICE_ROLE_KEY:'server',RATE_LIMIT_SALT:'s'.repeat(64)};
const req={headers:{authorization:'Bearer aaa.bbb.ccc'}};
test('browser source contains no known private credential patterns',()=>{
 const files=['index.html','script.js','sw.js','catalog.json','campus-config.json',...fs.readdirSync('modules',{recursive:true}).filter(name=>name.endsWith('.mjs')).map(name=>'modules/'+name)];
 const patterns=[/AIza[0-9A-Za-z_-]{30,}/,/(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}/,/sb_secret_[A-Za-z0-9_-]{15,}/,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/];
 for(const file of files){const text=fs.readFileSync(file,'utf8');for(const pattern of patterns)assert.ok(!pattern.test(text),file);}
});
test('anonymous identities never consume server AI quota even with forged email fields',async()=>{
 let calls=0;await assert.rejects(()=>authorize(req,env,async()=>{calls++;return Response.json({id:'guest',is_anonymous:true,email_confirmed_at:'2026-11-06'});}),e=>e.code==='EMAIL_NOT_VERIFIED');assert.equal(calls,1);
});
test('page contains no executable inline scripts or event attributes and CSP blocks them',()=>{
 const html=parse(fs.readFileSync('index.html','utf8'));let bindings=0;
 function visit(n){
  const attrs=Object.fromEntries((n.attrs||[]).map(a=>[a.name,a.value]));
  for(const name of Object.keys(attrs))assert.ok(!/^on/i.test(name),name);
  if(n.tagName==='script')assert.ok(attrs.src,'Inline script found');
  if(attrs['data-page-action'])bindings++;
  for(const child of n.childNodes||[])visit(child);
 }visit(html);assert.equal(bindings,61);
 const csp=JSON.parse(fs.readFileSync('vercel.json')).headers[0].headers.find(h=>h.key==='Content-Security-Policy').value;
 assert.ok(!/script-src[^;]*'unsafe-inline'/.test(csp));assert.match(csp,/script-src-attr 'none'/);
 assert.ok(!/script-src[^;]*'unsafe-eval'/.test(csp));assert.match(csp,/img-src 'self' data: blob:;/);
});
test('production origins exclude local and malformed or wildcard origins',()=>{
 const set=allowedOrigins({VERCEL_ENV:'production',ALLOWED_ORIGINS:'http://localhost:5500,https://*.vercel.app,https://allowed.example,https://allowed.example/path,https://u:p@example.com'});
 assert.equal(set.has('http://localhost:5500'),false);
 assert.equal(set.has('https://*.vercel.app'),false);
 assert.equal(set.has('https://allowed.example/path'),false);
 assert.equal(set.has('https://u:p@example.com'),false);
 assert.equal(set.has('https://allowed.example'),true);
 assert.equal(allowedOrigins({}).has('http://localhost:5500'),true);
  const staged=allowedOrigins({VERCEL_ENV:'production',VERCEL_URL:'luibanez-staged-salmar10.vercel.app',VERCEL_BRANCH_URL:'other-preview.vercel.app'});
  assert.equal(staged.has('https://luibanez-staged-salmar10.vercel.app'),true);assert.equal(staged.has('https://other-preview.vercel.app'),false);
});
test('authentication rejects malformed and oversized tokens before contacting Supabase',async()=>{
 let calls=0;const request=async()=>{calls++;throw Error('Must not call')};
 for(const token of ['abc','a.b','a.b.c.d','a'.repeat(9000)+'.b.c'])await assert.rejects(authorize({headers:{authorization:'Bearer '+token}},env,request),{code:'AUTH_REQUIRED'});
 assert.equal(calls,0);
 await assert.rejects(authorize(req,{...env,RATE_LIMIT_SALT:''},request),{code:'AUTH_NOT_CONFIGURED'});
});
test('malformed identity and quota responses fail closed without revealing provider details',async()=>{
 await assert.rejects(authorize(req,env,async()=>new Response('not json')),{code:'AUTH_UNAVAILABLE'});
 let calls=0;
 await assert.rejects(authorize(req,env,async()=>++calls===1?Response.json({id:'u',email_confirmed_at:'today'}):Response.json({anything:true})),{code:'QUOTA_UNAVAILABLE'});
});
test('daily quota denial preserves the server retry time',async()=>{
 let calls=0;
 await assert.rejects(authorize(req,env,async()=>++calls===1?Response.json({id:'u',email_confirmed_at:'today'}):Response.json({allowed:false,reason:'daily',retry_after:3600})),e=>e.code==='RATE_LIMIT_EXCEEDED'&&e.retryAfter===3600&&e.message.includes('diario'));
});
test('cloud download paginates past tombstones instead of hiding active documents',async()=>{
 const {fetchCloudDocuments}=await import('../modules/cloud.mjs');
 const all=Array.from({length:201},(_,i)=>({id:String(i).padStart(4,'0'),deleted_at:i<200?'today':null}));
 const cursors=[];
 const db={from(){let cursor='';const q={select(){return q},eq(){return q},order(){return q},limit(){return q},gt(key,value){assert.equal(key,'id');cursor=value;cursors.push(value);return q},then(resolve,reject){return Promise.resolve({data:all.filter(row=>row.id>cursor).slice(0,200),error:null}).then(resolve,reject)}};return q}};
 const result=await fetchCloudDocuments(db,'u');assert.equal(result.length,201);assert.equal(result.at(-1).deleted_at,null);assert.deepEqual(cursors,['0199']);
});
