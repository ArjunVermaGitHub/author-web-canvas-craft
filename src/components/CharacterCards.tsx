import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { CHARACTER_CARDS, type CharacterCard } from '@/data/characterCards';
import { TOTAL_PRICE } from '@/config/book';
import { createCharacterAudioPlayer } from '@/lib/characterAudio';
import { trackPurchaseClick } from '@/lib/purchase';

export default function CharacterCards() {
  const [selected, setSelected] = useState<CharacterCard | null>(null);
  const [needsTap, setNeedsTap] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const player = useRef<ReturnType<typeof createCharacterAudioPlayer> | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const ordering = useRef(false);

  useEffect(() => {
    const hidden = () => {
      if (document.hidden) { player.current?.stop(); setNeedsTap(true); }
    };
    document.addEventListener('visibilitychange', hidden);
    return () => { document.removeEventListener('visibilitychange', hidden); player.current?.stop(); };
  }, []);

  const open = (character: CharacterCard, button: HTMLButtonElement) => {
    player.current?.stop();
    trigger.current = button;
    setSelected(character);
    setNeedsTap(false);
    player.current = createCharacterAudioPlayer(character.voice, character.bed, () => setNeedsTap(true));
    player.current.setSound(soundOn);
    player.current.play();
    trackPurchaseClick('CharacterOpen', 'home_characters_' + character.id);
  };
  const close = () => { player.current?.stop(); player.current = null; setSelected(null); };

  return <section id="home-characters" className="band-section">
    <div className="site-container">
      <h2 className="band-heading mb-3">Meet the characters</h2>
      <p className="text-secondary text-lg mb-8">Tap a face. Hear them speak.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {CHARACTER_CARDS.map(character => <Button key={character.id} type="button" variant="ghost"
          aria-label={`Meet ${character.name}, ${character.role}`} onClick={event => open(character, event.currentTarget)}
          className="character-tile content-panel relative block h-auto w-full overflow-hidden p-0 whitespace-normal text-left text-foreground motion-safe:transition-transform motion-safe:hover:scale-[1.015] motion-safe:active:scale-[0.98] hover:bg-card">
          <img src={character.image} alt={character.name} width={640} height={800} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <span className="character-tile-caption absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 md:p-5">
            <span className="font-serif text-heading text-lg md:text-2xl font-semibold">{character.name}</span>
            <span className="text-accent text-xs md:text-sm leading-snug mt-1">{character.role}</span>
            <span className="flex items-center gap-1 text-foreground text-xs md:text-sm mt-2"><Play className="size-3" aria-hidden="true" />Tap to hear</span>
          </span>
        </Button>)}
      </div>
    </div>
    <Dialog open={selected !== null} onOpenChange={isOpen => { if (!isOpen) close(); }}>
      {selected && <DialogContent className="character-dialog rounded-none sm:rounded-none shadow-none border-accent/40 gap-0 p-0"
        onCloseAutoFocus={event => {
          event.preventDefault();
          if (ordering.current) {
            ordering.current = false;
            document.getElementById('order')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
          } else trigger.current?.focus({ preventScroll: true });
        }}>
        <div className="character-dialog-body overflow-y-auto min-h-0 p-5 pt-12">
          <img src={selected.image} alt={selected.name} width={640} height={800} className="character-dialog-image mx-auto object-cover border border-accent/40" />
          <DialogTitle className="font-serif text-heading text-2xl mt-4 leading-tight">{selected.name}</DialogTitle>
          <p className="text-accent text-sm mt-1">{selected.role}</p>
          <DialogDescription className="text-secondary text-base leading-snug mt-3">{selected.teaser}</DialogDescription>
          <p className="italic text-foreground leading-snug mt-3">"{selected.line}"</p>
          <div className="flex items-center gap-3 mt-4">
            <Button type="button" variant="outline" className="rounded-none" onClick={() => { setNeedsTap(false); player.current?.play(); }}>
              {needsTap ? <Play aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}{needsTap ? 'Tap to play' : 'Replay'}
            </Button>
            <Button type="button" variant="outline" className="rounded-none" aria-pressed={soundOn} onClick={() => {
              const next = !soundOn; setSoundOn(next); player.current?.setSound(next);
            }}>{soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}Sound {soundOn ? 'on' : 'off'}</Button>
          </div>
        </div>
        <div className="character-dialog-footer border-t border-accent/35 bg-background p-4">
          <Button type="button" className="w-full rounded-none h-auto min-h-12 whitespace-normal leading-snug py-3" onClick={() => {
            trackPurchaseClick('OrderClick', 'character_' + selected.id);
            ordering.current = true; close();
          }}>Meet {selected.name} in your signed copy — ₹{TOTAL_PRICE}</Button>
        </div>
      </DialogContent>}
    </Dialog>
  </section>;
}