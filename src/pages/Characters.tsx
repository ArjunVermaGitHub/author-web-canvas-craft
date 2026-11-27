import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import CharacterList from '@/components/CharacterList';
import { CHARACTERS_INTRO } from '@/data/characters';
export default function Characters() { const page = NAV_PAGES.find(page => page.path === '/characters'); if (!page) return null; return <PageLayout page={page} intro={CHARACTERS_INTRO}><CharacterList /></PageLayout>; }
