import { AMAZON_URL, AMAZON_STORES, AMAZON_REGION_CODES, AMAZON_EBOOK_URL, AMAZON_EBOOK_INTL_URL } from '@/config/amazon';

const TIMEZONE_REGIONS: Record<string, string> = {
  'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US',
  'America/Detroit': 'US', 'America/Indiana/Indianapolis': 'US', 'Pacific/Honolulu': 'US',
  'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA', 'America/Halifax': 'CA', 'America/St_Johns': 'CA',
  'America/Regina': 'CA', 'America/Moncton': 'CA', 'America/Whitehorse': 'CA',
  'Europe/London': 'GB', 'Europe/Berlin': 'DE', 'Europe/Busingen': 'DE',
  'Europe/Paris': 'FR', 'Europe/Rome': 'IT', 'Europe/Madrid': 'ES', 'Atlantic/Canary': 'ES',
  'Asia/Tokyo': 'JP', 'Asia/Singapore': 'SG', 'Singapore': 'SG',
  'Europe/Amsterdam': 'NL', 'Europe/Stockholm': 'SE', 'Europe/Warsaw': 'PL', 'Europe/Brussels': 'BE',
};

export function selectAmazonStore(language: string, timezone: string) {
  let region: string | undefined;
  try { region = new Intl.Locale(language).region; } catch { /* Use timezone when the language is unavailable. */ }
  region ??= timezone.startsWith('Australia/') ? 'AU' : TIMEZONE_REGIONS[timezone];
  const index = AMAZON_REGION_CODES.indexOf(region ?? 'IN');
  const match = AMAZON_STORES[index];
  return match ? { store: match[0], url: match[1] } : { store: 'India', url: AMAZON_URL };
}

export function getBrowserAmazonStore() {
  if (typeof navigator === 'undefined') return selectAmazonStore('', '');
  let timezone = '';
  try { timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { /* India is the default. */ }
  return selectAmazonStore(navigator.language, timezone);
}

// India readers get the Indian-edition ebook; every other visitor gets the international edition.
export function selectEbookUrl(store?: string) {
  return store && store !== 'India' ? AMAZON_EBOOK_INTL_URL : AMAZON_EBOOK_URL;
}

type Pixel = (command: 'trackCustom', event: string, data: { placement: string; store?: string }) => void;

export function trackPurchaseClick(event: 'OrderClick' | 'AmazonClick' | 'PayClick' | 'EbookClick', placement: string, store?: string, pixel?: Pixel) {
  const fbq = pixel ?? (typeof window === 'undefined' ? undefined : (window as Window & { fbq?: Pixel }).fbq);
  if (typeof fbq !== 'function') return;
  try { fbq('trackCustom', event, store ? { placement, store } : { placement }); } catch { /* Tracking must not interrupt navigation. */ }
}

type OrderPixel = (command: 'trackCustom', event: string, data: { placement: string; value: number; currency: 'INR'; order_id?: string }) => void;

// Fires once when an order is saved; named OrderSaved (not Purchase) to avoid clashing with other sites' Purchase events.
export function trackOrderSaved(placement: string, value: number, orderId?: string, pixel?: OrderPixel) {
  const fbq = pixel ?? (typeof window === 'undefined' ? undefined : (window as Window & { fbq?: OrderPixel }).fbq);
  if (typeof fbq !== 'function') return;
  const data: { placement: string; value: number; currency: 'INR'; order_id?: string } = { placement, value, currency: 'INR' };
  if (orderId) data.order_id = orderId;
  try { fbq('trackCustom', 'OrderSaved', data); } catch { /* Tracking must not interrupt the order flow. */ }
}