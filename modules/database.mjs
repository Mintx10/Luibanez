import { databaseName } from './storage.mjs';
let connection;
export function openDatabase() {
  if (connection) return connection;
  connection = new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName(), 1);
    request.onupgradeneeded = () => request.result.createObjectStore('apuntes');
    request.onerror = () => { connection = null; reject(request.error); };
    request.onblocked = () => { connection = null; reject(new Error('Cerrá las otras pestañas para actualizar el almacenamiento.')); };
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => { db.close(); connection = null; };
      resolve(db);
    };
  });
  return connection;
}
export async function readValue(key) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('apuntes', 'readonly');
    const request = tx.objectStore('apuntes').get(key);
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
    tx.onabort = () => reject(tx.error || new Error('Lectura interrumpida.'));
  });
}
export async function writeValue(key, value) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('apuntes', 'readwrite');
    tx.objectStore('apuntes').put(value, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = tx.onabort = () => reject(tx.error || new Error('No se pudo completar el guardado.'));
  });
}
