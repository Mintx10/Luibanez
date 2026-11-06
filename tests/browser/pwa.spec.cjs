const {test,expect}=require('@playwright/test');
test.use({serviceWorkers:'allow'});
test('production build loads hashed assets and preserves study data offline',async({page,context})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5501/#bolillero');await page.waitForSelector('#accountToolsBtn');
 await expect(page.locator('script[type="module"]')).toHaveAttribute('src',/bootstrap\.[a-f0-9]{12}\.mjs$/);
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;await caches.open('another-application-cache');});
 await page.reload();await page.waitForSelector('#accountToolsBtn');
 await page.locator('#newListButton').click();await page.locator('#listNameInput').fill('Materia offline');await page.locator('#saveListButton').click();
 await context.setOffline(true);await page.reload();await page.waitForSelector('#accountToolsBtn');
 await expect(page.locator('#listsContainer')).toContainText(/materia offline/i);
 expect(await page.evaluate(()=>caches.has('another-application-cache'))).toBe(true);
 expect(errors).toEqual([]);
});
