"use strict";
const CACHE_PREFIX = "luibanez-cache-";
const CACHE_NAME = CACHE_PREFIX + "v30.0.0";
const STATIC_ASSETS = [
  "./index.html", "./style.css?v=30.0.0", "./script.js?v=30.0.0",
  "./modules/bootstrap.mjs", "./modules/file-limits.mjs", "./modules/medical-data.mjs", "./modules/finance-generator.mjs", "./modules/finance-catalog.mjs", "./modules/results.mjs", "./modules/study-data.mjs", "./modules/database.mjs", "./modules/pwa.mjs", "./modules/finance-data.mjs", "./modules/math.mjs", "./modules/storage.mjs", "./modules/session.mjs", "./modules/ai-client.mjs",
  "./modules/cloud.mjs", "./modules/account-tools.mjs", "./modules/rooms.mjs", "./modules/online-game.mjs",
  "./modules/navigation.mjs", "./modules/pdf.mjs", "./modules/safe-html.mjs", "./vendor/dompurify.mjs", "./vendor/supabase.js", "./vendor/katex/katex.min.js", "./vendor/katex/katex.min.css", "./vendor/fontawesome/css/all.min.css", "./jszip.min.js", "./manifest.json", "./icon.svg", "./icon-192.png", "./icon-512.png"
];
const paths = new Set(STATIC_ASSETS.map(path => new URL(path, self.location.href).pathname));
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // A partial shell never activates. Retry the installation after network recovery.
    try { await cache.addAll(STATIC_ASSETS.map(path => new Request(path, { cache: "reload" }))); }
    catch (error) { await caches.delete(CACHE_NAME); throw error; }
  })());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const previous = [];
    for (const key of keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)) {
      if (await (await caches.open(key)).match('./index.html')) previous.push(key);
    }
    // Retain one complete previous shell for tabs still running its hashed modules.
    const keep = new Set([CACHE_NAME, ...previous.slice(-1)]);
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && !keep.has(key)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING" || event.data === "skipWaiting") self.skipWaiting();
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/") || url.pathname.endsWith("/version.json")) return;
  const vendorAsset = url.pathname.startsWith("/vendor/");
  const versionedAsset = /\.[a-f0-9]{12}\.(?:js|mjs|css)$/.test(url.pathname);
  if (event.request.mode !== "navigate" && !paths.has(url.pathname) && !vendorAsset && !versionedAsset) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Serve the installed shell and its modules as one version until the update is accepted.
    const cached = await cache.match(event.request.mode === "navigate" ? "./index.html" : event.request, { ignoreSearch: true });
    if (cached) return cached;
    if (versionedAsset) {
      for (const key of await caches.keys()) {
        if (!key.startsWith(CACHE_PREFIX)) continue;
        const previous = await (await caches.open(key)).match(event.request);
        if (previous) return previous;
      }
    }
    try { const response = await fetch(event.request); if (vendorAsset && response.ok) await cache.put(event.request, response.clone()); return response; }
    catch { return new Response("Recurso no disponible sin conexión.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
  })());
});
