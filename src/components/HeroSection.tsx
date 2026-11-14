import { useState } from 'react';
import BookButton from './BookButton';
import PinterestSaveButton from './PinterestSaveButton';
import { BOOK_TITLE, TOTAL_PRICE, SAMPLE_CHAPTERS_URL, FLIPKART_URL } from '@/config/book';
import { getBrowserAmazonStore, selectEbookUrl, trackPurchaseClick } from '@/lib/purchase';
export default function HeroSection() {
  const [amazon] = useState(getBrowserAmazonStore);
  return <section id="top" className="home-hero scroll-mt-24"><div className="site-container py-12 md:py-16">
    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] items-center gap-12 lg:gap-16">
      <div className="min-w-0"><p className="eyebrow mb-5">BOOK ONE OF THE SERIES</p><h1 className="hero-title mb-6">{BOOK_TITLE}</h1>
        <p className="text-lg md:text-xl leading-relaxed mb-7">A nine-year-old from Mumbai finds he can read the Indus Valley script, a language no scholar has ever deciphered. It leads him to a hidden school in the Himalayas, and to an immortal warlord who wants humanity gone.</p>
        <div className="flex flex-col items-start gap-3"><BookButton href="/shop#buy" className="w-full sm:w-auto" onClick={() => trackPurchaseClick('OrderClick', 'hero')}>Order a signed copy — ₹{TOTAL_PRICE}</BookButton><BookButton variant="outline" href={SAMPLE_CHAPTERS_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">Read the first two chapters free</BookButton></div>
        <div className="mt-4 flex flex-wrap items-center gap-x-2 text-secondary"><span>Also on</span><a className="inline-flex items-center min-h-11 text-accent underline underline-offset-4" href={amazon.url} target="_blank" rel="noopener noreferrer sponsored" onClick={() => trackPurchaseClick('AmazonClick', 'hero', amazon.store)}>Amazon</a><span>·</span><a className="inline-flex items-center min-h-11 text-accent underline underline-offset-4" href={FLIPKART_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackPurchaseClick('FlipkartClick', 'hero')}>Flipkart</a><span>·</span><a className="inline-flex items-center min-h-11 text-accent underline underline-offset-4" href={selectEbookUrl(amazon.store)} target="_blank" rel="noopener noreferrer sponsored" onClick={() => trackPurchaseClick('EbookClick', 'hero', amazon.store === 'India' ? undefined : amazon.store)}>Kindle</a></div>
        <p className="text-sm text-secondary">As an Amazon Associate I earn from qualifying purchases.</p><p className="text-secondary mt-5">The author handwrites your message inside the cover.</p>
      </div>
      <div className="flex flex-col items-center gap-6 px-3"><img src="/raghav-ebook-cover.jpg" alt={`${BOOK_TITLE} — book cover`} width={1200} height={1920} fetchPriority="high" decoding="async" className="hero-cover h-auto" /><PinterestSaveButton /></div>
    </div>
  </div></section>;
}
