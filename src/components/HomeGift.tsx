import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BookButton from './BookButton';
import { TOTAL_PRICE } from '@/config/book';
import { trackPurchaseClick } from '@/lib/purchase';

export default function HomeGift({ name, onNameChange }: { name: string; onNameChange: (name: string) => void }) {
  const recipient = name.trim() || 'Aarav';
  return <section className="band-section border-y border-accent/35"><div className="site-container grid md:grid-cols-2 gap-10 items-center">
    <div><p className="eyebrow mb-4">What Amazon can't send</p><h2 className="page-heading">A gift with their name in it</h2><p className="text-lg text-secondary mb-6">Tell us who it's for. Rituraj writes your message inside the cover by hand before it ships.</p>
      <Label htmlFor="gift-name" className="block mb-2">Who is it for?</Label><Input id="gift-name" value={name} onChange={event => onNameChange(event.target.value)} maxLength={24} className="min-h-11 max-w-md" />
      <BookButton href="#order" className="w-full mt-5 whitespace-normal" onClick={() => trackPurchaseClick('OrderClick', 'home_gift')}>Send a signed copy to {recipient} — ₹{TOTAL_PRICE}</BookButton>
    </div>
    <div className="gift-paper p-7 md:p-10" aria-live="polite"><p>To {recipient},</p><p className="my-5">Every hero starts small.<br />Read bravely!</p><p>— Rituraj Verma</p></div>
  </div></section>;
}
