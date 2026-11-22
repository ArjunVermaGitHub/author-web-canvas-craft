import SignedCopyOrderFlow from './SignedCopyOrderFlow';
import BookButton from './BookButton';
import { BOOK_TITLE, TOTAL_PRICE, COMMUNITY_WHATSAPP_URL } from '@/config/book';
import { giftMessage } from '@/lib/homeConversion';
export default function HomeOrder({ giftName }: { giftName: string }) {
  return <section id="order" className="band-section scroll-mt-44"><div className="site-container">
    <div className="max-w-2xl mx-auto"><div className="flex items-center gap-3 text-sm text-secondary mb-5"><span className="border border-accent/40 px-3 py-1 rounded-full text-accent">1 Details</span><span aria-hidden="true">→</span><span className="border border-accent/40 px-3 py-1 rounded-full">2 Pay</span></div>
      <h2 className="page-heading">Want it signed? Order a signed gift copy</h2>
      <div className="flex items-center gap-4 border-y border-accent/35 py-4 mb-7"><img src="/raghav-ebook-cover.jpg" alt={BOOK_TITLE} width={1200} height={1920} loading="lazy" className="w-10 h-auto" /><p className="text-secondary text-sm flex-1">Tablets of Dharma · Signed paperback · delivered in 5 days</p><p className="font-semibold text-accent text-2xl">₹{TOTAL_PRICE}</p></div>
      <SignedCopyOrderFlow placement="home" paymentPlacement="home_payment" initialMessage={giftMessage(giftName)} />
      <BookButton href={COMMUNITY_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="outline" className="w-full mt-6">Questions? WhatsApp the author</BookButton>
    </div>
  </div></section>;
}
