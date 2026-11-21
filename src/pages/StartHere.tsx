import PageLayout from '@/components/PageLayout';
import BookButton from '@/components/BookButton';
import { NAV_PAGES } from '@/config/site';
import { BOOK_TITLE } from '@/config/book';
import { BOOK2_SIGNUP_PATH } from '@/config/book2Progress';

export const START_HERE_STEPS = [
  { label: 'Read the first two chapters free', href: BOOK2_SIGNUP_PATH },
  { label: 'Meet the characters', href: '/characters' },
  { label: 'Explore the myths and places', href: '/wiki' },
  { label: 'Get a signed copy', href: '/shop' },
] as const;

export default function StartHere() {
  const page = NAV_PAGES.find(page => page.path === '/start-here');
  if (!page) return null;
  return <PageLayout page={page}>
    <section className="band-section border-b border-accent/35"><div className="site-container">
      <h2 className="page-heading">New to Raghav Kartikeya? Start here</h2>
      <h3 className="text-2xl text-accent mb-5">What is this series?</h3>
      <p className="max-w-3xl text-lg leading-relaxed">Raghav Kartikeya is a mythological fantasy series for teens and the adults who read with them. It begins in modern Mumbai, with a nine-year-old who can read the Indus Valley script, a language no scholar has ever deciphered. That gift pulls him into a story that stretches back five thousand years to the cities of the Indus civilisation, and into the path of Tarak, an immortal warlord who wants the tablets Raghav can read.</p>
    </div></section>
    <section className="band-section border-b border-accent/35"><div className="site-container">
      <h2 className="page-heading">Who it's for</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          ['Teen readers (12+)', 'A fast, high-stakes quest with a hero who is small, sickly and underestimated.'],
          ['Parents and grandparents', "Indian mythology and real history, told as an adventure your child won't want to put down."],
          ['Mythology fans', 'Lord Shiva, Parashuram, Little Yama and the lost world of Mohenjo-daro, rooted in real archaeology.'],
        ].map(([title, text]) => <article className="content-panel p-6" key={title}><h3 className="text-xl text-accent mb-4">{title}</h3><p className="text-secondary leading-relaxed">{text}</p></article>)}
      </div>
    </div></section>
    <section className="band-section border-b border-accent/35"><div className="site-container">
      <h2 className="page-heading">Where to begin</h2>
      <ol className="grid sm:grid-cols-2 gap-4 max-w-3xl">
        {START_HERE_STEPS.map((step, index) => <li className="flex items-center gap-4" key={step.href + index}><span className="text-2xl text-accent tabular-nums" aria-hidden="true">{index + 1}</span><BookButton variant={index === 3 ? 'primary' : 'outline'} href={step.href} className="flex-1">{step.label}</BookButton></li>)}
      </ol>
    </div></section>
    <section className="band-section"><div className="site-container">
      <h2 className="page-heading">The series so far</h2>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex items-start gap-6"><a href="/books" className="shrink-0"><img src="/raghav-ebook-cover.jpg" alt={`${BOOK_TITLE} — book cover`} width={1200} height={1920} loading="lazy" className="w-24 sm:w-32 h-auto border border-accent/35" /></a><div className="min-w-0"><p className="text-sm text-secondary mb-3">Book 1</p><h3 className="text-xl text-heading mb-5">Raghav Kartikeya and the Tablets of Dharma — out now</h3><BookButton variant="outline" href="/books">The Books</BookButton></div></div>
        <div><p className="text-sm text-secondary mb-3">Book 2</p><h3 className="text-xl text-heading mb-5">The Moonwell — being written</h3><BookButton variant="outline" href="/books#book2-progress">Book 2 progress</BookButton></div>
      </div>
    </div></section>
  </PageLayout>;
}
