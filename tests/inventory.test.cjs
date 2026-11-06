const { test } = require('node:test');
const assert = require('node:assert/strict');
const { inventory } = require('../scripts/audit-controls.cjs');
test('HTML controls have unique IDs and app code has no undefined references', () => {
  const result = inventory();
  assert.ok(result.controls.length > 600);
  assert.deepEqual(result.duplicates, []);
  assert.deepEqual(result.unresolved, []);
});
