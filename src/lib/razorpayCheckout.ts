export type RazorpayOrder = { orderId: string; keyId: string; amount: number };
export type RazorpayPayment = {
  razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string;
};
type CheckoutOptions = {
  key: string; amount: number; currency: 'INR'; order_id: string;
  name: string; description: string; prefill: { name: string; email: string; contact: string };
  theme: { color: string }; handler: (payment: RazorpayPayment) => void;
  modal: { ondismiss: () => void };
};
type Checkout = { open: () => void; on: (event: 'payment.failed', handler: () => void) => void };
declare global {
  interface Window { Razorpay?: new (options: CheckoutOptions) => Checkout }
}

let loading: Promise<void> | undefined;
export function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    const timer = window.setTimeout(() => fail(), 15000);
    function fail() {
      window.clearTimeout(timer);
      script.remove();
      reject(new Error('Payment not completed'));
    }
    script.onload = () => {
      window.clearTimeout(timer);
      if (window.Razorpay) resolve(); else fail();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  }).catch(error => { loading = undefined; throw error; });
  return loading;
}

// Persist only order identifiers, never buyer details; a repeated verified callback cannot double-count.
const purchased = new Set<string>();
type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;
export function purchaseOnce(orderId: string, fire: () => void, storage?: StorageLike, seen = purchased) {
  if (!orderId || seen.has(orderId)) return false;
  const key = `rv-purchase-confirmed:${orderId}`;
  try { if (storage?.getItem(key) === '1') { seen.add(orderId); return false; } } catch { /* Storage may be blocked. */ }
  seen.add(orderId);
  try { storage?.setItem(key, '1'); } catch { /* In-memory guard still applies. */ }
  fire();
  return true;
}

export function trackConfirmedPurchase(orderId: string, value: number, title: string) {
  let storage: StorageLike | undefined;
  try { storage = window.localStorage; } catch { /* Blocked storage. */ }
  purchaseOnce(orderId, () => {
    const target = window as Window & {
      fbq?: (command: string, event: string, data: Record<string, unknown>) => void;
      dataLayer?: Record<string, unknown>[];
    };
    try { target.fbq?.('track', 'Purchase', { value, currency: 'INR', content_name: title, content_type: 'product', order_id: orderId }); }
    catch { /* Tracking never blocks confirmation. */ }
    try {
      target.dataLayer ??= [];
      target.dataLayer.push({ event: 'purchase_confirmed', value, currency: 'INR', order_id: orderId });
    } catch { /* Tracking never blocks confirmation. */ }
  }, storage);
}