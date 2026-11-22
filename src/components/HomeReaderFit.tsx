import { Users, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import BookButton from './BookButton';
import AmazonPurchaseButton from './AmazonPurchaseButton';
import { TOTAL_PRICE } from '@/config/book';
import { trackPurchaseClick } from '@/lib/purchase';

const FACTS = [
  { icon: Users, title: 'Ages 10–19', text: 'Written for young readers; adults who love mythology read it too.' },
  { icon: BookOpen, title: '498 pages', text: 'A big, immersive adventure.' },
  { icon: Layers, title: 'Book 1 of a series', text: 'It ends on a cliffhanger. Book 2, The Moonwell, is being written.' },
  { icon: ShieldCheck, title: 'Gentle on violence', text: 'Limited violence. Good wins over evil.' },
];

export default function HomeReaderFit() {
  return <section className="band-section"><div className="site-container">
    <h2 className="page-heading">Is it right for your reader?</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {FACTS.map(({ icon: Icon, title, text }) => (
        <div key={title} className="border border-accent/35 p-5">
          <Icon className="text-primary mb-3" size={22} aria-hidden="true" />
          <h3 className="text-accent font-semibold mb-1">{title}</h3>
          <p className="text-secondary text-sm leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
    <div className="mt-8 flex flex-wrap items-center gap-3"><AmazonPurchaseButton placement="home_reader_fit" />
      <BookButton variant="outline" href="#order" className="border-0 px-1 text-sm underline underline-offset-4" onClick={() => trackPurchaseClick('OrderClick', 'home_reader_fit')}>or a signed gift copy — ₹{TOTAL_PRICE}</BookButton>
    </div>
  </div></section>;
}
