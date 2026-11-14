import PageLayout from '@/components/PageLayout';
import StorySection from '@/components/StorySection';
import OtherBooksSection from '@/components/OtherBooksSection';
import { NAV_PAGES } from '@/config/site';
import { BOOKS } from '@/data/books';
export default function Books() { return <PageLayout page={NAV_PAGES[1]}><section className="band-section"><div className="site-container">
  {BOOKS.map(book => <article key={book.title}><h2 className="page-heading">{book.title}</h2><dl className="grid sm:grid-cols-2 gap-x-8">
    {book.facts.map(([term, detail]) => <div className="border-b border-border py-4" key={term}><dt className="text-accent font-semibold">{term}</dt><dd className="mt-2 text-secondary">{detail}</dd></div>)}
  </dl></article>)}
</div></section><StorySection /><OtherBooksSection /></PageLayout>; }
