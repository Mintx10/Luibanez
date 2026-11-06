const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const acorn = require('acorn');
const path = require('node:path');
test('offline shell precache references existing local files and never caches private endpoints', () => {
  const code = fs.readFileSync('sw.js','utf8');
  const ast = acorn.parse(code, { ecmaVersion: 'latest' });
  const declaration = ast.body.find(n=>n.type==='VariableDeclaration' && n.declarations[0].id.name==='STATIC_ASSETS');
  for(const item of declaration.declarations[0].init.elements) assert.ok(fs.existsSync(path.resolve(item.value.split('?')[0])),item.value);
  assert.match(code,/event\.request\.method !== "GET"/);
  assert.match(code,/key\.startsWith\(CACHE_PREFIX\)/);
});
test('deployment publishes only explicitly selected browser assets', () => {
  const config = JSON.parse(fs.readFileSync('vercel.json'));
  assert.equal(config.outputDirectory,'dist');
  const source = fs.readFileSync('scripts/build-static.cjs','utf8');
  assert.ok(!source.includes("'api'")); assert.ok(!source.includes("'.env.local'"));
});
