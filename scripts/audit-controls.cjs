'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('parse5');
const acorn = require('acorn');
const scope = require('eslint-scope');
const globals = require('globals');
const root = path.resolve(__dirname, '..');
function inventory() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
  const tree = parse(html, { sourceCodeLocationInfo: true });
  const controls = [], ids = new Set(), duplicates = [];
  function text(node) { return node.value || (node.childNodes || []).map(text).join(' '); }
  function visit(node, section = 'global', form = null) {
    const a = Object.fromEntries((node.attrs || []).map(a => [a.name, a.value]));
    if (a.id) { if (ids.has(a.id)) duplicates.push(a.id); ids.add(a.id); }
    if (['section', 'dialog', 'aside'].includes(node.tagName)) section = a.id || section;
    if (node.tagName === 'form') form = a.id || 'anonymous-form';
    if (node.tagName === 'button' || node.tagName === 'a' || (node.tagName === 'input' && ['submit', 'button'].includes(a.type))) {
      const label = (a['aria-label'] || a.title || text(node)).replace(/\s+/g, ' ').trim();
      const inline = Object.entries(a).filter(([k]) => k.startsWith('on') || k==='data-study-click').map(([, v]) => v);
      const route = a['data-view'] || (a.href?.startsWith('#') ? a.href.slice(1) : null);
      controls.push({ id: a.id || null, section, line: node.sourceCodeLocation?.startLine, label, type: a.type || node.tagName,
        action: route ? `Navegar a ${route}` : inline.join('; ') || (form && (a.type || 'submit') === 'submit' ? `Enviar ${form}` : a.id && js.includes(a.id) ? 'Evento registrado por ID' : Object.keys(a).some(k => k.startsWith('data-')) ? 'Evento delegado por atributo' : 'Revisar delegación por clase o contenedor'),
        form, route, href: a.href || null, requires: section.startsWith('viewFin') ? 'Cuenta verificada, carrera Finanzas' : /^viewMed|viewFarmacologia|viewSalud/.test(section) ? 'Cuenta verificada, carrera Medicina' : /Auth|auth/.test(section) ? 'Conexión para operaciones de cuenta' : 'Datos requeridos por el control y su estado habilitado',
        expected: route ? `Mostrar ${route} y sincronizar historial y navegación` : a['aria-controls'] ? `Abrir o alternar ${a['aria-controls']}` : label,
        verification: 'Inventario estructural; eventos comprobados en browser-controls.json; recorridos en tests/browser', returnTo: section === 'global' ? 'Pantalla de origen' : `Cerrar diálogo o volver desde ${section}` });
    }
    for (const child of node.childNodes || []) visit(child, section, form);
  }
  visit(tree);
  const ast = acorn.parse(js, { ecmaVersion: 2022, sourceType: 'module', ranges: true, locations: true });
  const known = { ...globals.builtin, ...globals.browser, JSZip: true, katex: true };
  const unresolved = scope.analyze(ast, { ecmaVersion: 2022, sourceType: 'module' }).globalScope.through
    .filter(ref => !(ref.identifier.name in known)).map(ref => ({ name: ref.identifier.name, line: ref.identifier.loc.start.line }));
  return { controls, duplicates, unresolved };
}
if (require.main === module) {
  const result = inventory();
  fs.mkdirSync(path.join(root, 'audit'), { recursive: true });
  fs.writeFileSync(path.join(root, 'audit', 'controls.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(`${result.controls.length} controles inventariados; ${result.duplicates.length} IDs duplicados; ${result.unresolved.length} referencias sin resolver.`);
  if (result.unresolved.length) console.log(result.unresolved);
  process.exitCode = result.duplicates.length || result.unresolved.length ? 1 : 0;
}
module.exports = { inventory };
