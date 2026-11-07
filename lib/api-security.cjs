'use strict';
const productionOrigins = ['https://luibanez.vercel.app', 'https://luibanez-salmar10.vercel.app', 'https://luibanez-git-main-salmar10.vercel.app'];
function allowedOrigins(env = process.env) {
  const production = env.VERCEL_ENV === 'production' || env.NODE_ENV === 'production';
  const result = new Set(productionOrigins);
  // Also allow the exact hostname of a staged production build for testing
  // before its public domain is assigned. Never allow arbitrary preview hosts.
  if(['preview','production'].includes(env.VERCEL_ENV))for(const hostname of [env.VERCEL_URL,env.VERCEL_ENV==='preview'?env.VERCEL_BRANCH_URL:null])if(hostname&&/^[a-z0-9-]+\.vercel\.app$/.test(hostname))result.add('https://'+hostname);
  if (!production) for (const origin of ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500']) result.add(origin);
  for (const candidate of (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)) {
    try {
      const url = new URL(candidate);
      if (url.origin === candidate && !url.hostname.includes('*') && !url.username && !url.password && (url.protocol === 'https:' || !production && url.protocol === 'http:')) result.add(candidate);
    } catch { /* Invalid configuration never broadens the allowlist. */ }
  }
  return result;
}
module.exports = { allowedOrigins };
