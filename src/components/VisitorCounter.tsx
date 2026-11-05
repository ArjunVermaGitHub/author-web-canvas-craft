import { useEffect } from 'react';

const ID_KEY = 'rv-visitor-id';
const DAY_KEY = 'rv-visit-day';

// Silently records one visit per browser per day. Counts are shown only on the owner page.
const VisitorCounter = () => {
  useEffect(() => {
    try {
      let id = localStorage.getItem(ID_KEY);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(ID_KEY, id);
      }
      const today = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem(DAY_KEY) === today) return;
      fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: id }),
      })
        .then((r) => { if (r.ok) localStorage.setItem(DAY_KEY, today); })
        .catch(() => {});
    } catch {
      /* storage unavailable */
    }
  }, []);
  return null;
};

export default VisitorCounter;
