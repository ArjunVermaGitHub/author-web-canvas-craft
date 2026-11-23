import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hashRedirect } from '@/lib/hashRedirect';
import { allowsClarity, setClarityCampaign } from '@/lib/clarity';
export default function ScrollToHash() {
  const { pathname, hash, search } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!allowsClarity(window.location.hostname, pathname, navigator.userAgent)) return;
    if (setClarityCampaign()) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      if (setClarityCampaign() || ++attempts >= 30) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [pathname, search]);
  useEffect(() => {
    const target = pathname === '/' ? hashRedirect(hash) : null;
    if (target) { const [path, targetHash] = target.split('#'); navigate(`${path}${search}${targetHash ? `#${targetHash}` : ''}`, { replace: true }); return; }
    // Lazy routes can resolve after the router effect: wait for the anchor to mount.
    let observer: MutationObserver | undefined;
    const scroll = () => {
      const element = hash ? document.getElementById(hash.slice(1)) : document.querySelector('main');
      if (!element) return false;
      if (hash) element.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      observer?.disconnect();
      return true;
    };
    const frame = requestAnimationFrame(() => {
      if (scroll()) return;
      observer = new MutationObserver(scroll);
      observer.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });
    });
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); };
  }, [pathname, hash, search, navigate]);
  return null;
}
