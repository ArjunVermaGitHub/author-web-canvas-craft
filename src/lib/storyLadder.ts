// Pure rules for the /signed-copy-story ladder: hook copy by utm_content and once-per-load events.
export type LadderEvent = 'LadderStart' | 'LadderRung1' | 'LadderRung2' | 'LadderRung3' | 'LadderOfferShown';

export const LADDER_HOOKS: Record<string, { headline: string; sub: string }> = {
  default: {
    headline: 'A sick nine-year-old can read a script no one alive can read.',
    sub: 'Then he meets a child who is also the god of death.',
  },
};

export function selectLadderHook(utmContent?: string | null) {
  return (utmContent && LADDER_HOOKS[utmContent]) || LADDER_HOOKS.default;
}

// Button on screen N fires this event; screen 5 being shown fires LadderOfferShown.
export const LADDER_BUTTON_EVENTS: LadderEvent[] = ['LadderStart', 'LadderRung1', 'LadderRung2', 'LadderRung3'];

export function stepFromHash(hash: string) {
  const match = /^#s([1-5])$/.exec(hash);
  return match ? Number(match[1]) : 0;
}

export function createOnceTracker(send: (event: LadderEvent) => void) {
  const fired = new Set<LadderEvent>();
  return (event: LadderEvent) => {
    if (fired.has(event)) return;
    fired.add(event);
    send(event);
  };
}
