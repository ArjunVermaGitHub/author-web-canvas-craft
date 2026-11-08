import { useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { INDUS_NEWS } from '@/data/indusNews';
import BookButton from '@/components/BookButton';

type NewsItem = { title: string; outlet: string; year: number; date?: string; url: string };
const FAILURE_MESSAGE = 'Could not load the latest articles right now. Showing our picks instead.';

function isNewsItem(item: unknown): item is NewsItem {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Partial<NewsItem>;
  if (candidate.date !== undefined && typeof candidate.date !== 'string') return false;
  if (typeof candidate.title !== 'string' || !candidate.title.trim() || typeof candidate.outlet !== 'string' || !candidate.outlet.trim() || !Number.isInteger(candidate.year) || typeof candidate.url !== 'string' || !candidate.url.startsWith('https://')) return false;
  try { return new URL(candidate.url).protocol === 'https:'; } catch { return false; }
}

function articleDate(item: NewsItem) {
  if (!item.date || !Number.isFinite(Date.parse(item.date))) return item.year;
  return new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const NewsSection = () => {
  const [items, setItems] = useState<NewsItem[]>(INDUS_NEWS);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const showLatest = async () => {
    if (loading) return;
    setLoading(true);
    setStatus('Loading the latest articles…');
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('News unavailable');
      const data = await response.json();
      const latest: NewsItem[] = Array.isArray(data.items) ? data.items.filter(isNewsItem).slice(0, 15) : [];
      if (!latest.length) throw new Error('No valid articles');
      setItems(latest);
      setUpdatedAt(typeof data.updatedAt === 'string' && Number.isFinite(Date.parse(data.updatedAt)) ? data.updatedAt : new Date().toISOString());
      setStatus('Latest articles loaded.');
    } catch {
      setItems(INDUS_NEWS);
      setUpdatedAt(null);
      setStatus(FAILURE_MESSAGE);
    } finally { setLoading(false); }
  };

  const restorePicks = () => {
    setItems(INDUS_NEWS);
    setUpdatedAt(null);
    setStatus("Showing the editor's picks.");
  };

  return (
    <section id="news" className="scroll-mt-20 bg-stonepage band-section" aria-labelledby="news-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="news-heading" className="page-heading max-w-3xl">
          The Indus Valley in the news
        </h2>
        <p className="text-lg text-lapis/90 max-w-3xl mb-10">
          Real discoveries from the civilisation behind the book.
        </p>

        <div className="mb-8">
          <BookButton variant="outline" onClick={showLatest} disabled={loading} aria-busy={loading} className="gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carnelian">
            <RefreshCw size={18} aria-hidden="true" className={loading ? 'animate-spin motion-reduce:animate-none' : ''} />
            Show latest articles
          </BookButton>
          <p role="status" aria-live="polite" className="mt-3 min-h-6 text-base text-lapis/60">{status}</p>
          {updatedAt && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-base text-lapis/60">
              <p>Updated just now from live news search · <time dateTime={updatedAt}>{new Date(updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</time></p>
              <BookButton variant="outline" onClick={restorePicks} disabled={loading} className="border-0 px-0 underline underline-offset-4 hover:bg-transparent hover:text-lapis focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carnelian">Back to editor's picks</BookButton>
            </div>
          )}
        </div>

        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-8">
          {items.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 flex-col justify-between gap-3 border-t-4 border-lapis pt-5 transition-colors hover:border-carnelian focus-visible:border-carnelian focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carnelian focus-visible:ring-offset-2 focus-visible:ring-offset-stonepage"
              >
                <span className="font-serif text-xl text-lapis leading-snug break-words transition-colors group-hover:text-carnelian">
                  {item.title}
                </span>
                <span className="flex items-center justify-between gap-3 text-base text-lapis/70">
                  <span>
                    {item.outlet} · {articleDate(item)}
                  </span>
                  <ExternalLink
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-lapis/60 transition-colors group-hover:text-carnelian"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-base text-lapis/60 max-w-3xl">
          Links go to external news sites and open in a new tab. Some may need a free sign-in or have a paywall. Live results come from a news search; the owner has not reviewed each one.
        </p>
      </div>
    </section>
  );
};

export default NewsSection;
