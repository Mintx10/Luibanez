const {test,expect}=require('@playwright/test');
const {mockAuth,mockUser,ready,closeDialogs}=require('./helpers.cjs');
const {createBackend}=require('./postgres-backend.cjs');
test('two authenticated sessions create, join, play and leave a server-authorized room',async({page,context})=>{
 test.setTimeout(75000);
 const host={...mockUser,user_metadata:{apodo:'Anfitrión',carrera:'General'}};
 const guest={...mockUser,id:'22222222-2222-4222-8222-222222222222',user_metadata:{apodo:'Compañero',carrera:'General'}};
 const backend=await createBackend([host,guest]);
 const other=await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(error.message));other.on('pageerror',error=>errors.push(error.message));
 try{
  await backend.connect(page,host);await backend.connect(other,guest);await mockAuth(page,host,true);await mockAuth(other,guest,true);
  await ready(page,'#juntos');await ready(other,'#juntos');
  await page.locator('#dueloOpenCreateModalBtn').click();
  await page.locator('.duelo-game-card[data-game="impostor"]').click();
  await page.locator('.duelo-format-card[data-mode="versus"]').click();
  await page.locator('#dueloCreateRoomBtn').click();
  await expect(page.locator('#dueloOnlineWaitingRoom')).toBeVisible();
  const code=(await page.locator('#dueloWaitingRoomCode').innerText()).trim();expect(code).toMatch(/^[A-Z2-9]{5}$/);
  // Join through the public lobby's real action, using the PostgreSQL-backed directory.
  await other.reload();await other.waitForSelector('#accountToolsBtn');
  await expect(other.locator('.lobby-card-enter-btn')).toHaveCount(1,{timeout:12000});
  await other.locator('.lobby-card-enter-btn').click();
  await expect(other.locator('#dueloOnlineWaitingRoom')).toBeVisible();
  await other.locator('#dueloGuestReadyBtn').click();
  await expect(page.locator('#dueloLaunchOnlineMatchBtn')).toBeEnabled({timeout:15000});
  await page.locator('#dueloLaunchOnlineMatchBtn').click();
  await expect(page.locator('#arenaOnlineSecure')).toBeVisible({timeout:15000});
  await expect(other.locator('#arenaOnlineSecure')).toBeVisible({timeout:15000});
  await expect(page.locator('#secureGameTitle')).toContainText(/impostor/i);
  const correct=other.locator('#secureGameOptions [data-index="3"]');await correct.click();
  await expect(other.locator('#secureGameProgress')).toContainText(/(?:10|15) pts/);
  await expect(other.locator('#secureGameQuestion')).toContainText('registrado');
  await other.reload(); await other.waitForSelector('#accountToolsBtn'); await expect(other.locator('#secureGameProgress')).toContainText(/(?:10|15) pts/,{timeout:12000});
  await other.locator('#secureGameReturn').click();await expect(other.locator('#dueloOnlineWaitingRoom')).toBeVisible();
  await other.locator('#dueloLeaveOnlineRoomBtn').click();await expect(other.locator('#dueloOnlineWaitingRoom')).not.toBeVisible();
  expect(errors).toEqual([]);
 }finally{await page.close();await other.close();await backend.close();}
});
