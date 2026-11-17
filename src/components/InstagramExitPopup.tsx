import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { INSTAGRAM_URL } from '@/config/book';
import { trackPurchaseClick } from '@/lib/purchase';
import { allowsExitPopup, EXIT_POPUP_SESSION_KEY, shouldShowExitPopup } from '@/lib/exitIntent';

export default function InstagramExitPopup() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const started = useRef(Date.now());

  useEffect(() => {
    setOpen(false);
    if (!allowsExitPopup(pathname)) return;
    try { shown.current = shown.current || sessionStorage.getItem(EXIT_POPUP_SESSION_KEY) === '1'; } catch { /* In-memory fallback when storage is unavailable. */ }
    const onLeave = (event: MouseEvent) => {
      if (!shouldShowExitPopup({
        finePointer: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
        clientY: event.clientY,
        relatedTarget: event.relatedTarget,
        elapsed: Date.now() - started.current,
        shown: shown.current,
        blocked: document.visibilityState !== 'visible' || Boolean(document.querySelector('[role="dialog"], [role="alertdialog"]')),
      })) return;
      shown.current = true;
      try { sessionStorage.setItem(EXIT_POPUP_SESSION_KEY, '1'); } catch { /* Retain the in-memory guard. */ }
      setOpen(true);
      trackPurchaseClick('InstagramPopupShown', 'exit_popup');
    };
    document.addEventListener('mouseout', onLeave);
    return () => document.removeEventListener('mouseout', onLeave);
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-40px)] max-w-md rounded-sm border-accent/40 bg-card p-8 text-foreground shadow-none sm:rounded-sm [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:right-1 [&>button]:top-1">
        <Instagram aria-hidden="true" className="h-8 w-8 text-accent" />
        <DialogTitle className="pr-4 font-heading text-xl leading-relaxed tracking-normal text-heading">Follow on Instagram</DialogTitle>
        <DialogDescription className="text-base text-muted-foreground">@raghav.kartikeya.series</DialogDescription>
        <Button asChild className="mt-2 rounded-sm whitespace-normal text-center">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={() => { trackPurchaseClick('InstagramFollowClick', 'exit_popup'); setOpen(false); }}>
            <Instagram aria-hidden="true" /> Follow on Instagram
          </a>
        </Button>
        <Button variant="ghost" className="rounded-sm text-foreground" onClick={() => setOpen(false)}>Not now</Button>
      </DialogContent>
    </Dialog>
  );
}