export const EXIT_POPUP_SESSION_KEY = 'rv-instagram-exit-shown';
export const EXIT_POPUP_DELAY_MS = 15000;

export function allowsExitPopup(pathname: string): boolean {
  return ['/', '/books', '/wiki', '/characters', '/reviews', '/world', '/author', '/media', '/other-books', '/james-furrington'].includes(pathname)
    || pathname === '/lph' || pathname.startsWith('/lph/');
}

export function shouldShowExitPopup({ finePointer, clientY, relatedTarget, elapsed, shown, blocked }: {
  finePointer: boolean; clientY: number; relatedTarget: EventTarget | null;
  elapsed: number; shown: boolean; blocked: boolean;
}): boolean {
  return finePointer && clientY <= 0 && relatedTarget === null
    && elapsed >= EXIT_POPUP_DELAY_MS && !shown && !blocked;
}
export const TOUCH_EXIT_DELAY_MS = 12000;
export const TOUCH_EXIT_SCROLL_UP_PX = 250;
export const TOUCH_EXIT_WINDOW_MS = 500;

/** Largest upward scroll distance within the recent window; samples are { t, y }, newest last. */
export function recentScrollUp(samples: { t: number; y: number }[], now: number, windowMs = TOUCH_EXIT_WINDOW_MS): number {
  if (!samples.length) return 0;
  const current = samples[samples.length - 1].y;
  const recent = samples.filter(sample => now - sample.t <= windowMs);
  return Math.max(0, ...recent.map(sample => sample.y - current));
}

/** Touch "leaving" gesture: a fast upward scroll after the visitor has spent a while on the page. */
export function shouldShowTouchExit({ elapsed, scrollUp, shown, blocked, openedByButton, nearOrder }: {
  elapsed: number; scrollUp: number; shown: boolean; blocked: boolean; openedByButton: boolean; nearOrder: boolean;
}): boolean {
  return elapsed >= TOUCH_EXIT_DELAY_MS && scrollUp >= TOUCH_EXIT_SCROLL_UP_PX
    && !shown && !blocked && !openedByButton && !nearOrder;
}
