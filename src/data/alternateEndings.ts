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
  {
    slug: 'the-emotional-cripple',
    title: 'The emotional cripple',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `"Love," said Rakesh. He did not ask for a day or two. "And I don't know how it works, Payal. I only know it is the thing I keep losing track of."`,
          `Payal put down the phone with the Urban Dictionary page still open. "That is not a clinical answer."`,
          `"Then treat me. Six months. No flights to the US."`,
          `She took a long time, as if reading a report only she could see. Then she tore the timetable that divided the kitchen and the cook and the driver into two, and put the pieces in the saucer. That evening Rakesh had the rusting gym equipment carried down to the lawn and sold for scrap.`,
          `Three weeks later, at 6 a.m., his phone buzzed. "Wanna jog? RT here RT now."`,
          `He ran down the stairs in his socks. She was already at the gate, stretching. For once he did not check the time, and he did not mind that she beat him to the end of the road.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"Give me till the end of the week," said Rakesh.`,
          `On Friday he sent her a spreadsheet. Love in one column, money in the other, with a note that said Let us be rational. Payal read it standing at her hospital window and sent one SMS back: "Noted." Her lawyer called on Monday.`,
          `She bought out his share of the house. He moved into a rented flat with a view of a construction site and, for the first time, no one to argue with. His website took off. His IT systems went into forty hospitals, none of them hers. Within four years he had everything Amitav's pyramid promised, the three Bees and a bank balance he checked every morning.`,
          `Once, at an airport, he saw her in a magazine, cutting a ribbon on a new wing of Payal Hospital. She was smiling, a real smile. Beside her stood a man who was not a doctor.`,
          `He bought the magazine. He read the caption three times. Then he put it in his briefcase, under the contracts.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `Rakesh opened his mouth to lie and heard himself say "Both. I don't know which one came first."`,
          `Payal laughed. It was the first time in months, and it frightened him.`,
          `"Good. I would not have believed you if you said love." She slid the phone across the table. It showed a spreadsheet of her own, a tidy list of names and columns, and his was highlighted. "Amitav's wife Sangeeta is my cousin. I heard about the Three Bees at their dinner table long before you did. I ran the same model on you, Rakesh. Brains: confirmed. Looks: acceptable. Health: the check-up reports. I married a clean set of genes with a good IQ."`,
          `"That is the most unromantic thing I have ever heard."`,
          `"You asked for the truth." She sipped her coffee. "I did not budget for the part where I would actually like you."`,
          `Rakesh looked at the blank cell labelled Love. "What is the status of that one?"`,
          `"Pending," said Payal. "Further tests required."`,
        ],
      },
    ],
  },
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