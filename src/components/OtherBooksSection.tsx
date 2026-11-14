import { Link } from 'react-router-dom';
import { LPH_BOOK, type LphBook } from '@/data/alternateEndings';
import { OTHER_BOOKS, OTHER_BOOKS_SERIES_URL } from '@/data/otherBooks';
import BookButton from './BookButton';

export default function OtherBooksSection({ lphBook = LPH_BOOK }: { lphBook?: LphBook }) {
  return <section className="band-section" aria-labelledby="other-books-heading">
    <div className="site-container">
      <p className="eyebrow mb-4">ALSO BY THE AUTHOR</p>
      <h2 id="other-books-heading" className="section-heading">More books by Rituraj Verma</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <article className="content-panel p-6 flex flex-col min-w-0">
          {lphBook.cover && <img src={lphBook.cover.path} alt={lphBook.cover.alt} width={lphBook.cover.width} height={lphBook.cover.height} loading="lazy" className="w-40 aspect-[3/4] object-contain mb-6" />}
          <h3 className="font-serif text-accent text-2xl leading-snug">{lphBook.title}</h3>
          <p className="text-secondary mt-3">{lphBook.year} · {lphBook.publisher}</p>
          <p className="mt-4 mb-6">A collection of short stories, with alternate endings to read online.</p>
          <div className="mt-auto flex flex-col gap-3">
            {lphBook.kindleUrl && <BookButton href={lphBook.kindleUrl} target="_blank" rel="noopener noreferrer">Read on Kindle</BookButton>}
            <BookButton variant={lphBook.kindleUrl ? 'outline' : 'primary'} href={lphBook.indiaUrl} target="_blank" rel="noopener noreferrer">Buy on Amazon India</BookButton>
            <BookButton variant="outline" href={lphBook.internationalUrl} target="_blank" rel="noopener noreferrer">Buy outside India</BookButton>
            <Link className="text-accent hover:text-link-hover min-h-11 inline-flex items-center underline underline-offset-4" to="/lph/alternate-endings/">Read the alternate endings</Link>
          </div>
        </article>
        <article className="content-panel p-6 flex flex-col min-w-0">
          <h3 className="font-serif text-accent text-2xl leading-snug">Cute Cats Coloring Books by James Furrington (pen name)</h3>
          <div className="grid grid-cols-4 gap-3 my-6">
            {OTHER_BOOKS.slice(0, 4).map(book => <div key={book.url} className="aspect-[3/4] min-w-0 flex items-center justify-center">
              {book.cover && <img src={book.cover.path} alt={book.cover.alt} width={book.cover.width} height={book.cover.height} loading="lazy" className="w-full h-full object-contain" />}
            </div>)}
          </div>
          <p className="mb-6">{OTHER_BOOKS.length} coloring books for all ages.</p>
          <div className="mt-auto flex flex-col gap-3">
            <BookButton href="/james-furrington">See all the coloring books</BookButton>
            <BookButton variant="outline" href={OTHER_BOOKS_SERIES_URL} target="_blank" rel="noopener noreferrer">View the series on Amazon</BookButton>
          </div>
        </article>
      </div>
    </div>
  </section>;
}