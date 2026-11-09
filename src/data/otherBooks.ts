export interface OtherBook {
  title: string;
  blurb: string;
  format?: 'Paperback' | 'Hardcover';
  pages?: number;
  store?: 'Amazon.com' | 'Amazon India';
  url: string;
  cover?: { path: string; alt: string; width: number; height: number };
}

export const OTHER_BOOK_SERIES = [
  { label: 'James Furrington: Cute Cats Coloring Books', path: '/james-furrington' },
];

export const OTHER_BOOKS: OtherBook[] = [
  { title: 'Cute Cats in USA Coloring Book', blurb: 'Relax and unwind while coloring the USA through the eyes of cute cats.', format: 'Paperback', pages: 84, url: 'https://www.amazon.com/dp/B0DPKTX5XL', cover: { path: '/books/B0DPKTX5XL.jpg', alt: 'Cover of Cute Cats in USA Coloring Book by James Furrington', width: 500, height: 500 } },
  { title: 'Cute Cats in UK Coloring Book', blurb: 'Cats explore the landmarks, activities and sports of the United Kingdom.', format: 'Paperback', pages: 84, url: 'https://www.amazon.com/dp/B0DPVCYXMW', cover: { path: '/books/B0DPVCYXMW.jpg', alt: 'Cover of Cute Cats in UK Coloring Book by James Furrington', width: 500, height: 500 } },
  { title: 'Cute Cats in Japan Coloring Book', blurb: 'Cute cats join cultural activities in Japan.', format: 'Paperback', pages: 84, url: 'https://www.amazon.com/dp/B0DPQYCZ72', cover: { path: '/books/B0DPQYCZ72.jpg', alt: 'Cover of Cute Cats in Japan Coloring Book by James Furrington', width: 500, height: 500 } },
  { title: 'Cute Cats in Japan Coloring Book — Bold & Easy hardcover edition', blurb: 'Bold and easy designs with thick lines for stress relief.', format: 'Hardcover', pages: 78, url: 'https://www.amazon.com/dp/B0F4QM55GW', cover: { path: '/books/B0F4QM55GW.jpg', alt: 'Cover of Cute Cats in Japan Coloring Book — Bold & Easy hardcover edition by James Furrington', width: 376, height: 500 } },
  { title: 'Cute Cats in India Coloring Book', blurb: 'Cats journey through temples, marketplaces, dances and Bollywood songs in India.', format: 'Paperback', pages: 84, url: 'https://www.amazon.com/dp/B0DPQ9JCX4', cover: { path: '/books/B0DPQ9JCX4.jpg', alt: 'Cover of Cute Cats in India Coloring Book by James Furrington', width: 500, height: 500 } },
  { title: 'Cute Chats in China Coloring Book', blurb: 'Explore China through a cat’s eyes, from cultural activities to famous landmarks.', format: 'Paperback', pages: 83, url: 'https://www.amazon.com/dp/B0DPJ2ZVBJ', cover: { path: '/books/B0DPJ2ZVBJ.jpg', alt: 'Cover of Cute Chats in China Coloring Book by James Furrington', width: 500, height: 500 } },
  { title: 'Cute Cats in Outer Space Coloring Book', blurb: 'An out-of-this-world cat journey through the solar system and nearby galaxies.', format: 'Paperback', pages: 84, url: 'https://www.amazon.com/dp/B0DPX79C8X', cover: { path: '/books/B0DPX79C8X.jpg', alt: 'Cover of Cute Cats in Outer Space Coloring Book by James Furrington', width: 500, height: 500 } },
  { title: 'Cute Cats in Uniform Coloring Book', blurb: 'Discover the world of uniformed professions through the eyes of cute cats.', format: 'Paperback', pages: 84, url: 'https://www.amazon.com/dp/B0DQ4KNV3L', cover: { path: '/books/B0DQ4KNV3L.jpg', alt: 'Cover of Cute Cats in Uniform Coloring Book by James Furrington', width: 500, height: 500 } },
  { title: 'Cute Cats in the Olympics Coloring Book', blurb: 'Adorable cats take part in the world’s cutest Olympics.', format: 'Paperback', pages: 84, url: 'https://www.amazon.com/dp/B0DQJBKSFT', cover: { path: '/books/B0DQJBKSFT.jpg', alt: 'Cover of Cute Cats in the Olympics Coloring Book by James Furrington', width: 500, height: 500 } },
  { title: 'Cute Cats Christmas Coloring Book', blurb: 'Cute cats bring Christmas coloring fun for all ages.', format: 'Paperback', pages: 84, url: 'https://www.amazon.com/dp/B0DPPC382S', cover: { path: '/books/B0DPPC382S.jpg', alt: 'Cover of Cute Cats Christmas Coloring Book by James Furrington', width: 500, height: 500 } },
];

export const OTHER_BOOKS_SERIES_URL = 'https://www.amazon.com/dp/B0DPJ8NZVK';
