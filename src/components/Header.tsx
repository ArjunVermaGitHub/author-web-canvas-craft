import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NAV_PAGES } from '@/config/site';
import { shouldShowPurchaseButtons } from '@/lib/headerPurchase';
import { trackPurchaseClick } from '@/lib/purchase';
import BookButton from './BookButton';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const showShop = shouldShowPurchaseButtons(pathname);
  const shop = <BookButton href="/shop#buy" aria-current={pathname === "/shop" ? "page" : undefined} className="header-shop px-4 whitespace-nowrap " onClick={() => { trackPurchaseClick('OrderClick', 'header'); setOpen(false); }}>Shop the Book</BookButton>;
  return <header className="site-header sticky top-0 z-40">
    <div className="site-container">
      <div className="header-row flex items-center justify-between gap-4 py-4">
        <Link to="/" className="shrink-0 min-h-11 flex flex-col justify-center leading-snug" aria-label="Raghav Kartikeya: Fantasy with Roots — Home">
          <span className="brand-name">RAGHAV KARTIKEYA</span><span className="brand-tagline mt-1">FANTASY WITH ROOTS</span>
        </Link>
        <nav className="desktop-nav items-center gap-2" aria-label="Main">
          {NAV_PAGES.slice(0, -1).map(page => <Link key={page.path} to={page.path} className="nav-link text-foreground hover:text-accent text-sm whitespace-nowrap" aria-current={pathname === page.path ? 'page' : undefined}>{page.label}</Link>)}
          {showShop && shop}
        </nav>
        <div className="mobile-nav-controls items-center gap-3">
          <div className="hidden sm:block">{showShop && shop}</div>
          <Button variant="ghost" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <nav id="site-menu" className="mobile-menu pb-5 max-h-[calc(100dvh-90px)] overflow-y-auto" aria-label="Mobile">
        <ul className="border-t border-accent/35 divide-y divide-accent/20">
          {NAV_PAGES.filter(page => page.path !== '/shop' || showShop).map(page => <li key={page.path}>
            {page.path === '/shop' ? <div className="pt-4">{shop}</div> : <Link to={page.path} onClick={() => setOpen(false)} aria-current={pathname === page.path ? 'page' : undefined} className="mobile-page-link block py-3 min-h-11 text-foreground hover:text-accent"><span className="block font-semibold">{page.label}</span><span className="block text-sm text-secondary">{page.tagline}</span></Link>}
          </li>)}
        </ul>
      </nav>}
    </div>
  </header>;
}
