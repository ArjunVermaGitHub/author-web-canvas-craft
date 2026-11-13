import { CHARACTERS } from '@/data/characters';
export default function CharacterList() {
  if (!CHARACTERS.length) return null;
  return <section className="band-section"><div className="site-container grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {CHARACTERS.map(character => <article className="content-panel p-6" key={character.name}>
      {character.image && <img src={character.image} alt={character.name} className="w-full aspect-square object-cover mb-5" />}
      <h2 className="text-2xl text-accent">{character.name}</h2><p className="text-secondary mt-2">{character.role}</p><p className="mt-4">{character.description}</p>
    </article>)}
  </div></section>;
}
