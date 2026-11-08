import { useEffect, useState } from 'react';
import PurchaseButtons from './PurchaseButtons';
import { TOTAL_PRICE } from '@/config/book';

export default function OrderBar() {
  const [buyVisible, setBuyVisible] = useState(true);
  useEffect(() => {
    const buy = document.getElementById('buy');
    if (!buy) return;
    const observer = new IntersectionObserver(([entry]) => {
      setBuyVisible(entry?.isIntersecting ?? false);
    });
    observer.observe(buy);
    return () => observer.disconnect();
  }, []);

  if (buyVisible) return null;
  return (
    <aside aria-label="Book ordering" className="order-bar fixed inset-x-0 bottom-0 z-50 bg-lapis border-t-2 border-ember px-3 pt-2 md:px-8">
      <div className="max-w-6xl mx-auto md:flex md:justify-center">
        <PurchaseButtons placement="sticky_bar" className="!grid grid-cols-2 md:!flex" signedClassName="min-w-0 px-2 md:px-6" amazonClassName="min-w-0 px-2 md:px-6" amazonVariant="outline-ember">
          Signed copy ₹{TOTAL_PRICE}
        </PurchaseButtons>
      </div>
    </aside>
  );
}