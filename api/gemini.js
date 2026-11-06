"use strict";
const { HttpError, validateInput } = require('../lib/ai-validation.cjs');
const { authorize } = require('../lib/api-access.cjs');
const { buildPrompt } = require('../lib/ai-prompts.cjs');
const { generate } = require('../lib/ai-provider.cjs');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Vary', 'Origin');
  const origin = req.headers.origin;
  const allowed = new Set(['https://luibanez.vercel.app', 'http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500', ...(process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)]);
  if (origin && !allowed.has(origin)) return res.status(403).json({ error: 'Origen no autorizado.', code: 'FORBIDDEN_ORIGIN' });
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method === 'GET') return res.status(200).json({ status: 'ok', service: 'Luibañez AI' });
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST, OPTIONS'); return res.status(405).json({ error: 'Método no permitido.' }); }
  try {
    if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) throw new HttpError(415, 'JSON_REQUIRED', 'Utilizá Content-Type: application/json.');
    if (Number(req.headers['content-length'] || 0) > 4_000_000) throw new HttpError(413, 'BODY_TOO_LARGE', 'La solicitud supera el límite de 4 MB.');
    const body = validateInput(req.body);
    await authorize(req);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new HttpError(503, 'AI_NOT_CONFIGURED', 'El servicio de IA todavía no está configurado.');
    const parts = [];
    if (body.imagenBase64) {
      const match = /^data:(image\/(?:png|jpeg|webp));base64,(.*)$/.exec(body.imagenBase64);
      parts.push({ inline_data: { mime_type: match?.[1] || 'image/png', data: match?.[2] || body.imagenBase64 } });
    }
    parts.push({ text: buildPrompt(body) });
    const data = await generate({ parts, tipoJuego: body.tipoJuego, apiKey });
    return res.status(200).json({ ok: true, tipoJuego: body.tipoJuego, materia: body.materia || 'General', tema: body.tema || 'Conceptos Generales', tienePDF: Boolean(body.contextoPDF), data });
  } catch (error) {
    if (error.status === 429) res.setHeader('Retry-After', '60');
    if (!(error instanceof HttpError)) console.error('[AI] Unexpected error:', error.name);
    return res.status(error.status || 500).json({ error: error instanceof HttpError ? error.message : 'Error interno al procesar la solicitud.', code: error.code || 'INTERNAL_ERROR' });
  }
};
