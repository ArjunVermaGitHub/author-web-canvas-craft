// Internal-traffic exclusion: GTM skips the Clarity tag when the first-party
// rv_internal cookie contains "1". Owner routes and ?internal=1 set that cookie
// and tag the live Clarity session as internal.

export const INTERNAL_COOKIE_NAME = 'rv_internal';
export const INTERNAL_COOKIE_MAX_AGE = 63072000; // 2 years

export type InternalTrafficTarget = {
  location?: { hostname: string; pathname: string; search?: string };
  document?: { cookie: string };
  clarity?: (command: 'set', name: string, value: string) => void;
};

// Domain attribute so the cookie covers both www and the apex; omitted elsewhere.
export function internalCookieDomain(hostname: string) {
  const host = hostname.toLowerCase();
  return host === 'riturajverma.com' || host.endsWith('.riturajverma.com') ? '.riturajverma.com' : null;
}

export function buildInternalCookie(hostname: string) {
  const domain = internalCookieDomain(hostname);
  return `${INTERNAL_COOKIE_NAME}=1; path=/; max-age=${INTERNAL_COOKIE_MAX_AGE}; SameSite=Lax; Secure${domain ? `; domain=${domain}` : ''}`;
}

export function shouldMarkInternal(pathname: string, search = '') {
  if (/^\/owner(?:\/|$)/i.test(pathname)) return true;
  try {
    return new URLSearchParams(search).get('internal') === '1';
  } catch {
    return false;
  }
}

export function markInternalTraffic(target: InternalTrafficTarget | undefined = typeof window === 'undefined' ? undefined : window as unknown as InternalTrafficTarget) {
  if (!target?.location) return false;
  try {
    if (target.document) target.document.cookie = buildInternalCookie(target.location.hostname);
    if (typeof target.clarity === 'function') target.clarity('set', 'internal', '1');
  } catch { /* Analytics must never interrupt the page. */ }
  return true;
}
