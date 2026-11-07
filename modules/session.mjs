import { setStorageScope } from './storage.mjs';
import { readValue } from './database.mjs';
import { writeValue } from './database.mjs';
import { getCareer } from './campus/catalog.mjs';
import { requestCaptcha } from './campus/captcha.mjs';

export const config = Object.freeze({
  url: 'https://xyaykxkytjnzykcjkopj.supabase.co',
  publishableKey: 'sb_publishable_R2Q2WhCk7zlwxnkT1iTtDA_8Wu5vjph'
});
let client;
let user = null;
let roomUser = null;
let studentProfile = null;
export function currentRoomUser() { return roomUser; }
export function currentStudentProfile() { return studentProfile; }
export function guestAlias() { try {return sessionStorage.getItem('study:guest-alias:'+roomUser?.id)||'Invitado';} catch {return 'Invitado';} }
let appearance = {};
export function currentAppearance() { return appearance; }
async function appearanceKey(email) {
  const bytes = await crypto.subtle.digest('SHA-256',new TextEncoder().encode(email.trim().toLowerCase()));
  return 'luibanez:registration:' + Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
}
export async function clearRegistrationAppearance() { if (user?.email) localStorage.removeItem(await appearanceKey(user.email)); }
export function getClient() {
  if (!client && window.supabase?.createClient) client = window.supabase.createClient(config.url, config.publishableKey, {
    global: { fetch: (resource,options={}) => fetch(resource,{...options,signal:options.signal ? AbortSignal.any([options.signal,AbortSignal.timeout(8000)]) : AbortSignal.timeout(8000)}) }
  });
  return client || null;
}
export function currentUser() { return user; }
export async function initializeSession() {
  const db = getClient();
  if (!db) { setStorageScope(null); return null; }
  try {
    const cached = await db.auth.getSession();
    if (cached.data.session) {
      if (navigator.onLine === false) roomUser = cached.data.session.user || null;
      else {
        const { data, error } = await Promise.race([db.auth.getUser(), new Promise(resolve => setTimeout(() => resolve({ error: true, data: {} }), 6000))]);
        if (!error && data.user) roomUser = data.user;
      }
    }
  } catch { roomUser = null; }
  user=roomUser?.email_confirmed_at && !roomUser.is_anonymous ? roomUser : null;
  setStorageScope(user?.id);
  if (user) {
    try {
      studentProfile=await readValue('campus:profile') || null;
      const pending=JSON.parse(localStorage.getItem(await appearanceKey(user.email)) || '{}');
      appearance=pending;
      if (navigator.onLine !== false) {
        const {data,error}=await db.from('study_profiles').select('id,apodo,carrera,avatar,tipo_avatar,foto_data_url').eq('id',user.id).limit(1);
        if (!error && data?.[0]) {studentProfile=data[0];await writeValue('campus:profile',studentProfile);appearance={avatar:data[0].avatar,tipoAvatar:data[0].tipo_avatar,fotoDataUrl:data[0].foto_data_url};}
      }
      const pendingProfile=(await readValue('cloud-pending-v1') || []).filter(item=>item.kind==='profile').at(-1)?.row;
      if (pendingProfile) appearance={avatar:pendingProfile.avatar,tipoAvatar:pendingProfile.tipo_avatar,fotoDataUrl:pendingProfile.foto_data_url};
    } catch { appearance={}; }
    if(studentProfile){user={...user,user_metadata:{...user.user_metadata,carrera:studentProfile.carrera,apodo:studentProfile.apodo}};roomUser=user;}
  }
  db.auth.onAuthStateChange((event, session) => {
    // Defer work out of Supabase's auth lock.
    setTimeout(() => {
      if (event === 'PASSWORD_RECOVERY') { window.dispatchEvent(new Event('study:password-recovery')); return; }
      const next = session?.user?.email_confirmed_at && !session.user.is_anonymous ? session.user : null;
      if (event !== 'INITIAL_SESSION' && next?.id !== user?.id) location.reload();
    }, 0);
  });
  return user;
}
function requireClient() {
  const db = getClient();
  if (!db || navigator.onLine === false) throw new Error('Necesitás conexión para administrar tu cuenta.');
  return db;
}
export async function withAuthAction(button, action, report) {
  if (button?.disabled) return;
  if (button) { button.disabled = true; button.setAttribute('aria-busy', 'true'); }
  try { return await action(); }
  catch (error) { report(error.message || 'No se pudo completar la operación.', 'error'); }
  finally { if (button) { button.disabled = false; button.removeAttribute('aria-busy'); } }
}
async function accountRequest(action,values,captchaToken){
 requireClient();
 const captcha=await requestCaptcha(captchaToken);
 let response;
 try{response=await fetch('/api/account',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...values,captchaToken:captcha}),signal:AbortSignal.timeout(30000),cache:'no-store'});}catch{throw new Error('No se pudo completar el acceso. Reintentá con el mismo usuario y conservá tu clave de recuperación.');}
 let result;try{result=await response.json();}catch{throw new Error('El acceso no respondió correctamente. Reintentá.');}
 if(!response.ok||result.ok!==true)throw new Error(result.error||'No se pudo completar el acceso.');
 return result;
}
export async function register({ username, password, recoveryKey, apodo, carrera, selectedSubjects=[], captchaToken }) {
  if (user) throw new Error('Cerrá sesión para crear otra cuenta. Tu carrera se puede editar desde Cuenta y datos.');
  if (!apodo?.trim()) throw new Error('Ingresá tu nombre.');
  if (!/^[a-z0-9][a-z0-9_]{2,29}$/i.test(username?.trim() || '')) throw new Error('Elegí un usuario de 3 a 30 letras, números o guion bajo.');
  if (typeof password !== 'string' || password.length < 6) throw new Error('Usá una contraseña de al menos 6 caracteres.');
  if (!getCareer(carrera)) throw new Error('Elegí una carrera válida.');
  const db = requireClient();
  if(roomUser?.is_anonymous){await db.auth.signOut({scope:'local'});roomUser=null;}
  return accountRequest('register',{username,password,recoveryKey,apodo,carrera:getCareer(carrera).id,selectedSubjects},captchaToken);
}
export async function signIn(username, password, captchaToken) {
  const result=await accountRequest('login',{username,password},captchaToken);
  const { error } = await requireClient().auth.setSession(result.session);
  if (error) throw error;
  location.reload();
}
export async function signOut() {
  const db=requireClient();
  // Auth emits SIGNED_OUT before its promise settles. Leave protected routes
  // before that listener reloads, so logout cannot reopen the registration gate.
  const previous=location.href;
  history.replaceState(null,'',location.pathname+location.search+'#home');
  const { error } = await db.auth.signOut({ scope: 'local' });
  if (error) {history.replaceState(null,'',previous);throw error;}
  location.reload();
}
export async function resetPassword(username,recoveryKey,password,captchaToken) {
  return accountRequest('recover',{username,recoveryKey,password},captchaToken);
}
export async function updatePassword(password) {
  if (!password || password.length < 6) throw new Error('Usá al menos 6 caracteres.');
  const { error } = await requireClient().auth.updateUser({ password });
  if (error) throw error;
}
export async function authHeaders() {
  const db = requireClient();
  const { data, error } = await db.auth.getSession();
  if (error || !data.session?.access_token || !data.session.user?.email_confirmed_at || data.session.user?.is_anonymous) throw new Error('Iniciá sesión con tu perfil de alumno para utilizar la IA.');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session.access_token}` };
}
export async function beginGuestSession(apodo,captchaToken) {
 const name=String(apodo||'').trim();if(name.length<2||name.length>40)throw new Error('Elegí un apodo de 2 a 40 caracteres.');
 const db=requireClient();
 if(!roomUser){const captcha=await requestCaptcha(captchaToken);const {data,error}=await db.auth.signInAnonymously({options:{captchaToken:captcha}});if(error)throw error;roomUser=data.user;if(!roomUser?.is_anonymous)throw new Error('No se pudo crear el acceso temporal.');}
 if(roomUser.is_anonymous)sessionStorage.setItem('study:guest-alias:'+roomUser.id,name);
 return roomUser;
}
export async function setStudentCareer(careerId) {
 const career=getCareer(careerId);if(!career||!user)throw new Error('Elegí una carrera con tu cuenta verificada.');
 const {error}=await requireClient().rpc('study_activate_career',{p_career:career.id});if(error)throw error;
 studentProfile={...(studentProfile||{}),id:user.id,apodo:studentProfile?.apodo||user.user_metadata?.apodo||'Estudiante',carrera:career.value};
 await writeValue('campus:profile',studentProfile);user={...user,user_metadata:{...user.user_metadata,carrera:career.value}};roomUser=user;
}
export async function updateStudentProfile({apodo,fotoDataUrl}){
 if(!user||!apodo?.trim()||apodo.trim().length>80)throw new Error('Ingresá un apodo de 1 a 80 caracteres.');
 if(fotoDataUrl!==undefined&&(!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(fotoDataUrl)||fotoDataUrl.length>300000))throw new Error('La foto no es válida o supera el tamaño permitido.');
 const row={id:user.id,apodo:apodo.trim(),carrera:studentProfile?.carrera||user.user_metadata.carrera,avatar:appearance.avatar||user.user_metadata.avatar||'👤',...(fotoDataUrl?{tipo_avatar:'foto',foto_data_url:fotoDataUrl}:{})};
 const {error}=await requireClient().from('study_profiles').upsert(row);if(error)throw error;
 studentProfile={...(studentProfile||{}),...row};await writeValue('campus:profile',studentProfile);
 if(fotoDataUrl)appearance={...appearance,tipoAvatar:'foto',fotoDataUrl};
 user={...user,user_metadata:{...user.user_metadata,apodo:row.apodo}};roomUser=user;
}
