import { useEffect, useState } from 'react';

const ID_KEY = 'rv-visitor-id';
const DAY_KEY = 'rv-visit-day';

const VisitorCounter = () => {
  const [counts, setCounts] = useState<{ last24h: number; total: number } | null>(null);

  useEffect(() => {
    let id = localStorage.getItem(ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(ID_KEY, id);
    }
    const today = new Date().toISOString().slice(0, 10);
    const isNewToday = localStorage.getItem(DAY_KEY) !== today;
    fetch('/api/visits', isNewToday
      ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visitorId: id }) }
      : undefined)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.total === 'number') {
          if (isNewToday) localStorage.setItem(DAY_KEY, today);
          setCounts(d);
        }
      })
      .catch(() => {});
  }, []);

  if (!counts) return null;
  return (
    <p className="text-stonepage/70 text-base mt-6">
      {counts.last24h.toLocaleString('en-IN')} visitors in the last 24 hours ·{' '}
      {counts.total.toLocaleString('en-IN')} visitors in total
    </p>
  );
};

export default VisitorCounter;
