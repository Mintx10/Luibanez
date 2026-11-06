import { setStorageScope } from './storage.mjs';
import { readValue } from './database.mjs';

export const config = Object.freeze({
  url: 'https://xyaykxkytjnzykcjkopj.supabase.co',
  publishableKey: 'sb_publishable_R2Q2WhCk7zlwxnkT1iTtDA_8Wu5vjph'
});
let client;
let user = null;
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
      if (navigator.onLine === false) user = cached.data.session.user?.email_confirmed_at ? cached.data.session.user : null;
      else {
        const { data, error } = await Promise.race([db.auth.getUser(), new Promise(resolve => setTimeout(() => resolve({ error: true, data: {} }), 6000))]);
        if (!error && data.user?.email_confirmed_at) user = data.user;
      }
    }
  } catch { user = null; }
  setStorageScope(user?.id);
  if (user) {
    try {
      const pending=JSON.parse(localStorage.getItem(await appearanceKey(user.email)) || '{}');
      appearance=pending;
      if (navigator.onLine !== false) {
        const {data,error}=await db.from('study_profiles').select('avatar,tipo_avatar,foto_data_url').eq('id',user.id).limit(1);
        if (!error && data?.[0]) appearance={avatar:data[0].avatar,tipoAvatar:data[0].tipo_avatar,fotoDataUrl:data[0].foto_data_url};
      }
      const pendingProfile=(await readValue('cloud-pending-v1') || []).filter(item=>item.kind==='profile').at(-1)?.row;
      if (pendingProfile) appearance={avatar:pendingProfile.avatar,tipoAvatar:pendingProfile.tipo_avatar,fotoDataUrl:pendingProfile.foto_data_url};
    } catch { appearance={}; }
  }
  db.auth.onAuthStateChange((event, session) => {
    // Defer work out of Supabase's auth lock.
    setTimeout(() => {
      if (event === 'PASSWORD_RECOVERY') { window.dispatchEvent(new Event('study:password-recovery')); return; }
      const next = session?.user?.email_confirmed_at ? session.user : null;
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
export async function register({ email, password, apodo, carrera, avatar, tipoAvatar, fotoDataUrl }) {
  if (user) throw new Error('Cerrá sesión para crear otra cuenta. Tu carrera se puede editar desde Cuenta y datos.');
  if (!apodo?.trim()) throw new Error('Ingresá tu nombre.');
  if (!/^\S+@\S+\.\S+$/.test(email || '')) throw new Error('Ingresá un correo válido.');
  if (typeof password !== 'string' || password.length < 12) throw new Error('Usá una contraseña de al menos 12 caracteres.');
  if (!['Medicina', 'Licenciatura en Finanzas', 'General'].includes(carrera)) throw new Error('Elegí una carrera válida.');
  const db = requireClient();
  if ((fotoDataUrl || '').length>300000) throw new Error('Elegí una foto de perfil más pequeña.');
  // Photos belong in the private profile, never in JWT metadata or request headers.
  const metadata = { apodo: apodo.trim(), carrera, avatar };
  localStorage.setItem(await appearanceKey(email),JSON.stringify({ avatar,tipoAvatar,fotoDataUrl }));
  const { error } = await db.auth.signUp({ email: email.trim(), password, options: { data: metadata, emailRedirectTo: `${location.origin}/` } });
  if (error) throw error;
}
export async function signIn(email, password) {
  if (!/^\S+@\S+\.\S+$/.test(email || '')) throw new Error('Ingresá el correo de tu cuenta.');
  const { data, error } = await requireClient().auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data.user?.email_confirmed_at) throw new Error('Verificá tu correo para iniciar sesión.');
  location.reload();
}
export async function signOut() {
  const { error } = await requireClient().auth.signOut({ scope: 'local' });
  if (error) throw error;
  location.reload();
}
export async function resetPassword(email) {
  if (!/^\S+@\S+\.\S+$/.test(email || '')) throw new Error('Ingresá tu correo en el campo de acceso.');
  const { error } = await requireClient().auth.resetPasswordForEmail(email.trim(), { redirectTo: `${location.origin}/?recover=1` });
  if (error) throw error;
}
export async function updatePassword(password) {
  if (!password || password.length < 12) throw new Error('Usá al menos 12 caracteres.');
  const { error } = await requireClient().auth.updateUser({ password });
  if (error) throw error;
}
export async function authHeaders() {
  const db = requireClient();
  const { data, error } = await db.auth.getSession();
  if (error || !data.session?.access_token || !data.session.user?.email_confirmed_at) throw new Error('Iniciá sesión y verificá tu correo para utilizar la IA.');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session.access_token}` };
}
