import BookButton from './BookButton';
import AmazonPurchaseButton from './AmazonPurchaseButton';
import { BOOK_TITLE, TOTAL_PRICE } from '@/config/book';
import { READER_REVIEWS } from '@/data/readerReviews';
import { AMAZON_RATING, AMAZON_RATING_COUNT } from '@/config/amazon';
import { trackPurchaseClick } from '@/lib/purchase';

export default function HomeHero() {
  return <section id="top" className="home-hero conversion-hero scroll-mt-24"><div className="site-container conversion-hero-grid">
    <div className="conversion-hook"><p className="text-accent text-sm font-semibold mb-3" title={BOOK_TITLE}>Book 1 · Mythological fantasy · Ages 10–19</p>
      <h1 className="conversion-title">He's nine. He can read a script no scholar ever has. Now an immortal warlord is hunting him.</h1>
    </div>
    <div className="conversion-cover"><img src="/raghav-ebook-cover.jpg" alt={`${BOOK_TITLE} — book cover`} width={1200} height={1920} fetchPriority="high" className="w-full h-auto border border-accent" /></div>
    <div className="conversion-price"><a href="#reviews" className="min-h-11 flex flex-col justify-center text-accent text-sm"><span>★★★★½ {AMAZON_RATING} from {AMAZON_RATING_COUNT} Amazon ratings</span><span className="text-secondary underline underline-offset-4">{READER_REVIEWS.length} reader reviews</span></a>
    </div>
    <div id="home-hero-cta" className="conversion-cta">
      <AmazonPurchaseButton placement="home_hero" className="w-full min-h-12" />
      <p className="text-secondary text-sm leading-snug mt-2">Paperback &amp; Kindle · Trusted Amazon checkout · Rated {AMAZON_RATING}★ by {AMAZON_RATING_COUNT} readers on Amazon</p>
      <p className="text-muted-foreground text-xs leading-snug mt-1">As an Amazon Associate I earn from qualifying purchases.</p>
      <BookButton variant="outline" href="#order" className="w-full min-h-12 mt-4" onClick={() => trackPurchaseClick('OrderClick', 'home_hero_signed')}>Signed gift copy — ₹{TOTAL_PRICE}</BookButton>
      <p className="text-secondary text-sm leading-snug mt-2">Your message handwritten inside by the author · Delivered in 5 days · Less than the ₹449 cover price</p>
      <a href="#sample" className="inline-flex items-center min-h-11 text-accent underline underline-offset-4 text-sm mt-1">Not sure yet? Read chapters 1 &amp; 2 free →</a>
    </div>
  </div></section>;
}
