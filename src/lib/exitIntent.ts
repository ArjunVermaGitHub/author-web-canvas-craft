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