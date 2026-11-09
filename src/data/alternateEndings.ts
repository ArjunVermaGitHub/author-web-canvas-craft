export type AlternateEnding = {
  slug: string;
  label: string;
  paragraphs: string[];
};

export type AlternateStory = {
  slug: string;
  title: string;
  endings: AlternateEnding[];
};

export const LPH_BOOK = {
  title: 'Love, Peace & Happiness: What more can you want?',
  year: 2012,
  publisher: 'Jufic Books / Leadstart',
  isbn: '978-93-81-836-34-7',
  indiaUrl: 'https://www.amazon.in/dp/B007TPAI06',
  internationalUrl: 'https://www.amazon.com/dp/B007TPAI06',
  authorEmail: 'author@riturajverma.com',
};

export const ALTERNATE_STORIES: AlternateStory[] = [
  {
    slug: 'a-high-like-heaven',
    title: 'A high, like heaven',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `Sneha did not answer. She put the backpack down at Ashish's feet, walked across to the police officer and said it plainly. A guide had fallen near the shell bend. They had seen it happen. They had said nothing for five hours.`,
          `Ashish stood behind her, red-eyed, rehearsing his excuses. Then he heard himself say "I was stoned. I pulled out the flower. It was my fault," and the officer stopped writing and looked up at him for the first time.`,
          `They missed the bus. At dusk a rescue party brought Pritpal down on a stretcher. He had slid forty feet and been stopped by a ledge. His leg was broken. The Brahma Lotus was still in his fist, crushed. "Saabji, I told you," he said, almost cheerfully. "You can carry it."`,
          `Ashish paid for the hospital in Joshimath. He stayed three days, slept on a plastic chair, and did not touch a cigarette. On the second night he told Sneha that he had never known what happiness was, and was beginning to suspect it was not a high. She laughed at him, the real laugh from the camera pictures.`,
          `On the bus to Delhi she held his hand over the tight bends. He smiled, a proper one, though not for long. It was a start.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `Sneha opened her mouth to argue, and Ashish's hand closed over her wrist. The bus conductor called the last call, and she got on.`,
          `Four days later, a small item appeared in a Dehradun newspaper. A local guide's body had been found in a ravine below the Valley of Flowers trail. Pritpal Singh, forty-one, leaves behind a wife and three children. The item added that the tourists with him had not been traced.`,
          `She read it standing in her kitchen. Ashish was at work, texting her about a pending client call. She found the camera and scrolled to the photo of the Brahma Lotus, blooming in its shell. Then to the one with Pritpal's grin, the one she had deleted and could not bring back.`,
          `She did not tell Ashish. When he finally noticed that she had stopped speaking to him, he said she was overreacting. She sent money to the village through a post office, with no name on the envelope. It did not feel like enough.`,
          `The divorce took exactly three years. She never went back to the mountains. Some mornings she woke up at 5 a.m. with her heart pounding, sure she was still sitting on a rock in the mist, waiting for someone to come and find her.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `The police officer listened to the whole story with his hands folded. Then he smiled, almost kindly, and asked them to wait. He came back with a cardboard file, and from it took a faded photograph.`,
          `Pritpal. Same moustache, same beedi, same grin.`,
          `"Missing since August 2001. Fell near the shell bend, taking a tourist's flower out of the valley." He tapped the date. "Every year, some couple comes here and tells me this story. Always on the day the Lotus blooms."`,
          `Ashish laughed, the stoned laugh again, until Sneha opened the yellow backpack. Inside, wrapped in her sweater, lay the Brahma Lotus, greenish white, fresh, with the sea shell stuck to its stem. The rupees Ashish had paid in advance were folded under it, every note.`,
          `"He gave you what you came for," said the officer. "Happiness for those who find it. But the curse is for those who carry it out."`,
          `Sneha looked at the flower for a long time. Then she went back through the bus stand, up the path, and set it back on the rock that said Face yourself, to change your world. Ashish stood watching her from the road, for once unable to Google an answer.`,
          `She did not get on the bus to Delhi. She came back down alone, two days later.`,
        ],
      },
    ],
  },
  { slug: 'the-emotional-cripple', title: 'The emotional cripple', endings: [] },
  { slug: 'the-intimacy-of-space', title: 'The intimacy of space', endings: [] },
  { slug: 'the-practitioner-of-austerity', title: 'The practitioner of austerity', endings: [] },
  { slug: 'the-victim-of-many-loves', title: 'The victim of many loves', endings: [] },
  { slug: 'the-soul-mate-theorist', title: 'The soul mate theorist', endings: [] },
  { slug: 'the-facebook-stalker', title: 'The Facebook stalker', endings: [] },
  { slug: 'the-night-of-the-affair', title: 'The night of the affair', endings: [] },
  { slug: 'the-pursuit-of-perfection', title: 'The pursuit of perfection', endings: [] },
];

export function storyPath(storySlug: string): string {
  return `/lph/alternate-endings/${storySlug}/`;
}

export function endingPath(storySlug: string, endingSlug: string): string {
  return `${storyPath(storySlug)}${endingSlug}/`;
}

export function lphCanonical(path: string): string {
  return `https://riturajverma.com${path.replace(/\/+$/, '')}/`;
}

export function endingTitle(story: AlternateStory, ending: AlternateEnding): string {
  return `${story.title}: Ending ${story.endings.indexOf(ending) + 1}`;
}