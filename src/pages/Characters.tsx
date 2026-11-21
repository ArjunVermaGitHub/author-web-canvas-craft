import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import CharacterList from '@/components/CharacterList';
export default function Characters() { const page = NAV_PAGES.find(page => page.path === '/characters'); if (!page) return null; return <PageLayout page={page}><CharacterList /></PageLayout>; }
