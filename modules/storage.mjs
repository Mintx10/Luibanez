let scope = 'guest';
const sharedKeys = new Set(['luibanez-theme', 'bolillero_perf_mode', 'luibanez_drawer_mode', 'luibanez_home_view_mode', 'luibanez_bolillero_mode']);
export function setStorageScope(userId) { scope = userId || 'guest'; }
export function storageKey(key) { return sharedKeys.has(key) ? key : `luibanez:v30:${scope}:${key}`; }
export function databaseName() { return `LuibanezStorage-v30-${scope}`; }
export const studyStorage = {
  getItem(key) { try { return localStorage.getItem(storageKey(key)); } catch { return null; } },
  setItem(key, value) {
    try { localStorage.setItem(storageKey(key), value); }
    catch (cause) { window.dispatchEvent(new CustomEvent('study:storage-error', { detail: cause })); throw cause; }
  },
  removeItem(key) { localStorage.removeItem(storageKey(key)); }
};

// Never read legacy identity, PINs, API keys, or another user's v30 namespace.
const legacyKeys = ['bolillero-estudio-v3', 'bolillero-pomodoro-config', 'luibanez-duelo-historial', 'luibanez_finanzas_examenes_v1', 'luibanez_finanzas_borradores_v1', 'luibanez_finanzas_custom_models_v2', 'luibanez_apuntes_pdf_v1', 'luibanez-multiverse-v1', 'luibanez_contabilidad_v1', 'luibanez_laboratorio_v1', 'luibanez-scratchpad-notes', 'luibanez-scratchpad-drawing'];
export function legacyPreview() {
  return legacyKeys.flatMap(key => {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    try {
      const data = JSON.parse(raw);
      return [{ key, bytes: new Blob([raw]).size, items: Array.isArray(data) ? data.length : Array.isArray(data.listas) ? data.listas.length : Object.keys(data || {}).length }];
    } catch { return [{ key, bytes: new Blob([raw]).size, items: 1 }]; }
  });
}
export async function importLegacy(keys) {
  for (const key of keys) {
    if (!legacyKeys.includes(key)) throw new Error('Dato no importable.');
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    const existing = studyStorage.getItem(key);
    let next = raw;
    if (existing !== null) {
      if (key === 'bolillero-estudio-v3') {
        const old = JSON.parse(raw), local = JSON.parse(existing);
        const lists = Array.isArray(local.listas) ? local.listas : [];
        for (const list of Array.isArray(old.listas) ? old.listas : []) if (list && typeof list.id === 'string' && typeof list.nombre === 'string' && Array.isArray(list.temas) && !lists.some(item => item.id === list.id)) lists.push(list);
        next = JSON.stringify({ ...local, listas: lists });
      } else continue; // A saved destination wins; never overwrite current work.
    }
    studyStorage.setItem(key, next);
    if (key==='luibanez_apuntes_pdf_v1') studyStorage.removeItem('luibanez_apuntes_migrado_v1');
    if (studyStorage.getItem(key) !== next) throw new Error('No se pudo verificar la copia. El original se conserva.');
  }
}
export async function legacyDocuments() {
  if (!indexedDB.databases) return [];
  if (!(await indexedDB.databases()).some(db => db.name === 'LuibanezStorage')) return [];
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LuibanezStorage');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('apuntes')) { db.close(); resolve([]); return; }
      const tx = db.transaction('apuntes', 'readonly');
      const get = tx.objectStore('apuntes').get('apuntesColeccion');
      get.onsuccess = () => resolve(Array.isArray(get.result) ? get.result : []);
      get.onerror = () => reject(get.error);
      tx.oncomplete = () => db.close();
    };
  });
}
