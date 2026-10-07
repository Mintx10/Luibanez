const CACHE_NAME = "luibanez-cache-v29.11";
const STATIC_ASSETS = [
    "./",
    "./index.html",
    "./style.css?v=29.11",
    "./script.js?v=29.11",
    "./ivan_doctor.mp4",
    "./ivan_doctor.png",
    "./ivan_avatar_head.png",
    "./ivan_doctor_transparent.png",
    "./version.json",
    "./mqtt.min.js",
    "./jszip.min.js",
    "./manifest.json",
    "./icon.svg",
    "./icon-192.png",
    "./icon-512.png"
];

// 1. INSTALACIÓN: Precarga forzando recarga de red (sin usar caché HTTP previo)
self.addEventListener("install", (evento) => {
    evento.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                STATIC_ASSETS.map((url) => {
                    const req = new Request(url, { cache: "reload" });
                    return fetch(req)
                        .then((res) => {
                            if (res.ok) return cache.put(url, res);
                        })
                        .catch((err) => {
                            console.warn("No se pudo precachear recurso:", url, err);
                        });
                })
            );
        })
    );
    self.skipWaiting();
});

// 2. ACTIVACIÓN: Purga total inmediata de cachés anteriores y toma control
self.addEventListener("activate", (evento) => {
    evento.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => {
                    console.log("Purgando caché vieja de Luibañez:", key);
                    return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

// Mensaje para forzar activación inmediata desde el cliente
self.addEventListener("message", (evento) => {
    if (evento.data && (evento.data.type === "SKIP_WAITING" || evento.data === "skipWaiting")) {
        self.skipWaiting();
    }
});

// 3. FETCH: Network-First con fallback a caché para offline
self.addEventListener("fetch", (evento) => {
    // No interceptar peticiones externas (CDN, fuentes, etc.)
    if (!evento.request.url.startsWith(self.location.origin)) {
        return;
    }

    // Bypass total para APIs serverless y version.json
    if (evento.request.url.includes("/api/") || evento.request.url.includes("version.json")) {
        return;
    }

    evento.respondWith(
        fetch(evento.request, { cache: "no-cache" })
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(evento.request, responseToCache);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(evento.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    if (evento.request.mode === "navigate") {
                        return caches.match("./index.html").then(res => res || caches.match("./"));
                    }
                });
            })
    );
});
