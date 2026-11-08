import { useEffect, useState } from 'react';
import PurchaseButtons from './PurchaseButtons';
import { TOTAL_PRICE } from '@/config/book';

export default function MobileOrderBar() {
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
    <aside aria-label="Mobile book ordering" className="mobile-order-bar fixed inset-x-0 bottom-0 z-50 md:hidden bg-lapis border-t-2 border-ember px-3 pt-2">
      <PurchaseButtons placement="sticky_bar" className="!flex-row" signedClassName="flex-1 min-w-0 px-2" amazonClassName="flex-1 min-w-0 px-2" amazonVariant="outline-ember">
        Signed copy ₹{TOTAL_PRICE}
      </PurchaseButtons>
    </aside>
  );
}