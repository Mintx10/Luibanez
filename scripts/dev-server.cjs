'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const assetRoot = process.argv.includes('--dist') ? path.join(root,'dist') : root;
const portIndex = process.argv.indexOf('--port');
const port = portIndex >= 0 ? Number(process.argv[portIndex+1]) : Number(process.env.PORT || 5500);
const headers = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'))).headers[0].headers;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.mp4': 'video/mp4', '.md': 'text/plain', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.wasm': 'application/wasm', '.bcmap': 'application/octet-stream', '.pfb': 'application/octet-stream', '.icc': 'application/octet-stream' };
const server = http.createServer(async (req, res) => {
  for (const h of headers) res.setHeader(h.key, h.value);
  res.setHeader('Cache-Control', 'no-store');
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  if (pathname === '/api/gemini') {
    const chunks = []; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > 4_000_000) { res.writeHead(413).end(); return; } chunks.push(chunk); }
    req.body = Buffer.concat(chunks).toString();
    res.status = code => { res.statusCode = code; return res; };
    res.json = body => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); };
    await require('../api/gemini.js')(req, res); return;
  }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(assetRoot, '.' + pathname);
  if (!file.startsWith(assetRoot + path.sep) || pathname.split('/').some(segment => segment.startsWith('.')) || /^\/(?:lib|tests|scripts|supabase|node_modules)\//.test(pathname) || !types[path.extname(file)]) { res.writeHead(404).end(); return; }
  try {
    const stat = await fs.promises.stat(file);
    if (!stat.isFile()) throw Error();
    res.setHeader('Content-Type', types[path.extname(file)]);
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(file).pipe(res);
  } catch { res.writeHead(404).end(); }
});
server.listen(port, '127.0.0.1', () => console.log('Local: http://127.0.0.1:' + server.address().port));
