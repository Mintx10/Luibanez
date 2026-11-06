import {getCareer,loadSubject,contentUrls} from './catalog.mjs';
import {ownSubject,recordProgress,subjectProgress,localDocuments,linkMaterial,campusState,syncMessage} from './store.mjs';
import {el,button,field} from './dom.mjs';
import {workbench} from './workbench.mjs';
export async function renderSubject(id,root,isCurrent){
 let subject=ownSubject(id);if(!subject)throw new Error('Esta materia no está disponible en tu perfil.');
 if(!subject.custom)subject=await loadSubject(id);if(!isCurrent())return;
 const career=getCareer(subject.careerId);root.style.setProperty('--career-accent',career.color);
 root.replaceChildren(el('header',{class:'campus-subject-hero'},button('← Mi campus',()=>window.cambiarVista('campus'),true),el('span',{class:'campus-eyebrow'},`${career.name} · ${subject.custom?'PERSONALIZADA':'BASE UNIVERSITARIA'}`),el('h1',{},subject.name),el('p',{},subject.intro),el('p',{class:'campus-muted'},subject.custom?'El contenido de esta materia procede de tus propios apuntes.':'Contenido educativo introductorio, orientado a Argentina. No es un programa oficial ni sustituye formación o asesoramiento profesional.')));
 const tabs=el('div',{class:'campus-tabs',role:'tablist','aria-label':'Espacios de la materia'}),panel=el('section',{class:'campus-panel',role:'tabpanel',tabindex:0});
 const pages=subject.custom?[['material','Mis apuntes',()=>materials(subject,panel)]]:[['programa','Programa',()=>program(subject,panel)],['practica','Practicar',()=>practice(subject,panel)],['casos','Casos resueltos',()=>cases(subject,panel)],['taller','Taller',()=>panel.replaceChildren(workbench(subject))],['material','Mis apuntes',()=>materials(subject,panel)]];
 let selected=0;
 const buttons=pages.map(([key,label,render],index)=>{const b=button(label,()=>activate(index),true,{role:'tab',id:`tab-${id}-${key}`,'aria-controls':`panel-${id}`});b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?pages.length-1:(selected+(e.key==='ArrowRight'?1:-1)+pages.length)%pages.length;activate(next);buttons[next].focus();}});return b;});
 const activate=index=>{selected=index;buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});panel.id=`panel-${id}`;panel.setAttribute('aria-labelledby',buttons[index].id);Promise.resolve(pages[index][2]()).catch(error=>panel.replaceChildren(el('p',{role:'alert'},error.message),button('Reintentar',()=>activate(index))));};
 tabs.append(...buttons);root.append(tabs,panel,el('p',{role:'status',class:'campus-status','data-campus-sync':true},syncMessage()));activate(0);
}
function references(list){return el('ul',{class:'campus-references'},...list.map(ref=>el('li',{},el('a',{href:ref.url,target:'_blank',rel:'noopener noreferrer'},ref.title))));}
function program(subject,panel){
 panel.replaceChildren(el('h2',{},'Seis unidades para construir criterio'));
 const offlineStatus=el('p',{role:'status',class:'campus-muted'});
 panel.append(button('Preparar contenido para estudiar offline',async()=>{
  try{if(!navigator.serviceWorker)throw new Error('Este navegador no permite preparar la aplicación offline.');await Promise.race([navigator.serviceWorker.ready,new Promise((_,reject)=>setTimeout(()=>reject(new Error('La instalación offline no respondió. Revisá la conexión y reintentá.')),10000))]);if(!navigator.serviceWorker.controller)throw new Error('La aplicación se instaló. Recargá y volvé a preparar esta materia.');const response=await fetch(contentUrls[subject.careerId],{cache:'reload'});if(!response.ok)throw new Error('No se pudo descargar el contenido.');const names=(await caches.keys()).filter(key=>key.startsWith('luibanez-cache-'));const found=await Promise.all(names.map(async key=>(await caches.open(key)).match(contentUrls[subject.careerId])));if(!found.some(Boolean))throw new Error('No se confirmó el guardado offline. Reintentá con la aplicación actualizada.');offlineStatus.textContent='Contenido de esta carrera disponible offline en este navegador. Los apuntes privados siguen en el almacenamiento de tu perfil.';}catch(error){offlineStatus.textContent=error.message;}
 },true),offlineStatus);
 subject.units.forEach((unit,index)=>{const done=subjectProgress(subject.id).some(p=>p.activity_id===unit.id),detail=el('details',{class:'campus-unit',open:index===0},el('summary',{},`${index+1}. ${unit.title}`),el('p',{},el('strong',{},'Objetivo: '),unit.objective),el('h3',{},unit.concept),el('p',{},unit.explanation),el('p',{},el('strong',{},'Aplicación: '),unit.application),references(unit.references));
  detail.append(button(done?'Lectura registrada':'Marcar como leída',async e=>{const b=e.currentTarget;await recordProgress(subject.id,unit.id,null,{read:true});b.textContent='Lectura registrada';},true));panel.append(detail);
 });
 if(subject.legacyRoute)panel.append(el('aside',{class:'campus-unit'},el('h3',{},'Material anterior conservado'),el('p',{},subject.careerId==='finanzas'?'Incluye apuntes y referencias particulares de UADE, identificados en el módulo original. Se conserva separado de esta base general.':'Conservamos el módulo médico anterior con sus herramientas y actividades.'),button('Abrir módulo original',()=>window.cambiarVista('legacy/'+subject.legacyRoute),true)));
 panel.append(el('p',{class:'campus-muted'},'Las preguntas y casos sirven para practicar estos fundamentos; no acreditan dominio completo de la disciplina.'));
}
function practice(subject,panel){
 const games=el('div',{class:'campus-grid'});for(const [key,name,description] of [['bolillero','Bolillero','Recuperá y explicá una unidad al azar.'],['bomba','Bomba','Elegí entre respuestas vinculadas al contenido.'],['impostor','Impostor','Encontrá el enunciado que mezcla conceptos.'],['memotest','Memotest','Relacioná conceptos con sus explicaciones.']])games.append(el('article',{class:'campus-unit'},el('h3',{},name),el('p',{},description),button('Practicar '+name,()=>window.iniciarPracticaMateria(subject,key))));
 const form=el('form',{class:'campus-stack'}),feedback=el('div',{role:'status'}),inputs=[];
 for(const [index,q] of subject.questions.entries()){
  const group=el('fieldset',{class:'campus-unit'},el('legend',{},`${index+1}. ${q.question}`));
  q.options.forEach((option,j)=>{const input=el('input',{type:'radio',name:q.id,value:j,required:true});inputs.push({input,q,index:j});group.append(el('label',{class:'campus-subject-option'},input,option));});form.append(group);
 }
 form.append(el('button',{class:'campus-button',type:'submit'},'Corregir mis 12 respuestas'),feedback);
 form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const selected=inputs.filter(x=>x.input.checked),hits=selected.filter(x=>x.index===x.q.correct).length;feedback.replaceChildren(el('h3',{},`${hits} de 12 respuestas correctas`),...selected.map((x,i)=>el('p',{},`${i+1}. ${x.index===x.q.correct?'✓':'Revisar'} ${x.q.explanation}`)));await recordProgress(subject.id,'quiz',hits/12*100,{answers:selected.map(x=>x.index)});feedback.scrollIntoView({block:'nearest'});});
 panel.replaceChildren(el('h2',{},'Práctica de '+subject.name),games,el('h2',{},'Autoevaluación con explicación'),form);
}
function cases(subject,panel){
 panel.replaceChildren(el('h2',{},'Tres casos para poner ideas a prueba'),el('p',{class:'campus-muted'},'Todos los escenarios son didácticos y ficticios. La corrección es una autoevaluación con criterios; no se usa IA ni se asigna una nota automática.'));
 for(const c of subject.cases){const answer=el('textarea',{rows:4,maxlength:3000,placeholder:'Explicá tu razonamiento antes de mirar la solución.'}),solution=el('details',{},el('summary',{},'Comparar con la solución'),el('p',{},c.solution),el('h4',{},'Criterios de corrección'),el('ul',{},...c.criteria.map(text=>el('li',{},text)))),status=el('p',{role:'status'});
  panel.append(el('article',{class:'campus-unit'},el('h3',{},c.title),el('p',{},c.prompt),field('Tu resolución',answer),solution,button('Guardar mi resolución',async()=>{if(!answer.value.trim()){status.textContent='Escribí tu razonamiento para guardarlo.';return;}await recordProgress(subject.id,c.id,null,{answer:answer.value});status.textContent='Resolución guardada en este dispositivo. Contrastala con los criterios de corrección.';},true),status));
 }
}
async function materials(subject,panel){
 const docs=await localDocuments(),linked=campusState().materials[subject.id]||[];
 const status=el('p',{role:'status'}),select=el('select',{},el('option',{value:''},'Elegí un apunte de tu biblioteca'),...docs.map(d=>el('option',{value:String(d.id)},d.nombre||d.name||'Documento')));
 panel.replaceChildren(el('h2',{},'Tus apuntes de '+subject.name),el('p',{class:'campus-muted'},'Son privados de tu perfil y quedan separados del contenido general. Podés vincular el mismo documento a más de una materia.'),field('Biblioteca de tu perfil',select),button('Vincular apunte seleccionado',async()=>{if(!select.value){status.textContent='Elegí primero un documento.';return;}await linkMaterial(subject.id,select.value);await materials(subject,panel);}),status);
 const input=el('input',{type:'file',multiple:true,accept:'.txt,.md,.pdf,.json'});
 input.addEventListener('change',async()=>{input.disabled=true;status.textContent='Extrayendo y guardando tus apuntes…';try{const before=new Set((await localDocuments()).map(d=>String(d.id)));await window.procesarArchivosGenerico([...input.files],subject.name);const added=(await localDocuments()).filter(d=>!before.has(String(d.id)));if(!added.length){status.textContent='No se agregó un documento nuevo. Revisá el formato, el mensaje de extracción o vinculá uno existente.';return;}for(const doc of added)await linkMaterial(subject.id,String(doc.id));await materials(subject,panel);}catch(error){status.textContent=error.message;}finally{input.disabled=false;}});panel.append(field('Agregar archivos propios',input));
 const list=el('ul');for(const doc of docs.filter(d=>linked.includes(String(d.id))))list.append(el('li',{},doc.nombre||doc.name||'Documento',el('details',{},el('summary',{},'Leer apunte'),el('pre',{class:'campus-note'},String(doc.texto||doc.contenido||doc.text||'Este archivo no tiene texto extraído disponible.')))));
 panel.append(linked.length?list:el('p',{class:'campus-muted'},'Todavía no vinculaste apuntes a esta materia.'),button('Abrir biblioteca y práctica libre',()=>{sessionStorage.removeItem('campus:practice-subject');window.cambiarVista('solo');},true));
}
