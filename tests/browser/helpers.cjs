const mockUser = { id: '11111111-1111-4111-8111-111111111111', email: 'study@example.com', email_confirmed_at: '2026-11-05', user_metadata: { apodo: 'Estudiante', carrera: 'General', avatar: '🦁' } };
async function mockAuth(page, user = null, backend = false) {
  await page.route('**/vendor/supabase.js', route => route.fulfill({ contentType: 'text/javascript', body: `
    window.__authCalls=[];
    let user=JSON.parse(sessionStorage.getItem('__testUser') || ${JSON.stringify(JSON.stringify(user))});
    const record=(name,args)=>window.__authCalls.push({name,args});
    const result={data:[],error:null};
    function chain(){const obj={then:(a,b)=>Promise.resolve(window.__cloudFailure?{data:null,error:{message:'Test network failure'}}:result).then(a,b)};for(const key of ['select','eq','order','limit','in','gt','delete','upsert','insert'])obj[key]=(...args)=>{record(key,args);return obj};return obj;}
    function remoteChain(table){const operations=[];const obj={then:(a,b)=>fetch('/__study_test_backend',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,operations})}).then(r=>r.json()).then(a,b)};for(const key of ['select','eq','order','limit','in','gt','delete','upsert','insert'])obj[key]=(...args)=>{operations.push([key,...args]);return obj};return obj;}
    window.supabase={createClient:()=>({
      auth:{
        getSession:async()=>({data:{session:user?{user,access_token:'test-token'}:null},error:null}),
        getUser:async()=>({data:{user},error:null}),
        onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),
        signUp:async args=>{record('signUp',args);return {data:{user:null,session:null},error:null}},
        signInWithPassword:async args=>{record('signIn',args);if(args.password==='wrong')return {error:new Error('Credenciales incorrectas')};user=${JSON.stringify(mockUser)};sessionStorage.setItem('__testUser',JSON.stringify(user));return {data:{user},error:null}},
        signOut:async()=>{record('signOut',{});sessionStorage.setItem('__testUser','null');return {error:null}},
        resetPasswordForEmail:async(email,args)=>{record('resetPassword',{email,args});return {error:null}},
        updateUser:async args=>{record('updateUser',args);if(args.data){user.user_metadata={...user.user_metadata,...args.data};sessionStorage.setItem('__testUser',JSON.stringify(user))};return {data:{user},error:null}}
      },
      from:${backend ? '(table)=>remoteChain(table)' : '()=>chain()'},rpc:${backend ? "async(rpc,args)=>fetch('/__study_test_backend',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rpc,args})}).then(r=>r.json())" : 'async()=>({data:null,error:null})'},
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
  const top = { home: 'navHomeBtn', solo: 'navSoloBtn', juntos: 'navJuntosBtn', laboratorio: 'navLabBtn', fama: 'navFamaBtn' };
  const drawer = { home: 'drawerNavHome', solo: 'drawerNavSolo', juntos: 'drawerNavJuntos', laboratorio: 'drawerNavLaboratorio', fama: 'drawerNavFama' };
  if (await page.locator('#' + top[view]).isVisible()) await page.locator('#' + top[view]).click();
  else { await page.locator('#menuToggleBtn').click(); await page.locator('#' + drawer[view]).click(); }
}
module.exports = { mockAuth, mockUser, ready, closeDialogs, navigate };
