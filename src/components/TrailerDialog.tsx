import { useEffect, useRef, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import AmazonPurchaseButton from './AmazonPurchaseButton';
import { TOTAL_PRICE } from '@/config/book';
import { trackPurchaseClick } from '@/lib/purchase';

export type TrailerOpenMode = 'hero_button' | 'exit_popup';

export default function TrailerDialog({ open, mode, onOpenChange }: { open: boolean; mode: TrailerOpenMode; onOpenChange: (open: boolean) => void }) {
  const video = useRef<HTMLVideoElement | null>(null);
  const played = useRef(false);
  const completed = useRef(false);
  const ordering = useRef(false);
  const [activated, setActivated] = useState(mode === 'hero_button');
  const [muted, setMuted] = useState(mode === 'exit_popup');

  useEffect(() => {
    if (!open || !activated) return;
    played.current = false; completed.current = false;
    const startMuted = mode === 'exit_popup';
    setMuted(startMuted);
    const frame = requestAnimationFrame(() => {
      const el = video.current;
      if (!el) return;
      el.muted = startMuted;
      el.play().catch(() => {
        // Sound was blocked: fall back to muted autoplay with the unmute prompt.
        el.muted = true; setMuted(true); el.play().catch(() => undefined);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [open, mode, activated]);

  const close = () => {
    const el = video.current;
    if (el) { el.pause(); el.currentTime = 0; }
    onOpenChange(false);
  };

  const unmute = () => {
    const el = video.current;
    if (!el) return;
    el.muted = false; setMuted(false);
    el.play().catch(() => undefined);
    trackPurchaseClick('TrailerUnmute', mode);
  };

  return <Dialog open={open} onOpenChange={next => { if (!next) close(); else onOpenChange(true); }}>
    <DialogContent className="trailer-dialog w-auto max-w-[calc(100vw-24px)] rounded-none sm:rounded-none shadow-none border-accent/40 bg-background p-3 pt-12 gap-3 [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:right-1 [&>button]:top-1"
      onCloseAutoFocus={event => {
        if (!ordering.current) return;
        ordering.current = false; event.preventDefault();
        document.getElementById('order')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }}>
      <DialogTitle className="sr-only">Raghav Kartikeya — Trailer 1</DialogTitle>
      <div className="relative mx-auto">
        {!activated ? <Button variant="ghost" className="relative block h-auto p-0" aria-label="Play trailer 1" onClick={() => setActivated(true)}><img src="/trailer-1-poster.webp" alt="" loading="lazy" decoding="async" width={576} height={1024} className="trailer-video border border-accent/40" /><Play aria-hidden="true" className="absolute size-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-heading" /></Button> : <video ref={video} className="trailer-video border border-accent/40" src="/trailer-1.mp4" poster="/trailer-1-poster.webp"
          playsInline controls preload="none" muted={muted}
          onVolumeChange={event => setMuted(event.currentTarget.muted)}
          onPlay={() => { if (!played.current) { played.current = true; trackPurchaseClick('TrailerPlay', mode); } }}
          onTimeUpdate={event => {
            const el = event.currentTarget;
            if (!completed.current && el.duration && el.currentTime / el.duration >= 0.9) { completed.current = true; trackPurchaseClick('TrailerComplete', mode); }
          }} />}
        {activated && muted && <Button variant="outline" type="button" onClick={unmute}
          className="absolute left-1/2 top-4 -translate-x-1/2 inline-flex min-h-11 items-center gap-2 rounded-sm border border-accent bg-background/90 px-4 text-sm font-semibold text-heading">
          Tap for sound <Volume2 aria-hidden="true" className="h-4 w-4" />
        </Button>}
      </div>
      <AmazonPurchaseButton placement="trailer_popup" className="w-full min-h-11" />
      <a href="#order" className="inline-flex min-h-11 items-center justify-center text-sm text-accent underline underline-offset-4"
        onClick={event => { event.preventDefault(); trackPurchaseClick('OrderClick', 'trailer_popup'); ordering.current = true; close(); }}>
        or a signed gift copy — ₹{TOTAL_PRICE}
      </a>
    </DialogContent>
  </Dialog>;
}
