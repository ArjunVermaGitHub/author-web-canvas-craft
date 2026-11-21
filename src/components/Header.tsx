import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { NAV_PAGES } from '@/config/site';
import { TOTAL_PRICE } from '@/config/book';
import { DESKTOP_NAV_PAGES, MORE_NAV_PAGES } from '@/lib/homeConversion';
import { shouldShowPurchaseButtons } from '@/lib/headerPurchase';
import { trackPurchaseClick } from '@/lib/purchase';
import BookButton from './BookButton';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const showShop = shouldShowPurchaseButtons(pathname);
  const shop = <BookButton href={pathname === '/' ? '#order' : '/shop#buy'} aria-current={pathname === '/shop' ? 'page' : undefined} className="header-shop px-4 whitespace-nowrap" onClick={() => { trackPurchaseClick('OrderClick', 'header'); setOpen(false); }}>Order signed copy · ₹{TOTAL_PRICE}</BookButton>;
  return <header className="site-header sticky top-0 z-40"><div className="site-container">
    <div className="header-row flex items-center justify-between gap-4 py-3">
      <Link to="/" className="shrink-0 min-h-11 flex flex-col justify-center leading-snug" aria-label="Raghav Kartikeya: Fantasy with Roots — Home"><span className="brand-name">RAGHAV KARTIKEYA</span><span className="brand-tagline mt-1">FANTASY WITH ROOTS</span></Link>
      <nav className="desktop-nav items-center gap-4" aria-label="Main">
        {DESKTOP_NAV_PAGES.map(page => <Link key={page.path} to={page.path} className="nav-link text-foreground hover:text-accent text-sm whitespace-nowrap" aria-current={pathname === page.path ? 'page' : undefined}>{page.path === '/reviews' ? 'Reviews' : page.label}</Link>)}
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="text-foreground px-2 rounded-sm">More <ChevronDown size={16} /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="rounded-sm shadow-none border-accent/35">
          {MORE_NAV_PAGES.map(page => <DropdownMenuItem key={page.path} asChild className="min-h-11"><Link to={page.path} aria-current={pathname === page.path ? 'page' : undefined}>{page.label}</Link></DropdownMenuItem>)}
          {!showShop && <DropdownMenuItem asChild className="min-h-11"><Link to="/shop">Shop the Book</Link></DropdownMenuItem>}
        </DropdownMenuContent></DropdownMenu>
        {showShop && shop}
      </nav>
      <div className="mobile-nav-controls"><Button variant="ghost" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </div>
    {open && <nav id="site-menu" className="mobile-menu pb-5 max-h-[calc(100dvh-76px)] overflow-y-auto" aria-label="Mobile"><ul className="border-t border-accent/35 divide-y divide-accent/20">
      {NAV_PAGES.map(page => <li key={page.path}>{page.path === '/shop' && showShop ? <div className="pt-4">{shop}</div> : <Link to={page.path} onClick={() => setOpen(false)} aria-current={pathname === page.path ? 'page' : undefined} className="mobile-page-link block py-3 min-h-11 text-foreground hover:text-accent"><span className="block font-semibold">{page.label}</span><span className="block text-sm text-secondary">{page.tagline}</span></Link>}</li>)}
    </ul></nav>}
  </div></header>;
}
