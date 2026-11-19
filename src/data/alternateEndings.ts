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

export type LphBook = {
  title: string;
  year: number;
  publisher: string;
  isbn: string;
  indiaUrl: string;
  internationalUrl: string;
  authorEmail: string;
  kindleUrl?: string;
  cover?: { path: string; alt: string; width: number; height: number };
};

export const LPH_BOOK: LphBook = {
  title: 'Love, Peace & Happiness: What more can you want?',
  year: 2012,
  publisher: 'Jufic Books / Leadstart',
  isbn: '978-93-81-836-34-7',
  indiaUrl: 'https://www.amazon.in/dp/B007TPAI06',
  kindleUrl: 'https://www.amazon.in/dp/B007TPAI06',
  internationalUrl: 'https://www.amazon.com/dp/B007TPAI06',
  authorEmail: 'author@riturajverma.com',
  cover: {
    path: '/books/lph-kindle-cover.jpg',
    alt: 'Cover of Love, Peace & Happiness: What more can you want? by Rituraj Verma',
    width: 600,
    height: 800,
  },
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
          `Sneha picked up her bag and stepped off the bus.`,
          `"Where are you going?" Ashish called from the window. "Sneha, the bus is leaving."`,
          `"Then go," she said. "You have office tomorrow."`,
          `The conductor blew his whistle, and the bus lurched off down the valley with Ashish's face pressed against the glass, his mouth still open around an argument she was no longer there to hear.`,
          `The police officer listened to her without interrupting. By four o'clock a search party had gathered: two constables, a mule driver and an old Garhwali shepherd who said he had seen something red on the ledges below the shell bend. Sneha went with them. Nobody asked her to, and nobody told her not to.`,
          `They found Pritpal at dusk, wedged against a juniper bush, his leg twisted under him and his red muffler wound around a cut on his head. He was conscious and furious.`,
          `"Memsaabji," he said, as they lifted him onto a stretcher. "Where is Saabji?"`,
          `"In Delhi," said Sneha. "Probably."`,
          `Pritpal thought about this for a while. Then he laughed, and it hurt him, and he laughed again anyway.`,
          `She stayed in Joshimath for nine days, until his leg was set and his wife had come down from the village. On the last day his daughter, who was eleven, walked Sneha to the bus and asked if she would come back next season.`,
          `"I don't know," said Sneha. Then, because it was true for the first time in a year and a half, she said, "I think I'd like to."`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"You're right," said Sneha. "It's too complicated."`,
          `She got on the bus. Ashish got on behind her, relieved, already taking out his phone to check his email. Neither of them looked at the police station as the bus pulled away.`,
          `In Delhi, she was the one who held them together. She stopped criticising. She ironed his shirts, she remembered his mother's birthday, she cooked the rajma he liked on Sundays. If they had a secret, then they had a marriage, she reasoned, because secrets were what married people kept.`,
          `Ashish never mentioned the mountain. Sometimes, late at night, she would find him at the computer, searching the Uttarakhand news sites, closing the window quickly when she came in.`,
          `The second winter, he was promoted. The third winter, he took a job in Singapore. He did not ask her to come.`,
          `"It isn't you," he said at the airport. "I just can't look at you without seeing that bend in the path."`,
          `She found the camera in a drawer after he left. The last photograph on it was of the Brahma Lotus in its sea shell, perfectly in focus, with a man's red muffler just visible at the edge of the frame.`,
          `She never deleted it. She never showed it to anyone, either.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `The police officer was already walking towards them. He was holding a wireless set, and he did not look pleased.`,
          `"You are the couple from Delhi?" he said. "The ones with Pritpal Singh?"`,
          `Ashish went very pale. Sneha found that her hands were perfectly steady.`,
          `"He radioed from the forest checkpost an hour ago," said the officer. "He slid down to the old shepherds' track, below the shell bend. Not a scratch on him. He says he waited for you to call out. You did not call out. He says he watched you sit on the path for one hour, and then he watched you leave."`,
          `Nobody spoke.`,
          `"He has asked me to give you two things." The officer handed Ashish a slip of paper: Pritpal's bill, for three days of guiding, one day of waiting, and one Brahma Lotus, *carried*. Then he turned to Sneha and gave her a small sea shell, cracked down the middle.`,
          `Ashish paid the bill in full, in cash, counting the notes twice.`,
          `On the bus he tried to make a joke of it. Sneha did not laugh. She sat with the shell in her closed fist all the way to Delhi.`,
          `"I want a divorce," she said, as the bus crossed the Yamuna. "Mutual consent, if you'll give it. Without it, if you won't."`,
          `Ashish opened his mouth, looked at the shell in her hand, and closed it again.`,
          `He signed the papers three weeks later. The marriage had lasted one year, six months and four days, one day longer than it should have, she thought, and that one day had been spent waiting on a mountain for a man who never called out.`,
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
          `"Money," said Rakesh.`,
          `Payal put her cup down very carefully, as if it might break.`,
          `"That was the honest answer five years ago," he said. "I married a good salary, a good family and a house in the right postcode. I didn't know there was anything else to marry." His voice cracked. "Ask me again in a year. Every Sunday, if you like. I want to see if the answer changes."`,
          `She did not trust him. She told him so. But she gave him the year, and a counsellor at her own hospital, and a rule: no laptop at the dining table.`,
          `The first Sundays were terrible. He said "money" twice more, out of stubbornness, and once said nothing at all. In March he moved the IT equipment out of the gym and into a rented office ten minutes away, so that home could stay home. In June he cooked for her mother. In September, without being asked, he went to see Socks and apologised for being the son she had not raised.`,
          `On the last Sunday of the year, Payal opened her mouth to ask, and Rakesh got there first.`,
          `"You," he said. "Not love, not money. Just you."`,
          `It was not the answer she had asked for. It was a better one.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"Love," said Rakesh. "Of course it's love."`,
          `He said it too quickly, the way he said "the client is always right", and they both heard it.`,
          `Payal did not throw him out. A divorce would have meant lawyers, gossip, her mother's tears and a long article in the hospital newsletter, so instead she kept the timetable. His half of the kitchen in the mornings, hers in the evenings. His car on the left, hers on the right. The cook took instructions from both of them and served dinner on two separate trays.`,
          `It worked. That was the terrible thing about it. It worked for fifteen years.`,
          `His website was sold to an American company. Her hospital opened two new wings. They attended weddings together, smiled for photographs, and drove home in separate cars. They never fought again, because fighting needs two people who still want something from each other.`,
          `On his fiftieth birthday, the cook baked two cakes, one for each side of the house, because nobody had ever told her which side a birthday belonged to.`,
          `Rakesh ate a slice of his alone, at the kitchen counter, in his half of the morning.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `Rakesh did not answer. Instead, he took out his laptop and turned it around so that she could see the screen.`,
          `It was a hospital billing system: patient records, insurance claims, pharmacy stock, doctors' rosters, all of it in her hospital's blue and white. On the login page, in small letters at the bottom, it said *Built for P.*`,
          `"That's the website," he said. "The one I've been building in the gym. Your hospital loses about a crore a year to bad billing. I know because I hacked your accounts department in February."`,
          `"You did what?"`,
          `"I wanted to give it to you on our anniversary. I wanted you to see I could do something for you that money couldn't buy." He laughed, without any pleasure. "And then I lost the European contract and got drunk and hit you, and now I don't know how to give anyone anything."`,
          `Payal sat very still. She thought of the lock-up, the new nameplate, the layout of the house divided down the middle in red ink.`,
          `"Socks told me you'd do something stupid and generous one day," she said finally. "She didn't say you'd do both on the same day."`,
          `She did not forgive him that afternoon. But she took the laptop home, and the next morning the accounts department started using a new system, and nobody ever told them who had written it.`,
        ],
      },
    ],
  },
  {
    slug: 'the-intimacy-of-space',
    title: 'The intimacy of space',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `"Shweta?" Her father sounded as if he had been waiting by the phone for two years. "Beta, come home."`,
          `She looked at the taxi meter, the suitcase, the Lord Krishna smiling over the compound wall.`,
          `"No, Dad," she said. "Not home. Not yet."`,
          `There was a long silence. She could hear the television in the background, the cricket commentary, her mother asking who it was.`,
          `"I'm going to Goa," she said. "There was a job at a travel company there, before all this. I'm going to see if it's still open. I wanted you to know where I was. That's all. I wanted someone to know where I was."`,
          `"Goa," said her father slowly, as if it were a foreign country. Then: "Your mother has always wanted to see Goa."`,
          `The job was gone. She found another one in a week, at a dive school in Palolem, answering phones and keeping the books. In December, a cheque arrived from London: Krishna and Radha had won the show and sent her the prize money, with a note that said *For the walk out of the door.*`,
          `Her parents came to visit in February. Her father wore shorts for the first time in his life and burned his knees in the sun, and her mother made friends with every fisherwoman on the beach.`,
          `Nobody mentioned Hanif. Nobody needed to.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"We had a daughter once," said her father's voice, flat and quiet. "She chose her life."`,
          `The line went dead.`,
          `Shweta sat in the taxi for a long time. Then she paid the driver for his waiting time, picked up her suitcase and walked back through the gates of the Love Inn.`,
          `Roman was delighted. He gave her a new room, a bigger one, and a new storyline: the jilted girlfriend who stays to fight. The cameras followed her everywhere. She cried when she was told to cry and laughed when she was told to laugh, and she was very good at both.`,
          `She won. The audience voted for her in every round. When the show aired, her face was on hoardings across three cities, and strangers stopped her in malls to tell her she was brave.`,
          `She bought a flat with the prize money and the endorsement fees. It had a sea view and a room she kept for her parents, made up with fresh sheets every month.`,
          `Every Diwali she called her parents' house. Every Diwali someone picked up, listened to her say "Happy Diwali, it's me," and gently put the phone down.`,
          `She kept the room made up anyway.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `"Dad?" she said again.`,
          `"Not quite," said Roman's voice.`,
          `She looked down at the phone in her hand. Under *Dad*, the number was one she didn't recognise. Raghav had wired up everything, she remembered, including, it seemed, her contacts list.`,
          `"Don't hang up," said Roman. "The taxi is ours too, by the way. The driver has a camera in the mirror. You've just given us the best ninety seconds of the season: the girl at the temple, the suitcase, the call to her father. Come back inside and we'll do the reunion properly."`,
          `Shweta looked at the driver in the mirror. He looked away.`,
          `Then she did something nobody had scripted. She leaned towards the little lens above the windscreen and started to talk: about the hidden cameras in the bathroom, the planted couples, the spy camera on Raghav's shirt, the footage of Hanif and Jasna that Roman had shot without asking anyone, and the contracts nobody had been allowed to read.`,
          `She talked for eleven minutes. Then she got out and took a bus.`,
          `Roman aired it, of course. He could not resist. It became the most-watched episode in the history of the show, and three weeks later the network's lawyers paid her more to keep quiet than the prize was worth.`,
          `She used some of it for a taxi home to her parents, and called her father from the gate, properly, from a phone that was her own.`,
        ],
      },
    ],
  },
  {
    slug: 'the-practitioner-of-austerity',
    title: 'The practitioner of austerity',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `Aparna did not wait for Arvind's call. She rang him first, at seven the next morning, before she could change her mind.`,
          `"I won't marry you," she said. "And I won't find you a wife, either. That's a job for you."`,
          `Then she did something she had not done in fifteen years. She applied for leave: thirty days, all of it accumulated, none of it ever used. Her deputy stared at the form as if it were written in Chinese.`,
          `She took the train to Haridwar and a bus to Rishikesh, and found a room in a guest house above the river with a window that looked out at the hills. She had no plan. For the first three days she did not know what to do with her hands, and kept reaching for files that were not there.`,
          `On the fourth day she walked to the ghats at dawn and sat among the pilgrims and the beggars and the foreign backpackers, and watched the river carry away everything people gave it: flowers, ashes, little leaf-boats with candles inside.`,
          `She thought about Kaka. *Did you go through the penance hoping that someday they would care for you?*`,
          `"No," she said out loud, and a sadhu beside her looked up and smiled. "I went through it because I didn't know there was anything else."`,
          `She stayed the full thirty days. When she came back, she was still the same woman. She just no longer thought of it as a penance.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `Arvind called the next day, but he did not mention Manisha. He said, "You were right. I need someone I can trust. Will you marry me?"`,
          `And because Kaka was gone, and the house was quiet, and Vivek and Leena would be married soon, Aparna said yes.`,
          `The wedding was small and hurried. Arvind's children did not come. His late wife's mother sent a gift, a framed photograph of her daughter, with no card.`,
          `Aparna moved into his flat and made it clean and orderly. She learned how he liked his tea and which newspaper he read first. She took the children's school forms, their doctors' appointments, their fevers and tantrums, and carried all of it the way she had carried her own family for fifteen years. The children called her Aunty and kept their mother's photograph by their beds.`,
          `Arvind was never cruel. He was simply absent: at work, at the club, in front of the television. Sometimes, at night, she heard him coughing in the next room, a dry, tight cough, and she would bring him water and an inhaler without being asked.`,
          `The police closed the case a year later for lack of evidence.`,
          `Aparna kept the photograph the old woman had sent in a drawer. She took it out sometimes and looked at it. The dead woman was not smiling, and neither, Aparna realised, was she.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `The next day, Arvind called to tell her he had found a bride: a stunningly beautiful eighteen-year-old called Manisha, from a village in Punjab. Her family was poor. The wedding would be in a month.`,
          `Aparna put the phone down and sat for a long time, looking at the photograph the old woman had left on her desk.`,
          `Then she did something she had never done in her life. She broke a rule.`,
          `She found the village, a dot on a district map, and the name of its sarpanch, and a phone number. She called it from a public booth near the court, the way Kaka would have, and she told the sarpanch, in her plainest Hindi, about a wife who had developed asthma nobody had ever seen, and a mother who would not drink tea in the man's company.`,
          `She did not give her name.`,
          `The wedding was called off two weeks later. Arvind never found out why. He married a widow from Ludhiana the following year, and Aparna heard nothing more of him.`,
          `But in the summer, a girl called Manisha, eighteen years old and stunningly beautiful, ran away from a village in Punjab with a single suitcase and a page torn from a magazine. She took a train to Mumbai to become a model.`,
          `Aparna never learned what happened to her. If you have read this book, you will know more than she ever did.`,
        ],
      },
    ],
  },
  {
    slug: 'victim-of-many-loves',
    title: 'The victim of many loves',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `"Mama, I got fired," Anamika said. "And I need you. Not to come home. I need you to come here."`,
          `Her mother was on the Rajdhani from Ranchi two days later, with a steel tiffin carrier, three pickles and a shawl that smelled of home.`,
          `She stayed for three months. She slept on the mattress in the living room, the one Anamika could not look at, until it stopped being the place where Hanif had slept and became the place where her mother snored. She came to every appointment with Dr. Homi and sat outside in the waiting room knitting, so that Anamika could see her through the glass door.`,
          `In the second month, Anamika started to sing again. Just in the kitchen at first, while her mother cooked: old songs, Lata and Kishore, every word remembered. A neighbour knocked to complain and stayed to listen. His cousin produced radio jingles. Did she want to try?`,
          `She sang a jingle for a toothpaste brand, then one for a mattress company, which made her laugh so hard they had to do eleven takes.`,
          `On the day her mother went back to Ranchi, Anamika walked her to the platform and held her hand until the train began to move.`,
          `"Will you be all right?" her mother asked through the window.`,
          `"Not every day," said Anamika. "But most of them."`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"Mama, I got fired," Anamika said, "and I am coming home."`,
          `Ranchi received her gently. Her old room was waiting for her, with the same blue curtains and the same posters on the wall. Her father did not ask about Mumbai. Her mother did not ask about anything at all. They simply fed her, and let her sleep, and were careful around her, as if she were made of glass.`,
          `It was safe. That was what everyone said. She was safe now.`,
          `Within a year, a match had been arranged: a quiet man with a government job in Jamshedpur who did not drink and went to bed at ten. He was kind to her. He never raised his voice. He did not know about the hospital, or Hanif, or the man with the flute at the window, and she never found the right moment to tell him.`,
          `She stopped painting. There was no room for an easel in the government quarters, and anyway, she told herself, it had been a Mumbai thing. She stopped singing, except at weddings, when she was asked.`,
          `Sometimes, in the early mornings, she woke at dawn with the feeling that someone had just been sitting at the window, and had only that moment left.`,
          `She never told anyone. She got up, made the tea, and the day went on.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `Her mother picked up before the first ring had finished.`,
          `"Baby? I was just about to call you."`,
          `Anamika stopped, the words *I got fired* already in her mouth.`,
          `"I had the strangest dream," her mother said. "There was a man in our courtyard. Long hair, a beard, a flute in his hand. He was laughing. He said, *Call your daughter. Tell her I love her.* I told your father, and he said it was the bhindi I ate for dinner. But I couldn't go back to sleep."`,
          `Anamika sat down on the floor very slowly.`,
          `"Mama," she said, "what did he look like when he laughed?"`,
          `Her mother described him: the eyes that seemed to look inside you, the way he said *I* as if it were the most important word in the world. Anamika listened, and the tears came, and with them something she had not felt in months, a kind of lightness, as if she were being held from very far away.`,
          `"Baby? Are you there?"`,
          `"I'm here," said Anamika. "Mama, I got fired yesterday. And I think I'm going to be all right."`,
          `She did not go home. She did not stay the same, either. She never found out who the man with the flute had been, and after a while she stopped wanting to know. It was enough that he had visited two people on the same night, a thousand miles apart, and told them both the same thing.`,
        ],
      },
    ],
  },
  {
    slug: 'the-soul-mate-theorist',
    title: 'The soul mate theorist',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `"Disappointed?" said Rajneesh. "Yes. Surprised? No. I'm forty-one. Most of my dreams have come to nothing, and I'm still here."`,
          `Paromita laughed, and some of the tension went out of her shoulders.`,
          `Shen's lawyers settled in April. It was not a generous settlement, but it was enough: custody of Dhrub, a small monthly sum and the flat in her name. She spent a week walking around it, touching the walls, as if she could not believe they belonged to her.`,
          `Then she came to Rajneesh with a notebook full of figures.`,
          `"A café," she said. "Near the station. Breakfast for office workers, chai and toast and poha, nothing fancy. I've done the numbers. I need a partner who can do spreadsheets and doesn't drink before noon."`,
          `"I drink before noon."`,
          `"Then you'll stop."`,
          `He stopped. He kept his job and did the café's accounts at night. She ran the kitchen and the counter, and charmed the regulars, and never once let anyone pay less than the menu price. Dhrub did his homework at the corner table, and by the second year he could count to a hundred, and then to a thousand.`,
          `They never married. Sanjay asked him about it once, at Timmy Bar, which Rajneesh now visited only on Fridays.`,
          `"Soul mates," said Rajneesh, "don't need the paperwork."`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"Yes," said Rajneesh. "But I will not give up easily."`,
          `He did not have to. Two weeks later, the decision was made for them.`,
          `Shen's lawyers had hired a private investigator. The photographs arrived in a brown envelope: Paromita at Timmy Bar, Paromita with men in hotel lobbies, Paromita leaving a building at dawn. The custody hearing was moved up. Her lawyer told her, quietly, that she would lose.`,
          `She took Dhrub and left for Kolkata the night before the hearing, to her aunt's house, where she said she could fight from a safer distance. She did not say goodbye. She left a note on Rajneesh's door: *Don't follow. They'll use you too.*`,
          `He called her every day for a month. Then every week. Then on Dhrub's birthday, and on Diwali, and eventually not at all.`,
          `Years later, at a cricket ground in Kolkata where he had gone for a company match, he saw a tall teenage boy in a school team, batting with great care and very little flair. The boy held up three fingers to the umpire to ask for a new guard, and Rajneesh's heart stopped for a moment.`,
          `He did not go over. He did not know what he would say.`,
          `He watched until the boy was out, for thirty-three, and then he went back to his hotel and sat in the bar until it closed.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `Before Rajneesh could answer, his phone rang again. It was Sanjay.`,
          `"Sorry, buddy. One more thing." His voice was strange. "I took your advice. I told Sangeeta everything. About Timmy Bar, the forty hours, all of it. And then she asked me for the name."`,
          `"And you told her?"`,
          `"I told her the name. Paromita." A pause. "Rajneesh, she started crying. She said Paromita is her sister."`,
          `Rajneesh turned around very slowly. Paromita was standing behind him with the teacup halfway to her mouth, and all the colour had left her face.`,
          `"Sangeeta," she said. "Is she well?"`,
          `It came out in pieces, over the next hour. A family in Shillong. Two sisters. One who married the right man, at the right time, with the right horoscope. One who ran away with a Chinese engineer at nineteen and was never spoken of again. Eleven years without a phone call, a letter or a birthday card.`,
          `That Sunday, Sanjay and Rajneesh sat in Sanjay's car outside a flat in Bandra, smoking and not talking, while two sisters sat inside and did the talking for both of them.`,
          `When the door finally opened, Sangeeta was holding Dhrub on her hip.`,
          `"Your soul mate theory," Sanjay said, "just made my wife's family whole again. I hope you're charging consultancy."`,
        ],
      },
      {
        slug: '4-2',
        label: 'Open',
        paragraphs: [
          `"Disappointed," said Rajneesh, turning the word over. "That depends on what the dreams were."`,
          `"Tell me, then," said Paromita. "All of them. Right now. The flat, the job, the boy in a good school, the wedding, or no wedding. Tell me what you see."`,
          `He started to. He had a whole speech, built over forty hours, with sections and sub-sections. But somewhere around the second sentence, he noticed she was not listening to the words. She was watching his hands, the way a gambler watches the dealer's.`,
          `"You don't believe me," he said.`,
          `"I believe you believe it. That isn't the same thing." She stirred her tea. "I'll make you a deal. Ask me again on Diwali. If the dream is still the same on Diwali, I'll tell you mine."`,
          `"What if mine has changed by then?"`,
          `"Then you'll have learned something," she said. "And so will I."`,
          `Diwali was four months away. Rajneesh walked home through the hot afternoon trying to decide whether he had just been given a chance or a polite goodbye. By the time he reached his building, he had decided it was both, and that, perhaps, this was what it meant to begin something with another person: not knowing which, and turning up anyway.`,
        ],
      },
    ],
  },
  {
    slug: 'the-facebook-stalker',
    title: 'The Facebook stalker',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `The phone rang and rang. Nobody picked up.`,
          `Hanif sat with the mobile in his hand for a long time. Then, instead of calling again, he opened his notebook and wrote down how he felt: lonely, ashamed, hungry, wanting to be held, wanting to be forgiven. It filled a page. It was the first honest page he had written in a year.`,
          `The next morning he went to Dr. Homi, properly this time, without lying about why. He went every week after that. He moved back to Byculla in March. He found a job at a small publishing house that printed Urdu poetry and school textbooks, and he was surprisingly good at it.`,
          `He kept writing. In the autumn, Rehana made him a page on Facebook, not under his own name, where he posted a poem every Friday. They were about Sufi saints and Mumbai trains and his mother's hands. People started to share them. A few thousand followed the page, then a few thousand more.`,
          `One Friday, he noticed a new name among the likes on his poem. *Shweta Venkataraman.*`,
          `He looked at it for a long time. He did not click on her profile. He did not send a message.`,
          `He closed the laptop, went into the kitchen and asked his mother what was for dinner. It was the best thing he had written all year.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `The phone was answered on the third ring, but not by Anamika.`,
          `"Hello?" said an older woman's voice, with a Ranchi accent. "Who is this?"`,
          `"I'm... a friend of Anamika's. From Mumbai."`,
          `The voice became very careful. "She has come home. She is resting. She will not be coming back to Mumbai. Please don't call this number again, beta. Whoever you are."`,
          `Hanif put the phone down on the bed and looked at it as if it had bitten him.`,
          `He did not go home to Byculla that weekend. He told Rehana he had a cold, which she pretended to believe. He did not see Dr. Homi on Tuesday.`,
          `On Wednesday night, alone in his flat with the fan going round, he opened Facebook. He told himself he would only look. Shweta had changed her profile picture. Shweta had checked in at a restaurant in Bangalore. Shweta had been tagged in a photograph with Abhijeet, at a wedding, laughing.`,
          `By three in the morning he had saved forty-two new pictures. By dawn he had written her a message, deleted it, written it again, and sent it.`,
          `He sat by the window and waited for the gold specks to come back into the light. They never did.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `"Hanif," said Anamika. She sounded amused. "I was wondering when you'd call. I'm at your parents' house."`,
          `He nearly dropped the phone. "You're where?"`,
          `"In Byculla. Rehana invited me for dinner. Your mother made biryani. Your father has said grace three times. I think he's nervous."`,
          `"How do you even know Rehana?"`,
          `"From the dargah at Haji Ali, every Thursday, for a year. She's the one who told me about Rasheeda. She's the one who told me to see Dr. Homi. She never told me her brother was the Hanif I was crying about, and I never told her my Hanif's surname." Anamika laughed. "We worked it out at the dinner table, about ten minutes ago, when your mother brought out the photo albums."`,
          `In the background, he heard Rehana shout something, and his mother laugh.`,
          `"Are you angry?" he asked.`,
          `"I was. For about ten minutes." Her voice softened. "Now I'm sitting in your old room, Hanif, looking at your school prizes. You won the elocution prize three years running. You never told me that. You never told me anything true."`,
          `"I'm coming over," he said.`,
          `"Good," said Anamika. "Bring sweets. And when you get here, you're going to tell all of us something true. We've decided."`,
        ],
      },
    ],
  },
  {
    slug: 'the-night-of-the-affair',
    title: 'The night of the affair',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `It was the newspaper boy, wanting the month's payment.`,
          `Priyanka paid him, closed the door and leaned against it, shaking with laughter that was very close to tears. Sameer was standing in the bedroom doorway with one shoe on.`,
          `"We can't do this," she said.`,
          `"I know."`,
          `"No. Listen. I mean that if a newspaper boy can do this to us, we can't do this."`,
          `He drove home. Manisha was asleep, still in her make-up from the shoot. He sat on the edge of the bed until she woke up, and then he told her. Not all of it, not the paramatma or the i-pill, but enough.`,
          `She did not throw anything. She cried, and then she was furious, and then she asked him the only question that mattered: "Do you want to stay?"`,
          `He found that he did.`,
          `They went to a counsellor, an old Parsi woman in Colaba with very little patience for either of them. It took a year. Some weeks it was harder than anything he had ever done.`,
          `Priyanka said yes to the journalist. She sent Sameer a wedding invitation and he sent back a gift, a fountain pen, with a card that said *Write it honestly.* He never knew if she understood.`,
          `On the next visitors' Sunday at the boarding school, it was Manisha who sat beside him in the car, holding the box of sweets for his son.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `It was Rohan, back from London three days early, holding a bunch of yellow roses and two airport coffees.`,
          `"Surprise," he said, and then he saw Sameer's shoes by the door, and Sameer's shirt over the back of the chair, and Sameer.`,
          `Nobody shouted. Rohan put the coffees down on the floor, very carefully, because there was nowhere else to put them. He handed Priyanka the roses. Then he turned and walked down the stairs without a word.`,
          `He did not answer her calls. He did not answer her emails. A month later, a friend told her he had taken a job in New York.`,
          `Sameer went home and lied to Manisha, and Manisha believed him. Or pretended to. He was never sure, and that uncertainty sat between them at every dinner, like a guest nobody had invited, for as long as they stayed together.`,
          `Priyanka did not see Sameer again. She threw away the i-pill box. She had never opened it.`,
          `Her son was born the following spring. She named him after nobody. When he was old enough to ask about his father, she told him that his father was a good man who had lived in another city.`,
          `It was, she thought, the truest thing she could say about either of them.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `It was a boy of fourteen in a school blazer, with a backpack and an expression of absolute fury.`,
          `"Papa," he said, looking straight past Priyanka. "You said you were in Pune."`,
          `Sameer had gone grey. "Kabir. How did you..."`,
          `"Find my iPhone. You set it up yourself, for when I lose mine." The boy held up his phone. A blue dot was blinking on the map, over this building. "They let us out a day early for the long weekend. Nobody was at the station. I've been sitting downstairs since five."`,
          `Priyanka stepped back from the door. "Come in," she said gently. "Please. I'll make you something to eat."`,
          `Kabir looked at her for the first time. He looked at the cups on the table, the cushions on the floor, his father's shirt.`,
          `"No, thank you," he said, with terrible politeness. "Papa, I'd like to go home now. And I'd like you to tell Manisha Aunty. Today. Or I will."`,
          `Sameer told her that afternoon, with his son sitting at the dining table pretending to do homework and listening to every word. Manisha moved out within the week. Kabir went back to school on Monday and did not write to his father for a year.`,
          `The last thing Sameer heard about Priyanka was that she had married the journalist and moved to London.`,
          `He kept the blue dot on his phone for years, watching his son move around the city without him.`,
        ],
      },
    ],
  },
  {
    slug: 'the-pursuit-of-perfection',
    title: 'The pursuit of perfection',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `I do not wait for Bhavana to wake up. At six, I get dressed in the dark and walk to the police station on the main road.`,
          `The constable on duty is eating a vada pav. He looks at me as if I am a madman, which perhaps I am, and asks me what I want.`,
          `"I want to report an assault," I say. "Last night. On a woman called Manisha. I did it."`,
          `They keep me there all day. Bhavana comes at noon with a lawyer and a tiffin box and does not say a word to me. Manisha refuses to press charges. The inspector, a tired man with a moustache, tells me I am either very honest or very stupid, and that he has not decided which.`,
          `I spend six months doing community service at a women's shelter in Byculla, on the court's order. I wash dishes. I fix the leaking taps. I am not allowed to talk to anyone who lives there, and I do not try to. I listen instead. I learn to listen.`,
          `Bhavana does not forgive me for a long time. When she finally does, she does not say so. She just puts a cup of tea down beside me one morning, the way she used to, and sits down next to me, close enough that our shoulders touch.`,
          `"Who are you?" she asks.`,
          `"I'm working on it," I tell her.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"I am back," I tell her. Bhavana opens her eyes and looks at me.`,
          `She does not say *I missed you.* She says nothing at all. She sniffs once, very slightly, near my collar, where Manisha's perfume still is, and then she turns her back to me and pretends to sleep.`,
          `We never speak of it. That is the agreement we make that morning, without words, and we keep it for twenty years.`,
          `From the outside, nothing changes. I am promoted. Bhavana organises the children's birthdays and my mother's medicines and the Diwali parties, which are famous in our building. We are photographed at weddings, smiling, my hand on her shoulder.`,
          `But she never again reaches for me in the dark, and I never again ask her to.`,
          `Manisha's face is on hoardings for a while, then on smaller hoardings, then nowhere. I read in the paper that she has gone back to her village.`,
          `When my daughter is grown, she finds my old notebook in a box in the loft, the one with the conversations with the small voice. She reads it in one night. In the morning, she brings it to me and puts it on the breakfast table between us.`,
          `"Was any of it true?" she asks.`,
          `I look at Bhavana. Bhavana looks at her tea.`,
          `"All of it," I say. "That was the problem."`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `"Speak louder," I say. "I can't hear you in that small voice."`,
          `"Papa?"`,
          `The voice is very small. It comes from the kitchen doorway. I turn, and there is Meher, ten years old, in her nightdress, rubbing her eyes.`,
          `"Who are you talking to, Papa?"`,
          `I cannot answer. I do not know how long she has been standing there. I do not know how much she has heard: *should I kill her*, the voice in the kitchen, the arguments with my own conscience.`,
          `"Nobody," I say. "I was talking to nobody. Go back to bed."`,
          `But she doesn't. She comes and sits on the kitchen floor beside me, the way she does when she has had a nightmare, and puts her small hand in mine.`,
          `"You sounded scared," she says. "When I'm scared, Mama says I should say it out loud, and then it's smaller."`,
          `I sit with my daughter's hand in mine and I understand, finally, who the small voice was. It was never a spirit, or God, or a mirror. It was the voice of everyone I could hurt, and the smallest of them was right here.`,
          `When Bhavana wakes at seven, she finds us both asleep on the kitchen floor.`,
          `I tell her everything before breakfast. Meher is at school by then. Some things you say out loud so that they become smaller. Some things you say out loud because they should never be small again.`,
        ],
      },
    ],
  },
];

export function storyPath(storySlug: string): string {
  return `/lph/alternate-endings/${storySlug}/`;
}

export function endingPath(storySlug: string, endingSlug: string): string {
  return `${storyPath(storySlug)}${endingSlug}/`;
}

export function lphCanonical(path: string): string {
  return `https://www.riturajverma.com${path.replace(/\/+$/, '')}/`;
}

export function endingTitle(story: AlternateStory, ending: AlternateEnding): string {
  return `${story.title}: Ending ${story.endings.indexOf(ending) + 1}`;
}
