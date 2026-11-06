import config from '../../campus-config.json' with {type:'json'};
import {el,button} from './dom.mjs';
let loading;
export function hasCaptchaConfiguration(){return Boolean(config.turnstileSiteKey);}
function load() {
 if (window.turnstile) return Promise.resolve(window.turnstile);
 if (!loading) loading=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;
  const timeout=setTimeout(()=>{script.remove();loading=null;reject(new Error('La verificación no respondió. Revisá la conexión y reintentá.'));},15000);
  script.onload=()=>{clearTimeout(timeout);resolve(window.turnstile)};
  script.onerror=()=>{clearTimeout(timeout);script.remove();loading=null;reject(new Error('No se pudo cargar la verificación. Reintentá.'));};document.head.append(script);
 });return loading;
}
export async function requestCaptcha(token) {
 if(token)return token;
 if(!config.turnstileSiteKey)throw new Error('El acceso de cuentas e invitados todavía no está habilitado en esta versión de revisión. Podés usar el laboratorio.');
 const turnstile=await load();
 if(!turnstile?.render)throw new Error('La verificación no se pudo inicializar. Reintentá.');
 return new Promise((resolve,reject)=>{
  const target=el('div',{class:'campus-captcha'}),message=el('p',{role:'status'});
  const dialog=el('dialog',{class:'campus-dialog','aria-labelledby':'captcha-title'},el('h2',{id:'captcha-title'},'Verificá que sos una persona'),el('p',{},'Esta verificación protege las cuentas y las salas.'),target,message);
  let settled=false,id;
  const finish=(value,error)=>{if(settled)return;settled=true;clearTimeout(timeout);if(id!==undefined)turnstile.remove(id);dialog.close();dialog.remove();error?reject(error):resolve(value);};
  const timeout=setTimeout(()=>finish(null,new Error('La verificación venció. Reintentá.')),120000);
  dialog.append(button('Cancelar',()=>finish(null,new Error('Verificación cancelada.')),true));
  dialog.addEventListener('cancel',e=>{e.preventDefault();finish(null,new Error('Verificación cancelada.'));});document.body.append(dialog);dialog.showModal();
  try{id=turnstile.render(target,{sitekey:config.turnstileSiteKey,theme:document.documentElement.dataset.theme||'light',callback:value=>finish(value),'error-callback':()=>{message.textContent='La verificación falló. Reintentá o cancelá.';},'expired-callback':()=>{message.textContent='La verificación venció. Completala nuevamente.';turnstile.reset(id);}});}catch{finish(null,new Error('No se pudo iniciar la verificación. Reintentá.'));}
 });
}
