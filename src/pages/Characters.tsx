import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import CharacterList from '@/components/CharacterList';
export default function Characters() { return <PageLayout page={NAV_PAGES[3]}><CharacterList /></PageLayout>; }
