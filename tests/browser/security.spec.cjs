const {test,expect}=require('@playwright/test');
const {mockAuth,mockUser,ready,closeDialogs}=require('./helpers.cjs');
test('CSP blocks injected inline scripts and event handlers while static Finance controls work',async({page})=>{
 await mockAuth(page,{...mockUser,user_metadata:{apodo:'Seguridad',carrera:'Licenciatura en Finanzas'}});
 await ready(page,'#legacy/fin-estadistica');await closeDialogs(page);
 const result=await page.evaluate(async()=>{
  window.__injected=0;
  const script=document.createElement('script');script.textContent='window.__injected=1';document.body.append(script);
  const button=document.createElement('button');button.setAttribute('onclick','window.__injected=2');document.body.append(button);button.click();
  const {setHTML}=await import('/modules/safe-html.mjs');const content=document.createElement('div');
  setHTML(content,'<button data-page-action="page-0" onclick="alert(1)">Ataque</button>');
  const safe=!content.querySelector('[onclick],[data-page-action]');script.remove();button.remove();
  return {executed:window.__injected,safe};
 });
 expect(result).toEqual({executed:0,safe:true});
 const view=page.locator('#viewFinEstadistica');
 await view.getByRole('button',{name:'🏆 Final Integral',exact:true}).click();
 await expect(view.locator('[data-modo="final"]')).toHaveClass(/is-active/);
 await view.getByRole('button',{name:'📝 Generar Modelo de Examen Real',exact:true}).click();
 await expect(page.locator('#finExamSheet_estadistica .fin-sheet-placeholder')).toHaveCount(0);
 await expect(page.locator('#finExamSheet_estadistica')).not.toBeEmpty();
 await view.getByRole('button',{name:'← Volver a FinHub',exact:true}).click();
 await expect(page.locator('#viewCampus')).toHaveClass(/view--active/);
});
