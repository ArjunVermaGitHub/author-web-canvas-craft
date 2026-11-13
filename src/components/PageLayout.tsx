import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import PageHeader from './PageHeader';
import { CANONICAL_BASE, SITE_NAME, type SitePage } from '@/config/site';
export default function PageLayout({ page, children, home = false }: { page: SitePage; children: ReactNode; home?: boolean }) {
  const title = `${page.label} — ${SITE_NAME}`;
  const canonical = `${CANONICAL_BASE}${page.path}`;
  return <div className={home ? 'public-site homepage-order-space' : 'public-site'}>
    <Helmet><title>{title}</title><meta name="description" content={page.description} />
      <link rel="canonical" href={canonical} /><meta property="og:title" content={title} />
      <meta property="og:description" content={page.description} /><meta property="og:url" content={canonical} />
    </Helmet>
    <Header /><main>{!home && <PageHeader title={page.label} tagline={page.tagline} intro={page.description} />}{children}</main><Footer />
  </div>;
}
