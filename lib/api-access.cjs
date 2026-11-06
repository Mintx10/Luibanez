'use strict';
const { createHash } = require('node:crypto');
const { HttpError } = require('./ai-validation.cjs');

async function authorize(req, env = process.env, request = fetch) {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_ANON_KEY;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !serviceKey || !env.RATE_LIMIT_SALT || env.RATE_LIMIT_SALT.length < 32) throw new HttpError(503, 'AUTH_NOT_CONFIGURED', 'El acceso seguro todavía no está configurado. Podés continuar estudiando con el material local.');
  const header = req.headers.authorization || '';
  const token = header.length <= 8192 ? /^Bearer ([\w-]+\.[\w-]+\.[\w-]+)$/.exec(header)?.[1] : null;
  if (!token) throw new HttpError(401, 'AUTH_REQUIRED', 'Iniciá sesión para utilizar la IA.');
  let resp;
  try {
    resp = await request(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(5000) });
  } catch { throw new HttpError(503, 'AUTH_UNAVAILABLE', 'No se pudo verificar la sesión. Reintentá.'); }
  if (!resp.ok) throw new HttpError(resp.status >= 500 ? 503 : 401, 'INVALID_SESSION', 'La sesión no pudo verificarse. Volvé a iniciar sesión.');
  let user;
  try { user = await resp.json(); } catch { throw new HttpError(503, 'AUTH_UNAVAILABLE', 'La verificación de sesión devolvió una respuesta inválida. Reintentá.'); }
  if (!user?.id || user.is_anonymous || !user.email_confirmed_at) throw new HttpError(403, 'EMAIL_NOT_VERIFIED', 'Necesitás una cuenta de alumno con correo verificado para utilizar la IA.');
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const ipHash = createHash('sha256').update(`${env.RATE_LIMIT_SALT}:${ip}`).digest('hex');
  let limit;
  try {
    limit = await request(`${url}/rest/v1/rpc/consume_ai_quota_v2`, {
      method: 'POST', headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_user_id: user.id, p_ip_hash: ipHash }), signal: AbortSignal.timeout(5000)
    });
  } catch { throw new HttpError(503, 'QUOTA_UNAVAILABLE', 'No se pudo comprobar el límite de uso. Reintentá.'); }
  if (!limit.ok) throw new HttpError(503, 'QUOTA_UNAVAILABLE', 'El control de consumo no está disponible.');
  let quota;
  try { quota = await limit.json(); } catch { throw new HttpError(503, 'QUOTA_UNAVAILABLE', 'El control de consumo devolvió una respuesta inválida.'); }
  if (typeof quota?.allowed !== 'boolean') throw new HttpError(503, 'QUOTA_UNAVAILABLE', 'El control de consumo devolvió una respuesta inválida.');
  if (!quota.allowed) {
    const error = new HttpError(429, 'RATE_LIMIT_EXCEEDED', quota.reason === 'daily' ? 'Alcanzaste el límite diario de IA. Podés seguir estudiando con el material local.' : 'Alcanzaste el límite de consultas. Esperá un minuto.');
    error.retryAfter = Math.max(1, Math.min(86400, Number.isInteger(quota.retry_after) ? quota.retry_after : 60));
    throw error;
  }
  return user;
}
module.exports = { authorize };
