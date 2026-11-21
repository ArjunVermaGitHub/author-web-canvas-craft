import { useState } from 'react';
import { NAV_PAGES } from '@/config/site';
import { FLIPKART_URL } from '@/config/book';
import { getBrowserAmazonStore, selectEbookUrl, trackPurchaseClick } from '@/lib/purchase';
import { Link } from 'react-router-dom';
import { OTHER_BOOK_SERIES } from '@/data/otherBooks';
import VisitorCounter from './VisitorCounter';
export default function Footer({ home = false }: { home?: boolean }) {
  const [amazon] = useState(getBrowserAmazonStore);
  return <footer className="site-footer"><div className="site-container py-10">
    {home && <div className="border-b border-accent/35 pb-6 mb-8"><div className="flex flex-wrap items-center gap-x-3 text-secondary"><span>Prefer a store?</span><a href={amazon.url} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex min-h-11 items-center text-accent underline" onClick={() => trackPurchaseClick('AmazonClick', 'home_footer', amazon.store)}>Amazon</a><span>·</span><a href={FLIPKART_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-accent underline" onClick={() => trackPurchaseClick('FlipkartClick', 'home_footer')}>Flipkart</a><span>·</span><a href={selectEbookUrl(amazon.store)} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex min-h-11 items-center text-accent underline" onClick={() => trackPurchaseClick('EbookClick', 'home_footer', amazon.store === 'India' ? undefined : amazon.store)}>Kindle ebook</a></div><p className="text-sm text-secondary">As an Amazon Associate I earn from qualifying purchases.</p><nav aria-label="Series pages" className="flex flex-wrap gap-x-5 mt-4">{NAV_PAGES.filter(page => page.path !== '/').map(page => <Link to={page.path} key={page.path} className="min-h-11 inline-flex items-center text-accent">{page.label}</Link>)}</nav></div>}
    <div className="grid md:grid-cols-2 gap-8">
      <div><Link to="/author" className="inline-flex min-h-11 items-center font-serif text-xl text-accent hover:text-link-hover">Rituraj Verma</Link><p className="text-secondary">Author of the Raghav Kartikeya series</p><Link to="/privacy" className="inline-flex min-h-11 items-center underline underline-offset-4 text-accent hover:text-link-hover mt-3">Privacy policy</Link></div>
      <nav aria-label="Other books"><h2 className="font-serif text-xl text-accent mb-2">Other books</h2><ul>{OTHER_BOOK_SERIES.map(series => <li key={series.path}><Link to={series.path} className="inline-flex min-h-11 items-center text-accent hover:text-link-hover">{series.label}</Link></li>)}</ul></nav>
    </div>
    <VisitorCounter />{!home && <p className="text-secondary mt-6">As an Amazon Associate I earn from qualifying purchases.</p>}<p className="text-secondary mt-8 pt-6 border-t border-accent/35">© 2026 Rituraj Verma. All rights reserved.</p>
  </div></footer>;
}
