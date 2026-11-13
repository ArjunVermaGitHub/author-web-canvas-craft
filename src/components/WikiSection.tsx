import { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { WIKI_TERMS } from '@/data/wikiTerms';
import { filterWiki, groupWiki } from '@/lib/wikiFilter';
export default function WikiSection() {
  const [query, setQuery] = useState('');
  const groups = groupWiki(filterWiki(WIKI_TERMS, query));
  return <section id="wiki" className="band-section"><div className="site-container">
    <label htmlFor="wiki-search" className="sr-only">Search Raghav’s Wiki</label>
    <div className="relative mb-6"><Search className="absolute left-4 top-4 text-accent" size={20} aria-hidden="true" /><Input id="wiki-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search terms" className="min-h-14 pl-12 bg-card border-border focus-visible:ring-primary" type="search" /></div>
    <nav aria-label="Wiki letters" className="flex flex-wrap gap-2 mb-10">{groups.map(group => <a key={group.letter} href={`#wiki-${group.letter}`} className="inline-flex items-center justify-center min-h-11 min-w-11 text-accent border border-border hover:border-accent">{group.letter}</a>)}</nav>
    {!groups.length && <p role="status">No terms match.</p>}
    {groups.map(group => <section key={group.letter} id={`wiki-${group.letter}`} className="scroll-mt-28 mb-12">
      <h2 className="text-primary text-3xl border-b border-border pb-3 mb-5">{group.letter}</h2>
      <ul className="wiki-grid">{group.terms.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer" className="content-panel flex h-full min-h-11 flex-col gap-4 p-6">
        <h3 className="font-serif text-xl text-accent break-words">{item.term}</h3><p className="text-secondary break-words">{item.blurb}</p>
        <span className="flex justify-between mt-auto text-muted-foreground">Wikipedia<ExternalLink size={18} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></span>
      </a></li>)}</ul>
    </section>)}
    <p className="text-muted-foreground">Links open Wikipedia in a new tab.</p>
  </div></section>;
}
