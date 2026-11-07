const {test,expect}=require('@playwright/test');
const {mockAuth,ready}=require('./helpers.cjs');
async function accountStep(page){
 await ready(page);await page.locator('#campusNavBtn').click();await page.locator('[data-career=sistemas]').click();await page.getByRole('button',{name:'Continuar con mis materias'}).click();await page.locator('#campusOnboarding input[type=checkbox]').first().check();await page.getByRole('button',{name:'Continuar con mi cuenta'}).click();
}
test('signup explains missing activation before asking for credentials and preserves choices',async({page})=>{
 await mockAuth(page);await page.route('**/campus-config.json',route=>route.fulfill({json:{turnstileSiteKey:'',captchaRequired:true}}));await accountStep(page);
 await expect(page.getByRole('heading',{name:'El registro todavía no está habilitado'})).toBeVisible();await expect(page.locator('#campusOnboarding')).toContainText('No se creó ninguna cuenta');await expect(page.locator('#campusSignupForm')).toHaveCount(0);
 await page.getByRole('button',{name:'← Materias',exact:true}).click();await expect(page.locator('#campusOnboarding input:checked')).toHaveCount(1);await page.getByRole('button',{name:'Continuar con mi cuenta'}).click();await page.getByRole('button',{name:'Ir al laboratorio',exact:true}).click();await expect(page.locator('#viewLaboratorio')).toHaveClass(/view--active/);expect(await page.evaluate(()=>window.__authCalls.filter(c=>c.name==='register').length)).toBe(0);
});
test('invalid signup fields show a focused inline explanation without sending a request',async({page})=>{
 await mockAuth(page);await accountStep(page);const form=page.locator('#campusSignupForm'),status=page.locator('#campusSignupStatus');
 await form.locator('button[type=submit]').click();await expect(status).toContainText('nombre o apodo');await expect(status).toBeFocused();
 await form.locator('[name=apodo]').fill('Alumno');await form.locator('[name=username]').fill('usuario con espacios');await form.locator('button[type=submit]').click();await expect(status).toContainText('sin espacios ni tildes');
 await form.locator('[name=username]').fill('alumno_1');await form.locator('[name=password]').fill('corta');await form.locator('button[type=submit]').click();await expect(status).toContainText('al menos 6 caracteres');await expect(status).toBeFocused();await expect(form.locator('button[type=submit]')).toBeEnabled();expect(await page.evaluate(()=>window.__authCalls.filter(c=>c.name==='register').length)).toBe(0);
 await form.locator('[name=password]').fill('UnaClaveSegura123!');await form.locator('button[type=submit]').click();await expect(status).toContainText('Guardá tu clave de recuperación');
});
test('server signup failure is visible beside submit, receives focus and permits retry',async({page})=>{
 await mockAuth(page);await accountStep(page);const form=page.locator('#campusSignupForm');await form.locator('[name=apodo]').fill('Alumno');await form.locator('[name=username]').fill('alumno_1');await form.locator('[name=password]').fill('UnaClaveSegura123!');await form.locator('[name=savedRecoveryKey]').check();await page.evaluate(()=>window.__signupFailure='El servicio de cuentas no está disponible.');await form.locator('button[type=submit]').click();
 const status=page.locator('#campusSignupStatus');await expect(status).toHaveAttribute('role','alert');await expect(status).toContainText('servicio de cuentas');await expect(status).toBeFocused();await expect(form.locator('button[type=submit]')).toBeEnabled();await expect(form.locator('[name=username]')).toHaveValue('alumno_1');
 const visible=await status.evaluate(node=>{const box=node.getBoundingClientRect(),dialog=node.closest('dialog').getBoundingClientRect();return box.top>=dialog.top&&box.bottom<=Math.min(dialog.bottom,innerHeight);});expect(visible).toBe(true);
 await page.evaluate(()=>window.__signupFailure='');await form.locator('button[type=submit]').click();await expect(page.getByRole('heading',{name:'Tu perfil está creado'})).toBeVisible();expect(await page.evaluate(()=>window.__authCalls.filter(c=>c.name==='register').length)).toBe(2);
});
test('recovery key downloads, stays out of local storage and is reused after a failed attempt',async({page})=>{
 await mockAuth(page);await accountStep(page);const form=page.locator('#campusSignupForm');await form.locator('[name=username]').fill('alumno_1');const key=await form.locator('[name=recoveryKey]').inputValue();expect(key).toMatch(/^[A-Za-z0-9_-]{32}$/);
 const downloadEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Descargar mi clave de recuperación'}).click();const download=await downloadEvent;const fs=require('node:fs');expect(fs.readFileSync(await download.path(),'utf8')).toContain(key);
 expect(await page.evaluate(secret=>JSON.stringify({...localStorage,...sessionStorage}).includes(secret),key)).toBe(false);
 await form.locator('[name=apodo]').fill('Alumno');await form.locator('[name=password]').fill('UnaClaveSegura123!');await form.locator('[name=savedRecoveryKey]').check();await page.evaluate(()=>window.__signupFailure='Intentá otra vez');await form.locator('button[type=submit]').click();await expect(page.locator('#campusSignupStatus')).toContainText('Intentá otra vez');await expect(form.locator('[name=recoveryKey]')).toHaveValue(key);
});
