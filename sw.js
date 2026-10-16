const CACHE_NAME = "luibanez-cache-v29.53";
const STATIC_ASSETS = [
    "./",
    "./index.html",
    "./style.css?v=29.53",
    "./script.js?v=29.53",
    "./version.json",
    "./mqtt.min.js",
    "./jszip.min.js",
    "./manifest.json",
    "./icon.svg",
    "./icon-192.png",
    "./icon-512.png"
];

// 1. INSTALACIÓN: Precarga de recursos esenciales livianos
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

// 2. ACTIVACIÓN: Purga total de cachés anteriores
self.addEventListener("activate", (evento) => {
    evento.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => {
                    return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("message", (evento) => {
    if (evento.data && (evento.data.type === "SKIP_WAITING" || evento.data === "skipWaiting")) {
        self.skipWaiting();
    }
});

// 3. FETCH: Network-First con ignoreSearch para que funcione offline con ?v=
self.addEventListener("fetch", (evento) => {
    if (!evento.request.url.startsWith(self.location.origin)) {
        return;
    }

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
                return caches.match(evento.request, { ignoreSearch: true }).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    if (evento.request.mode === "navigate") {
                        return caches.match("./index.html", { ignoreSearch: true }).then(res => res || caches.match("./"));
                    }
                });
            })
    );
});