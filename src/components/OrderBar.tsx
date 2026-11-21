import { useEffect, useState } from 'react';
import BookButton from './BookButton';
import { BOOK_TITLE, TOTAL_PRICE } from '@/config/book';
import { showHomeOrderBar } from '@/lib/homeConversion';
import { trackPurchaseClick } from '@/lib/purchase';

export default function OrderBar() {
  const [heroPassed, setHeroPassed] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('home-hero-cta');
    const order = document.getElementById('order');
    if (!hero || !order) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroPassed(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
        if (entry.target === order) setOrderVisible(entry.isIntersecting);
      }
    });
    observer.observe(hero); observer.observe(order);
    return () => observer.disconnect();
  }, []);
  if (!showHomeOrderBar(heroPassed, orderVisible)) return null;
  return <aside aria-label="Book ordering" className="order-bar fixed inset-x-0 bottom-0 z-50 bg-background border-t border-accent/35 pt-2"><div className="site-container flex items-center justify-between gap-3">
    <div className="flex items-center gap-3 min-w-0"><img src="/raghav-ebook-cover.jpg" alt={BOOK_TITLE} width={1200} height={1920} className="w-7 h-auto shrink-0" /><div><p className="text-accent font-semibold text-xl leading-tight">₹{TOTAL_PRICE}</p><p className="text-secondary text-xs">Signed · 5-day delivery</p></div></div>
    <BookButton href="#order" className="px-4 min-h-12 text-sm shrink-0" onClick={() => trackPurchaseClick('OrderClick', 'sticky_bar')}>Order signed copy</BookButton>
  </div></aside>;
}
