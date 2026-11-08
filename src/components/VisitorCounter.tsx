import { useEffect, useState } from 'react';

const ID_KEY = 'rv-visitor-id';
const DAY_KEY = 'rv-visit-day';

type Counts = { last24h: number; total: number };

// Records one visit per browser per day, then shows public visitor counts.
// Hidden until the Vercel API responds (e.g. in the Lovable preview).
const VisitorCounter = () => {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const load = () =>
      fetch('/api/visits')
        .then((r) => (r.ok ? r.json() : null))
        .then((b) => {
          if (b && typeof b.total === 'number') setCounts({ last24h: b.last24h, total: b.total });
        })
        .catch(() => {});
    try {
      let id = localStorage.getItem(ID_KEY);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(ID_KEY, id);
      }
      const today = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem(DAY_KEY) === today) return void load();
      fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: id }),
      })
        .then((r) => { if (r.ok) localStorage.setItem(DAY_KEY, today); })
        .catch(() => {})
        .finally(load);
    } catch {
      load();
    }
  }, []);

  if (!counts) return null;
  const fmt = (n: number) => n.toLocaleString('en-IN');
  return (
    <p className="text-stonepage/80 text-base mt-6" aria-live="polite">
      {fmt(counts.last24h)} visitors in the last 24 hours · {fmt(counts.total)} visitors in total
    </p>
  );
};

export default VisitorCounter;
