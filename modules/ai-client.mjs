import { authHeaders } from './session.mjs';
const inFlight = new Map();
const cache = new Map();
export async function requestAI(payload) {
  const headers = await authHeaders();
  // Memory only: private material is never put in a shared cloud cache.
  const keyBytes = new TextEncoder().encode(JSON.stringify(payload));
  const key = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', keyBytes)), b => b.toString(16).padStart(2, '0')).join('');
  const cacheable = !payload.preguntasPrevias?.length && !payload.instruccionUsuario && !['evaluacion_clinica', 'evaluacion_examen_finanzas', 'modelo_examen_finanzas'].includes(payload.tipoJuego);
  const saved = cache.get(key);
  if (cacheable && saved && Date.now() - saved.at < 60000) return structuredClone(saved.value);
  if (inFlight.has(key)) return inFlight.get(key);
  const request = (async () => {
    const response = await fetch('/api/gemini', { method: 'POST', headers, body: JSON.stringify(payload), signal: AbortSignal.timeout(40000), cache: 'no-store' });
    const json = await response.json().catch(() => ({}));
    if (!response.ok || json.ok !== true || !json.data) throw new Error(json.error || `No se pudo consultar la IA (${response.status}).`);
    if (cacheable) { if (cache.size >= 20) cache.delete(cache.keys().next().value); cache.set(key, { at: Date.now(), value: structuredClone(json.data) }); }
    return json.data;
  })();
  inFlight.set(key, request);
  try { return await request; } finally { inFlight.delete(key); }
}
