import {careers,getCareer,getSubject,legacySubject} from './catalog.mjs';
import {currentUser,currentRoomUser,beginGuestSession,guestAlias,setStudentCareer} from '../session.mjs';
import {initializeCampusStore,activeCareer,selectedSubjects,ownSubject,campusState,subjectProgress,saveSelection,createCustomSubject,syncMessage,recordProgress} from './store.mjs';
import {beginOnboarding} from './onboarding.mjs';
import {el,button,field,notice} from './dom.mjs';
let generation=0,ready,subjectRenderer;
const go=route=>window.cambiarVista?.(route);
function heading(eyebrow,title,description){return el('header',{class:'campus-dashboard-hero'},el('span',{class:'campus-eyebrow'},eyebrow),el('h1',{},title),description&&el('p',{class:'campus-muted'},description));}
export function setupCampus(){
 document.body.classList.add('campus-enabled');
 const home=document.getElementById('viewHome'),main=el('main',{id:'campusMain',tabindex:-1});home.after(main);main.append(home);
 document.querySelector('a[href="#main-content"]')?.addEventListener('click',event=>{event.preventDefault();const view=document.querySelector('.view--active');if(view){view.tabIndex=-1;view.focus();}});
 for(const [route,id,label] of [['campus','viewCampus','Mi campus'],['materias','viewSubjects','Mis materias'],['materia','viewSubject','Materia']]){
  const section=el('section',{id,class:'view view--hidden campus-view','aria-label':label,'aria-hidden':'true'});section.inert=true;main.append(section);
 }
 setupNavigation();renderHome();setupGuestJoin();
 const api={beginOnboarding,prepareRoute,render,refreshNavigation,refreshProfile:async()=>{await window.refrescarPerfilAlumno?.();refreshNavigation();},roomInfo:()=>window.getCampusRoomInfo?.()||{},
  roomChanged(){renderJuntos();},
  offerLeaveForProfile(){
   const dialog=el('dialog',{class:'campus-dialog'},el('h2',{},'Terminá tu participación primero'),el('p',{},'Tu acceso de invitado es temporal. Para crear un perfil de alumno, salí de la sala; el resultado de invitado no se convierte en progreso del alumno.'));
   dialog.append(button('Seguir jugando',()=>{dialog.close();dialog.remove();},true),button('Salir y crear mi perfil',()=>{window.salirDeSalaOnline?.();dialog.close();dialog.remove();beginOnboarding();}));document.body.append(dialog);dialog.showModal();
  },
  async changeCareer(id){await setStudentCareer(id);await api.refreshProfile();go('campus');},
  recordGame(kind,points,won){const id=sessionStorage.getItem('campus:practice-subject');if(id&&ownSubject(id))recordProgress(id,'practice-'+kind,null,{points:Number(points)||0,won:Boolean(won)}).catch(error=>notice(error.message,true));},
  practiceReturn(){return sessionStorage.getItem('campus:practice-subject');}
 };window.__campus=api;
 ready=initializeCampusStore();
 document.addEventListener('campus:data',()=>{for(const node of document.querySelectorAll('[data-campus-sync]'))node.textContent=syncMessage();});
 window.addEventListener('campus:data',()=>{for(const node of document.querySelectorAll('[data-campus-sync]'))node.textContent=syncMessage();});
 return api;
}
function setupNavigation(){
 const nav=document.querySelector('.top-nav__links');
 for(const item of [...nav.children])item.hidden=!['navLabBtn','navJuntosBtn'].includes(item.id);
 const middle=el('button',{id:'campusNavBtn',class:'nav-link campus-nav-center',type:'button',on:{click:()=>currentUser()?go('campus'):beginOnboarding()}},'Crear mi perfil de alumno');
 nav.append(document.getElementById('navLabBtn'),middle,document.getElementById('navJuntosBtn'));
 const header=nav.parentElement,slot=nav.nextSibling,small=matchMedia('(max-width:760px)');
 const placeNavigation=()=>{if(small.matches)document.body.append(nav);else header.insertBefore(nav,slot);};
 small.addEventListener('change',placeNavigation);placeNavigation();
 document.querySelector('.brand-logo__icon').textContent='l.';
 const drawer=document.getElementById('drawerMenu');
 for(const item of drawer?.querySelectorAll('[data-view]')||[])item.hidden=!['laboratorio','juntos'].includes(item.dataset.view);
 const drawerTarget=drawer?.querySelector('#drawerNavLaboratorio')?.parentElement;
 drawerTarget?.append(button('Crear mi perfil de alumno',()=>{document.getElementById('drawerCloseBtn')?.click();currentUser()?go('campus'):beginOnboarding();},false,{id:'drawerCampusBtn'}));
 refreshNavigation();
}
function refreshNavigation(){
 const student=!!currentUser(),career=activeCareer();
 for(const id of ['navLabBtn','navJuntosBtn','drawerNavLaboratorio','drawerNavJuntos'])document.getElementById(id)?.classList.remove('hidden');
 const nav=document.getElementById('campusNavBtn');if(nav)nav.textContent=student?'Mi campus':'Crear mi perfil de alumno';
 const drawer=document.getElementById('drawerCampusBtn');if(drawer)drawer.textContent=student?'Mi campus':'Crear mi perfil de alumno';
 document.documentElement.style.setProperty('--career-accent',career?.color||'#3656d4');
}
function renderHome(){
 const home=document.getElementById('viewHome');home.classList.add('campus-home');home.replaceChildren();
 const text=el('div',{class:'campus-hero-copy'},el('span',{class:'campus-pill'},el('span',{class:'campus-pill-dot'}),'Tu espacio de estudio, a tu manera'),el('h1',{},'Aprender tiene ',el('em',{},'tu propia forma.')),el('p',{},'Resolvé una duda, pensá en voz alta o encontrá tu próxima materia favorita. Un lugar para estudiar en serio, sin estudiar siempre igual.'),el('div',{class:'campus-hero-actions'},button('Crear mi perfil de alumno ↗',()=>beginOnboarding()),button('Explorar el laboratorio',()=>go('laboratorio'),true)),el('div',{class:'campus-numbers'},...[[6,'carreras para elegir'],[72,'materias con identidad'],['A tu ritmo','solo o acompañado']].map(([value,label])=>el('div',{class:'campus-number'},el('strong',{},value),el('span',{},label)))));
 const preview=el('aside',{class:'campus-preview','aria-label':'Vista previa de un campus personalizado'},el('div',{class:'campus-preview-top'},el('strong',{},'Mi campus'),el('span',{},'Hecho para vos')),el('span',{class:'campus-eyebrow'},'MENOS BUSCAR. MÁS APRENDER.'),el('h3',{},'Tus materias. Tu próximo paso.'),el('p',{class:'campus-muted'},'Elegí lo que cursás y encontrá un espacio distinto para cada desafío.'));
 const cards=el('div',{class:'campus-preview-courses'});for(const [icon,name,cid] of [['✚','Casos clínicos','medicina'],['↗','Escenarios financieros','finanzas'],['◎','Ideas de campaña','marketing'],['⌘','Lógica y algoritmos','sistemas']]){const card=el('div',{class:'campus-mini-course'},el('span',{class:'campus-mini-icon'},icon),name);card.style.setProperty('--career-accent',getCareer(cid).color);cards.append(card);}
 preview.append(cards,el('div',{class:'campus-preview-bottom'},el('span',{'aria-hidden':'true'},'✦'),el('span',{},'Un perfil. Tus materias actuales. Tu progreso guardado.')));
 home.append(el('div',{class:'campus-hero'},text,preview),el('div',{class:'campus-section-heading'},el('div',{},el('span',{class:'campus-eyebrow'},'EMPEZÁ POR ACÁ'),el('h2',{},'Sin cuenta. Con ganas de aprender.')),el('p',{},'Dos formas de entrar en tema, desde ahora.')));
 const areas=el('div',{class:'campus-area-grid'});
 for(const [icon,title,description,label,route] of [['∑','Laboratorio','Probá ideas, resolvé cálculos y entendé el paso a paso. Tu mesa de trabajo para materias numéricas.','Abrir laboratorio →','laboratorio'],['↔','Estudiar juntos','Sumate con un apodo y el código de una sala. Compartí el desafío; no necesitás crear tu perfil para participar.','Entrar a una sala →','juntos']])areas.append(el('article',{class:'campus-area'},el('span',{class:'campus-area-icon','aria-hidden':'true'},icon),el('h3',{},title),el('p',{},description),button(label,()=>go(route),true)));
 const strip=el('div',{class:'campus-career-strip','aria-label':'Carreras disponibles'});for(const career of careers)strip.append(button(`${career.icon} ${career.name}`,()=>beginOnboarding(career.id),true,{class:'campus-career-chip'}));
 home.append(areas,strip,el('p',{class:'campus-footer'},'Luibañez · Un campus para construir tu manera de aprender.'));
}
function setupGuestJoin(){
 const view=document.getElementById('viewDuelo');const container=el('section',{id:'campusGuestJoin',class:'campus-guest-join','aria-labelledby':'guestJoinTitle'});
 const name=el('input',{name:'guestName',required:true,minlength:2,maxlength:40,autocomplete:'nickname',value:currentRoomUser()?.is_anonymous?guestAlias():''});
 const code=el('input',{name:'roomCode',required:true,minlength:5,maxlength:8,autocomplete:'off',pattern:'[A-Za-z2-9]{5,8}',value:new URLSearchParams(location.search).get('room')||''});
 const pass=el('input',{name:'roomPassword',type:'password',maxlength:128,autocomplete:'off'});
 const message=el('p',{role:'status',class:'campus-status'});
 const form=el('form',{id:'campusGuestJoinForm',class:'campus-stack'},field('Tu apodo',name),field('Código de sala',code),field('Contraseña de sala · si tiene',pass),el('button',{type:'submit',class:'campus-button'},'Unirme como invitado →'),message);
 form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const submit=e.submitter;submit.disabled=true;message.textContent='Preparando tu ingreso…';try{await beginGuestSession(name.value);await window.refrescarPerfilAlumno?.();const joined=await window.unirseASalaOnline?.(code.value,pass.value);if(!window.getCampusRoomInfo?.().code)throw new Error('No se confirmó el ingreso. Revisá el código, la contraseña y la conexión.');message.textContent='';pass.value='';container.hidden=true;}catch(error){message.textContent=error.message;}finally{submit.disabled=false;}});
 container.append(el('span',{class:'campus-eyebrow'},'SUMATE A LA MESA'),el('h2',{id:'guestJoinTitle'},'Aprender también se comparte.'),el('p',{class:'campus-muted'},'Entrá con el código de tu compañero. Tu lugar de invitado es temporal: no guarda progreso ni usa IA propia.'),form,el('hr'),el('p',{class:'campus-muted'},'¿Querés organizar tu propia sala?'),button('Crear mi perfil de alumno',()=>beginOnboarding(),true));view.prepend(container);
}
function prepareRoute(raw){
 raw=String(raw||'home').replace(/^#/,'');
 if(currentUser()&&raw.startsWith('legacy/'))return {view:raw.slice(7),hash:raw,legacy:true};
 if(raw==='home'&&currentUser())raw='campus';
 if(raw==='fin-hub')raw='campus';
 const old=legacySubject(raw);if(old)raw='materia/'+old.id;
 if(!currentUser()&&raw==='juegos'&&!window.getCampusRoomInfo?.().code&&currentRoomUser()&&sessionStorage.getItem('study:activeRoom:'+currentRoomUser().id))return {view:'juntos',hash:'juntos'};
 const allowed=['home','laboratorio','juntos'];
 if(!currentUser()&&!allowed.includes(raw)&&!(raw==='juegos'&&window.getCampusRoomInfo?.().code)){
  sessionStorage.setItem('campus:pending-route',raw);showGate();return {view:'home',hash:'home'};
 }
 if(currentUser()&&!activeCareer()&&!allowed.includes(raw)&&raw!=='campus'){beginOnboarding();return {view:'campus',hash:'campus'};}
 return {view:raw,hash:raw};
}
function showGate(){
 if(document.getElementById('campusGate')?.open)return;
 const dialog=el('dialog',{id:'campusGate',class:'campus-dialog'},el('h2',{},'Tu próximo paso empieza con un perfil'),el('p',{},'Elegí tu carrera y tus materias para practicar, guardar tu avance y organizar salas. El laboratorio y el ingreso a salas siguen disponibles sin cuenta.'));
 dialog.append(button('Seguir explorando',()=>{dialog.close();dialog.remove();},true),button('Crear mi perfil de alumno',()=>{dialog.close();dialog.remove();beginOnboarding();}));document.body.append(dialog);dialog.showModal();
}
async function render(route){
 const token=++generation;refreshNavigation();
 if(route==='home'){return;}
 if(route==='juntos'){
  renderJuntos();
  return;
 }
 if(!['campus','materias'].includes(route)&&!route.startsWith('materia/'))return;
 await ready;if(token!==generation)return;
 if(route==='campus')renderDashboard();
 if(route==='materias')renderCatalog();
 if(route.startsWith('materia/')){
  const subject=ownSubject(route.slice(8));if(!subject||subject.careerId!==activeCareer()?.id){notice('Elegí una materia de tu carrera desde el catálogo.',true);go('campus');return;}
  const target=document.getElementById('viewSubject');target.replaceChildren(el('p',{role:'status'},'Preparando tu materia…'));
  try{subjectRenderer ||= await import('./subject-view.mjs');if(token===generation)await subjectRenderer.renderSubject(route.slice(8),target,()=>token===generation);}
  catch(error){if(token===generation)target.replaceChildren(heading('TU MATERIA','No se pudo cargar el contenido',error.message),button('Reintentar',()=>render(route)),button('Volver a mi campus',()=>go('campus'),true));}
 }
}
function renderJuntos(){
 const guest=!currentUser(),inRoom=!!window.getCampusRoomInfo?.().code;
 const join=document.getElementById('campusGuestJoin');if(join)join.hidden=!guest||inRoom;
 const lobby=document.getElementById('dueloLobby'),waiting=document.getElementById('dueloOnlineWaitingRoom');
 function restrict(parent){for(const child of parent?.children||[]){child.dataset.campusGuestHidden='true';if(child===waiting){child.hidden=!inRoom;}else if(child.contains(waiting)){child.hidden=!inRoom;restrict(child);}else child.hidden=true;}}
 if(guest)restrict(lobby);
 else for(const child of lobby?.querySelectorAll('[data-campus-guest-hidden]')||[]){child.hidden=false;delete child.dataset.campusGuestHidden;}
}
function subjectCard(subject,editing=false){
 const career=getCareer(subject.careerId);const completed=subjectProgress(subject.id).filter(p=>p.activity_id.startsWith('unit-')).length;
 const card=el('article',{class:'campus-subject-card','data-subject':subject.id},el('div',{class:'campus-cluster'},el('span',{class:'campus-mini-icon','aria-hidden':'true'},subject.custom?'＋':career.icon),el('span',{class:'campus-level'},subject.custom?'Materia personalizada':['Base','Profundización','Integración'][(subject.level||1)-1])),el('h3',{},subject.name),el('p',{class:'campus-muted'},subject.custom?'Tus apuntes, tus preguntas y tu espacio de trabajo.':`${career.tagline}. Seis unidades, casos y práctica.`));
 card.style.setProperty('--career-accent',career.color);
 if(!subject.custom)card.append(el('progress',{class:'campus-progress',value:completed,max:6,'aria-label':`${completed} de 6 unidades marcadas como leídas`}),el('small',{class:'campus-muted'},`${completed} de 6 unidades marcadas como leídas`));
 if(editing){const input=el('input',{type:'checkbox',checked:selectedSubjects(career.id).includes(subject.id),'aria-label':`Cursando ${subject.name}`});input.addEventListener('change',async()=>{try{const ids=new Set(selectedSubjects(career.id));input.checked?ids.add(subject.id):ids.delete(subject.id);await saveSelection(career.id,[...ids]);}catch(error){input.checked=!input.checked;notice(error.message,true);}});card.append(el('label',{class:'campus-subject-option'},input,'Estoy cursando'));}
 card.append(button('Entrar a la materia →',()=>go('materia/'+subject.id),true));return card;
}
function renderDashboard(){
 const root=document.getElementById('viewCampus'),career=activeCareer();root.replaceChildren();
 if(!career){root.append(heading('BIENVENIDO A LUIBAÑEZ','Tu campus está por empezar.','Elegí una carrera y las materias que estás cursando. Tus datos anteriores se conservan.'),button('Elegir mi carrera',()=>beginOnboarding()));return;}
 root.append(heading(`${career.icon} TU CAMPUS DE ${career.name.toUpperCase()}`,`A tu ritmo, ${currentUser().user_metadata?.apodo||'estudiante'}.`,career.tagline+'. Este es tu punto de partida para hoy.'));
 const actions=el('div',{class:'campus-cluster'},button('Elegir mis materias',()=>go('materias')),button('Organizar una sala',()=>go('juntos'),true),button('Práctica libre',()=>{sessionStorage.removeItem('campus:practice-subject');go('solo');},true),button('Mi progreso',()=>document.getElementById('campusRecent').scrollIntoView({behavior:'smooth'}),true),button('Editar mi perfil',async()=>{(await import('./profile.mjs')).editProfile();},true));root.append(actions);
 const selected=selectedSubjects().map(ownSubject).filter(Boolean);root.append(el('div',{class:'campus-section-heading'},el('div',{},el('span',{class:'campus-eyebrow'},'TU FOCO DE HOY'),el('h2',{},'Mis materias actuales')),el('p',{},`${selected.length} materias elegidas · cambiá tu selección cuando quieras`)));
 const grid=el('div',{class:'campus-grid'});selected.forEach(s=>grid.append(subjectCard(s)));root.append(selected.length?grid:el('div',{class:'campus-empty'},el('h3',{},'Elegí por dónde empezar'),el('p',{},'Agregá las materias que estás cursando. El resto del catálogo siempre estará disponible.'),button('Explorar materias',()=>go('materias'))));
 const recent=Object.values(campusState().progress).filter(p=>p.career_id===career.id).sort((a,b)=>b.updated_at.localeCompare(a.updated_at)).slice(0,6);
 const box=el('section',{id:'campusRecent',class:'campus-unit'},el('h2',{},'Tu actividad reciente'));
 if(!recent.length)box.append(el('p',{class:'campus-muted'},'Todavía no hay actividad registrada en esta carrera. Entrá a una materia y marcá una unidad, resolvé un caso o practicá.'));
 for(const row of recent)box.append(el('p',{},`${ownSubject(row.subject_id)?.name||'Materia personal'} · ${row.activity_id.startsWith('unit-')?'Unidad marcada como leída':row.activity_id.startsWith('practice-')?'Partida de práctica':row.activity_id==='quiz'?'Cuestionario':row.activity_id.startsWith('case-')?'Caso trabajado':'Actividad realizada'}${row.score!==null&&row.score!==undefined?' · '+Math.round(row.score)+'%':''}`));
 root.append(box,el('p',{class:'campus-status','data-campus-sync':true,role:'status'},syncMessage()),button('Cambiar de carrera sin perder mis datos',()=>careerDialog(),true));
}
function careerDialog(){
 const select=el('select',{},...careers.map(c=>el('option',{value:c.id,selected:c.id===activeCareer()?.id},c.name)));const status=el('p',{role:'status',class:'campus-status'});
 const dialog=el('dialog',{class:'campus-dialog'},el('h2',{},'Otro camino, el mismo perfil'),el('p',{},'Tus materias y avances anteriores quedan guardados por carrera.'),field('Carrera activa',select),status);
 dialog.append(button('Cancelar',()=>{dialog.close();dialog.remove();},true),button('Cambiar carrera',async e=>{const btn=e.currentTarget;btn.disabled=true;try{await window.__campus.changeCareer(select.value);dialog.close();dialog.remove();}catch(error){status.textContent=error.message;btn.disabled=false;}}));document.body.append(dialog);dialog.showModal();
}
function renderCatalog(){
 const root=document.getElementById('viewSubjects'),career=activeCareer();if(!career){renderDashboard();return;}root.replaceChildren(heading('ARMÁ TU RECORRIDO',`Materias de ${career.name}`,'Elegí las que cursás, explorá las demás y agregá tus propias materias cuando lo necesites.'));
 const search=el('input',{type:'search',placeholder:'Buscar una materia','aria-label':'Buscar una materia'}),level=el('select',{'aria-label':'Filtrar por nivel'},el('option',{value:''},'Todos los niveles'),...['Base','Profundización','Integración'].map((label,i)=>el('option',{value:i+1},label)));
 const grid=el('div',{class:'campus-grid'});
 const update=()=>{const query=search.value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const list=[...career.subjects,...campusState().custom.filter(s=>s.careerId===career.id)].map(s=>({...s,careerId:career.id})).filter(s=>s.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query)&&(!level.value||s.level===Number(level.value)));grid.replaceChildren(...list.map(s=>subjectCard(s,true)));if(!list.length)grid.append(el('p',{role:'status'},'No hay materias que coincidan. Probá otro término o agregá una materia personal.'));};
 search.addEventListener('input',update);level.addEventListener('change',update);
 root.append(el('div',{class:'campus-toolbar'},field('Encontrá tu materia',search),field('Nivel orientativo',level),button('＋ Materia personal',()=>customDialog(career))),grid,el('p',{class:'campus-status','data-campus-sync':true},syncMessage()),button('← Mi campus',()=>go('campus'),true));update();
}
function customDialog(career){
 const name=el('input',{required:true,minlength:3,maxlength:100}),description=el('textarea',{maxlength:1000,rows:3});const message=el('p',{role:'status'});const form=el('form',{class:'campus-stack'},field('Nombre de la materia',name),field('Qué estás estudiando · opcional',description),message,el('button',{type:'submit',class:'campus-button'},'Agregar a mis materias'));
 const dialog=el('dialog',{class:'campus-dialog'},el('h2',{},'Tu materia, tus apuntes'),el('p',{class:'campus-muted'},'Se identifica como personalizada. No inventamos un programa ni preguntas: vos elegís el material de trabajo.'),form,button('Cancelar',()=>{dialog.close();dialog.remove();},true));
 form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;e.submitter.disabled=true;try{const s=await createCustomSubject(career.id,name.value,description.value);dialog.close();dialog.remove();go('materia/'+s.id);}catch(error){message.textContent=error.message;e.submitter.disabled=false;}});document.body.append(dialog);dialog.showModal();
}
