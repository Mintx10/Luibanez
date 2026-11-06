export function initializePWA(version) {
  if (!('serviceWorker' in navigator)) return;
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing && sessionStorage.getItem('user_requested_update') === 'true') {
      refreshing = true; sessionStorage.removeItem('user_requested_update'); location.reload();
    }
  });
  navigator.serviceWorker.register(`./sw.js?v=${version}`, { updateViaCache: 'none' }).then(registration => {
    const update = () => { if (navigator.onLine) registration.update().catch(() => {}); };
    update();
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') update(); });
    const timer = setInterval(update, 300000);
    window.addEventListener('pagehide', () => clearInterval(timer), { once: true });
  }).catch(error => console.warn('[PWA] No se pudo preparar el modo offline:', error.message));
}
