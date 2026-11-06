const {test,expect}=require('@playwright/test');
test.use({serviceWorkers:'allow'});
test('production build loads hashed assets and preserves study data offline',async({page,context})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5501/#laboratorio');await page.waitForSelector('#accountToolsBtn');
 await expect(page.locator('script[type="module"]')).toHaveAttribute('src',/bootstrap\.[a-f0-9]{12}\.mjs$/);
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;await caches.open('another-application-cache');});
 await page.reload();await page.waitForSelector('#accountToolsBtn');
 await page.evaluate(async()=>{const script=[...document.scripts].find(s=>s.src.includes('bootstrap')).src;const base=script.slice(0,script.lastIndexOf('/')+1);const paths=await caches.open((await caches.keys()).find(k=>k.startsWith('luibanez-cache-'))).then(c=>c.keys());const storage=paths.find(r=>/storage\.[a-f0-9]+\.mjs/.test(r.url));const {studyStorage}=await import(storage.url);studyStorage.setItem('offline-proof','Conservado');});
 await context.setOffline(true);await page.reload();await page.waitForSelector('#accountToolsBtn');
 await expect(page.locator('#viewLaboratorio')).toHaveClass(/view--active/);
 expect(await page.evaluate(()=>Object.keys(localStorage).some(key=>localStorage.getItem(key)==='Conservado'))).toBe(true);
 expect(await page.evaluate(()=>caches.has('another-application-cache'))).toBe(true);
 expect(errors).toEqual([]);
});
