'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function copy(source, target) {
  const dest = path.join(root, 'vendor', target);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(path.join(root, 'node_modules', source), dest, { recursive: true });
}
copy('@supabase/supabase-js/dist/umd/supabase.js', 'supabase.js');
copy('@supabase/supabase-js/LICENSE', 'licenses/supabase.txt');
for (const asset of ['katex.min.js', 'katex.min.css', 'fonts']) copy('katex/dist/' + asset, 'katex/' + asset);
copy('katex/LICENSE', 'licenses/katex.txt');
for (const asset of ['build/pdf.min.mjs', 'build/pdf.worker.min.mjs', 'cmaps', 'standard_fonts', 'wasm', 'iccs']) copy('pdfjs-dist/' + asset, 'pdfjs/' + asset);
copy('pdfjs-dist/LICENSE', 'licenses/pdfjs.txt');
copy('@fortawesome/fontawesome-free/css/all.min.css', 'fontawesome/css/all.min.css');
copy('@fortawesome/fontawesome-free/webfonts', 'fontawesome/webfonts');
copy('@fortawesome/fontawesome-free/LICENSE.txt', 'licenses/fontawesome.txt');
console.log('Browser dependencies copied from package-lock.json versions.');

copy('dompurify/dist/purify.es.mjs', 'dompurify.mjs');
copy('dompurify/LICENSE', 'licenses/dompurify.txt');
