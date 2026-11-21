import { Link } from 'react-router-dom';

export default function SocialProofStrip() {
  const linkClass = 'inline-flex min-h-11 items-center text-accent underline underline-offset-4 hover:text-link-hover';
  return <section className="border-y border-accent/35 py-4" aria-label="Reader rating and press">
    <div className="site-container flex flex-col md:flex-row md:flex-wrap md:justify-between gap-x-8 gap-y-1 text-base">
      <a className={linkClass} href="https://www.amazon.in/dp/9358984015" target="_blank" rel="noopener noreferrer">Rated 4.5★ by readers on Amazon India</a>
      <Link className={linkClass} to="/shop">Signed by the author · Delivered in 5 days</Link>
    </div>
  </section>;
}
