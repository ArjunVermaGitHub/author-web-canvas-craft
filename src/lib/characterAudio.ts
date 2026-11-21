export const CHARACTER_AUDIO_TIMING = { voiceDelayMs: 600, fadeMs: 1200, bedVolume: 0.25, voiceVolume: 1 } as const;

export function characterBedVolume(elapsedMs: number) {
  return CHARACTER_AUDIO_TIMING.bedVolume * (1 - Math.min(1, Math.max(0, elapsedMs / CHARACTER_AUDIO_TIMING.fadeMs)));
}

// Constructed only inside a visitor's click. Prime the voice silently in that
// gesture, so delayed playback is also permitted by mobile media policies.
export function createCharacterAudioPlayer(voiceUrl: string, bedUrl: string, onBlocked: () => void, makeAudio: (url: string) => HTMLAudioElement = url => new Audio(url)) {
  const voice = makeAudio(voiceUrl);
  const bed = makeAudio(bedUrl);
  voice.preload = bed.preload = 'none';
  voice.volume = CHARACTER_AUDIO_TIMING.voiceVolume;
  bed.volume = CHARACTER_AUDIO_TIMING.bedVolume;
  bed.loop = true;
  let soundOn = true;
  let generation = 0;
  let delay: ReturnType<typeof setTimeout> | undefined;
  let fade: ReturnType<typeof setInterval> | undefined;

  const stop = () => {
    generation++;
    clearTimeout(delay);
    clearInterval(fade);
    voice.onended = null;
    voice.pause(); bed.pause();
    voice.currentTime = bed.currentTime = 0;
  };
  const play = () => {
    stop();
    const current = generation;
    const started = Date.now();
    bed.volume = CHARACTER_AUDIO_TIMING.bedVolume;
    bed.muted = !soundOn;
    voice.muted = true;
    const blocked = () => {
      if (current !== generation) return;
      stop(); onBlocked();
    };
    // Both play calls are made synchronously within the original click.
    try {
      void bed.play().catch(blocked);
      void voice.play().then(() => {
        if (current !== generation) return;
        voice.pause(); voice.currentTime = 0;
        delay = setTimeout(() => {
          if (current !== generation) return;
          voice.muted = !soundOn;
          voice.onended = () => {
            const fadeStart = Date.now();
            fade = setInterval(() => {
              bed.volume = characterBedVolume(Date.now() - fadeStart);
              if (Date.now() - fadeStart >= CHARACTER_AUDIO_TIMING.fadeMs) stop();
            }, 40);
          };
          try { void voice.play().catch(blocked); } catch { blocked(); }
        }, Math.max(0, CHARACTER_AUDIO_TIMING.voiceDelayMs - (Date.now() - started)));
      }).catch(blocked);
    } catch { blocked(); }
  };
  return { play, stop, setSound(on: boolean) { soundOn = on; voice.muted = bed.muted = !on; } };
}