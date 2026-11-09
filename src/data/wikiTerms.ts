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
  {
    term: 'Parashurama',
    blurb: 'The warrior-sage sixth avatar of Vishnu, wielder of the axe.',
    url: 'https://en.wikipedia.org/wiki/Parashurama',
  },
  {
    term: 'The 64 Kalas',
    blurb: 'The sixty-four classical arts and skills of ancient India.',
    url: 'https://en.wikipedia.org/wiki/Kal%C4%81',
  },
  {
    term: 'Kalki',
    blurb: 'The prophesied tenth and final avatar of Vishnu.',
    url: 'https://en.wikipedia.org/wiki/Kalki',
  },
  {
    term: 'Kallaripayatu',
    blurb: 'An ancient martial art of Kerala, said to be taught by Parashurama.',
    url: 'https://en.wikipedia.org/wiki/Kalaripayattu',
  },
  {
    term: 'Sanjivani',
    blurb: 'The legendary life-restoring herb Hanuman fetched in the Ramayana.',
    url: 'https://en.wikipedia.org/wiki/Sanjivani_(Hinduism)',
  },
  {
    term: 'Hanuman Chalisa',
    blurb: 'Tulsidas\'s forty-verse devotional hymn in praise of Hanuman.',
    url: 'https://en.wikipedia.org/wiki/Hanuman_Chalisa',
  },
  {
    term: 'Firewalking',
    blurb: 'Walking barefoot over hot embers, and the science behind it.',
    url: 'https://en.wikipedia.org/wiki/Firewalking',
  },
  {
    term: 'JWST',
    blurb: 'The largest space telescope, observing the universe in infrared light.',
    url: 'https://en.wikipedia.org/wiki/James_Webb_Space_Telescope',
  },
  {
    term: 'Dark matter',
    blurb: 'The invisible matter that shapes galaxies, detected only through gravity.',
    url: 'https://en.wikipedia.org/wiki/Dark_matter',
  },
  {
    term: 'Burzahom inscriptions',
    blurb: 'Neolithic engravings from Burzahom, a prehistoric site near Srinagar, Kashmir.',
    url: 'https://en.wikipedia.org/wiki/Burzahom_archaeological_site',
  },
  {
    term: 'Rishi Kashyap',
    blurb: 'Revered Vedic sage, one of the Saptarishis, linked to Kashmir.',
    url: 'https://en.wikipedia.org/wiki/Kashyapa',
  },
  {
    term: 'Kashmir',
    blurb: 'The Himalayan region at the northern edge of the Indian subcontinent.',
    url: 'https://en.wikipedia.org/wiki/Kashmir',
  },
  {
    term: 'Varah Mool (Baramulla)',
    blurb: 'Ancient Varahamula, the sacred boar-linked site now called Baramulla.',
    url: 'https://en.wikipedia.org/wiki/Baramulla',
  },
  {
    term: 'Vishkanya',
    blurb: 'The poison maidens of ancient Indian legend, used as assassins.',
    url: 'https://en.wikipedia.org/wiki/Vishakanya',
  },
  {
    term: 'Military signalling',
    blurb: 'How armies convey orders, from runners and flags to radio.',
    url: 'https://en.wikipedia.org/wiki/Military_communications',
  },
  {
    term: 'Rakshasa',
    blurb: 'Powerful, often malevolent beings of Hindu myth; the story\'s antagonists.',
    url: 'https://en.wikipedia.org/wiki/Rakshasa',
  },
  {
    term: 'Yaksha',
    blurb: 'Nature spirits of Indian myth, guardians of hidden earthly treasures.',
    url: 'https://en.wikipedia.org/wiki/Yaksha',
  },
  {
    term: 'Manu',
    blurb: 'The archetypal first man and lawgiver of Hindu tradition.',
    url: 'https://en.wikipedia.org/wiki/Manu_(Hinduism)',
  },
  {
    term: 'Matsya',
    blurb: 'Vishnu\'s fish avatar, who saved Manu from the great flood.',
    url: 'https://en.wikipedia.org/wiki/Matsya',
  },
  {
    term: 'Bhrigu',
    blurb: 'Ancient sage, one of the seven great rishis and Manu\'s companion.',
    url: 'https://en.wikipedia.org/wiki/Bhrigu',
  },
  {
    term: 'Indra',
    blurb: 'Vedic king of the gods, wielder of the thunderbolt.',
    url: 'https://en.wikipedia.org/wiki/Indra',
  },
  {
    term: 'Yama',
    blurb: 'Hindu god of death and justice.',
    url: 'https://en.wikipedia.org/wiki/Yama',
  },
  {
    term: 'Brahma',
    blurb: 'The creator god of the Hindu trinity.',
    url: 'https://en.wikipedia.org/wiki/Brahma',
  },
  {
    term: 'Soma',
    blurb: 'Sacred Vedic ritual drink, also worshipped as a deity.',
    url: 'https://en.wikipedia.org/wiki/Soma_(drink)',
  },
  {
    term: 'Yajna',
    blurb: 'Vedic fire ritual of offerings to the gods.',
    url: 'https://en.wikipedia.org/wiki/Yajna',
  },
  {
    term: 'Swaha',
    blurb: 'Sacred word chanted while making offerings into the sacrificial fire.',
    url: 'https://en.wikipedia.org/wiki/Svaha',
  },
  {
    term: 'Gurukul',
    blurb: 'Traditional Indian school where students live and learn with their teacher.',
    url: 'https://en.wikipedia.org/wiki/Gurukulam',
  },
  {
    term: 'Hiranyagarbha',
    blurb: 'The "golden womb" or cosmic egg from which creation begins.',
    url: 'https://en.wikipedia.org/wiki/Hiranyagarbha',
  },
  {
    term: 'Higgs boson',
    blurb: 'The "God particle" that explains why other particles have mass.',
    url: 'https://en.wikipedia.org/wiki/Higgs_boson',
  },
  {
    term: 'Aghori',
    blurb: 'Ascetic Shaiva monks who dwell in cremation grounds.',
    url: 'https://en.wikipedia.org/wiki/Aghori',
  },
  {
    term: 'Chakras',
    blurb: 'Energy centres of the subtle body in yoga and meditation.',
    url: 'https://en.wikipedia.org/wiki/Chakra',
  },
  {
    term: 'Yoga Nidra',
    blurb: 'A conscious state between waking and sleeping, induced by guided meditation.',
    url: 'https://en.wikipedia.org/wiki/Yoga_nidra',
  },
  {
    term: 'Prana',
    blurb: 'Life force or vital breath in yoga and Ayurveda.',
    url: 'https://en.wikipedia.org/wiki/Prana',
  },
  {
    term: 'Mount Kailash',
    blurb: 'Sacred Himalayan peak, traditional abode of Lord Shiva.',
    url: 'https://en.wikipedia.org/wiki/Kailasha',
  },
  {
    term: 'Amarnath',
    blurb: 'Himalayan cave shrine of Shiva in Kashmir, visited by pilgrims.',
    url: 'https://en.wikipedia.org/wiki/Amarnath_Temple',
  },
  {
    term: 'Kedarnath',
    blurb: 'High Himalayan Shiva temple and one of the twelve Jyotirlingas.',
    url: 'https://en.wikipedia.org/wiki/Kedarnath_Temple',
  },
  {
    term: 'Raja Harishchandra',
    blurb: 'Legendary king famed for never breaking his word.',
    url: 'https://en.wikipedia.org/wiki/Harishchandra',
  },
  {
    term: 'Agastya',
    blurb: 'Revered Vedic sage, one of the seven great rishis.',
    url: 'https://en.wikipedia.org/wiki/Agastya',
  },
  {
    term: 'Vishwamitra',
    blurb: 'Royal sage who became a rishi; author of the Gayatri Mantra.',
    url: 'https://en.wikipedia.org/wiki/Vishvamitra',
  },
  {
    term: 'Jamadagni',
    blurb: 'Great sage and father of Parashurama.',
    url: 'https://en.wikipedia.org/wiki/Jamadagni',
  },
  {
    term: 'Durvasa',
    blurb: 'Sage famed for his short temper and powerful curses.',
    url: 'https://en.wikipedia.org/wiki/Durvasa',
  },
  {
    term: 'Atri',
    blurb: 'Vedic sage, one of the seven rishis, seer of Rigveda Book 5.',
    url: 'https://en.wikipedia.org/wiki/Atri',
  },
  {
    term: 'Bharadwaj',
    blurb: 'Ancient Vedic sage, scholar and physician.',
    url: 'https://en.wikipedia.org/wiki/Bhardwaja',
  },
  {
    term: 'Lopamudra',
    blurb: 'Vedic woman sage, wife of Agastya and Rigveda hymn author.',
    url: 'https://en.wikipedia.org/wiki/Lopamudra',
  },
  {
    term: 'Saptarishi',
    blurb: 'The seven great sages of Hindu tradition.',
    url: 'https://en.wikipedia.org/wiki/Saptarshi',
  },
  {
    term: 'Vastu Shastra',
    blurb: 'Ancient Indian science of architecture and spatial design.',
    url: 'https://en.wikipedia.org/wiki/Vastu_shastra',
  },
  {
    term: 'Tamas',
    blurb: 'One of three gunas: darkness, inertia and ignorance.',
    url: 'https://en.wikipedia.org/wiki/Tamas_(philosophy)',
  },
  {
    term: 'Sarasvati River',
    blurb: 'Sacred Vedic river, long vanished, linked to the Indus civilisation.',
    url: 'https://en.wikipedia.org/wiki/Sarasvati_River',
  },
  {
    term: 'Shesha',
    blurb: 'The cosmic serpent on whom Vishnu rests.',
    url: 'https://en.wikipedia.org/wiki/Shesha',
  },
  {
    term: 'Vedas',
    blurb: 'The oldest sacred texts of Hinduism.',
    url: 'https://en.wikipedia.org/wiki/Vedas',
  },
];
