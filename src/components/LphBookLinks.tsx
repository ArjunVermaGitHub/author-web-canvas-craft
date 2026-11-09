import BookButton from '@/components/BookButton';
import { LPH_BOOK } from '@/data/alternateEndings';

export default function LphBookLinks() {
  return (
    <section className="mt-10 border-t-2 border-lapis pt-6" aria-labelledby="get-lph-book">
      <h2 id="get-lph-book" className="font-serif text-2xl mb-4">Get the book</h2>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <BookButton href={LPH_BOOK.indiaUrl} target="_blank" rel="noopener noreferrer">Amazon India</BookButton>
        <BookButton href={LPH_BOOK.internationalUrl} target="_blank" rel="noopener noreferrer" variant="outline">Amazon.com</BookButton>
      </div>
      <p className="mt-6 leading-relaxed break-words">
        Disagree with these endings? Write your own and send it to{' '}
        <a href={`mailto:${LPH_BOOK.authorEmail}`} className="underline underline-offset-4">{LPH_BOOK.authorEmail}</a>
      </p>
    </section>
  );
}