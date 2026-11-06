const { test } = require('node:test');
const assert = require('node:assert/strict');
test('backup validation preserves courses and rejects malformed structures and prototype keys', async () => {
  const { parseBackup, normalizeLists } = await import('../modules/study-data.mjs');
  assert.throws(()=>parseBackup('{}'));
  assert.throws(()=>normalizeLists([{ nombre:'Broken',temas:[null] }]));
  const data=parseBackup('{"listas":[{"id":"a","nombre":"Medicina","temas":[{"titulo":"Tema"}]}],"__proto__":{"polluted":true}}');
  assert.equal(data.listas[0].temas[0].nombre,'Tema'); assert.equal(data.__proto__.polluted,undefined);
  assert.equal({}.polluted,undefined);
});
