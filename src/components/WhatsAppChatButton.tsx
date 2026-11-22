import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { COMMUNITY_WHATSAPP_NUMBER, WHATSAPP_CHAT_BUTTON_MESSAGE } from '@/config/book';
import { whatsappUrl } from '@/lib/whatsapp';
import { allowsWhatsAppChat, trackWhatsAppChat } from '@/lib/whatsappChat';

export default function WhatsAppChatButton() {
  const { pathname } = useLocation();
  const [paymentActive, setPaymentActive] = useState(false);
  const anchor = useRef<HTMLAnchorElement>(null);
  const [touch, setTouch] = useState(() => window.matchMedia('(pointer: coarse)').matches);

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const updateTouch = () => setTouch(media.matches);
    media.addEventListener('change', updateTouch);
    return () => media.removeEventListener('change', updateTouch);
  }, []);

  useEffect(() => {
    const resize = new ResizeObserver(() => update());
    const observed = new Set<Element>();
    const update = () => {
      setPaymentActive(Boolean(document.querySelector('[data-checkout-step="payment"]')));
      let bottom = 0;
      const bars = document.querySelectorAll('[data-sticky-purchase-bar]');
      for (const element of observed) {
        if (!element.isConnected) { resize.unobserve(element); observed.delete(element); }
      }
      for (const bar of bars) {
        if (!observed.has(bar)) { observed.add(bar); resize.observe(bar); }
        const rect = bar.getBoundingClientRect();
        if (rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
          bottom = Math.max(bottom, window.innerHeight - rect.top);
        }
      }
      anchor.current?.style.setProperty('--chat-bar-offset', `${bottom}px`);
    };
    const mutations = new MutationObserver(update);
    mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-checkout-step'] });
    window.addEventListener('resize', update);
    update();
    return () => { mutations.disconnect(); resize.disconnect(); window.removeEventListener('resize', update); };
  }, [pathname, paymentActive]);

  if (!allowsWhatsAppChat(pathname, paymentActive)) return null;
  return (
    <Button asChild size="icon" className="whatsapp-chat-button group">
      <a ref={anchor} href={whatsappUrl(touch, COMMUNITY_WHATSAPP_NUMBER, WHATSAPP_CHAT_BUTTON_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)" onClick={() => trackWhatsAppChat(pathname)}>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.23-1.63a11.95 11.95 0 0 0 5.82 1.49h.01C18.65 23.86 24 18.5 24 11.92c0-3.2-1.24-6.19-3.48-8.44ZM12.06 21.84a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.61-.24-.37a9.9 9.9 0 0 1-1.52-5.29c0-5.47 4.46-9.92 9.94-9.92a9.85 9.85 0 0 1 7.02 2.91 9.85 9.85 0 0 1 2.91 7.02c0 5.47-4.46 9.92-10 9.92Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.12 4.52.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
        <span className="whatsapp-chat-label" aria-hidden="true">Questions about delivery? Chat on WhatsApp</span>
      </a>
    </Button>
  );
}