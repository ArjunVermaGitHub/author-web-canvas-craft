export const SITE_NAME = 'Raghav Kartikeya: Fantasy with Roots';
export const CANONICAL_BASE = 'https://www.riturajverma.com';
export const NAV_PAGES = [
  { path: '/', label: 'Home', tagline: 'Enter the universe', description: 'A nine-year-old from Mumbai finds he can read the Indus Valley script, a language no scholar has ever deciphered.' },
  { path: '/books', label: 'The Books', tagline: 'Discover the series', description: 'Raghav Kartikeya and the Tablets of Dharma. Book 1 of the mythological fantasy series.' },
  { path: '/wiki', label: "Raghav’s Wiki", tagline: 'Explore the mythology', description: 'Curious about a place, a myth or an idea from the story? Start here.' },
  { path: '/characters', label: 'Characters', tagline: 'Meet the inhabitants', description: 'Characters — Raghav Kartikeya: Fantasy with Roots.' },
  { path: '/reviews', label: 'Reader Reviews', tagline: 'What readers say', description: 'Real reader reviews of Raghav Kartikeya and the Tablets of Dharma.' },
  { path: '/world', label: 'The World', tagline: 'History and mythology', description: 'Trailers and glimpses from Raghav Kartikeya and the Tablets of Dharma. Real discoveries from the civilisation behind the book.' },
  { path: '/author', label: 'About the Author', tagline: 'Meet Rituraj', description: 'Rituraj Verma, author of the Raghav Kartikeya series.' },
  { path: '/media', label: 'Media Room', tagline: 'Press and interviews', description: 'Press and interviews about Raghav Kartikeya and the Tablets of Dharma.' },
  { path: '/other-books', label: 'Other Books', tagline: 'More from the author', description: 'Love, Peace & Happiness and the Cute Cats coloring books by Rituraj Verma.' },
  { path: '/shop', label: 'Shop the Book', tagline: 'Order a signed copy', description: 'Order a signed copy of Raghav Kartikeya and the Tablets of Dharma, or read the first two chapters free.' },
] as const;
export type SitePage = typeof NAV_PAGES[number];
export const HOME_TEASER_PAGES = NAV_PAGES.filter(page => page.path !== '/' && page.path !== '/other-books');
