'use strict';
const { HttpError, validateOutput } = require('./ai-validation.cjs');

async function generate({ parts, tipoJuego, apiKey, request = fetch, timeoutMs = 24000, env = process.env }) {
  const deadline = Date.now() + timeoutMs;
  const primary = env.GEMINI_PRIMARY_MODEL || 'gemini-3.5-flash-lite';
  const fallback = env.GEMINI_FALLBACK_MODEL || primary;
  const models = [primary, fallback];
  if (models.some(model => !/^[a-z0-9][a-z0-9.-]{1,99}$/.test(model))) throw new HttpError(503, 'AI_CONFIGURATION', 'Configuración de modelo inválida.');
  let lastError;
  for (let attempt = 0; attempt < 2 && Date.now() < deadline; attempt++) {
    try {
      const remaining = deadline - Date.now();
      const resp = await request(`https://generativelanguage.googleapis.com/v1beta/models/${models[attempt]}:generateContent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        signal: AbortSignal.timeout(Math.max(1, Math.min(12000, remaining))),
        body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseMimeType: 'application/json', temperature: attempt ? 0.2 : 0.4, maxOutputTokens: 8192 } })
      });
      if (!resp.ok) {
        if (resp.status === 400 || resp.status === 401 || resp.status === 403) throw new HttpError(503, 'AI_CONFIGURATION', 'El servicio de IA necesita revisar su configuración.');
        throw new HttpError(502, 'AI_UNAVAILABLE', 'El servicio de IA está ocupado. Reintentá.');
      }
      const payload = await resp.json();
      const candidate = payload.candidates?.[0];
      if (candidate?.finishReason && candidate.finishReason !== 'STOP') throw new Error('Incomplete generation');
      const raw = candidate?.content?.parts?.filter(p => !p.thought).map(p => p.text || '').join('').trim() || '';
      const data = JSON.parse(raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, ''));
      return validateOutput(tipoJuego, data);
    } catch (error) {
      lastError = error;
      if (error.code === 'AI_CONFIGURATION') break;
    }
  }
  if (lastError instanceof HttpError) throw lastError;
  throw new HttpError(502, 'INVALID_AI_RESPONSE', 'No se obtuvo una respuesta válida de la IA. Podés reintentar.');
}
module.exports = { generate };
