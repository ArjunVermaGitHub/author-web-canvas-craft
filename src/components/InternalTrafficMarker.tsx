import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { markInternalTraffic, shouldMarkInternal } from '@/lib/internalTraffic';

// Sets the rv_internal cookie (and tags the live Clarity session) whenever an
// owner route renders or any page is visited with ?internal=1.
export default function InternalTrafficMarker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (shouldMarkInternal(pathname, search)) markInternalTraffic();
  }, [pathname, search]);

  return null;
}
