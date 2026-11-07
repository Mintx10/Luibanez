const mockUser = { id: '11111111-1111-4111-8111-111111111111', email: 'study@example.com', email_confirmed_at: '2026-11-05', user_metadata: { apodo: 'Estudiante', carrera: 'Licenciatura en Finanzas', avatar: '🦁' } };
async function mockAuth(page, user = null, backend = false) {
  await page.route('**/api/account',async route=>{
    const body=route.request().postDataJSON();
    const failure=await page.evaluate(body=>{window.__authCalls.push({name:body.action,args:body});return body.action==='register'?window.__signupFailure:'';},body);
    if(failure)return route.fulfill({status:503,json:{error:failure}});
    if(body.password==='wrong')return route.fulfill({status:401,json:{error:'Usuario o contraseña incorrectos.'}});
    return route.fulfill({json:body.action==='login'?{ok:true,session:{access_token:'test-token',refresh_token:'test-refresh'}}:{ok:true,username:body.username.toLowerCase()}});
  });
  await page.route('**/campus-config.json',route=>route.fulfill({json:{turnstileSiteKey:'test-public-sitekey',captchaRequired:true}}));
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',route=>route.fulfill({contentType:'text/javascript',body:"window.turnstile={render:(node,opts)=>{setTimeout(()=>opts.callback('test-captcha-token'),10);return 'test-widget'},remove:()=>{}}"}));
  await page.route('**/vendor/supabase.js', route => route.fulfill({ contentType: 'text/javascript', body: `
    window.__authCalls=[];
    let user=JSON.parse(sessionStorage.getItem('__testUser') || ${JSON.stringify(JSON.stringify(user))});
    const record=(name,args)=>window.__authCalls.push({name,args});
    const result={data:[],error:null};
    function chain(table){let profile=JSON.parse(sessionStorage.getItem('__testProfile:'+user?.id)||'null')||{id:user?.id,apodo:user?.user_metadata?.apodo,carrera:user?.user_metadata?.carrera,avatar:'🦁'};let result={data:table==='study_profiles'&&user&&!user.is_anonymous?[profile]:[],error:null};const obj={then:(a,b)=>Promise.resolve(window.__cloudFailure?{data:null,error:{message:'Test network failure'}}:result).then(a,b)};for(const key of ['select','eq','order','limit','in','gt','delete','upsert','insert'])obj[key]=(...args)=>{record(key,args);if(table==='study_profiles'&&key==='upsert'){profile={...profile,...args[0]};sessionStorage.setItem('__testProfile:'+user.id,JSON.stringify(profile));}return obj};return obj;}
    function remoteChain(table){const operations=[];const obj={then:(a,b)=>fetch('/__study_test_backend',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,operations})}).then(r=>r.json()).then(a,b)};for(const key of ['select','eq','order','limit','in','gt','delete','upsert','insert'])obj[key]=(...args)=>{operations.push([key,...args]);return obj};return obj;}
    window.supabase={createClient:()=>({
      auth:{
        getSession:async()=>({data:{session:user?{user,access_token:'test-token'}:null},error:null}),
        getUser:async()=>({data:{user},error:null}),
        setSession:async args=>{record('setSession',args);user=${JSON.stringify(mockUser)};sessionStorage.setItem('__testUser',JSON.stringify(user));return {data:{user},error:null}},
        onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),
        signInAnonymously:async args=>{record('signInAnonymously',args);user={id:'33333333-3333-4333-8333-333333333333',is_anonymous:true,user_metadata:{}};sessionStorage.setItem('__testUser',JSON.stringify(user));return {data:{user},error:null}},
        signUp:async args=>{record('signUp',args);return {data:{user:null,session:null},error:window.__signupFailure?{message:window.__signupFailure}:null}},
        signInWithPassword:async args=>{record('signIn',args);if(args.password==='wrong')return {error:new Error('Credenciales incorrectas')};user=${JSON.stringify(mockUser)};sessionStorage.setItem('__testUser',JSON.stringify(user));return {data:{user},error:null}},
        signOut:async()=>{record('signOut',{});sessionStorage.setItem('__testUser','null');return {error:null}},
        resetPasswordForEmail:async(email,args)=>{record('resetPassword',{email,args});return {error:null}},
        updateUser:async args=>{record('updateUser',args);if(args.data){user.user_metadata={...user.user_metadata,...args.data};sessionStorage.setItem('__testUser',JSON.stringify(user))};return {data:{user},error:null}}
      },
      from:${backend ? '(table)=>remoteChain(table)' : '(table)=>chain(table)'},rpc:${backend ? "async(rpc,args)=>fetch('/__study_test_backend',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rpc,args})}).then(r=>r.json())" : `async(name,args)=>{record(name,args);if(name==='study_activate_career'){const catalog=await fetch('/catalog.json').then(r=>r.json());user.user_metadata.carrera=catalog.careers.find(c=>c.id===args.p_career).value;const profile=JSON.parse(sessionStorage.getItem('__testProfile:'+user.id)||'null');if(profile){profile.carrera=user.user_metadata.carrera;sessionStorage.setItem('__testProfile:'+user.id,JSON.stringify(profile));}sessionStorage.setItem('__testUser',JSON.stringify(user));}return {data:null,error:null}}`},
      channel:()=>({on(){return this},subscribe(cb){setTimeout(()=>cb('SUBSCRIBED'),0);return this}}),removeChannel:async()=>{}
    })};` }));
}
async function ready(page, hash = '') {
  await page.goto('/' + hash);
  await page.waitForSelector('#accountToolsBtn');
  await page.waitForFunction(() => document.querySelectorAll('.view--active').length === 1);
}
async function closeDialogs(page) {
  for (let i = 0; i < 5; i++) {
    if (!await page.locator('dialog[open]').count()) break;
    await page.keyboard.press('Escape');
  }
}
async function navigate(page, view) {
  await closeDialogs(page);
  await page.evaluate(view=>window.cambiarVista(view),view);
}
module.exports = { mockAuth, mockUser, ready, closeDialogs, navigate };
