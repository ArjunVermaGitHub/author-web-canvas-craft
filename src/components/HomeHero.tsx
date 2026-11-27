import backgroundDesktop from '../../public/hero-background-desktop.webp.asset.json';
import backgroundMobile from '../../public/hero-background-mobile.webp.asset.json';
import coverDesktop from '../../public/hero-cover-desktop.webp.asset.json';
import coverMobile from '../../public/hero-cover-mobile.webp.asset.json';
import BookButton from './BookButton';
import HomeTrailer from './HomeTrailer';
import AmazonPurchaseButton from './AmazonPurchaseButton';
import { BOOK_TITLE, TOTAL_PRICE } from '@/config/book';
import { READER_REVIEWS } from '@/data/readerReviews';
import { AMAZON_RATING, AMAZON_RATING_COUNT } from '@/config/amazon';
import { trackPurchaseClick } from '@/lib/purchase';

const mediaUrl = (asset: { url: string }) => `https://author-web-canvas-craft.lovable.app${asset.url}`;

export default function HomeHero() {
  return <section id="top" className="home-hero conversion-hero scroll-mt-24">
    <div className="hero-bg"><img src={mediaUrl(backgroundMobile)} srcSet={`${mediaUrl(backgroundMobile)} 768w, ${mediaUrl(backgroundDesktop)} 1200w`} sizes="100vw" width={768} height={1229} alt="Blurred cover art of Raghav Kartikeya and the Tablets of Dharma" decoding="async" /></div>
    <div className="site-container conversion-hero-grid">
    <div className="conversion-hook"><p className="text-accent text-sm font-semibold mb-3" title={BOOK_TITLE}>Book 1 · Mythological fantasy · Ages 10+</p>
      <h1 className="conversion-title">He's nine. He can read a script no scholar ever has. Now an immortal warlord is hunting him.</h1>
    </div>
    <div className="conversion-cover"><img src={mediaUrl(coverMobile)} srcSet={`${mediaUrl(coverMobile)} 768w, ${mediaUrl(coverDesktop)} 1200w`} sizes="(min-width: 1024px) 320px, 104px" decoding="async" alt={`${BOOK_TITLE} — book cover`} width={1200} height={1920} {...{ fetchpriority: "high" }} className="w-full h-auto border border-accent" /></div>
    <div className="conversion-price"><a href="#reviews" className="min-h-11 flex flex-col justify-center text-accent text-sm"><span>★★★★½ {AMAZON_RATING} from {AMAZON_RATING_COUNT} Amazon ratings</span><span className="text-secondary underline underline-offset-4">{READER_REVIEWS.length} reader reviews</span></a>
    </div>
    <div id="home-hero-cta" className="conversion-cta">
      <AmazonPurchaseButton id="home-hero-buy" placement="home_hero" className="w-full min-h-12 max-md:order-1" />
      <p className="text-secondary text-sm leading-snug mt-2 max-md:order-3">Paperback &amp; Kindle · Trusted Amazon checkout · Rated {AMAZON_RATING}★ by {AMAZON_RATING_COUNT} readers on Amazon</p>
      <p className="text-muted-foreground text-xs leading-snug mt-1 max-md:order-5">As an Amazon Associate I earn from qualifying purchases.</p>
      <BookButton variant="outline" href="#order" className="w-full min-h-12 mt-4 max-md:order-2 max-md:mt-2" onClick={() => trackPurchaseClick('OrderClick', 'home_hero_signed')}>Signed gift copy — ₹{TOTAL_PRICE}</BookButton>
      <p className="text-secondary text-sm leading-snug mt-2 max-md:order-4">Your message handwritten inside by the author · Delivered in 5 days · Less than the ₹499 cover price</p>
      <a href="#sample" className="inline-flex items-center min-h-11 text-accent underline underline-offset-4 text-sm mt-1 max-md:order-6">Not sure yet? Read chapters 1 &amp; 2 free →</a>
      <HomeTrailer />
    </div>
  </div></section>;
}
