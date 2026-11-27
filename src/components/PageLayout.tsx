import type { ReactNode } from 'react';
import SeoHead from './SeoHead';
import { authorProfilePage } from '@/lib/structuredData';
import Header from './Header';
import Footer from './Footer';
import PageHeader from './PageHeader';
import { CANONICAL_BASE, SITE_NAME, type SitePage } from '@/config/site';
export default function PageLayout({ page, children, home = false, intro }: { page: SitePage; children: ReactNode; home?: boolean; intro?: string }) {
  const title = page.seoTitle ?? `${page.label} — ${SITE_NAME}`;
  const description = page.seoDescription ?? page.description;
  const canonical = `${CANONICAL_BASE}${page.path}`;
  return <div className={home ? 'public-site homepage-order-space' : 'public-site'}>
    <SeoHead title={title} description={description} canonical={canonical} jsonLd={page.path === '/author' ? authorProfilePage() : undefined} />
    <Header /><main>{!home && <PageHeader title={page.label} tagline={page.tagline} intro={intro ?? (page.path === '/characters' ? undefined : page.description)} />}{children}</main><Footer home={home} />
  </div>;
}
