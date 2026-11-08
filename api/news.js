export const config = { api: { bodyParser: false } };

const RSS_URL = 'https://news.google.com/rss/search?q=%22Indus+Valley+civilisation%22+OR+%22Harappan%22+OR+%22Indus+civilization%22&hl=en-IN&gl=IN&ceid=IN:en';
const CACHE_MS = 15 * 60 * 1000;
let cached;
let pending;

export function decodeEntities(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', hellip: '…' };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, key) => {
    if (!key.startsWith('#')) return named[key.toLowerCase()] ?? entity;
    const point = key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : Number(key.slice(1));
    return point > 0 && point <= 0x10ffff && !(point >= 0xd800 && point <= 0xdfff) ? String.fromCodePoint(point) : entity;
  });
}

function tagText(xml, name) {
  const raw = xml.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] ?? '';
  return decodeEntities(raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]*>/g, '')).trim();
}

export function parseNewsRss(xml) {
  const candidates = [];
  for (const match of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)) {
    const fullTitle = tagText(match[1], 'title');
    const split = fullTitle.lastIndexOf(' - ');
    const title = (split < 0 ? fullTitle : fullTitle.slice(0, split)).trim();
    const outlet = tagText(match[1], 'source') || (split < 0 ? 'Google News' : fullTitle.slice(split + 3).trim());
    const url = tagText(match[1], 'link');
    const timestamp = Date.parse(tagText(match[1], 'pubDate'));
    if (!title || !/\b(?:Indus|Harappa\w*|Mohenjo\w*|Dholavira|Rakhigarhi|Lothal|Kalibangan)\b/i.test(title) || !Number.isFinite(timestamp)) continue;
    try {
      if (!url.startsWith('https://') || new URL(url).protocol !== 'https:') continue;
    } catch { continue; }
    const date = new Date(timestamp);
    candidates.push({ title, outlet, year: date.getUTCFullYear(), date: date.toISOString(), url });
  }
  candidates.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const headlines = new Set();
  const urls = new Set();
  return candidates.filter((item) => {
    const headline = item.title.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
    if (headlines.has(headline) || urls.has(item.url)) return false;
    headlines.add(headline);
    urls.add(item.url);
    return true;
  }).slice(0, 15);
}

async function loadNews() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(RSS_URL, { signal: controller.signal });
    if (!response.ok) throw new Error('Upstream news search failed');
    const xml = await response.text();
    if (!/<rss\b/i.test(xml)) throw new Error('Invalid news feed');
    const result = { updatedAt: new Date().toISOString(), items: parseNewsRss(xml) };
    cached = { result, expiresAt: Date.now() + CACHE_MS };
    return result;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    let result;
    if (cached && cached.expiresAt > Date.now()) result = cached.result;
    else {
      pending ??= loadNews().finally(() => { pending = undefined; });
      result = await pending;
    }
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    return res.status(200).json(result);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'Could not load the latest articles right now.' });
  }
}