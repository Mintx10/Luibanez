const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateInput, validateOutput } = require('../lib/ai-validation.cjs');
const { generate } = require('../lib/ai-provider.cjs');
const { authorize } = require('../lib/api-access.cjs');
const handler = require('../api/gemini.js');
const {academicContext}=require('../lib/academic-context.cjs');
test('academic context validates career and subject and resolves personal subjects through owner RLS',async()=>{
 const result=await academicContext({careerId:'sistemas',subjectId:'sistemas-programacion-i'},{headers:{}});assert.equal(result.materia,'Programación I');
 await assert.rejects(()=>academicContext({careerId:'medicina',subjectId:'sistemas-programacion-i'},{headers:{}}),e=>e.code==='INVALID_SUBJECT');
 const request={headers:{authorization:'Bearer student-token'}},body={careerId:'sistemas',subjectId:'custom-44444444-4444-4444-8444-444444444444',contextoPDF:'Mis apuntes privados'};
 await assert.rejects(()=>academicContext(body,request,{},async()=>Response.json([])),e=>e.code==='SUBJECT_FORBIDDEN');
 const custom=await academicContext(body,request,{SUPABASE_URL:'https://test.supabase.co',SUPABASE_ANON_KEY:'public-key'},async(url,args)=>{assert.equal(args.headers.Authorization,request.headers.authorization);assert.ok(url.includes('career_id=eq.sistemas'));return Response.json([{id:body.subjectId,name:'Mi seminario',description:'Material propio'}]);});assert.equal(custom.materia,'Mi seminario');
});
const question = { pregunta: '¿Qué principio se aplica?', opciones: ['Primera opción completa', 'Segunda opción completa', 'Tercera opción completa', 'Cuarta opción completa'], respuestaCorrecta: 2, explicacion: 'Se conserva íntegramente la explicación.' };
test('request rejects malformed JSON, unknown types, oversized context and invalid indices', () => {
  for (const value of ['{', null, [], { tipoJuego: 'fake' }, { contextoPDF: 'a'.repeat(120001) }, { preguntasPrevias: [123] }, { cantidadPares: 3 }]) assert.throws(() => validateInput(value));
  assert.equal(validateInput({ tipoJuego: 'bolillero' }).tipoJuego, 'bolillero');
  assert.throws(() => validateOutput('bolillero', { ...question, respuestaCorrecta: 4 }));
  assert.throws(() => validateOutput('bolillero', { ...question, opciones: ['a', 'a', 'c', 'd'] }));
});
test('provider retries invalid content once and preserves the wording of answers', async () => {
  let calls = 0;
  const result = await generate({ tipoJuego: 'bolillero', parts: [{ text: 'Generate' }], apiKey: 'test', request: async () => {
    calls++; return Response.json({ candidates: [{ content: { parts: [{ text: JSON.stringify(calls === 1 ? {} : question) }] }, finishReason: 'STOP' }] });
  } });
  assert.equal(calls, 2); assert.deepEqual(result, question);
});
test('provider stops after two bad replies and fails fast on invalid credentials', async () => {
  let calls = 0;
  await assert.rejects(generate({ tipoJuego: 'bomba', parts: [], apiKey: 'test', request: async () => { calls++; return Response.json({ candidates: [] }); } }), { code: 'INVALID_AI_RESPONSE' });
  assert.equal(calls, 2); calls = 0;
  await assert.rejects(generate({ tipoJuego: 'bomba', parts: [], apiKey: 'test', request: async () => { calls++; return new Response('', { status: 403 }); } }), { code: 'AI_CONFIGURATION' });
  assert.equal(calls, 1);
});
test('all activity output contracts reject missing fields', () => {
  for (const type of require('../lib/ai-validation.cjs').TYPES) assert.throws(() => validateOutput(type, {}));
  assert.equal(validateOutput('bomba', { fase1: question, fase2: question, fase3: question }).fase1, question);
});
test('authorization verifies user remotely then consumes persistent quota as service role', async () => {
  const requests = [];
  const env = { SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'public', SUPABASE_SERVICE_ROLE_KEY: 'private', RATE_LIMIT_SALT: 's'.repeat(64) };
  const req = { headers: { authorization: 'Bearer aaa.bbb.ccc', 'x-forwarded-for': 'forged' }, socket: { remoteAddress: '127.0.0.1' } };
  const request = async (url, options) => { requests.push({ url, options }); return requests.length === 1 ? Response.json({ id: 'verified-user', email_confirmed_at: 'today' }) : Response.json({allowed:true,retry_after:0}); };
  assert.equal((await authorize(req, env, request)).id, 'verified-user');
  assert.equal(requests[0].options.headers.Authorization, 'Bearer aaa.bbb.ccc');
  assert.equal(requests[1].options.headers.Authorization, 'Bearer private');
  assert.equal(JSON.parse(requests[1].options.body).p_user_id, 'verified-user');
  assert.equal(JSON.parse(requests[1].options.body).p_ip_hash.length, 64);
  await assert.rejects(authorize({ headers: {} }, env, request), { status: 401 });
});
test('quota and auth failure never allow provider consumption', async () => {
  const env = { SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'public', SUPABASE_SERVICE_ROLE_KEY: 'private', RATE_LIMIT_SALT: 's'.repeat(64) };
  let calls = 0;
  await assert.rejects(authorize({ headers: { authorization: 'Bearer aaa.bbb.ccc' } }, env, async () => ++calls === 1 ? Response.json({ id: 'u', email_confirmed_at: 'today' }) : Response.json({allowed:false,retry_after:60,reason:"minute"})), { status: 429 });
  await assert.rejects(authorize({ headers: { authorization: 'Bearer aaa.bbb.ccc' } }, env, async () => new Response('', { status: 401 })), { status: 401 });
});
test('gateway returns safe health, rejects wrong origins, content types, and malformed bodies', async () => {
  async function run(req) {
    const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; }, end() { return this; } };
    await handler({ headers: {}, ...req }, res); return res;
  }
  assert.deepEqual((await run({ method: 'GET' })).body, { status: 'ok', service: 'Luibañez AI' });
  assert.equal((await run({ method: 'POST', headers: { origin: 'https://evil.example' } })).statusCode, 403);
  assert.equal((await run({ method: 'POST' })).statusCode, 415);
  assert.equal((await run({ method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' })).statusCode, 400);
  assert.equal((await run({ method: 'DELETE' })).statusCode, 405);
});
