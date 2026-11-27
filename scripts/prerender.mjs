// Build-time prerender: writes one static HTML file per public sitemap route plus 404.html and an owner-only SPA shell.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = resolve('dist');
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html is not a fresh Vite build; run the full build.');
const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);

const sitemap = readFileSync(resolve('public/sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.riturajverma\.com([^<]*)<\/loc>/g)].map(m => m[1]);
// Noindex ad pages are public but deliberately left out of the sitemap.
routes.push('/signed-copy', '/signed-copy-story');

// Static head fallbacks that Helmet supplies per page.
const staticHead = [
  /\s*<title>[\s\S]*?<\/title>/,
  /\s*<meta name="description"[^>]*>/,
  /\s*<link rel="canonical"[^>]*>/,
  /\s*<meta property="og:(?:title|description|url|image|type)"[^>]*>/g,
  /\s*<meta name="twitter:(?:card|title|description|image)"[^>]*>/g,
];
const heroPreload = /\s*<link rel="preload" as="image"[^>]*>/;

function page(head, body, { home }) {
  let html = template;
  for (const pattern of staticHead) html = html.replace(pattern, '');
  if (!home) html = html.replace(heroPreload, '');
  return html.replace('</head>', `${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function write(file, html) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// Owner pages and unresolved LPH aliases boot client-side from an empty shell (homepage fallbacks kept, no preload).
write(resolve(dist, 'app.html'), template.replace(heroPreload, '').replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/\s*<meta property="og:url"[^>]*>/, '').replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>'));

const problems = [];
for (const route of [...routes, '/404']) {
  const { html, helmet } = await render(route);
  const head = ['title', 'meta', 'link', 'script'].map(key => helmet[key]?.toString() ?? '').join('\n    ');
  const title = /<title[^>]*>([^<]*)<\/title>/.exec(head)?.[1] ?? '';
  if (!title) problems.push(`${route}: no title`);
  if (route !== '/404' && !head.includes('rel="canonical"')) problems.push(`${route}: no canonical`);
  if (!html.trim()) problems.push(`${route}: empty body`);
  const out = page(head, html, { home: route === '/' });
  const file = route === '/404' ? resolve(dist, '404.html')
    : route === '/' ? resolve(dist, 'index.html')
    : resolve(dist, `.${route.replace(/\/$/, '')}/index.html`);
  write(file, out);
}
rmSync(resolve('dist-ssr'), { recursive: true, force: true });
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`Prerendered ${routes.length} routes plus 404.html`);
