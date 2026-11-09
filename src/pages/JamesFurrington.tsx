import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Cat, ExternalLink, PawPrint } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookButton from '@/components/BookButton';
import { OTHER_BOOKS, OTHER_BOOKS_SERIES_URL } from '@/data/otherBooks';

const description = 'Cute cat coloring books for children, teens and adults, with cats exploring places, festivals and adventures around the world.';

export default function JamesFurrington() {
  return (
    <div className="min-h-screen bg-stonepage text-lapis">
      <Helmet>
        <title>James Furrington: Cute Cats Coloring Books</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://riturajverma.com/james-furrington" />
        <meta property="og:title" content="James Furrington: Cute Cats Coloring Books" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://riturajverma.com/james-furrington" />
      </Helmet>
      <Header />
      <main id="top" className="band-section">
        <div className="max-w-6xl mx-auto">
          <Cat className="h-12 w-12 mb-6" aria-hidden="true" />
          <h1 className="page-heading max-w-4xl">Cute Cats Coloring Books by James Furrington</h1>
          <p className="text-lg max-w-3xl leading-relaxed">{description}</p>
          <p className="mt-6 text-sm leading-relaxed max-w-3xl">
            James Furrington is a pen name of{' '}
            <Link to="/" className="underline underline-offset-4 inline-flex items-center min-h-11">Rituraj Verma</Link>, author of Raghav Kartikeya and the Tablets of Dharma.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {OTHER_BOOKS.map(book => (
              <li key={book.url} className="border-t-2 border-lapis pt-6 pb-4 flex flex-col min-w-0">
                {book.cover ? (
                  <div className="aspect-square w-full mb-6 flex items-center justify-center">
                    <img src={book.cover.path} alt={book.cover.alt} width={book.cover.width} height={book.cover.height} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <PawPrint className="h-6 w-6 mb-4 text-lapis/60" aria-hidden="true" />
                )}
                <h2 className="font-serif text-2xl leading-tight break-words">{book.title}</h2>
                <p className="mt-3 leading-relaxed">{book.blurb}</p>
                <p className="mt-4 mb-6 text-sm text-lapis/70">{book.format} · {book.pages} pages</p>
                <BookButton href={book.url} target="_blank" rel="noopener noreferrer" className="mt-auto w-full gap-2">
                  Order on Amazon <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </BookButton>
              </li>
            ))}
          </ul>
          <a href={OTHER_BOOKS_SERIES_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
            See the whole series on Amazon <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}