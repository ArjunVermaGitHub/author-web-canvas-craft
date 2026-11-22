export function allowsWhatsAppChat(pathname: string, paymentActive: boolean): boolean {
  return !paymentActive && !/^\/(owner|private|admin|api)(\/|$)/i.test(pathname);
}

type ChatTracking = {
  fbq?: (command: 'track', event: 'Contact', data: { page_path: string }) => void;
  dataLayer?: { push: (data: { event: string; page_path: string }) => unknown };
};

export function trackWhatsAppChat(pathname: string, target: ChatTracking = window as Window & ChatTracking) {
  try { target.fbq?.('track', 'Contact', { page_path: pathname }); } catch { /* Chat must remain available. */ }
  try {
    target.dataLayer ??= [];
    target.dataLayer.push({ event: 'whatsapp_chat_click', page_path: pathname });
  } catch { /* Analytics must not interrupt the link. */ }
}