import {careers,getCareer} from './catalog.mjs';
import {currentUser,register,setStudentCareer} from '../session.mjs';
import {studyStorage} from '../storage.mjs';
import {saveSelection,selectedSubjects} from './store.mjs';
import {el,button,field} from './dom.mjs';
let dialog,draft,step=0,content,status;
function saveDraft(){studyStorage.setItem('campus:onboarding',JSON.stringify({career:draft.career,subjects:[...draft.subjects]}));}
function close(){dialog?.close();}
export function beginOnboarding(careerId){
 if(window.__campus?.roomInfo()?.code){window.__campus.offerLeaveForProfile();return;}
 try{const saved=JSON.parse(studyStorage.getItem('campus:onboarding')||'{}');draft={career:saved.career||'',subjects:new Set(saved.subjects||[])}}catch{draft={career:'',subjects:new Set()};}
 if(careerId&&getCareer(careerId)){draft.career=careerId;draft.subjects=new Set(selectedSubjects(careerId));}
 step=0;
 if(!dialog){
  dialog=el('dialog',{id:'campusOnboarding',class:'campus-dialog campus-onboarding','aria-labelledby':'onboardingTitle'});
  dialog.addEventListener('cancel',()=>saveDraft());document.body.append(dialog);
 }
 render();if(!dialog.open)dialog.showModal();dialog.querySelector('h2')?.focus();
}
function render(){
 dialog.replaceChildren();
 dialog.append(el('header',{class:'campus-dialog-header'},el('div',{},el('span',{class:'campus-eyebrow'},currentUser()?'TU CAMPUS, A TU MEDIDA':'UN ESPACIO QUE SE ADAPTA A VOS'),el('h2',{id:'onboardingTitle'},['Elegí tu carrera','¿Qué estás cursando?','Creá tu perfil de alumno'][step])),button('✕',close,true,{'aria-label':'Cerrar registro'})));
 const steps=el('ol',{class:'campus-steps','aria-label':'Pasos del registro'});
 ['Carrera','Materias','Tu cuenta'].forEach((label,i)=>steps.append(el('li',{'aria-current':i===step?'step':null,class:i<=step?'is-done':''},`${i+1}. ${label}`)));dialog.append(steps);
 content=el('div',{class:'campus-onboarding-body'});status=el('p',{class:'campus-status',role:'status','aria-live':'polite'});dialog.append(content,status);
 if(step===0)renderCareers();else if(step===1)renderSubjects();else renderAccount();
 dialog.querySelector('h2')?.setAttribute('tabindex','-1');dialog.querySelector('h2')?.focus();
}
function renderCareers(){
 content.append(el('p',{class:'campus-muted'},'No es un plan oficial: es una base universitaria para aprender y practicar. Podés cambiar tu carrera más adelante.'));
 const grid=el('div',{class:'campus-career-picker'});
 for(const career of careers){
  const choice=button('',()=>{if(draft.career!==career.id){draft.career=career.id;draft.subjects=new Set(selectedSubjects(career.id));}saveDraft();render();},true,{'aria-pressed':String(draft.career===career.id),'data-career':career.id,class:'campus-career-choice'});
  choice.style.setProperty('--career-accent',career.color);
  choice.append(el('span',{class:'campus-career-symbol','aria-hidden':'true'},career.icon),el('strong',{},career.name),el('small',{},career.tagline));grid.append(choice);
 }content.append(grid,el('div',{class:'campus-form-actions'},button('Continuar con mis materias →',()=>{if(!draft.career){status.textContent='Elegí una carrera para continuar.';return;}step=1;render();})));
}
function renderSubjects(){
 const career=getCareer(draft.career);
 content.append(el('p',{class:'campus-muted'},`${career.name} · Elegí al menos una materia para armar tu inicio. Después podés cambiar la selección y sumar materias personales.`));
 const grid=el('div',{class:'campus-subject-picker'});
 for(const subject of career.subjects){const input=el('input',{type:'checkbox',value:subject.id,checked:draft.subjects.has(subject.id),on:{change:()=>{input.checked?draft.subjects.add(subject.id):draft.subjects.delete(subject.id);saveDraft();}}});grid.append(el('label',{class:'campus-subject-option'},input,el('span',{},subject.name)));}
 content.append(grid,el('div',{class:'campus-form-actions'},button('← Carrera',()=>{step=0;render();},true),button(currentUser()?'Guardar mi campus':'Continuar con mi cuenta →',async e=>{
  if(!draft.subjects.size){status.textContent='Seleccioná al menos una materia.';return;}
  saveDraft();if(!currentUser()){step=2;render();return;}
  const btn=e.currentTarget;btn.disabled=true;
  try{await setStudentCareer(draft.career);await saveSelection(draft.career,[...draft.subjects]);await window.__campus.refreshProfile();close();window.cambiarVista('campus');}catch(error){status.textContent=error.message;}finally{btn.disabled=false;}
 })));
}
function renderAccount(){
 const form=el('form',{id:'campusSignupForm',class:'campus-stack'});
 const name=el('input',{name:'apodo',required:true,minlength:2,maxlength:80,autocomplete:'nickname'});
 const email=el('input',{name:'email',type:'email',required:true,autocomplete:'email'});
 const password=el('input',{name:'password',type:'password',required:true,minlength:12,autocomplete:'new-password'});
 form.append(el('p',{class:'campus-muted'},`${getCareer(draft.career).name} · ${draft.subjects.size} materias elegidas. Guardá tu avance, organizá salas y retomá desde tus dispositivos.`),field('Tu nombre o apodo',name),field('Correo electrónico',email),field('Contraseña · al menos 12 caracteres',password),el('p',{class:'campus-muted'},'Te enviaremos un enlace para confirmar el correo. Tu foto se puede agregar después.'),el('div',{class:'campus-form-actions'},button('← Materias',()=>{step=1;render();},true),el('button',{type:'submit',class:'campus-button'},'Crear mi perfil de alumno')));
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;const submit=event.submitter;submit.disabled=true;status.textContent='Verificando y preparando tu cuenta…';
  try{
   await register({apodo:name.value,email:email.value,password:password.value,carrera:getCareer(draft.career).value,selectedSubjects:[...draft.subjects]});password.value='';
   content.replaceChildren(el('div',{class:'campus-confirmation'},el('span',{class:'campus-career-symbol','aria-hidden':'true'},'✓'),el('h3',{},'Revisá tu correo'),el('p',{},`Enviamos un enlace de confirmación a ${email.value.trim()}. Abrilo para activar tu perfil.`),button('Ya lo confirmé · iniciar sesión',()=>{close();window.abrirModalAuth('login');})));status.textContent='La cuenta necesita confirmar el correo antes de ingresar.';
  }catch(error){status.textContent=error.message||'No se pudo crear la cuenta. Reintentá.';}finally{submit.disabled=false;}
 });content.append(form);
}
