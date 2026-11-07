const { test, expect } = require('@playwright/test');
const { mockAuth, mockUser, ready, closeDialogs, navigate } = require('./helpers.cjs');
test.beforeEach(async ({ page }) => {
  page.__errors = [];
  page.on('pageerror', error => page.__errors.push(error.message));
});
test.afterEach(async ({ page }) => { expect(page.__errors).toEqual([]); });

test('guest navigation, history, dialogs, keyboard and theme', async ({ page }) => {
  await mockAuth(page); await ready(page);
  await navigate(page,'laboratorio');await expect(page.locator('#viewLaboratorio')).toHaveClass(/view--active/);
  await navigate(page,'juntos');await expect(page.locator('#campusGuestJoin')).toBeVisible();
  await page.goBack();await expect(page.locator('#viewLaboratorio')).toHaveClass(/view--active/);
  await page.goForward();await expect(page.locator('#viewDuelo')).toHaveClass(/view--active/);
  await navigate(page,'solo');await expect(page.locator('#campusGate')).toBeVisible();await page.keyboard.press('Escape');
  await page.locator('#accountToolsBtn').click(); await expect(page.locator('#accountToolsDialog')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.locator('#accountToolsDialog')).not.toBeVisible();
  const theme = await page.locator('html').getAttribute('data-theme'); await page.locator('#themeToggleBtn').click(); await expect(page.locator('html')).not.toHaveAttribute('data-theme',theme);
  await page.reload(); await page.waitForSelector('#accountToolsBtn'); await expect(page.locator('html')).not.toHaveAttribute('data-theme',theme);
});
test('list and topic submit buttons persist work and safely render imported text', async ({ page }) => {
  await mockAuth(page,mockUser); await ready(page,'#bolillero'); await closeDialogs(page);
  await page.locator('#newListButton').click(); await page.locator('#listNameInput').fill('Materia de prueba'); await page.locator('#saveListButton').click();
  await expect(page.locator('#listsContainer')).toContainText(/materia de prueba/i);
  await page.locator('#addTopicButton').click(); await page.locator('#topicInput').fill('<img src=x onerror=alert(1)>'); await page.locator('#saveTopicButton').click();
  await expect(page.locator('#topicsGrid')).toContainText('<img src=x onerror=alert(1)>');
  await page.reload(); await page.waitForSelector('#accountToolsBtn'); await closeDialogs(page);
  await expect(page.locator('#topicsGrid')).toContainText('<img src=x onerror=alert(1)>');
  expect(await page.locator('#topicsGrid img').count()).toBe(0);
  const mode = page.locator('#btnBolilleroClassic'); if (await mode.isVisible()) { await mode.click(); await expect(mode).toHaveAttribute('aria-checked','true'); }
});
test('username registration, recovery without email, login, logout and career selection', async ({ page }) => {
  await mockAuth(page); await ready(page);
  // Use the same modal entry point on mobile and desktop.
  await page.evaluate(() => window.abrirModalAuth('register'));
  await page.locator('[data-career=medicina]').click();await page.getByRole('button',{name:'Continuar con mis materias'}).click();await page.locator('#campusOnboarding input[type=checkbox]').first().check();await page.getByRole('button',{name:'Continuar con mi cuenta'}).click();
  await page.locator('[name=apodo]').fill('Nuevo usuario');await page.locator('[name=username]').fill('nuevo_usuario');await page.locator('[name=password]').fill('UnaClaveSegura123!');await page.locator('[name=savedRecoveryKey]').check();await page.locator('#campusSignupForm button[type=submit]').click();
  await expect.poll(()=>page.evaluate(()=>window.__authCalls.filter(c=>c.name==='register').length)).toBe(1);
  await page.getByRole('button',{name:'Iniciar sesión',exact:true}).click();await expect(page.locator('#authLoginForm')).toBeVisible();
  await page.locator('#authLoginUserInput').fill('study_user'); await page.locator('#authForgotPinBtn').click();
  await page.locator('#campusAccountRecovery [name=recoveryKey]').fill('a'.repeat(32));await page.locator('#campusAccountRecovery [name=password]').fill('OtraClaveSegura123!');await page.locator('#campusAccountRecovery button[type=submit]').click();await expect(page.locator('#campusAccountRecovery [role=status]')).toContainText('Contraseña actualizada');await page.locator('#campusAccountRecovery').getByRole('button',{name:'Cerrar',exact:true}).click();
  await page.locator('#authLoginPin').fill('wrong'); await page.locator('#authSubmitLoginBtn').click(); await expect(page.locator('#authSubmitLoginBtn')).toBeEnabled();
  await page.locator('#authLoginPin').fill('UnaClaveSegura123!'); await Promise.all([page.waitForEvent('load'), page.locator('#authSubmitLoginBtn').click()]); await page.waitForSelector('#accountToolsBtn');
  await page.locator('#accountToolsBtn').click(); await page.locator('#accountCareer').selectOption('medicina'); await Promise.all([page.waitForEvent('load'), page.locator('#careerForm button').click()]); await page.waitForSelector('#accountToolsBtn');
  await expect(page.locator('#userHeaderName')).toHaveText('Estudiante');
  await page.goto('/#med-interna'); await page.waitForSelector('#accountToolsBtn'); await expect(page.locator('#viewSubject')).toHaveClass(/view--active/);
  await Promise.all([page.waitForEvent('load'), page.evaluate(()=>window.cerrarSesionPerfil())]); await page.waitForSelector('#accountToolsBtn');
  await expect(page.locator('#viewHome')).toHaveClass(/view--active/);
});
test('any medicine account can open all three oral study lists', async ({ page }) => {
  await mockAuth(page,{ ...mockUser, user_metadata: { apodo: 'Otra persona', carrera: 'Medicina' } }); await ready(page,'#legacy/med-interna');
  await page.locator('#medInternaToBolilleroBtn').count().then(async count => {
    if (count) await page.locator('#medInternaToBolilleroBtn').click();
    else await page.evaluate(()=>window.cargarMateriaMedicinaEnBolillero('interna'));
  });
  await expect(page.locator('#viewBolillero')).toHaveClass(/view--active/);
  await closeDialogs(page); await expect(page.locator('#topicsGrid')).not.toBeEmpty();
  for (const sub of ['farma','salud']) {
    await page.evaluate(sub=>window.cargarMateriaMedicinaEnBolillero(sub),sub); await closeDialogs(page); await expect(page.locator('#topicsGrid')).not.toBeEmpty();
  }
});
test('all finance subjects generate local exam models and respond to model buttons', async ({ page }) => {
  await mockAuth(page,{ ...mockUser, user_metadata: { apodo: 'Finanzas', carrera: 'Licenciatura en Finanzas' } }); await ready(page,'#fin-hub');
  for (const [route,id] of [['fin-filosofia','viewFinFilosofia'],['fin-sfi','viewFinSFI'],['fin-historia','viewFinHistoria'],['fin-estadistica','viewFinEstadistica'],['fin-contabilidad','viewFinContabilidad']]) {
    await page.evaluate(route=>window.cambiarVista('legacy/'+route),route); await expect(page.locator('#'+id)).toHaveClass(/view--active/);
    const buttons = page.locator('#'+id+' button:visible'); expect(await buttons.count()).toBeGreaterThan(0);
  }
});
test('legacy import is explicit and repeatable without duplicating lists', async ({ page }) => {
  await mockAuth(page,mockUser); await page.addInitScript(()=>localStorage.setItem('bolillero-estudio-v3',JSON.stringify({ listas:[{id:'legacy-one',nombre:'Mi materia anterior',temas:[]}],listaSeleccionadaId:'legacy-one' })));
  await ready(page,'#bolillero'); await closeDialogs(page); await expect(page.locator('#listsContainer')).not.toContainText('Mi materia anterior');
  await page.locator('#accountToolsBtn').click(); await page.locator('[name="legacy"][value="bolillero-estudio-v3"]').check(); await Promise.all([page.waitForEvent('load'), page.locator('#legacyImportForm button').click()]); await page.waitForSelector('#accountToolsBtn'); await closeDialogs(page);
  await expect(page.locator('#listsContainer')).toContainText('Mi materia anterior');
  await page.locator('#accountToolsBtn').click(); await page.locator('[name="legacy"][value="bolillero-estudio-v3"]').check(); await Promise.all([page.waitForEvent('load'), page.locator('#legacyImportForm button').click()]); await page.waitForSelector('#accountToolsBtn'); await closeDialogs(page);
  expect(await page.locator('#listsContainer .list-item__button').count()).toBe(1);
});
test('local laboratory calculator works with the deployed CSP', async ({ page }) => {
  await mockAuth(page); await ready(page,'#laboratorio'); await closeDialogs(page);
  const values = await page.evaluate(()=>({ ordinary:window.evaluarExpresionSegura('2+3*4'),graph:window.evaluarExpresionMatematicaSegura('2x+1',3),bad:window.evaluarExpresionSegura('window.alert(1)') }));
  expect(values.ordinary).toBe(14); expect(values.graph).toBe(7); expect(Number.isNaN(values.bad)).toBe(true);
});
test('main screens remain within the viewport on desktop and mobile',async({page})=>{
 await mockAuth(page);await ready(page);
 for(const view of ['home','juntos','laboratorio']){
  await navigate(page,view);await closeDialogs(page);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),view).toBeLessThanOrEqual(1);
 }
});
test('signup keeps photos out of authentication metadata',async({page})=>{
 await mockAuth(page);await ready(page);await page.evaluate(()=>window.abrirModalAuth('register'));
 await page.locator('[data-career=finanzas]').click();await page.getByRole('button',{name:'Continuar con mis materias'}).click();await page.locator('#campusOnboarding input[type=checkbox]').first().check();await page.getByRole('button',{name:'Continuar con mi cuenta'}).click();
 await page.locator('[name=apodo]').fill('Perfil sin foto');await page.locator('[name=username]').fill('study_user');await page.locator('[name=password]').fill('UnaClaveSegura123!');await page.locator('[name=savedRecoveryKey]').check();await page.locator('#campusSignupForm button[type=submit]').click();
 await expect.poll(()=>page.evaluate(()=>window.__authCalls.filter(c=>c.name==='register').length)).toBe(1);
 const metadata=await page.evaluate(()=>window.__authCalls.find(call=>call.name==='register').args);
 expect(metadata).not.toHaveProperty('fotoDataUrl');expect(metadata.selectedSubjects).toHaveLength(1);
});
test('student can add a private profile photo after signup and retain it after reload',async({page})=>{
 await mockAuth(page,mockUser);await ready(page);await page.getByRole('button',{name:'Editar mi perfil',exact:true}).click();
 const png=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=c.height=8;c.getContext('2d').fillRect(0,0,8,8);return c.toDataURL('image/png').split(',')[1]});
 await page.getByLabel('Foto de perfil').setInputFiles([{name:'foto.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')}]);await page.getByRole('button',{name:'Guardar perfil',exact:true}).click();await expect(page.locator('dialog[open] [role=status]')).toContainText('Perfil guardado en la nube');await page.keyboard.press('Escape');await expect(page.locator('#userHeaderAvatar img')).toHaveAttribute('src',/^data:image\/jpeg;base64,/);
 await page.reload();await page.waitForSelector('#accountToolsBtn');await expect(page.locator('#userHeaderAvatar img')).toHaveAttribute('src',/^data:image\/jpeg;base64,/);expect(await page.evaluate(()=>window.__authCalls.filter(c=>c.name==='updateUser').length)).toBe(0);
});
test('visitor laboratory prepares real local exercises without claiming or requesting AI',async({page})=>{
 let requests=0;page.on('request',r=>{if(r.url().includes('/api/gemini'))requests++;});await mockAuth(page);await ready(page,'#laboratorio');await closeDialogs(page);
 await expect(page.locator('#labTituloCaso')).not.toBeEmpty();await expect(page.locator('#labQuestionsList')).not.toBeEmpty();await expect(page.locator('#labPanelEnunciado')).not.toContainText('Cargando ejercicio');
 await page.locator('#labBtnOtroEjercicioIA').click();await expect(page.locator('#labBtnOtroEjercicioIA')).toBeEnabled();await expect(page.locator('#labBtnOtroEjercicioIA')).toContainText('local');await expect(page.locator('#appToastContainer')).not.toContainText('Gemini');expect(requests).toBe(0);
 await navigate(page,'juntos');await expect(page.locator('#campusGuestJoin')).toBeVisible();await expect(page.locator('#appToastContainer')).not.toContainText('Ingresá con tu perfil');
});
