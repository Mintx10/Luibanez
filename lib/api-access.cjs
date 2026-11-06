'use strict';
const { createHash } = require('node:crypto');
const { HttpError } = require('./ai-validation.cjs');

async function authorize(req, env = process.env, request = fetch) {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_ANON_KEY;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !serviceKey) throw new HttpError(503, 'AUTH_NOT_CONFIGURED', 'El acceso seguro todavía no está configurado. Podés continuar estudiando con el material local.');
  const token = /^Bearer ([\w.-]+)$/.exec(req.headers.authorization || '')?.[1];
  if (!token) throw new HttpError(401, 'AUTH_REQUIRED', 'Iniciá sesión para utilizar la IA.');
  let resp;
  try {
    resp = await request(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(5000) });
  } catch { throw new HttpError(503, 'AUTH_UNAVAILABLE', 'No se pudo verificar la sesión. Reintentá.'); }
  if (!resp.ok) throw new HttpError(resp.status >= 500 ? 503 : 401, 'INVALID_SESSION', 'La sesión no pudo verificarse. Volvé a iniciar sesión.');
  const user = await resp.json();
  if (!user.id || !user.email_confirmed_at) throw new HttpError(403, 'EMAIL_NOT_VERIFIED', 'Verificá tu correo antes de utilizar la IA.');
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const ipHash = createHash('sha256').update(`${env.RATE_LIMIT_SALT || key}:${ip}`).digest('hex');
  let limit;
  try {
    limit = await request(`${url}/rest/v1/rpc/consume_ai_quota`, {
      method: 'POST', headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_user_id: user.id, p_ip_hash: ipHash }), signal: AbortSignal.timeout(5000)
    });
  } catch { throw new HttpError(503, 'QUOTA_UNAVAILABLE', 'No se pudo comprobar el límite de uso. Reintentá.'); }
  if (!limit.ok) throw new HttpError(503, 'QUOTA_UNAVAILABLE', 'El control de consumo no está disponible.');
  if (await limit.json() !== true) throw new HttpError(429, 'RATE_LIMIT_EXCEEDED', 'Alcanzaste el límite de consultas. Esperá un minuto.');
  return user;
}
module.exports = { authorize };
