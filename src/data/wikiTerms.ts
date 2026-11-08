export interface WikiTerm {
  term: string;
  blurb: string;
  url: string;
}

// The author adds terms here as the book's vocabulary grows; the section renders whatever is in this list.
export const WIKI_TERMS: WikiTerm[] = [
  {
    term: 'Mohenjo-daro',
    blurb: 'The largest Indus city, excavated in today\'s Sindh.',
    url: 'https://en.wikipedia.org/wiki/Mohenjo-daro',
  },
  {
    term: 'Indus Valley Civilisation',
    blurb: 'Bronze Age cities, crafts and writing of the subcontinent.',
    url: 'https://en.wikipedia.org/wiki/Indus_Valley_Civilisation',
  },
  {
    term: 'Amarvati',
    blurb: 'Heavenly city of the gods in Hindu and Buddhist texts.',
    url: 'https://en.wikipedia.org/wiki/Amaravati_(mythology)',
  },
  {
    term: 'Tarakasur',
    blurb: 'A demon whose death only Shiva\'s son could bring about.',
    url: 'https://en.wikipedia.org/wiki/T%C4%81rak%C4%81sura',
  },
  {
    term: 'Neanderthal',
    blurb: 'Extinct human relatives who lived across Europe and Asia.',
    url: 'https://en.wikipedia.org/wiki/Neanderthal',
  },
  {
    term: 'Architecture of Mohenjo-daro',
    blurb: 'Baked-brick streets, drains and granaries set in grids.',
    url: 'https://en.wikipedia.org/wiki/Mohenjo-daro#Architecture_and_urban_infrastructure',
  },
  {
    term: 'Shambhala',
    blurb: 'A hidden kingdom of eternal peace in Buddhist legend.',
    url: 'https://en.wikipedia.org/wiki/Shambhala',
  },
  {
    term: 'Ministry of Culture',
    blurb: 'India\'s government department for heritage, museums and the arts.',
    url: 'https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)',
  },
  {
    term: 'Ancient flying machines of India (Vimana)',
    blurb: 'Flying palaces described in Sanskrit epics and temple texts.',
    url: 'https://en.wikipedia.org/wiki/Vimana',
  },
  {
    term: 'Indus Valley seals',
    blurb: 'Tiny carved stones stamped with an undeciphered script.',
    url: 'https://en.wikipedia.org/wiki/Indus_script',
  },
  {
    term: 'Gondrani',
    blurb: 'An ancient cave city carved into rock in Balochistan.',
    url: 'https://en.wikipedia.org/wiki/Gondrani',
  },
  {
    term: 'Indo-Pak nuclear weapons',
    blurb: 'The arms race between India and Pakistan since 1998.',
    url: 'https://en.wikipedia.org/wiki/Nuclear_arms_race#India_and_Pakistan',
  },
  {
    term: 'Dharma',
    blurb: 'Cosmic order, duty and the right way of living.',
    url: 'https://en.wikipedia.org/wiki/Dharma',
  },
  {
    term: 'Kaalchakra',
    blurb: 'The wheel of time teaching in Tantric Buddhism.',
    url: 'https://en.wikipedia.org/wiki/Kalachakra',
  },
  {
    term: 'Prabhamandala',
    blurb: 'The ring of light drawn around a holy figure.',
    url: 'https://en.wikipedia.org/wiki/Halo_(religious_iconography)',
  },
  {
    term: 'Vajra',
    blurb: 'The diamond thunderbolt weapon of Indra, king of the gods.',
    url: 'https://en.wikipedia.org/wiki/Vajra',
  },
  {
    term: 'Rishi Dadichi',
    blurb: 'A sage whose bones became the thunderbolt that slew a demon.',
    url: 'https://en.wikipedia.org/wiki/Dadhichi',
  },
  {
    term: 'Lord Shiva',
    blurb: 'The destroyer and transformer of the Hindu trinity.',
    url: 'https://en.wikipedia.org/wiki/Shiva',
  },
  {
    term: 'Mahashivaratri',
    blurb: 'An all-night vigil and fast held in Shiva\'s honour.',
    url: 'https://en.wikipedia.org/wiki/Maha_Shivaratri',
  },
];
