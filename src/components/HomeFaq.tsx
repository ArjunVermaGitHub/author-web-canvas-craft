import type { ReactNode } from 'react';
import { COMMUNITY_WHATSAPP_NUMBER } from '@/config/book';
import { whatsappUrl } from '@/lib/whatsapp';

const DELIVERY_WHATSAPP_URL = whatsappUrl(
  typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches,
  COMMUNITY_WHATSAPP_NUMBER,
  "Hi! My signed copy hasn't arrived yet. My order ID is: ",
);

export default function HomeFaq() {
  const faqs: [string, ReactNode][] = [
    ["Who is it for?", 'Readers aged 10 and up, and adults who love Indian mythology. The hero is nine; the adventure is big enough for older readers.'],
    ['Is it a complete story?', 'It is Book 1 of a series and ends on a cliffhanger. Book 2, The Moonwell, is being written.'],
    ['Is the signed copy the same book as on Amazon?', 'Yes, the same Qurate Books paperback, signed with your message inside.'],
    ['When will it arrive?', 'Within 5 days anywhere in India.'],
    ["What if my signed copy doesn't arrive in 5 days?", <>Message us on <a href={DELIVERY_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">WhatsApp</a> at 93248 93014 with your order ID, and we'll track your parcel and update you within 24 hours.</>],
    ['Can I pay cash on delivery?', 'No — UPI, card or netbanking via Razorpay with instant confirmation.'],
    ['Is there an ebook?', 'Yes, on Kindle; links at the bottom.'],
  ];
  return <section className="band-section"><div className="site-container"><h2 className="page-heading">Before you order</h2><div className="max-w-3xl">{faqs.map(([question, answer]) => <details key={question} className="border-b border-accent/35 py-2"><summary className="cursor-pointer min-h-11 py-3 text-accent font-semibold">{question}</summary><p className="text-secondary leading-relaxed pb-4">{answer}</p></details>)}</div></div></section>;
}
