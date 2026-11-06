'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const output = path.resolve(root, 'dist');
// Delete only this checkout's generated output; never pass a computed path to a shell.
if (output !== path.join(root, 'dist') || !output.startsWith(root + path.sep)) throw new Error('Unsafe output directory');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output);
const assets = ['index.html','script.js','style.css','sw.js','version.json','manifest.json','icon.svg','icon-192.png','icon-512.png','jszip.min.js','ivan_avatar_head.png','ivan_doctor_transparent.png','ivan_doctor.mp4','modules','vendor','materias_finanzas'];
for (const asset of assets) fs.cpSync(path.join(root, asset), path.join(output, asset), { recursive: true });
function files(directory) { return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry => entry.isDirectory() ? files(path.join(directory,entry.name)) : [path.join(directory,entry.name)]); }
const scripts = files(output).filter(file => /\.(?:js|mjs|css)$/.test(file) && path.basename(file)!=='sw.js');
const revision = createHash('sha256').update(Buffer.concat(scripts.sort().map(file => fs.readFileSync(file)))).digest('hex').slice(0,12);
const map = new Map(scripts.map(file => [file,file.replace(/\.(js|mjs|css)$/,`.${revision}.$1`)]));
// A single revision covers the dependency graph. Old tabs keep requesting their old graph.
for (const file of [...scripts,path.join(output,'index.html'),path.join(output,'sw.js')]) {
  let source = fs.readFileSync(file,'utf8');
  source = source.replace(/(['"])([^'"\s]+\.(?:js|mjs|css))(?:\?[^'"\s]*)?\1/g,(original,quote,url) => {
    if (/^(?:https?:|data:|blob:)/.test(url) || url.startsWith('/api/')) return original;
    const target = path.resolve(path.dirname(file),url);
    if (!map.has(target)) return original;
    let relative = path.relative(path.dirname(file),map.get(target)).replaceAll(path.sep,'/');
    if (url.startsWith('./') && !relative.startsWith('.')) relative='./'+relative;
    return quote+relative+quote;
  });
  if (path.basename(file)==='sw.js') source=source.replace('CACHE_PREFIX + "v30.0.0"',`CACHE_PREFIX + "v30.0.0-${revision}"`);
  fs.writeFileSync(map.get(file) || file,source);
  if (map.has(file)) fs.unlinkSync(file);
}
console.log('Static build ready in dist/; backend, tests, migrations and local configuration excluded.');
