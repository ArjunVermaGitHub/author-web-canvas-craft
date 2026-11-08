import { useMemo, useState } from 'react';
import { INTERNET_ABBREVIATIONS } from '@/data/internetAbbreviations';
import { Input } from '@/components/ui/input';

const InternetAbbreviations = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INTERNET_ABBREVIATIONS;
    return INTERNET_ABBREVIATIONS.filter(
      (entry) =>
        entry.abbr.toLowerCase().includes(q) ||
        entry.meaning.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section
      id="slang"
      className="scroll-mt-20 bg-stonepage band-section"
      aria-labelledby="internet-abbr-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="internet-abbr-heading" className="page-heading max-w-3xl">
          A script the internet can read
        </h2>
        <p className="text-lg text-lapis/90 max-w-3xl mb-8 leading-relaxed">
          Ancient seals still stump scholars. Group chats do not. Here is a
          field guide to common internet, texting, Tumblr, Reddit and Gen Z
          abbreviations — including ftfy, brb, gtg and loml.
        </p>

        <div className="max-w-3xl mb-8">
          <label htmlFor="abbr-search" className="sr-only">
            Search abbreviations
          </label>
          <Input
            id="abbr-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search abbr or meaning (e.g. ftfy, brb, gtg)"
            className="bg-stonepage border-lapis/40 text-lapis placeholder:text-lapis/50"
          />
          <p className="text-sm text-lapis/70 mt-2" aria-live="polite">
            Showing {filtered.length} of {INTERNET_ABBREVIATIONS.length}
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 max-h-[32rem] overflow-y-auto border-t-4 border-lapis pt-6 pr-2">
          {filtered.map((entry) => (
            <li key={entry.abbr} className="border-b border-lapis/20 pb-3">
              <p className="font-serif text-xl text-carnelian lowercase tracking-wide">
                {entry.abbr}
              </p>
              <p className="text-lapis/90 leading-snug">{entry.meaning}</p>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="text-lapis/80 mt-4">No matches. Try another search.</p>
        )}
      </div>
    </section>
  );
};

export default InternetAbbreviations;
