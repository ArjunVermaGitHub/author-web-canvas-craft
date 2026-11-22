import { Truck, ShieldCheck, PenLine } from 'lucide-react';
import BookButton from './BookButton';
import { BOOK_TITLE, TOTAL_PRICE, SIGNED_COPY_DELIVERY_TEXT } from '@/config/book';
import { READER_REVIEWS } from '@/data/readerReviews';
import { trackPurchaseClick } from '@/lib/purchase';

export default function HomeHero() {
  return <section id="top" className="home-hero conversion-hero scroll-mt-24"><div className="site-container conversion-hero-grid">
    <div className="conversion-hook"><p className="text-accent text-sm font-semibold mb-3" title={BOOK_TITLE}>Book 1 · Mythological fantasy · Ages 10–19</p>
      <h1 className="conversion-title">He's nine. He can read a script no scholar ever has. Now an immortal warlord is hunting him.</h1>
    </div>
    <div className="conversion-cover"><img src="/raghav-ebook-cover.jpg" alt={`${BOOK_TITLE} — book cover`} width={1200} height={1920} fetchPriority="high" className="w-full h-auto border border-accent" />
      <span className="signed-badge">SIGNED BY<br />THE AUTHOR</span>
    </div>
    <div className="conversion-price"><a href="#reviews" className="min-h-11 flex flex-col justify-center text-accent text-sm"><span>★★★★½ 4.5 on Amazon India</span><span className="text-secondary underline underline-offset-4">{READER_REVIEWS.length} reader reviews</span></a>
      <p className="mt-3 text-sm text-secondary">Signed copy, delivered</p><p className="text-4xl font-semibold text-heading leading-tight">₹{TOTAL_PRICE}</p><p className="text-sm text-muted-foreground">Cover price ₹449</p>
    </div>
    <div id="home-hero-cta" className="conversion-cta"><BookButton href="#order" className="w-full min-h-12" onClick={() => trackPurchaseClick('OrderClick', 'home_hero')}>Get my signed copy — ₹{TOTAL_PRICE}</BookButton></div>
    <div className="conversion-trust"><ul className="space-y-2 text-sm leading-snug">
      <li className="flex gap-2"><Truck size={17} className="text-accent shrink-0" aria-hidden="true" /><span>{SIGNED_COPY_DELIVERY_TEXT}</span></li>
      <li className="flex gap-2"><ShieldCheck size={17} className="text-accent shrink-0" aria-hidden="true" /><span>UPI, cards or netbanking · secured by Razorpay</span></li>
      <li className="flex gap-2"><PenLine size={17} className="text-accent shrink-0" aria-hidden="true" /><span>Your message handwritten inside by the author</span></li>
    </ul><a href="#sample" className="inline-flex items-center min-h-11 text-accent underline underline-offset-4 text-sm mt-2">Not sure yet? Read chapters 1 &amp; 2 free →</a></div>
  </div></section>;
}
