'use strict';
const fs=require('node:fs');
const {chromium}=require('@playwright/test');
const {mockAuth,mockUser,ready}=require('../tests/browser/helpers.cjs');
async function audit(){
 const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
 const selectors=[...fs.readFileSync('script.js','utf8').matchAll(/\.closest\(["']([^"']+)["']\)/g)].map(match=>match[1]);
 try{
  for(const carrera of [null,'Medicina','Licenciatura en Finanzas']){
   const context=await browser.newContext({baseURL:'http://127.0.0.1:5500'});const page=await context.newPage();
   await page.addInitScript(()=>{const original=EventTarget.prototype.addEventListener;const map=new WeakMap();window.__registeredEvents=map;EventTarget.prototype.addEventListener=function(type,handler,options){const events=map.get(this)||new Set();events.add(type);map.set(this,events);return original.call(this,type,handler,options)}});
   await mockAuth(page,carrera?{...mockUser,user_metadata:{apodo:'Auditoría',carrera}}:null);await ready(page);await page.waitForTimeout(400);
   const views=carrera==='Medicina'?['med-interna','farmacologia-2','salud-publica']:carrera?['fin-filosofia','fin-sfi','fin-historia','fin-estadistica','fin-contabilidad']:['home','solo','bolillero','laboratorio','fama'];
   for(const view of views){
    await page.evaluate(view=>window.cambiarVista(view),view);
    const controls=await page.evaluate(selectors=>{
     const events=window.__registeredEvents;
     return [...document.querySelectorAll('button')].map(element=>{
      const own=element.onclick||events.get(element)?.has('click');
      const form=element.type==='submit'&&element.form&&(element.form.onsubmit||events.get(element.form)?.has('submit'));
      const delegated=element.closest('[data-study-click]')||selectors.some(selector=>{try{return element.matches(selector)}catch{return false}});
      let ancestor=element.parentElement;while(ancestor&&ancestor!==document.body&&!events.get(ancestor)?.has('click'))ancestor=ancestor.parentElement;
      const handler=own?'click':form?'submit':delegated?'delegado por selector':ancestor&&ancestor!==document.body?'delegado en contenedor':null;
      return{id:element.id||null,label:element.getAttribute('aria-label')||element.title||element.textContent.trim().slice(0,100),handler};
     });
    },selectors);
    results.push({profile:carrera||'Invitado',view,controls});
   }
   await context.close();
  }
 }finally{await browser.close();}
 const missing=results.flatMap(result=>result.controls.filter(control=>!control.handler).map(control=>({profile:result.profile,view:result.view,...control})));
 fs.mkdirSync('audit',{recursive:true});fs.writeFileSync('audit/browser-controls.json',JSON.stringify({method:'Registro de eventos: comprueba conexión de controles, no certifica todos los efectos o servicios externos.',results,missing},null,2)+'\n');
 console.log(`${results.length} vistas/perfiles auditados; ${missing.length} botones sin acción registrada.`);
 if(missing.length){console.log(missing);process.exitCode=1;}
}
audit().catch(error=>{console.error(error.message);process.exitCode=1});
