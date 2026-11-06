const {test,expect}=require('@playwright/test');
const {mockAuth,mockUser,ready,closeDialogs}=require('./helpers.cjs');
const {careers}=require('../../catalog.json');
test.describe.configure({mode:'parallel'});
test('missing activation credentials fail clearly and leave laboratory available',async({page,isMobile})=>{
 await mockAuth(page);await page.route('**/campus-config.json',route=>route.fulfill({json:{turnstileSiteKey:'',captchaRequired:true}}));await ready(page,'#juntos');
 const nav=page.locator('.top-nav__links');await expect(nav).toBeVisible();if(isMobile){const box=await nav.boundingBox();expect(Math.round(box.y+box.height)).toBe(page.viewportSize().height);}
 await page.locator('[name=guestName]').fill('Invitado');await page.locator('[name=roomCode]').fill('ABCDE');await page.locator('#campusGuestJoinForm button[type=submit]').click();await expect(page.locator('#campusGuestJoinForm [role=status]')).toContainText('todavía no está habilitado');await expect(page.locator('#campusGuestJoinForm button[type=submit]')).toBeEnabled();expect(await page.evaluate(()=>window.__authCalls.filter(c=>c.name==='signInAnonymously').length)).toBe(0);
 await page.locator('#navLabBtn').click();await expect(page.locator('#viewLaboratorio')).toHaveClass(/view--active/);
});
for(const career of careers)test(`${career.name}: twelve complete subjects, workshops, quizzes and four games`,async({page})=>{
 test.setTimeout(240000);page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await mockAuth(page,{...mockUser,user_metadata:{...mockUser.user_metadata,carrera:career.value,selected_subjects:[career.subjects[0].id]}});await ready(page);
 await expect(page.locator('#viewCampus h1')).toContainText('Estudiante');
 for(const entry of career.subjects){
  await page.evaluate(id=>window.cambiarVista('materia/'+id),entry.id);const view=page.locator('#viewSubject');await expect(view.locator('h1')).toHaveText(entry.name);
  await expect(view.locator('.campus-unit details')).toHaveCount(0); // Units themselves are details, not nested placeholders.
  await expect(view.locator('details.campus-unit')).toHaveCount(6);await view.getByRole('button',{name:'Marcar como leída',exact:true}).first().click();
  await view.getByRole('tab',{name:'Taller',exact:true}).click();const workshop=view.locator('[data-workbench]');await expect(workshop).toBeVisible();
  const pack=await page.evaluate(async id=>(await import('/modules/campus/catalog.mjs')).loadSubject(id),entry.id);const a=pack.activity;
  if(a.type==='numeric'){await workshop.getByRole('button',{name:'Calcular y guardar resultado'}).click();await expect(workshop.locator('[role=status]')).toContainText('Resultado:');}
  else if(a.type==='canvas'){for(const input of await workshop.locator('textarea').all())await input.fill('Análisis didáctico: evidencia, supuestos y límite de la decisión.');await workshop.getByRole('button',{name:'Guardar mi borrador'}).click();await expect(workshop.locator('[role=status]')).toContainText('Borrador guardado');}
  else if(a.type==='flow'){for(const step of a.steps)await workshop.getByRole('button',{name:step,exact:true}).click();await workshop.getByRole('button',{name:'Comprobar secuencia'}).click();await expect(workshop.locator('[role=status]')).toContainText(`${a.steps.length} de ${a.steps.length}`);}
  else if(a.type==='trace'){let total=a.initial;const expected=a.operation==='stack'?[...a.values].reverse():a.values.map(n=>(total+=n));await workshop.locator('input').fill(expected.join(','));await workshop.getByRole('button',{name:'Verificar traza'}).click();await expect(workshop.locator('[role=status]')).toContainText('Traza correcta');}
  else{for(let i=0;i<6;i++)await workshop.locator('select').nth(i).selectOption(pack.units[i].id);await workshop.getByRole('button',{name:'Comprobar relaciones'}).click();await expect(workshop.locator('[role=status]')).toContainText('6 de 6');}
  await view.getByRole('tab',{name:'Casos resueltos'}).click();await expect(view.locator('article')).toHaveCount(3);await view.locator('textarea').first().fill('Comparo datos con el mecanismo, explicito límites y fundamento la respuesta.');await view.getByRole('button',{name:'Guardar mi resolución'}).first().click();await expect(view.locator('article [role=status]').first()).toContainText('Resolución guardada');
  await view.getByRole('tab',{name:'Practicar',exact:true}).click();for(const q of pack.questions)await view.locator(`input[name="${q.id}"][value="${q.correct}"]`).check();await view.getByRole('button',{name:'Corregir mis 12 respuestas'}).click();await expect(view.getByRole('heading',{name:'12 de 12 respuestas correctas'})).toBeVisible();
  for(const [game,arena] of [['Bolillero','#viewBolillero'],['Bomba','#arenaBomba'],['Impostor','#arenaImpostor'],['Memotest','#arenaMemotest']]){
   await view.getByRole('button',{name:'Practicar '+game,exact:true}).click();if(game!=='Bolillero')await page.locator({Bomba:'#closeBombaSetupModalBottomBtn',Impostor:'#closeImpostorSetupModalBottomBtn',Memotest:'#closeMemotestSetupModalBottomBtn'}[game]).click();await closeDialogs(page);await expect(page.locator(arena)).toBeVisible();
   if(game==='Bolillero')await expect(page.locator('#topicsGrid')).not.toBeEmpty();
   if(game==='Bomba')await expect(page.locator('#bombaFase1Options button')).toHaveCount(4);
   if(game==='Memotest')await expect(page.locator('#memotestGrid').locator('button, .memotest-card')).not.toHaveCount(0);
   await page.evaluate(id=>window.cambiarVista('materia/'+id),entry.id);await view.getByRole('tab',{name:'Practicar',exact:true}).click();
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),entry.id).toBeLessThanOrEqual(1);
 }
 expect(errors).toEqual([]);
});
test('onboarding retains choices, catalog filters, custom subjects and career changes preserve work',async({page})=>{
 await mockAuth(page);await ready(page);await page.locator('#campusNavBtn').click();await page.locator('[data-career=sistemas]').click();await page.getByRole('button',{name:'Continuar con mis materias'}).click();await page.locator('#campusOnboarding input[type=checkbox]').first().check();await page.getByRole('button',{name:'Continuar con mi cuenta'}).click();await page.getByRole('button',{name:'← Materias'}).click();await page.getByRole('button',{name:'← Carrera',exact:true}).click();await page.locator('[data-career=sistemas]').click();await page.getByRole('button',{name:'Continuar con mis materias'}).click();await expect(page.locator('#campusOnboarding input:checked')).toHaveCount(1);await page.keyboard.press('Escape');
 await mockAuth(page,mockUser);await ready(page);await page.getByRole('button',{name:'Elegir mis materias',exact:true}).click();await page.getByRole('searchbox',{name:'Buscar una materia'}).fill('Estadística');await expect(page.locator('#viewSubjects article')).toHaveCount(1);await page.locator('#viewSubjects input[type=checkbox]').check();await page.getByRole('button',{name:'＋ Materia personal'}).click();await page.getByLabel('Nombre de la materia').fill('Mi seminario');await page.getByLabel('Qué estás estudiando').fill('Material de mi cursada');await page.getByRole('button',{name:'Agregar a mis materias'}).click();await expect(page.locator('#viewSubject h1')).toHaveText('Mi seminario');await expect(page.locator('#viewSubject')).toContainText(/personalizada/i);
 await page.getByRole('button',{name:'← Mi campus',exact:true}).click();await page.getByRole('button',{name:'Cambiar de carrera sin perder mis datos'}).click();await page.getByLabel('Carrera activa').selectOption('sistemas');await page.getByRole('button',{name:'Cambiar carrera',exact:true}).click();await expect(page.locator('#viewCampus')).toContainText('lógica');
 await page.getByRole('button',{name:'Cambiar de carrera sin perder mis datos'}).click();await page.getByLabel('Carrera activa').selectOption('finanzas');await page.getByRole('button',{name:'Cambiar carrera',exact:true}).click();await expect(page.locator('#viewCampus')).toContainText('Mi seminario');await page.reload();await page.waitForSelector('#accountToolsBtn');await expect(page.locator('#viewCampus')).toContainText('Mi seminario');
});
