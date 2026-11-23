import { readUtm } from './campaign.js';

export type ClarityTarget = {
  location?: { hostname: string; pathname: string; search?: string };
  navigator?: { userAgent: string };
  clarity?: (command: 'event' | 'set', name: string, value?: string) => void;
};

export function allowsClarity(hostname: string, pathname: string, userAgent = '') {
  return ['www.riturajverma.com', 'riturajverma.com'].includes(hostname)
    && !/^\/owner(?:\/|$)/i.test(pathname) && !/Electron/i.test(userAgent);
}

export function clarityEventForPurchase(event: string) {
  return ({ AmazonClick: 'amazon_click', EbookClick: 'kindle_click', FlipkartClick: 'flipkart_click', OrderClick: 'signed_copy_click' } as Record<string, string>)[event];
}

export function trackClarityEvent(name: string, target: ClarityTarget | undefined = typeof window === 'undefined' ? undefined : window as ClarityTarget) {
  if (!target?.location || !allowsClarity(target.location.hostname, target.location.pathname, target.navigator?.userAgent)) return;
  try {
    const utm = readUtm(target.location.search);
    if (utm?.campaign && utm.campaign !== '(none)') target.clarity?.('set', 'utm_campaign', utm.campaign);
    if (utm?.content && utm.content !== '(none)') target.clarity?.('set', 'utm_content', utm.content);
    target.clarity?.('event', name);
  } catch { /* Analytics must never interrupt a purchase. */ }
}

export function setClarityCampaign(target: ClarityTarget | undefined = typeof window === 'undefined' ? undefined : window as ClarityTarget) {
  if (!target?.location || !allowsClarity(target.location.hostname, target.location.pathname, target.navigator?.userAgent)) return false;
  if (typeof target.clarity !== 'function') return false;
  try {
    const utm = readUtm(target.location.search);
    if (utm?.campaign && utm.campaign !== '(none)') target.clarity('set', 'utm_campaign', utm.campaign);
    if (utm?.content && utm.content !== '(none)') target.clarity('set', 'utm_content', utm.content);
  } catch { /* Blocked SDK. */ }
  return true;
}

// Move marketing SDK work out of the tap handler into a separate task.
// Lifecycle events remain synchronous so abandon events are not discarded.
export function afterInteraction(work: () => void) {
  if (typeof window === 'undefined' || typeof document === 'undefined' || document.visibilityState === 'hidden') { work(); return; }
  // Timers also run in background tabs; a new-tab purchase must not lose its event.
  setTimeout(work, 0);
}