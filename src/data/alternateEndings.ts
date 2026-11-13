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
  {
    slug: 'the-intimacy-of-space',
    title: 'The intimacy of space',
    endings: [
      {
        slug: '1-2',
        label: 'Happy',
        paragraphs: [
          `The phone rang once. "Shweta?" Her father's voice was older, and rougher than she remembered. "I never deleted your number. I just did not know what to say."`,
          `"Neither did I, Dad."`,
          `"Where are you?"`,
          `"Outside a temple in Karjat. I am sitting on my suitcase."`,
          `"Stay there. Your mother's cousin has a car in Panvel."`,
          `He arrived three hours later, in a dented white Maruti, holding a slab of Cadbury's Temptations. It was Rum Raisin. Shweta laughed so hard that she had to hold the compound wall.`,
          `On the drive home she told him everything about Hanif, the scar, the cameras and the contract she had signed without reading. He did not interrupt once. When they reached Mumbai, he switched off the engine and said, "You can stay as long as you like. And you do not have to marry anyone."`,
          `Two months later she started working at a travel agency in Bandra. She wore short sleeves on the first day. Nobody noticed, and it was the best day of her year.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `The phone was answered on the second ring, but not by her father.`,
          `"Shweta." It was Aditya, her brother. "Where are you? I have been trying your number for two years."`,
          `"Where is Dad? I missed his call a few weeks ago."`,
          `There was a silence on the line. "That was Dad's phone, Shweta. I was using it. He passed away in March. He kept your number in the drawer by his bed."`,
          `The taxi driver turned the radio down. She sat very still with the phone against her ear and heard her brother breathing, the same breath that had once held a machete.`,
          `"Come home," Aditya said. "Please."`,
          `She went home. The house had the same marble floor and the same photograph of the three of them on the wall, with a garland on the frame. She sat through the thirteenth-day prayers three months late, in a white salwar-kameez no one had asked her to wear.`,
          `Hanif never came to the funeral, because no one told him. Aditya never said what he had done. And Shweta never asked, because she was afraid that the answer would be the only thing her family had left to give her.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `The taxi driver's phone rang before hers did. He looked at the screen, then at Shweta in the rear-view mirror, and answered without saying anything.`,
          `In her ear, her own phone said: "Dad?"`,
          `The driver turned around. He was thinner than five years ago, with a beard, and his eyes were exactly hers. "I am not Dad. But he is in the car behind us, Shweta. He has been in the car behind us for two weeks."`,
          `"Aditya?"`,
          `"Roman's people found Dad in the first week. He came to the studio, to the set, to see if you were safe. I took the taxi job because I could not trust anyone else to drive you out of there." He tapped the wheel. "I know about Hanif. I know about the machete. I am not asking you to forgive me."`,
          `"Why did you not stop me from going in?"`,
          `"Would you have listened?" He pulled out of the lane. A white Maruti was waiting a hundred yards ahead, with its hazard lights blinking, and a small old man standing beside it holding a slab of chocolate.`,
          `It was Rum Raisin.`,
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
          `Aparna walked home through the galli without stopping at the Hanuman temple. The goats were asleep and the wires overhead hummed, and for once she did not count the rupees in her purse.`,
          `Suraj was waiting at the door with an envelope. "My first salary, Di. Don't say a word."`,
          `She said a word anyway. "Keep it."`,
          `"No." He pushed it into her hand. "Vivek is in his last year, and Leena has her scholarship. You have been the roof for fifteen years. We can carry the house now."`,
          `Aparna sat down on the swing in the courtyard. She held the envelope for a long time. Then she took out her diary, found the number she had never deleted, and dialled.`,
          `"Vasant? It's Aparna. I have thought about your question. It has taken me ten years."`,
          `"What was the question?" he said, and she could hear him smiling.`,
          `"Will you buy me a beer at the United Coffee House?"`,
          `Two weeks later, she took a large sip from his glass and said, "You are still not generous." He laughed, and raised his glass. "To family."`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `Aparna did not go home to the swing that evening. She sat in the car for two hours, watching the traffic, and told the driver to take her to the Hanuman temple. She had nothing to say to the idol, so she said nothing.`,
          `The invitation arrived in October, printed in gold on pink card. Vasant weds Priyanka. Under it, in his own small, careful handwriting: *Please come. You were the first person I told about her.*`,
          `She went. She wore her stiff cotton sari, sat in the third row, and ate nothing. When Vasant saw her, his face lost its colour for a moment and then he smiled, the way a man smiles at a photograph. She gave him a gift in brown paper. It was a Remington typewriter ribbon, the last one she had from Kaka's table.`,
          `Suraj lost his job on the third day of the third month. Vivek did not finish college. Leena married a man her family had picked, and no one asked Aparna.`,
          `She still signed all the files. The Hanuman idol still received her thanks every morning. In her diary, the old photograph of the family stayed pressed against the page where Vasant's card had been.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `Kaka's grandson found her at the gate. "Madam, Dadaji left this on his lap. He said it was for you and nobody else."`,
          `It was a single typed page. Aparna recognised the letters immediately, the slightly raised *e*, the faded *r*. Not one mistake. Kaka had typed it blind, from memory, the way he had once typed a hundred pages a day outside the court.`,
          `*Aparna, the social worker who came to your door when you were eight was not from an NGO. I paid her. I told her to say it was an NGO because you would not have accepted help from a man you did not know. Every year after that, a young man in the Income Tax service sent me money for your family's school fees. He asked me never to tell you. He is the man you refused ten years ago. I am sorry I broke my promise to him. I am not sorry I kept my promise to you. Penance is not penalty. Go and ask him why.*`,
          `She read it three times. Then she took out her diary and dialled a number she had known by heart for ten years.`,
          `"Vasant," she said. "I want to ask you something."`,
          `"Ask," he said, as if he had been waiting at the phone since 2001.`,
          `"Whose penance was it?"`,
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
          `"Mama, I got fired yesterday," Anamika said, "and I'm not coming home."`,
          `The line was silent for a long moment. Then her mother said, very softly, "Tell me why."`,
          `"Because if I come home, Ranchi will mean I ran away. I want to get better here, with the doctor and the tablets and you on the phone five times a day. Far away, but with me."`,
          `Her mother cried a little and laughed a little. "Your father will want to argue."`,
          `"Let him argue by phone."`,
          `That week Anamika took out the canvas she had abandoned months ago and painted a man in a window, with a flute in his hand and sunlight around him. She did not know who he was. She found she did not need to.`,
          `A month later, a small gallery in Bandra hung it between two strangers' paintings. A woman bought it and asked what it was called.`,
          `"Courage," said Anamika.`,
          `She wore short sleeves to the opening. The scars were thin and pale, and nobody looked at them but her.`,
          `That night she called Ranchi. "Papa, I sold a painting."`,
          `"For how much?"`,
          `"Enough."`,
          `"Then I will find you a man who earns more than that."`,
          `"Papa!" she said, and for the first time in a long while, she laughed until her eyes watered.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"Mama, I got fired yesterday," Anamika said.`,
          `"Then come home, baby."`,
          `"Let me think about it." The words surprised her as they left her mouth.`,
          `The thinking lasted until eleven, when Hanif's name lit up her phone. "I made a mistake," he said. "Rasheeda is nothing like you."`,
          `She knew exactly what he was. A man who missed his supper more than he missed her. She said she would come over anyway.`,
          `The voice that had been loud, clear and unwavering at dawn did not last till afternoon. She stopped taking the tablets because they made her drowsy. She skipped two appointments with Dr. Homi. She told her mother the job was going fine, just busy.`,
          `Hanif stayed six weeks. When he left, he left the way he had come, in tears about someone else.`,
          `She deleted Arun's number twice and knew it by heart both times.`,
          `The bracelets went back on her wrists. Every morning she stood at the mirror and said, "Today is the first day of the rest of my life." She meant it a little less each time.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `She had planned to call her mother. First she called Arun, because she owed him an apology and did not want to leave it hanging.`,
          `A woman answered. "Anamika? I am Sunita, Arun's wife."`,
          `Anamika could not speak.`,
          `"Please don't hang up. He told me everything the night you were in the hospital. I am the one who told him to turn the car around." There was a pause, and a child's voice in the background. "He is very bad at saying no to people in trouble. I am not. I have wanted to meet you for months."`,
          `"I said terrible things to him."`,
          `"He has said worse to me, and I have said worse back. That is what a family is for." She laughed, kindly. "I run a small art school for girls in Kurla. My singing teacher left last month. Arun says you remember every song ever made."`,
          `Anamika looked at the hospital bracelet she had kept in a drawer. She looked at the dawn through her window.`,
          `Then she called her mother. "Mama, I got fired, and I am not coming home. I have been invited to dinner."`,
          `"By whom?"`,
          `"By people who know the worst of me," said Anamika, "and still set a place."`,
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
          `"Yes," Rajneesh said. "But I will not give up easily."`,
          `Paromita laughed and put her teacup down. "Then do something useful with the hurry. I do not want to be rescued. I want to be employed."`,
          `It took him two weeks, a phone book and three old IIT friends. By the third week, a coaching class in Andheri was short of a Physics teacher, and the owner owed Rajneesh a favour from 1998. He did not ask for references. He asked her to explain Schrödinger's cat to a room of seventeen-year-olds.`,
          `She did it in fifteen minutes. The room applauded.`,
          `Rajneesh stopped going to Timmy Bar. The neon sign flickered over the street without him. Sanjay mailed a thousand rupees with a note that said, *Buy the child something*, and a photograph of himself with Sangeeta and their daughter. Nobody was smiling yet. They were all in the frame.`,
          `On a Sunday in March, Dhrub sat on the hall floor and stared at his hand. Slowly, he put out three fingers.`,
          `"Rayeee!" he shouted. "Tee!"`,
          `Paromita looked at Rajneesh. Rajneesh looked at her.`,
          `"Forty hours," she said.`,
          `"Forty thousand," said Rajneesh, and for once he did not pull his ear.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"Yes," said Rajneesh. "But I will not give up easily."`,
          `He said it with conviction, and he meant it for roughly a week.`,
          `On the eighth day he did the arithmetic again, the way he had always done it. Five years of her income. The cost of two households. A child who was not his, a divorce that was not final, a woman who could not be employed. It did not add up. It never had.`,
          `On the ninth day he bought her a gold bangle, the sort of gift he could not afford, and left it with a note on the pillow next to Dhrub. *Thank you for everything.* Nothing else, because there was nothing else his theory allowed.`,
          `Paromita read the note twice. She put the bangle in her purse beside the three condom packets and wiped Dhrub's face with her pallu.`,
          `Sanjay called three weeks later. "I went to see Sangeeta," he said. "She cried. I cried. We are talking."`,
          `"Congratulations," said Rajneesh, and meant it.`,
          `"And you?"`,
          `"Fine. Always fine."`,
          `That night, under the red neon sign, a new woman in a blue dress came to his table and asked his name. He opened his mouth to say Rajneesh. "Rajesh," he told her.`,
          `Somewhere across the city, a small boy held up two fingers and could not find the third.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `"Yes, I would be disappointed," said Rajneesh. "But I will not give up easily."`,
          `Paromita let go of his wrist. She walked to the bedroom, came back with a thin blue bank passbook and set it on the table next to his tea.`,
          `He opened it. He read the last line. He read it again.`,
          `"This is a lot of money," he said.`,
          `"It is enough to stop. I could have stopped last Diwali." She stirred her tea. "I wanted to see what kind of man says, *I will help you get out of this life*, when she has already got out of it."`,
          `"You were testing me."`,
          `"I was running my own experiment, Rajesh. You are not the only one who studied Physics." She smiled. "Forty hours. You said it yourself. After that, the emotional tax is due."`,
          `"And have I paid?"`,
          `"You just did. Quite handsomely." She tapped the passbook. "Now let us talk about your savings."`,
          `"I am nearly broke."`,
          `"I know. I paid for the whisky last night." She laughed at his face. "Marry me, Rayeee. Not as a rescue. As a partnership. I will buy the flat. You will get a job. We will send Dhrub to school here, in Mumbai, where we can see him."`,
          `Rajneesh looked at the passbook, then at the woman who had held his theory up to the light and found the hole in it.`,
          `Behind them, a small voice shouted, "Tee!" and a hand with three fingers up appeared at the bedroom door.`,
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
          `"Anamika?"`,
          `"Hanif." She did not sound surprised. She sounded tired and clear, like someone who had slept. "Are you drunk?"`,
          `"No. I called to say sorry."`,
          `There was silence, then a small laugh. "For what?"`,
          `"For all the nights I used you as a place to cry. And for never once asking how you were."`,
          `"I'm better," she said. "Dr. Homi says I'm learning to want things that don't hurt. I don't want to sleep with you, Hanif. I would like a friend."`,
          `He found that he was smiling. "A friend who isn't pretending to be a doctor, a lover or a mattress?"`,
          `"That's the one."`,
          `A week later he moved back to Byculla, to the narrow house with the creaky stairs. His mother cried into the dal. His father said a prayer that was only slightly too long.`,
          `In the evenings he taught the children of the lane to read, wearing a green kurta his sister had bought him, with Khayyam open on his knee. They called him Hanif Sir.`,
          `He closed the folder of four hundred photographs and did not open it again. When Rehana asked why, he said, "She was a good chapter." The next page was blank, and for once that did not frighten him.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `"Anamika?"`,
          `She picked up on the second ring. "I was hoping you'd call," she said. He heard the relief in her voice, and hated how much he needed it.`,
          `He took a taxi to her flat. They drank two beers and said all the usual things. They made love on the living room mattress, as loveless as the night before Samovar. "You need me more than I need you," they told each other, and neither argued.`,
          `At three in the morning she slept. Hanif opened his laptop. There was a new message from Shweta Venkataraman.`,
          `*Please stop writing to me. Abhijeet has seen your messages. I am asking you with respect. Do not contact me again.*`,
          `Then the screen told him he had been blocked.`,
          `He read it nine times. Then he opened the folder of her photographs and went through all four hundred, naming each expression, looking for the one where she might be smiling at him.`,
          `In the morning Anamika found him at the window, unshaven, dull-eyed. She did not ask.`,
          `On the bus home, a woman in a saree with jasmine in her hair stood up and moved to another seat. He looked into the dark glass and saw why. The gold specks were gone.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `He had the phone in his hand and her number on the screen when the laptop chimed. A message from Shweta Venkataraman.`,
          `*Hanif. I saw your note about my eye. I am sorry it took me so long to answer.*`,
          `*The pink is for the ribbon. The butterfly is for the people who got through. I was ill last year, and I did not tell anyone, not even my sister. I did not want to be pitied. That is why the photographs have no smile in them. I was learning how to be brave.*`,
          `*I am well now. I am not coming back to you, and I never could have. But I wanted you to know I prayed for you, too, in my own way. As you used to pray for me.*`,
          `He read it twice. He looked at the phone in his hand and the name on the screen. Then he deleted the number without pressing call.`,
          `He dialled home instead.`,
          `"Rehana," he said. "Is the room still there?"`,
          `"Which room, Bhaijaan?"`,
          `"Mine."`,
          `He heard her cry and laugh together. In the background, his mother asked who it was.`,
          `"Tell her," said Hanif, "that her son is coming home. And that he forgave himself first."`,
          `That night he slept without dreaming of her. In the morning he went down to the street, and a woman at the bus stop did not move away.`,
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
          `It was Manisha. She stood on the landing in her shoot make-up, keys in one hand, the other resting on the doorframe.`,
          `Priyanka looked at her. She looked at the man behind her. She said the only sensible thing she could think of. "Come in. I'll make tea."`,
          `Nobody sat. The kettle hissed. Sameer stood by the window in yesterday's shirt.`,
          `"I was going to call you," he said.`,
          `"You weren't," said Manisha. "But you're about to say it."`,
          `He said it. He said it badly, in the wrong order, without any of the sentences he had practised in the shower.`,
          `Manisha listened to the end. Then she took her time. "I've known for three months. I kept waiting for you to be honest, Sameer. Not faithful. Honest. They're different, you know."`,
          `"I'm sorry."`,
          `"Yes. That's the first true thing you've said to me in a year." She put his spare key on the table next to the teacups. "I'll collect my things on Sunday. Don't be here."`,
          `When she had gone, Priyanka sat down very quietly. "I'm not the answer either," she said.`,
          `"I know."`,
          `"I'm going to call London. I'm going to tell him everything, and then he can decide whether to come back."`,
          `Sameer went down the stairs two at a time. It wasn't summer break, but the boarding school took visitors on Sundays. He had never gone on a Sunday. He booked the train anyway.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `It was Manisha. She stood on the landing in her shoot make-up, keys in one hand.`,
          `Priyanka opened her mouth. Behind her, Sameer stood in yesterday's shirt, looking like a man who has been asked to explain a painting he did not paint.`,
          `Manisha looked at him for a long time. Then she held out his car keys. "You left them in the ignition. I wanted to be sure I could get you home."`,
          `"Manisha—"`,
          `"Don't." She put the keys in his palm and closed his fingers over them, the way one does with a child. "Don't be clever. Not today."`,
          `She did not slam the door, which was worse.`,
          `By evening, she had moved out. By the following month, her face was on a hoarding for a cream that promised to erase two years from the skin, and Sameer drove past it twice a day and never looked up.`,
          `In London, the journalist came back to Mumbai three days early. Priyanka said yes to his proposal at the airport, in front of strangers, and took the pill she had already bought. She did not tell him. She would not tell him for another eleven years.`,
          `At the party, six months later, Sameer touched her elbow and she moved away, smiling politely, the way one moves away from a stranger on a train.`,
          `There was no future. They had agreed on that. It had simply taken everyone else's life to prove it.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `It was Manisha. She stood on the landing in her shoot make-up, keys in one hand. Behind her, in the stairwell, a man in a rumpled linen jacket was lighting a cigarette.`,
          `Priyanka went white.`,
          `"Rohan?" she said. "You're in London."`,
          `"I came back last night," he said. "Good morning, Priyanka."`,
          `Sameer, who had joined her at the door, looked from one face to the other. "You two know each other?"`,
          `"He's my boyfriend," said Priyanka.`,
          `"He's my boyfriend," said Manisha at the same moment.`,
          `The stairwell went quiet. A newspaper boy cycled past on the street below, whistling.`,
          `"Fourteen months," said Rohan, with the dignity of a man who has rehearsed this and found the rehearsal useless. "I met Manisha on a story about the film industry. I meant to tell you, Priyanka. I was waiting for the right time."`,
          `"You proposed to me," said Priyanka.`,
          `"And you said you'd give me an answer in some time."`,
          `"I was going to say yes."`,
          `"I was going to say yes to him as well," said Manisha pleasantly, "after I'd found out whether I needed to."`,
          `Sameer started to laugh. He could not stop. Priyanka began to laugh too, and then Manisha, in the middle of the landing, in her cocktail make-up, with nothing at all to say.`,
          `"It's not as if," said Sameer, wiping his eyes, "we're married to them."`,
          `"Tea?" said Priyanka. "I'll put the kettle on."`,
          `Four people came in, and for the first time all night, nobody lied.`,
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
          `He lay beside Bhavana with his eyes open until the first light came through the curtains. Then he did what he had not done in months. He woke her.`,
          `"I have to tell you something," he said, "and I want you to hear all of it before you say anything."`,
          `He told her about Manisha, about the knife in Priyanka's kitchen, about the couch and his hands on a woman's throat. He did not make it smaller. He did not make himself the victim of it.`,
          `Bhavana listened with her eyes closed. When he finished, she opened them. "I know," she said. "I read you in the dark. I just didn't know how far it had gone."`,
          `"I'm not asking you to forgive me."`,
          `"Good. I'm not going to. Not yet." She sat up. "Dr. Homi opens at nine. Get dressed."`,
          `This time Harish took the pills. He hated every one of them. He took them anyway.`,
          `He wrote a letter to Manisha, which Paromita's lawyer read first. It asked for nothing. He accepted the counselling the court ordered and the conditions that came with it, and he never went near her again. He sold his share of the ad agency that spring.`,
          `By winter he was teaching marketing at a small college in Thane. He was home by six every evening.`,
          `One Sunday morning his daughter put a cup of coffee in front of him. "It's gone cold," she said, "because you were staring again."`,
          `"Thank you, Meher," he said, and he said her name carefully, the way you carry something that might spill.`,
          `She rolled her eyes, ten years old and no longer afraid of him. It was the best answer he had ever been given to any question.`,
        ],
      },
      {
        slug: '2-2',
        label: 'Sad',
        paragraphs: [
          `He did not tell Bhavana. He lay beside her until the alarm rang, and rehearsed the sentences he would use if anyone asked.`,
          `Nobody asked for three days. On the fourth morning, two constables and a woman officer stood at the door.`,
          `Manisha had given a statement. Paromita had made sure the marks on her neck were photographed.`,
          `The headlines were exactly the ones he had predicted. *Ms Perfect Beauty Attacked by Obsessed Ad Man.* There was a photograph of Harish taken at Arun's party, his eyes half closed. Under it, the caption: *The Face of a Madman?*`,
          `Bhavana did not read the papers. She sat at the kitchen table with the children's school forms and wrote the guardian's name in her careful legal-assistant handwriting, once for each of them.`,
          `In the lock-up, they gave him a stub of chalk. He drew a small square on the wall and looked at it for a long time.`,
          `"Who am I?" he asked it.`,
          `For the first time, the answer was not a mystery. It was printed in four languages, on page one, above the fold.`,
        ],
      },
      {
        slug: '3-2',
        label: 'Twist',
        paragraphs: [
          `"Speak up," he said to the voice in the kitchen. "I cannot hear you."`,
          `"I am speaking," said the voice, "and you are finally close enough to hear."`,
          `He turned. In the doorway, in the grey light, with her handbag still on her shoulder, stood Bhavana.`,
          `She was not his conscience. She was not a gatepost or a mirror or a sentence in blue ballpoint on the wall. She was a woman in a crumpled cotton saree who had traced a mobile phone through two lanes of traffic at four in the morning.`,
          `"I have been standing here for an hour," she said. "I read the walls. All of them."`,
          `Behind him, on the couch, Manisha stirred and coughed. "She needs a doctor," said Bhavana. "Payal is on her way. So is Dr. Homi. So is the police inspector, because I called him too."`,
          `"You called the police?"`,
          `"I called the police on my husband. Do you know how hard that is for a soul mate?" Her voice shook only on the last word.`,
          `He sat down in the chair he had offered to his imaginary friend. Then he brushed the dust off it himself, with his hand.`,
          `"Who are you?" she asked. It was not the question he had been putting to everyone else. It was the one he had never answered.`,
          `"Harish Saxena," he said. "Husband. Father. And a man who is going to tell the inspector everything he did tonight."`,
          `Bhavana took his hand. "That's a good place to start," she said.`,
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