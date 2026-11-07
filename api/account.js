'use strict';
const {accountAction}=require('../lib/accounts.cjs');
const {HttpError}=require('../lib/ai-validation.cjs');
const {allowedOrigins}=require('../lib/api-security.cjs');
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Vary','Origin');
 const origin=req.headers.origin;
 if(origin&&!allowedOrigins().has(origin))return res.status(403).json({error:'Origen no autorizado.',code:'FORBIDDEN_ORIGIN'});
 if(origin)res.setHeader('Access-Control-Allow-Origin',origin);
 res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS')return res.status(204).end();
 if(req.method!=='POST'){res.setHeader('Allow','POST, OPTIONS');return res.status(405).json({error:'Método no permitido.'});}
 try{
  if(!/^application\/json(?:;|$)/i.test(req.headers['content-type']||''))throw new HttpError(415,'JSON_REQUIRED','La solicitud debe usar JSON.');
  if(Number(req.headers['content-length']||0)>16000)throw new HttpError(413,'BODY_TOO_LARGE','La solicitud es demasiado grande.');
  return res.status(200).json(await accountAction(req));
 }catch(error){
  if(error.status===429)res.setHeader('Retry-After',String(error.retryAfter||600));
  // Credentials, recovery secrets and provider bodies must never reach logs.
  return res.status(error instanceof HttpError?error.status:500).json({error:error instanceof HttpError?error.message:'No se pudo completar el acceso. Reintentá.',code:error instanceof HttpError?error.code:'INTERNAL_ERROR'});
 }
};
