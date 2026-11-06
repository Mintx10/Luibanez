const {test,expect}=require('@playwright/test');
const {mockAuth,ready,navigate,closeDialogs}=require('./helpers.cjs');
test('local Bomba, Impostor and Memotest open their own playable arenas',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await mockAuth(page);await ready(page);
 await navigate(page,'solo');await page.locator('#soloOpenBombaBtn').click();await page.locator('#closeBombaSetupModalBottomBtn').click();
 await closeDialogs(page);await expect(page.locator('#arenaBomba')).toBeVisible();await expect(page.locator('#bombaFase1Options button')).toHaveCount(4);
 await page.locator('#bombaFase1Options button').first().click();await expect(page.locator('#bombaFase1Options button.is-correct, #bombaFase1Options button.is-wrong')).toHaveCount(1);
 await navigate(page,'solo');await page.locator('#soloOpenImpostorBtn').click();await page.locator('#closeImpostorSetupModalBottomBtn').click();await closeDialogs(page);
 await expect(page.locator('#arenaImpostor')).toBeVisible();
 if(await page.locator('#impostorStartGameBtn').isVisible())await page.locator('#impostorStartGameBtn').click();
 await expect(page.locator('#impostorCardsGrid .impostor-card')).toHaveCount(4);await page.locator('#impostorCardsGrid .impostor-card').first().click();
 await navigate(page,'solo');await page.locator('#soloOpenMemotestBtn').click();await page.locator('#closeMemotestSetupModalBottomBtn').click();await closeDialogs(page);
 await expect(page.locator('#arenaMemotest')).toBeVisible();expect(await page.locator('#memotestGrid .memotest-card').count()).toBeGreaterThan(1);
 await page.locator('#memotestGrid .memotest-card').first().click();expect(errors).toEqual([]);
});
