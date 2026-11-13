import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hashRedirect } from '@/lib/hashRedirect';
export default function ScrollToHash() {
  const { pathname, hash, search } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const target = pathname === '/' ? hashRedirect(hash) : null;
    if (target) { const [path, targetHash] = target.split('#'); navigate(`${path}${search}${targetHash ? `#${targetHash}` : ''}`, { replace: true }); return; }
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, search, navigate]);
  return null;
}
