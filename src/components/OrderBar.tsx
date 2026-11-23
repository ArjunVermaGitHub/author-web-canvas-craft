import { useEffect, useState } from 'react';
import AmazonPurchaseButton from './AmazonPurchaseButton';
import { showHomeOrderBar } from '@/lib/homeConversion';

export default function OrderBar() {
  const [heroPassed, setHeroPassed] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('home-hero-buy');
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
  return <aside data-sticky-purchase-bar aria-label="Book ordering" className="order-bar fixed inset-x-0 bottom-0 z-50 md:hidden bg-background border-t border-accent/35 pt-2"><div className="site-container flex items-center justify-between gap-3">
    <AmazonPurchaseButton placement="home_hero" className="px-4 min-h-12 text-sm flex-1 sm:flex-none" />
  </div></aside>;
}
