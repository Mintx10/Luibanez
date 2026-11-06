'use strict';

const TYPES = new Set(['bolillero', 'bomba', 'impostor', 'memotest', 'temas_bolillero', 'palabras_bolillero', 'laboratorio', 'pizarron_ocr', 'evaluacion_clinica', 'evaluacion_examen_finanzas', 'modelo_examen_finanzas']);
class HttpError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
function validateInput(raw) {
  let body;
  try { body = typeof raw === 'string' ? JSON.parse(raw) : raw; }
  catch { throw new HttpError(400, 'INVALID_JSON', 'El cuerpo no contiene JSON válido.'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'INVALID_BODY', 'Enviá un objeto JSON.');
  if (Buffer.byteLength(JSON.stringify(body)) > 4_000_000) throw new HttpError(413, 'BODY_TOO_LARGE', 'El material supera el límite de 4 MB.');
  const limits = { materia: 150, tema: 400, contextoPDF: 120000, dificultad: 50, instruccionUsuario: 1500, prompt: 16000, casoClinico: 24000, diagnosticoOficial: 24000, diagnosticoEstudiante: 24000, imagenBase64: 3_600_000 };
  limits.careerId=40;limits.subjectId=120;
  for (const [key, max] of Object.entries(limits)) {
    if (body[key] !== undefined && (typeof body[key] !== 'string' || body[key].length > max)) throw new HttpError(400, 'INVALID_FIELD', `El campo ${key} debe ser texto de hasta ${max} caracteres.`);
  }
  if (!TYPES.has(body.tipoJuego || 'bolillero')) throw new HttpError(400, 'INVALID_GAME', 'Tipo de actividad desconocido.');
  if (body.preguntasPrevias !== undefined && (!Array.isArray(body.preguntasPrevias) || body.preguntasPrevias.length > 30 || body.preguntasPrevias.some(p => typeof p !== 'string' || p.length > 350))) throw new HttpError(400, 'INVALID_HISTORY', 'Historial de preguntas inválido.');
  for (const [key, min, max] of [['cantidadTemas', 1, 50], ['cantidadPares', 4, 12]]) {
    if (body[key] !== undefined && (!Number.isInteger(body[key]) || body[key] < min || body[key] > max)) throw new HttpError(400, 'INVALID_COUNT', `${key} debe estar entre ${min} y ${max}.`);
  }
  if (body.imagenBase64 && !/^(?:data:image\/(?:png|jpeg|webp);base64,)?[A-Za-z0-9+/]+={0,2}$/.test(body.imagenBase64)) throw new HttpError(400, 'INVALID_IMAGE', 'Imagen base64 inválida.');
  return { ...body, tipoJuego: body.tipoJuego || 'bolillero' };
}
const text = value => typeof value === 'string' && value.trim().length > 0;
const list = (value, min, max, check) => Array.isArray(value) && value.length >= min && value.length <= max && value.every(check);
const score = n => Number.isFinite(n) && n >= 0 && n <= 100;
function choice(q) {
  return q && text(q.pregunta) && list(q.opciones, 4, 4, text) && new Set(q.opciones.map(o => o.trim().toLowerCase())).size === 4 && Number.isInteger(q.respuestaCorrecta) && q.respuestaCorrecta >= 0 && q.respuestaCorrecta < 4 && text(q.explicacion);
}
function validateOutput(type, data) {
  let valid = data && typeof data === 'object' && !Array.isArray(data);
  if (valid) switch (type) {
    case 'bolillero': valid = choice(data); break;
    case 'bomba': valid = ['fase1', 'fase2', 'fase3'].every(k => choice(data[k])); break;
    case 'impostor': valid = list(data.casos, 1, 20, q => choice({ ...q, pregunta: q.pregunta || q.titulo || 'Caso' })); break;
    case 'memotest': valid = list(data.pares, 4, 12, p => p && text(p.concepto) && text(p.definicion)); break;
    case 'temas_bolillero': case 'palabras_bolillero': valid = list(data.palabras, 1, 50, text); break;
    case 'laboratorio': valid = text(data.titulo) && text(data.enunciado) && list(data.preguntas, 1, 12, q => q && text(q.texto) && Number.isFinite(q.esperado) && Number.isFinite(q.tolerancia) && q.tolerancia >= 0 && text(q.explicacion)); break;
    case 'pizarron_ocr': valid = text(data.consejo) && list(data.formulas, 0, 50, q => q && text(q.titulo) && text(q.manuscrito) && text(q.latex) && typeof q.resultado === 'string' && text(q.explicacion)); break;
    case 'evaluacion_clinica': valid = typeof data.diagnosticoCorrecto === 'boolean' && score(data.puntaje) && ['veredicto', 'analisisFisiopatologico', 'conductaTerapeuticaSugerida', 'consejoDocente'].every(k => text(data[k])) && list(data.aciertos, 0, 50, text) && list(data.erroresUOmitidos, 0, 50, text); break;
    case 'evaluacion_examen_finanzas': valid = score(data.puntaje100) && Number.isInteger(data.notaUade) && data.notaUade >= 1 && data.notaUade <= 10 && text(data.resumenGeneral) && list(data.correccionesPorPunto, 1, 50, q => q && Number.isInteger(q.numero) && Number.isFinite(q.puntajeMax) && Number.isFinite(q.puntajeObtenido) && q.puntajeObtenido >= 0 && q.puntajeObtenido <= q.puntajeMax && text(q.comentario)); break;
    case 'modelo_examen_finanzas': valid = list(data.consignas, 1, 30, q => q && text(q.pregunta) && Number.isFinite(q.puntos) && q.puntos > 0); break;
    default: valid = false;
  }
  if (!valid) throw new HttpError(502, 'INVALID_AI_RESPONSE', 'La IA devolvió contenido incompleto. Volvé a intentar.');
  return data;
}
module.exports = { HttpError, TYPES, validateInput, validateOutput };
