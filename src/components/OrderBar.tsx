import { useEffect, useState } from 'react';
import PurchaseButtons from './PurchaseButtons';
import { TOTAL_PRICE } from '@/config/book';

export default function OrderBar() {
  const [buyVisible, setBuyVisible] = useState(true);
  useEffect(() => {
    const buy = document.getElementById('buy');
    if (!buy) { setBuyVisible(false); return; }
    const observer = new IntersectionObserver(([entry]) => {
      setBuyVisible(entry?.isIntersecting ?? false);
    });
    observer.observe(buy);
    return () => observer.disconnect();
  }, []);

  if (buyVisible) return null;
  return (
    <aside aria-label="Book ordering" className="order-bar fixed inset-x-0 bottom-0 z-50 bg-background border-t border-accent/35 pt-2">
      <div className="site-container md:flex md:justify-center">
        <PurchaseButtons placement="sticky_bar" showFollow={false} className="!grid grid-cols-3 md:!flex" signedClassName="min-w-0 px-1 text-sm md:text-base md:px-6" amazonClassName="min-w-0 px-1 text-sm md:text-base md:px-6" amazonVariant="outline-ember" flipkartClassName="min-w-0 px-1 text-sm md:text-base md:px-6">
          Signed copy ₹{TOTAL_PRICE}
        </PurchaseButtons>
      </div>
    </aside>
  );
}