// Pure UTM helpers shared by the visitor counter and api/visits.js.
const LABEL_RE = /^[a-z0-9_.+-]+$/;
export const ORGANIC = { source: 'direct', medium: 'organic', campaign: '(none)' };
const SESSION_RE = /^[a-zA-Z0-9-]{8,64}$/;

export function cleanLabel(value) {
  const v = String(value ?? '').trim().toLowerCase().slice(0, 100);
  return v && LABEL_RE.test(v) ? v : '';
}

// Returns cleaned labels, or null when the address carries no valid UTM labels.
export function readUtm(search) {
  const p = new URLSearchParams(search || '');
  const source = cleanLabel(p.get('utm_source'));
  const medium = cleanLabel(p.get('utm_medium'));
  const campaign = cleanLabel(p.get('utm_campaign'));
  if (!source && !medium && !campaign) return null;
  return { source: source || '(none)', medium: medium || '(none)', campaign: campaign || '(none)' };
}

export function normalizeUtm(utm) {
  if (!utm || typeof utm !== 'object') return { ...ORGANIC };
  const source = cleanLabel(utm.source), medium = cleanLabel(utm.medium), campaign = cleanLabel(utm.campaign);
  if (!source && !medium && !campaign) return { ...ORGANIC };
  return { source: source || '(none)', medium: medium || '(none)', campaign: campaign || '(none)' };
}

export const isSessionId = (id) => SESSION_RE.test(String(id || ''));

// Keep the stored session unless the address brings different labels.
export function resolveSession(stored, search, newId) {
  const fromUrl = readUtm(search);
  const valid = stored && isSessionId(stored.id) && stored.utm;
  if (valid && (!fromUrl || sameUtm(fromUrl, stored.utm))) return stored;
  return { id: newId, utm: fromUrl || { ...ORGANIC } };
}

const sameUtm = (a, b) => a.source === b.source && a.medium === b.medium && a.campaign === b.campaign;

// Calendar day in India time, YYYY-MM-DD.
export const indiaDay = (date = new Date()) => new Date(date.getTime() + 330 * 60000).toISOString().slice(0, 10);
