import PageLayout from '@/components/PageLayout';
import OtherBooksSection from '@/components/OtherBooksSection';
import { NAV_PAGES } from '@/config/site';

export default function OtherBooks() {
  const page = NAV_PAGES.find(page => page.path === '/other-books');
  if (!page) return null;
  return <PageLayout page={page}><OtherBooksSection /></PageLayout>;
}