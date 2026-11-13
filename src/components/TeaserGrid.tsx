import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NAV_PAGES } from '@/config/site';
export default function TeaserGrid() {
  return <section className="band-section"><div className="site-container grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {NAV_PAGES.slice(1).map(page => <Link key={page.path} to={page.path} className={`teaser-card ${page.path === '/shop' ? 'teaser-shop' : ''}`}>
      <h2 className="font-serif text-accent text-[21px] leading-snug">{page.label}</h2>
      <p className="mt-3 text-secondary">{page.tagline}</p>
      <ArrowRight className="mt-auto pt-6 box-content text-primary" size={22} aria-hidden="true" />
    </Link>)}
  </div></section>;
}
