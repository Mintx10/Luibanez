'use strict';
const catalog=require('../catalog.json');
const {HttpError}=require('./ai-validation.cjs');
async function academicContext(body,req,env=process.env,request=fetch){
 if(!body.careerId&&!body.subjectId)return body;
 const career=catalog.careers.find(c=>c.id===body.careerId);
 if(!career)throw new HttpError(400,'INVALID_CAREER','Elegí una carrera del catálogo.');
 let subject=career.subjects.find(s=>s.id===body.subjectId);
 if(body.subjectId&&!subject){
  if(!/^custom-[0-9a-f-]{36}$/.test(body.subjectId))throw new HttpError(400,'INVALID_SUBJECT','La materia no corresponde a la carrera.');
  let response;
  try{response=await request(`${env.SUPABASE_URL}/rest/v1/study_custom_subjects?id=eq.${body.subjectId}&career_id=eq.${career.id}&select=id,name,description&limit=1`,{headers:{apikey:env.SUPABASE_ANON_KEY,Authorization:req.headers.authorization},signal:AbortSignal.timeout(5000)});}catch{throw new HttpError(503,'SUBJECT_UNAVAILABLE','No se pudo verificar tu materia personal.');}
  if(!response.ok)throw new HttpError(503,'SUBJECT_UNAVAILABLE','No se pudo verificar tu materia personal.');
  let rows;try{rows=await response.json();}catch{throw new HttpError(503,'SUBJECT_UNAVAILABLE','Respuesta inválida al verificar la materia.');}
  if(!Array.isArray(rows)||rows.length!==1)throw new HttpError(403,'SUBJECT_FORBIDDEN','La materia personal no pertenece a tu perfil.');
  subject=rows[0];
  if(!body.contextoPDF?.trim())throw new HttpError(400,'MATERIAL_REQUIRED','Agregá tus apuntes antes de generar práctica para una materia personal.');
 }
 return {...body,materia:subject?.name||career.name,instruccionUsuario:`Carrera: ${career.name}. Materia: ${subject?.name||'práctica libre'}. Base universitaria general, no programa oficial. ${subject?.description||''}\n${body.instruccionUsuario||''}`};
}
module.exports={academicContext};
