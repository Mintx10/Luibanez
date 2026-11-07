import {resetPassword} from '../session.mjs';
import {el,field,button} from './dom.mjs';
let dialog;
export function openAccountRecovery(username=''){
 if(dialog?.open)return;
 dialog?.remove();
 const name=el('input',{name:'username',value:username,required:true,autocomplete:'username',maxlength:30,autocapitalize:'none',spellcheck:'false'});
 const key=el('input',{name:'recoveryKey',type:'password',required:true,autocomplete:'off',minlength:32,maxlength:32,spellcheck:'false'});
 const password=el('input',{name:'password',type:'password',required:true,minlength:12,autocomplete:'new-password'});
 const status=el('p',{role:'status','aria-live':'polite',tabindex:-1});
 const submit=el('button',{type:'submit',class:'campus-button'},'Cambiar contraseña');
 const inputs=el('fieldset',{class:'campus-account-fields'},field('Usuario',name),field('Clave de recuperación guardada al registrarte',key),field('Nueva contraseña · al menos 12 caracteres',password));
 const form=el('form',{class:'campus-stack'},inputs,status,submit);
 const close=button('Cerrar',()=>dialog.close(),true);
 dialog=el('dialog',{id:'campusAccountRecovery',class:'campus-dialog','aria-labelledby':'accountRecoveryTitle'},el('h2',{id:'accountRecoveryTitle'},'Recuperar mi cuenta'),el('p',{},'Usá la clave privada que guardaste al crear tu perfil. Sin contraseña ni clave de recuperación no podemos comprobar que la cuenta te pertenece.'),form,close);
 let busy=false;dialog.addEventListener('cancel',event=>{if(busy)event.preventDefault();});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;busy=true;inputs.disabled=submit.disabled=close.disabled=true;status.textContent='Verificando tu clave…';
  try{await resetPassword(name.value,key.value,password.value);key.value=password.value='';inputs.remove();submit.remove();status.textContent='Contraseña actualizada. Ya podés iniciar sesión con la nueva contraseña. Tu clave de recuperación sigue siendo válida.';status.setAttribute('role','status');}
  catch(error){status.textContent=error.message;status.setAttribute('role','alert');}
  finally{busy=false;inputs.disabled=submit.disabled=close.disabled=false;status.focus();}
 });
 document.body.append(dialog);dialog.showModal();name.focus();
}
