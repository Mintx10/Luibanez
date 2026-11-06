const {test,expect}=require('@playwright/test');
const {mockAuth,ready}=require('./helpers.cjs');
async function accountStep(page){
 await ready(page);await page.locator('#campusNavBtn').click();await page.locator('[data-career=sistemas]').click();await page.getByRole('button',{name:'Continuar con mis materias'}).click();await page.locator('#campusOnboarding input[type=checkbox]').first().check();await page.getByRole('button',{name:'Continuar con mi cuenta'}).click();
}
test('signup explains missing activation before asking for credentials and preserves choices',async({page})=>{
 await mockAuth(page);await page.route('**/campus-config.json',route=>route.fulfill({json:{turnstileSiteKey:'',captchaRequired:true}}));await accountStep(page);
 await expect(page.getByRole('heading',{name:'El registro todavía no está habilitado'})).toBeVisible();await expect(page.locator('#campusOnboarding')).toContainText('No se creó ninguna cuenta');await expect(page.locator('#campusSignupForm')).toHaveCount(0);
 await page.getByRole('button',{name:'← Materias',exact:true}).click();await expect(page.locator('#campusOnboarding input:checked')).toHaveCount(1);await page.getByRole('button',{name:'Continuar con mi cuenta'}).click();await page.getByRole('button',{name:'Ir al laboratorio',exact:true}).click();await expect(page.locator('#viewLaboratorio')).toHaveClass(/view--active/);expect(await page.evaluate(()=>window.__authCalls.filter(c=>c.name==='signUp').length)).toBe(0);
});
test('invalid signup fields show a focused inline explanation without sending a request',async({page})=>{
 await mockAuth(page);await accountStep(page);const form=page.locator('#campusSignupForm'),status=page.locator('#campusSignupStatus');
 await form.locator('button[type=submit]').click();await expect(status).toContainText('nombre o apodo');await expect(status).toBeFocused();
 await form.locator('[name=apodo]').fill('Alumno');await form.locator('[name=email]').fill('incorrecto');await form.locator('button[type=submit]').click();await expect(status).toContainText('correo electrónico válido');
 await form.locator('[name=email]').fill('alumno@example.com');await form.locator('[name=password]').fill('corta');await form.locator('button[type=submit]').click();await expect(status).toContainText('al menos 12 caracteres');await expect(status).toBeFocused();await expect(form.locator('button[type=submit]')).toBeEnabled();expect(await page.evaluate(()=>window.__authCalls.filter(c=>c.name==='signUp').length)).toBe(0);
});
test('server signup failure is visible beside submit, receives focus and permits retry',async({page})=>{
 await mockAuth(page);await accountStep(page);const form=page.locator('#campusSignupForm');await form.locator('[name=apodo]').fill('Alumno');await form.locator('[name=email]').fill('alumno@example.com');await form.locator('[name=password]').fill('UnaClaveSegura123!');await page.evaluate(()=>window.__signupFailure='No se pudo enviar el correo de confirmación.');await form.locator('button[type=submit]').click();
 const status=page.locator('#campusSignupStatus');await expect(status).toHaveAttribute('role','alert');await expect(status).toContainText('correo de confirmación');await expect(status).toBeFocused();await expect(form.locator('button[type=submit]')).toBeEnabled();await expect(form.locator('[name=email]')).toHaveValue('alumno@example.com');
 const visible=await status.evaluate(node=>{const box=node.getBoundingClientRect(),dialog=node.closest('dialog').getBoundingClientRect();return box.top>=dialog.top&&box.bottom<=Math.min(dialog.bottom,innerHeight);});expect(visible).toBe(true);
 await page.evaluate(()=>window.__signupFailure='');await form.locator('button[type=submit]').click();await expect(page.getByRole('heading',{name:'Revisá tu correo'})).toBeVisible();expect(await page.evaluate(()=>window.__authCalls.filter(c=>c.name==='signUp').length)).toBe(2);
});
