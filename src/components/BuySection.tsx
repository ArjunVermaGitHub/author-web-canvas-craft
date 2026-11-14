import { ArrowRight } from 'lucide-react';
import BookButton from './BookButton';
import SignedCopyOrderFlow from './SignedCopyOrderFlow';
import { AMAZON_STORES, AMAZON_URL, AMAZON_EBOOK_URL } from '@/config/amazon';
import { BOOK_TITLE, TOTAL_PRICE, FLIPKART_URL, SAMPLE_CHAPTERS_URL } from '@/config/book';
import { trackPurchaseClick } from '@/lib/purchase';
export default function BuySection() {
  return <section id="buy" className="scroll-mt-24 band-section"><div className="site-container">
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
      <div className="content-panel p-5 sm:p-7"><div className="flex items-center gap-5 mb-7"><img src="/raghav-ebook-cover.jpg" alt={BOOK_TITLE} width={1200} height={1920} className="w-16 h-auto" /><div><h2 className="text-2xl">Signed copy</h2><p className="font-serif text-primary text-3xl mt-2">₹{TOTAL_PRICE}</p></div></div><SignedCopyOrderFlow /></div>
      <div className="shop-retailers divide-y divide-accent/35">
        <div className="pb-7"><h2 className="text-2xl mb-5">Order online</h2><div className="flex flex-col gap-3">
          <BookButton variant="outline" href={AMAZON_URL} target="_blank" rel="noopener noreferrer sponsored" className="justify-between" onClick={() => trackPurchaseClick('AmazonClick', 'buy', 'India')}>Amazon India<ArrowRight size={18} /></BookButton>
          <BookButton variant="outline" href={FLIPKART_URL} target="_blank" rel="noopener noreferrer" className="justify-between" onClick={() => trackPurchaseClick('FlipkartClick', 'buy')}>Flipkart<ArrowRight size={18} /></BookButton>
          <BookButton variant="outline" href={AMAZON_EBOOK_URL} target="_blank" rel="noopener noreferrer sponsored" className="justify-between" onClick={() => trackPurchaseClick('EbookClick', 'buy')}>Kindle<ArrowRight size={18} /></BookButton>
        </div><p className="mt-4 text-sm text-secondary">As an Amazon Associate I earn from qualifying purchases.</p></div>
        <div className="py-7"><h3 className="text-2xl text-accent mb-4">Prefer a bookstore?</h3><p className="text-lg text-secondary leading-relaxed">Print copies are stocked at Sapna Book House, Gangarams, Higginbothams and The Bookworm in several major Indian cities.</p></div>
        <div className="py-7"><h3 className="text-2xl text-accent mb-4">Outside India</h3><p className="text-lg text-secondary leading-relaxed">Order on Amazon in 15 countries, including the US, UK, Canada, Australia, Germany and Japan.</p><ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-5">{AMAZON_STORES.map(([country, url]) => <li key={country}><a href={url} target="_blank" rel="noopener noreferrer" onClick={() => trackPurchaseClick('AmazonClick', 'country_list', country)} className="inline-flex items-center min-h-11 text-accent underline underline-offset-4">{country}</a></li>)}</ul></div>
        <div className="pt-7"><h3 className="text-2xl text-accent mb-4">Not sure yet?</h3><BookButton variant="outline" href={SAMPLE_CHAPTERS_URL} target="_blank" rel="noopener noreferrer" className="w-full">Read the first two chapters free</BookButton></div>
      </div>
    </div>
  </div></section>;
}
