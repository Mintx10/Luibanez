const {test,expect}=require('@playwright/test');
const {mockAuth,mockUser,ready,closeDialogs}=require('./helpers.cjs');
const {studyPDF}=require('./pdf-fixture.cjs');
const JSZip=require('../../jszip.min.js');
test('text and PDF uploads extract real text, persist, and can be removed',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await mockAuth(page,mockUser);await ready(page,'#bolillero');await closeDialogs(page);
 await page.locator('#bolilleroPdfFileInput').setInputFiles([{name:'estudio.txt',mimeType:'text/plain',buffer:Buffer.from('Media: suma de valores dividida por cantidad.\nVarianza: medida de dispersion de las observaciones de una muestra.\nProbabilidad: estudio de sucesos aleatorios en un experimento controlado.')}]);
 await expect(page.locator('#bolilleroMultiPdfList')).toContainText('estudio.txt');
 await page.locator('#bolilleroPdfFileInput').setInputFiles([{name:'estudio.pdf',mimeType:'application/pdf',buffer:studyPDF()}]);
 await expect(page.locator('#bolilleroMultiPdfList')).toContainText('estudio.pdf',{timeout:15000});
 const word=new JSZip();word.file('word/document.xml','<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Contenido real de Word para verificar la lectura del documento de estudio.</w:t></w:r></w:p></w:body></w:document>');
 const slides=new JSZip();slides.file('ppt/slides/slide1.xml','<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:t>Contenido real de una diapositiva de estudio.</a:t></p:sld>');
 await page.locator('#bolilleroPdfFileInput').setInputFiles([
  {name:'estudio.docx',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',buffer:await word.generateAsync({type:'nodebuffer',compression:'DEFLATE'})},
  {name:'estudio.pptx',mimeType:'application/vnd.openxmlformats-officedocument.presentationml.presentation',buffer:await slides.generateAsync({type:'nodebuffer',compression:'DEFLATE'})}
 ]);
 await expect(page.locator('#bolilleroMultiPdfList')).toContainText('estudio.pptx');
 await page.reload();await page.waitForSelector('#accountToolsBtn');
 await expect(page.locator('#bolilleroMultiPdfCount')).toContainText('4 de 4');
 const data=await page.evaluate(async()=>{const {readValue}=await import('/modules/database.mjs');return readValue('apuntesColeccion')});
 expect(data.find(doc=>doc.nombre==='estudio.pdf').texto).toContain('Variance measures dispersion');
 expect(data.find(doc=>doc.nombre==='estudio.docx').texto).toContain('Contenido real de Word');
 expect(data.find(doc=>doc.nombre==='estudio.pptx').texto).toContain('Contenido real de una diapositiva');
 await page.locator('#bolilleroOpenSetupBtn').click();
 await page.locator('#bolilleroMultiPdfList .setup-multi-pdf-item__remove').first().click();
 await expect(page.locator('#bolilleroMultiPdfCount')).toContainText('3 de 3');
 expect(errors).toEqual([]);
});
test('offline document changes and deletions remain queued and retry when connected',async({page,context})=>{
 await mockAuth(page,mockUser);await ready(page,'#bolillero');
 await context.setOffline(true);
 await page.locator('#bolilleroPdfFileInput').setInputFiles([{name:'pendiente.txt',mimeType:'text/plain',buffer:Buffer.from('Material guardado sin conexion para probar la sincronizacion de documentos de este usuario.')}]);
 await expect(page.locator('#bolilleroMultiPdfList')).toContainText('pendiente.txt');
 await expect(page.locator('#cloudSyncStatus')).toContainText('pendiente');
 await page.locator('#bolilleroOpenSetupBtn').click();await page.locator('#bolilleroMultiPdfList .setup-multi-pdf-item__remove').click();
 await expect.poll(()=>page.evaluate(async()=>{const {readValue}=await import('/modules/database.mjs');return (await readValue('cloud-pending-v1')||[]).some(item=>item.kind==='delete')})).toBe(true);
 await context.setOffline(false);
 await expect.poll(()=>page.evaluate(async()=>{const {readValue}=await import('/modules/database.mjs');return (await readValue('cloud-pending-v1')||[]).length})).toBe(0);
 expect(await page.evaluate(()=>window.__authCalls.some(call=>call.name==='eq'&&call.args[0]==='user_id'&&call.args[1]==='11111111-1111-4111-8111-111111111111'))).toBe(true);
});
test('unsafe dynamic HTML is sanitized while delegated actions remain callable',async({page})=>{
 await mockAuth(page,mockUser);await ready(page);
 const result=await page.evaluate(async()=>{
  const {setHTML}=await import('/modules/safe-html.mjs');const element=document.createElement('div');document.body.append(element);
  window.__xss=0;let calls=0;window.eliminarAsientoContable=()=>calls++;
  setHTML(element,'<img src=x onerror="window.__xss=1"><script>window.__xss=1</script><button data-study-click="eliminarAsientoContable(1)">Acción</button>');
  element.querySelector('button').click();const safe=!element.querySelector('[onerror],script');element.remove();return{safe,calls,xss:window.__xss};
 });
 expect(result).toEqual({safe:true,calls:1,xss:0});
});
