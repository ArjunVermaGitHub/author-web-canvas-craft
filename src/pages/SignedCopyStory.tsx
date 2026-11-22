import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Check } from 'lucide-react';
import SignedCopyOrderFlow from '@/components/SignedCopyOrderFlow';
import VisitorCounter from '@/components/VisitorCounter';
import { BOOK_TITLE, SIGNED_COPY_DELIVERY_TEXT, TOTAL_PRICE } from '@/config/book';
import { READER_REVIEWS } from '@/data/readerReviews';
import { getBrowserAmazonStore, trackPurchaseClick } from '@/lib/purchase';
import { createOnceTracker, LADDER_BUTTON_EVENTS, selectLadderHook, stepFromHash, type LadderEvent } from '@/lib/storyLadder';

const PASSAGES: { bridge: string; paragraphs: string[]; after?: string }[] = [
  {
    bridge: 'Raghav is the new boy at Shambhala Gurukul, a school for the enlightened. In his dreams he has seen the Indus Valley and the Tablets of Dharma.',
    paragraphs: [
      'They followed her through a stone corridor veined with silver threads. At its end stood a sprawling library. Books—if one could call them that—lay on wooden racks: palm-leaf manuscripts, bark parchments, scrolls bound with cotton twine. Dust floated as if time itself had paused.',
      '“Everything here is sorted by language and subject,” Shakti explained. “You’ll find treatises on copper mining in Sanskrit, philosophy in Tamil, even cosmology in Pali.”',
      'Most of the group wandered quietly, unsure where to begin. But as they turned into an aisle, they spotted the Acharya standing alone, withdrawing a manuscript.',
      'The group bowed in unison, hands folding in a low namaste.',
      'All except Raghav.',
      'He stepped forward, touched the Acharya’s feet, and looked up with a question burning in his eyes.',
      '“O Acharya,” he said, “I know this may sound foolish, but is there a section on Amarvati? From the Indus Valley Civilisation? Or anything written in Dharma Lipi?”',
      'The Acharya studied him carefully. “Try the section near the Manu-smriti. Perhaps you’ll find a fragment. But it’s unlikely.”',
      'Raghav hesitated, then pressed on. “Did the Rishis who wrote the Rig Veda know the people of the Indus Valley?”',
      '“Know them?” The Acharya’s eyes glinted. “They were the people.”',
      'Raghav’s voice dropped to a whisper. “Would you tell me where the Tablets of Dharma are hidden?”',
      'The Acharya stiffened. For a moment, he said nothing.',
      'His face changed—ashen, almost reverent.',
      '“It’s true,” he murmured. “The prophecy is coming true.”',
      'Then, collecting himself, he bowed low. “Welcome to Shambhala Gurukul, child. May your path reveal what must be known.”',
    ],
  },
  {
    bridge: 'On the same tour, deep beneath the school, the group reaches Patalganga, the underground river.',
    paragraphs: [
      'Before Shakti could reply, a voice whispered from the shadows.',
      '“Psst. Raghav.”',
      'He turned. There, half-shrouded in the stone archway, stood Lord Parashuram.',
      '“I have something to show you,” he said.',
      'Raghav glanced once at the group and quietly slipped away.',
      'They walked together down a narrower path, its floor a river of loose pebbles. Parashuram’s torch flickered against the walls, casting shapes that seemed older than fire.',
      'Finally, they reached a cave cut into the rock.',
      'Inside sat a Rakshasa, cross-legged and draped in rough furs. His matted hair and still body did not suggest sleep. Yet he was utterly motionless, like a statue shaped from a stone’s breath.',
      '“Vakra?” Raghav whispered. “But… how?”',
      'Parashuram nodded. “We caught him seven centuries ago. He was trying to infiltrate Shambhala—forcing a hostage to recite our entry mantras. But the mantras require alignment. Clarity. His mind… lacked both.”',
      'Raghav stepped closer. “So why is he meditating?”',
      'Parashuram’s expression softened. “Because he is immortal. And because some among us chose compassion. The Rishis taught him meditation—how to enter Samadhi, a deep trance where the mind stills and time passes like wind.”',
      'Raghav stared. The Rakshasa didn’t move. But something stirred in Raghav’s wound—a slow vibration. A warning, perhaps. Or a reminder.',
      '“He’s been like this,” Parashuram said, “for five hundred years.”',
      '“Will he wake?”',
      '“One day.”',
      'Raghav swallowed. “Is he dangerous?”',
      'Parashuram looked at him with calm eyes. “So are you. Now go. Your journey resumes.”',
      'He didn’t see it as Raghav turned and climbed back toward the others.',
      'The Rakshasa’s lips curved into a crooked smile.',
      'One eye opened.',
    ],
  },
  {
    bridge: 'That night, after the Soma ceremony, Raghav wakes from a vision of the ancient past.',
    paragraphs: [
      'Raghav opened his eyes. The chamber was dark.',
      'Raghav blinked. “I’m ready,” he had thought only hours ago.',
      'But nothing could have prepared him for this.',
      'Too dark.',
      'The scent of sacred ash lingered, then vanished, replaced by sweat, metal, and breath too close.',
      'Something moved beside his cot—a shadow, breathing. Not human.',
      'He sat up—too late.',
      'Vakra stood over him, eyes dull and blank. The knife in his hand gleamed with purpose.',
      'He raised it with all his might and stabbed Raghav straight in the stomach.',
    ],
    after: 'That is where Chapter 9 ends.',
  },
];

const BUTTON_LABELS = ['Read a few pages', 'Keep reading', 'Keep reading', 'What happens next?', 'Find out'];
const TRUST = [
  SIGNED_COPY_DELIVERY_TEXT,
  'Pay securely with UPI (Google Pay, PhonePe, Paytm) or card, via Razorpay',
  'Packed and shipped by the author',
  'Damaged or lost in transit? We’ll send a new copy free.',
];
const reading = { fontFamily: '"Iowan Old Style", Georgia, "Times New Roman", serif', color: '#EDE6D6' };

const SignedCopyStory = () => {
  const [amazon] = useState(getBrowserAmazonStore);
  const [step, setStep] = useState(() => (typeof window === 'undefined' ? 0 : stepFromHash(window.location.hash)));
  const utmContent = useMemo(() => (typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('utm_content')), []);
  const hook = selectLadderHook(utmContent);
  const fireRef = useRef<((e: LadderEvent) => void) | null>(null);
  if (!fireRef.current) {
    fireRef.current = createOnceTracker(e => trackPurchaseClick(e, 'story', undefined, undefined, utmContent ? { utm_content: utmContent } : undefined));
  }

  useEffect(() => {
    const onPop = () => setStep(stepFromHash(window.location.hash));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (step === 5) fireRef.current?.('LadderOfferShown');
  }, [step]);

  const next = useCallback(() => {
    if (step < 4) fireRef.current?.(LADDER_BUTTON_EVENTS[step]);
    const target = step + 1;
    window.history.pushState(null, '', `${window.location.pathname}${window.location.search}#s${target}`);
    setStep(target);
  }, [step]);
  const back = () => {
    if (window.history.state !== null || window.location.hash) window.history.back();
    else setStep(s => Math.max(0, s - 1));
  };

  const passage = step >= 1 && step <= 3 ? PASSAGES[step - 1] : null;

  return (
    <div className="public-site min-h-screen" style={{ background: '#15202B' }}>
      <Helmet>
        <title>Read the opening — Raghav Kartikeya and the Tablets of Dharma</title>
        <meta name="description" content={`Read a few pages of ${BOOK_TITLE}, then order a signed copy.`} />
        <link rel="canonical" href="https://www.riturajverma.com/signed-copy-story" />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={`Read the opening — ${BOOK_TITLE}`} />
        <meta property="og:url" content="https://www.riturajverma.com/signed-copy-story" />
      </Helmet>
      <header className="site-header">
        <div className="site-container flex items-center gap-2">
          {step > 0 && (
            <button type="button" onClick={back} aria-label="Back" className="-ml-3 inline-flex h-11 w-11 items-center justify-center text-accent">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <Link to="/" className="inline-flex min-h-[44px] items-center font-serif text-xl text-accent">Rituraj Verma</Link>
        </div>
      </header>
      <main className={step < 5 ? 'pb-32' : 'pb-6'}>
        {step === 0 && (
          <section className="site-container pt-6 text-center">
            <img src="/raghav-ebook-cover.jpg" alt={`${BOOK_TITLE} book cover`} width={220} className="mx-auto h-auto w-52" fetchPriority="high" />
            <h1 className="mt-6 text-3xl font-bold leading-tight">{hook.headline}</h1>
            <p className="mt-4 text-lg">{hook.sub}</p>
          </section>
        )}
        {passage && (
          <article className="mx-auto px-5 pt-5" style={{ ...reading, maxWidth: '34em', fontSize: 18, lineHeight: 1.65 }}>
            <div className="mb-5 flex items-center gap-3 font-sans text-sm" style={{ color: '#B8B0A0' }}>
              <img src="/raghav-ebook-cover.jpg" alt="" width={40} className="h-auto w-10" />
              <span>Page {step} of 3</span>
            </div>
            <p className="mb-6 italic" style={{ color: '#CFC7B6' }}>{passage.bridge}</p>
            {passage.paragraphs.map((text, i) => <p key={i} className="mb-5">{text}</p>)}
            {passage.after && <p className="mt-6 italic" style={{ color: '#CFC7B6' }}>{passage.after}</p>}
          </article>
        )}
        {step === 4 && (
          <section className="site-container pt-6">
            <h1 className="text-3xl font-bold">Find out what happens.</h1>
            <figure className="mt-5 border border-accent/35 bg-card p-5">
              <p aria-label="5 out of 5 stars" className="text-accent">★★★★★</p>
              <blockquote className="mt-2 text-lg">“The world of this story looks organic and lived in, and not dry or forced.”</blockquote>
              <figcaption className="mt-2 text-sm text-lapis/80">— Rahul Vishnoi, Amazon.in reader review</figcaption>
            </figure>
            <p className="mt-3 text-sm text-lapis/80">{READER_REVIEWS.length} reader reviews so far</p>
          </section>
        )}
        {step === 5 && (
          <>
            <section className="site-container pt-5">
              <div className="flex items-center gap-4">
                <img src="/raghav-ebook-cover.jpg" alt={`${BOOK_TITLE} book cover`} width={64} className="h-auto w-16 shrink-0" />
                <h1 className="min-w-0 text-2xl leading-tight">{BOOK_TITLE}, signed copy</h1>
              </div>
              <p className="mt-4 leading-relaxed"><span className="whitespace-nowrap font-semibold">₹{TOTAL_PRICE}</span>, shipping included. Signed by the author, with your own message handwritten inside.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {TRUST.map(item => (
                  <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><span>{item}</span></li>
                ))}
              </ul>
            </section>
            <section className="site-container py-6">
              <SignedCopyOrderFlow placement="story" paymentPlacement="story_payment" />
            </section>
            <div className="site-container pb-4">
              <a href={amazon.url} target="_blank" rel="noopener noreferrer" onClick={() => trackPurchaseClick('AmazonClick', 'story', amazon.store)} className="inline-flex min-h-[44px] items-center underline underline-offset-4">Prefer Amazon or Kindle? Get it there instead.</a>
              <p className="text-sm text-lapis/70">As an Amazon Associate I earn from qualifying purchases.</p>
            </div>
          </>
        )}
      </main>
      {step < 5 && (
        <div data-sticky-purchase-bar className="fixed inset-x-0 bottom-0 z-40 border-t border-accent/35 px-5 pt-3 text-center" style={{ background: '#15202B', paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
          <div className="mx-auto max-w-md">
            <button type="button" onClick={next} className="min-h-[48px] w-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover">{BUTTON_LABELS[step]}</button>
            {step === 0 && <p className="mt-2 text-sm text-lapis/80">Two minutes. Nothing to buy until the end.</p>}
          </div>
        </div>
      )}
      <footer className="site-footer py-3">
        <div className="site-container">
          <Link to="/privacy" className="inline-flex min-h-[44px] items-center underline underline-offset-4">Privacy policy</Link>
        </div>
        <VisitorCounter showCounts={false} />
      </footer>
    </div>
  );
};

export default SignedCopyStory;
