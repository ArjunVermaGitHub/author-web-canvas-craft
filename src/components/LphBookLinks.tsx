import BookButton from '@/components/BookButton';
import { LPH_BOOK } from '@/data/alternateEndings';

export default function LphBookLinks() {
  return (
    <section className="mt-10 border-t-2 border-lapis pt-6" aria-labelledby="get-lph-book">
      <h2 id="get-lph-book" className="font-serif text-2xl mb-4">Get the book</h2>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        {LPH_BOOK.kindleUrl && <BookButton href={LPH_BOOK.kindleUrl} target="_blank" rel="noopener noreferrer">Read on Kindle — India</BookButton>}
        {LPH_BOOK.indiaUrl !== LPH_BOOK.kindleUrl && <BookButton href={LPH_BOOK.indiaUrl} target="_blank" rel="noopener noreferrer" variant={LPH_BOOK.kindleUrl ? 'outline' : 'primary'}>Amazon India</BookButton>}
        <BookButton href={LPH_BOOK.internationalUrl} target="_blank" rel="noopener noreferrer" variant="outline">Read on Kindle — outside India</BookButton>
      </div>
      <p className="mt-3 text-sm text-secondary">Kindle edition. The paperback is out of print.</p>
      <p className="mt-6 leading-relaxed break-words">
        Disagree with these endings? Write your own and send it to{' '}
        <a href={`mailto:${LPH_BOOK.authorEmail}`} className="underline underline-offset-4">{LPH_BOOK.authorEmail}</a>
      </p>
    </section>
  );
}