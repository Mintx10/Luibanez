import { getClient, currentUser, currentStudentProfile, clearRegistrationAppearance } from './session.mjs';
import { readValue, writeValue } from './database.mjs';
const pendingKey = 'cloud-pending-v1';
let draining;
let queueMutation = Promise.resolve();
function status(message, error = false) {
  let output = document.getElementById('cloudSyncStatus');
  if (!output) {
    output = document.createElement('output'); output.id = 'cloudSyncStatus'; output.setAttribute('aria-live', 'polite');
    output.className = 'sync-status'; document.body.append(output);
  }
  output.textContent = message;
  output.dataset.error = String(error);
}
async function queue() { return await readValue(pendingKey) || []; }
export async function fetchCloudDocuments(db, userId) {
  const rows = [];
  let cursor;
  for (let page = 0; page < 11; page++) {
    let query = db.from('study_documents').select('*').eq('user_id', userId).order('id', { ascending: true }).limit(200);
    if (cursor) query = query.gt('id', cursor);
    const { data, error } = await query;
    if (error) throw error;
    if (!Array.isArray(data)) throw new Error('La nube devolvió documentos inválidos.');
    rows.push(...data);
    if (rows.length > 2000) throw new Error('La colección supera el límite de sincronización.');
    if (data.length < 200) return rows;
    const nextCursor = data.at(-1).id;
    if (!nextCursor || nextCursor === cursor) throw new Error('La descarga no pudo avanzar. Reintentá.');
    cursor = nextCursor;
  }
  throw new Error('La colección supera el límite de sincronización.');
}
function mutateQueue(update) {
  const operation = queueMutation.then(async () => { const next = update(await queue()); await writeValue(pendingKey, next); return next; });
  queueMutation = operation.catch(() => {});
  return operation;
}
async function execute(item, userId) {
  const db = getClient();
  let result;
  if (item.kind === 'documents') {
    for (const row of item.rows) {
      const response = await db.rpc('study_sync_documents', { p_rows: [row] });
      if (response.error) throw response.error;
    }
    result = { error: null };
  }
  else if (item.kind === 'delete') result = await db.rpc('study_delete_documents', { p_ids: item.ids });
  else if (item.kind === 'profile') result = await db.from('study_profiles').upsert({ ...item.row, id: userId, carrera:currentStudentProfile()?.carrera||currentUser().user_metadata?.carrera||'General' });
  else throw new Error('Operación de sincronización desconocida.');
  if (result.error) throw result.error;
  if (item.kind === 'profile') await clearRegistrationAppearance();
}
export async function flushCloudQueue() {
  if (draining) return draining;
  const userId = currentUser()?.id;
  if (!userId || !getClient()) return;
  if (navigator.onLine === false) { status('Cambios guardados en este dispositivo · sincronización pendiente', true); return; }
  draining = (async () => {
    try {
      let items = await queue();
      while (items.length && currentUser()?.id === userId) {
        const first = items[0];
        await execute(first, userId);
        // Re-read so edits queued during the request are retained.
        items = await mutateQueue(items => items.filter(item => item.operationId !== first.operationId));
      }
      status('Cambios sincronizados');
      window.dispatchEvent(new Event('study:cloud-synced'));
    } catch { status('Cambios guardados en este dispositivo · sincronización pendiente', true); }
  })();
  try { await draining; } finally { draining = null; }
}
async function enqueue(item) {
  if (!currentUser()) return;
  await mutateQueue(items => {
  // Coalesce repeated snapshots and avoid resurrecting deleted documents.
  if (item.kind === 'documents') {
    const deleted = new Set(items.filter(i => i.kind === 'delete').flatMap(i => i.ids));
    item.rows = item.rows.filter(row => !deleted.has(row.id));
    items = items.filter(i => i.kind !== 'documents');
  } else if (item.kind === 'profile') items = items.filter(i => i.kind !== 'profile');
  else if (item.kind === 'delete') {
    items = items.map(i => i.kind === 'documents' ? { ...i, rows: i.rows.filter(row => !item.ids.includes(row.id)) } : i);
  }
  items.push({ ...item, operationId: crypto.randomUUID() }); return items;
  });
  status('Guardado local · sincronizando…');
  await flushCloudQueue();
}
export function createCloudService({ getCollection, saveCollection, refresh }) {
  window.addEventListener('online', flushCloudQueue);
  return {
    isAvailable: () => Boolean(currentUser() && getClient() && navigator.onLine !== false),
    async sincronizarColeccionConNube(collection) {
      if (!Array.isArray(collection) || !collection.length) return;
      return enqueue({ kind: 'documents', rows: collection.map(doc => ({ id: String(doc.id), nombre: doc.nombre || 'Documento', paginas: doc.paginas || 1, palabras: doc.palabras || 0, texto: doc.texto || '', activo: doc.activo !== false, updated_at: doc.updated_at || new Date(doc.timestamp || Date.now()).toISOString() })) });
    },
    async sincronizarColeccionDesdeNube() {
      const id = currentUser()?.id;
      if (!id) return;
      await flushCloudQueue();
      let data;
      try { data = await fetchCloudDocuments(getClient(), id); }
      catch (error) { status('No se pudo descargar la nube. Los documentos locales se conservan.', true); throw error; }
      const pendingDeletes = new Set((await queue()).filter(i => i.kind === 'delete').flatMap(i => i.ids));
      const collection = getCollection();
      for (const row of data || []) {
        if (pendingDeletes.has(row.id)) continue;
        const index=collection.findIndex(doc=>doc.id===row.id),local=index>=0?collection[index]:null;
        const localTime=local?Date.parse(local.updated_at || new Date(local.timestamp || 0).toISOString()):0;
        if (local && Date.parse(row.updated_at)<localTime) continue;
        if (row.deleted_at) { if(index>=0)collection.splice(index,1);continue; }
        const doc={ ...row, icono: local?.icono || '☁️', tipoLabel: local?.tipoLabel || 'Nube', metaDetalle: `${row.paginas} pág(s)`, timestamp: Date.parse(row.updated_at) };
        if(index>=0)collection[index]=doc;else collection.push(doc);
      }
      await saveCollection(false); refresh();
    },
    eliminarDocumento: id => enqueue({ kind: 'delete', ids: [String(id)] }),
    eliminarTodosDocumentosUsuario: ids => enqueue({ kind: 'delete', ids: ids.map(String) }),
    guardarPerfil: perfil => enqueue({ kind: 'profile', row: { apodo: perfil.apodo || 'Estudiante', carrera: perfil.carrera || 'General', avatar: perfil.avatar || '👤', tipo_avatar: perfil.tipoAvatar || 'emoji', foto_data_url: perfil.fotoDataUrl || '', updated_at: new Date().toISOString() } })
  };
}
