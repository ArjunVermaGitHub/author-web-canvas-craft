import { Link } from 'react-router-dom';
import { OTHER_BOOK_SERIES } from '@/data/otherBooks';
import VisitorCounter from './VisitorCounter';
export default function Footer() {
  return <footer className="site-footer"><div className="site-container py-10">
    <div className="grid md:grid-cols-2 gap-8">
      <div><Link to="/author" className="inline-flex min-h-11 items-center font-serif text-xl text-accent hover:text-link-hover">Rituraj Verma</Link><p className="text-secondary">Author of the Raghav Kartikeya series</p><Link to="/privacy" className="inline-flex min-h-11 items-center underline underline-offset-4 text-accent hover:text-link-hover mt-3">Privacy policy</Link></div>
      <nav aria-label="Other books"><h2 className="font-serif text-xl text-accent mb-2">Other books</h2><ul>{OTHER_BOOK_SERIES.map(series => <li key={series.path}><Link to={series.path} className="inline-flex min-h-11 items-center text-accent hover:text-link-hover">{series.label}</Link></li>)}</ul></nav>
    </div>
    <VisitorCounter /><p className="text-secondary mt-6">As an Amazon Associate I earn from qualifying purchases.</p><p className="text-secondary mt-8 pt-6 border-t border-accent/35">© 2026 Rituraj Verma. All rights reserved.</p>
  </div></footer>;
}
