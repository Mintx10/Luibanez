const { test } = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
test('user storage isolates users and guest, preserves shared theme, and imports without credentials', async () => {
  const values = new Map();
  global.localStorage = { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, String(v)), removeItem: k => values.delete(k) };
  const { studyStorage, setStorageScope, databaseName, legacyPreview, importLegacy } = await import(pathToFileURL(path.resolve('modules/storage.mjs')));
  setStorageScope('alice'); studyStorage.setItem('notes', 'private-a'); studyStorage.setItem('luibanez-theme', 'dark'); const firstDB = databaseName();
  setStorageScope('bob'); assert.equal(studyStorage.getItem('notes'), null); assert.notEqual(databaseName(), firstDB); assert.equal(studyStorage.getItem('luibanez-theme'), 'dark');
  setStorageScope(null); assert.equal(studyStorage.getItem('notes'), null);
  localStorage.setItem('luibanez_cuentas_v2', '[{"pin":"1234"}]'); localStorage.setItem('bolillero-estudio-v3', '{"listas":[{"id":"one","nombre":"Materia","temas":[]}]}');
  assert.deepEqual(legacyPreview().map(row => row.key), ['bolillero-estudio-v3']);
  setStorageScope('alice'); await importLegacy(['bolillero-estudio-v3']); await importLegacy(['bolillero-estudio-v3']);
  assert.equal(JSON.parse(studyStorage.getItem('bolillero-estudio-v3')).listas.length, 1);
  assert.ok(localStorage.getItem('bolillero-estudio-v3')); await assert.rejects(importLegacy(['luibanez_cuentas_v2']));
});
