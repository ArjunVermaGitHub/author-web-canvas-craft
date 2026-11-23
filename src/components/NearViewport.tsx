import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function NearViewport({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) { setNear(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: '300px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={host}>{near ? children : fallback}</div>;
}