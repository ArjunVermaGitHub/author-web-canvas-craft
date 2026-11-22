import { useEffect, useRef, useState } from 'react';
import BookButton from './BookButton';
import TrailerDialog, { type TrailerOpenMode } from './TrailerDialog';
import { trackPurchaseClick } from '@/lib/purchase';
import { EXIT_POPUP_SESSION_KEY, recentScrollUp, shouldShowExitPopup, shouldShowTouchExit } from '@/lib/exitIntent';

const dialogOpen = () => Boolean(document.querySelector('[role="dialog"], [role="alertdialog"]'));
const nearOrder = () => {
  const rect = document.getElementById('order')?.getBoundingClientRect();
  return Boolean(rect && rect.top < window.innerHeight + 300 && rect.bottom > -300);
};

export default function HomeTrailer() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<TrailerOpenMode>('hero_button');
  const shown = useRef(false);
  const openedByButton = useRef(false);
  const started = useRef(Date.now());

  useEffect(() => {
    try { shown.current = sessionStorage.getItem(EXIT_POPUP_SESSION_KEY) === '1'; } catch { /* In-memory guard only. */ }
    const show = () => {
      shown.current = true;
      try { sessionStorage.setItem(EXIT_POPUP_SESSION_KEY, '1'); } catch { /* Keep the in-memory guard. */ }
      setMode('exit_popup'); setOpen(true);
      trackPurchaseClick('TrailerOpen', 'exit_popup');
    };
    const onLeave = (event: MouseEvent) => {
      if (!shouldShowExitPopup({
        finePointer: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
        clientY: event.clientY, relatedTarget: event.relatedTarget,
        elapsed: Date.now() - started.current, shown: shown.current || openedByButton.current,
        blocked: document.visibilityState !== 'visible' || dialogOpen() || nearOrder(),
      })) return;
      show();
    };
    let samples: { t: number; y: number }[] = [];
    const onScroll = () => {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const now = performance.now();
      samples = [...samples.filter(sample => now - sample.t <= 1000), { t: now, y: window.scrollY }];
      if (!shouldShowTouchExit({
        elapsed: Date.now() - started.current, scrollUp: recentScrollUp(samples, now),
        shown: shown.current, blocked: document.visibilityState !== 'visible' || dialogOpen(),
        openedByButton: openedByButton.current, nearOrder: nearOrder(),
      })) return;
      samples = [];
      show();
    };
    document.addEventListener('mouseout', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { document.removeEventListener('mouseout', onLeave); window.removeEventListener('scroll', onScroll); };
  }, []);

  return <>
    <BookButton variant="outline" className="w-full min-h-11 mt-1" onClick={() => {
      openedByButton.current = true; setMode('hero_button'); setOpen(true);
      trackPurchaseClick('TrailerOpen', 'hero_button');
    }}>▶ Click to watch trailer 1</BookButton>
    <TrailerDialog open={open} mode={mode} onOpenChange={setOpen} />
  </>;
}
