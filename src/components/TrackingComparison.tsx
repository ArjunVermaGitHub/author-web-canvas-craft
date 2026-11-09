import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import BookButton from './BookButton';
import { trackingComparisonSchema, comparisonMetrics } from '@/lib/trackingComparison';

export default function TrackingComparison({ code }: { code: string }) {
  const [fields, setFields] = useState({ startDate: '', endDate: '', timezone: 'Asia/Kolkata', destination: 'https://www.riturajverma.com/', scope: '', outboundClicks: '', landingPageViews: '', ga4Sessions: '', notes: '' });
  const [matched, setMatched] = useState(false);
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');
  const controller = useRef<AbortController | null>(null);
  const parsed = trackingComparisonSchema.safeParse({ ...fields, matched, ...Object.fromEntries(['outboundClicks', 'landingPageViews', 'ga4Sessions'].map(key => [key, fields[key as keyof typeof fields].trim() === '' ? undefined : Number(fields[key as keyof typeof fields])])) });
  const metrics = parsed.success ? comparisonMetrics(parsed.data) : null;
  const update = (key: keyof typeof fields, value: string) => setFields(previous => ({ ...previous, [key]: value }));

  const diagnose = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); setOutput('');
    if (!code.trim()) { setError('Enter your access code above.'); return; }
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || 'Check all fields and confirm the matching scope.'); return; }
    if (!approved) { setError('Confirm you want to send these figures to Lovable AI.'); return; }
    const abort = new AbortController(); controller.current = abort; setLoading(true);
    try {
      const response = await fetch('/api/insights', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, mode: 'tracking', comparison: parsed.data }), signal: abort.signal });
      if (!response.ok || !response.body) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Analysis unavailable (${response.status}).`);
      }
      const reader = response.body.getReader(); const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        setOutput(previous => previous + decoder.decode(value, { stream: true }));
      }
      setOutput(previous => previous + decoder.decode());
    } catch (failure) {
      if (failure instanceof Error && failure.name === 'AbortError') setError('Analysis stopped. Any partial findings are incomplete.');
      else setError(failure instanceof Error ? failure.message : 'Analysis unavailable.');
    } finally { setLoading(false); controller.current = null; }
  };

  return <section className="mt-10 border-t-4 border-lapis pt-6" aria-labelledby="tracking-heading">
    <h2 id="tracking-heading" className="font-serif text-2xl mb-5">Meta &amp; GA4 tracking comparison</h2>
    <form onSubmit={diagnose} className="space-y-5">
      <fieldset disabled={loading} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([['startDate', 'Start date'], ['endDate', 'End date']] as const).map(([key, label]) => <div key={key} className="space-y-2 min-w-0"><Label htmlFor={`tracking-${key}`}>{label}</Label><Input id={`tracking-${key}`} type="date" required value={fields[key]} onChange={e => update(key, e.target.value)} className="rounded-none" /></div>)}
        </div>
        {([['timezone', 'Shared report timezone'], ['destination', 'Ad destination URL'], ['scope', 'Matching campaign / paid traffic scope']] as const).map(([key, label]) => <div key={key} className="space-y-2"><Label htmlFor={`tracking-${key}`}>{label}</Label><Input id={`tracking-${key}`} required type={key === 'destination' ? 'url' : 'text'} value={fields[key]} onChange={e => update(key, e.target.value)} maxLength={key === 'timezone' ? 80 : 300} className="rounded-none" /></div>)}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([['outboundClicks', 'Meta outbound clicks'], ['landingPageViews', 'Meta landing-page views'], ['ga4Sessions', 'Matching GA4 sessions']] as const).map(([key, label]) => <div key={key} className="min-w-0 space-y-2"><Label htmlFor={`tracking-${key}`}>{label}</Label><Input id={`tracking-${key}`} type="number" inputMode="numeric" min="0" step="1" required value={fields[key]} onChange={e => update(key, e.target.value)} className="rounded-none" /></div>)}
        </div>
        <div className="space-y-2"><Label htmlFor="tracking-notes">Known tracking details (optional)</Label><Textarea id="tracking-notes" value={fields.notes} onChange={e => update('notes', e.target.value)} maxLength={1500} className="rounded-none" /></div>
        <div className="flex items-start gap-3"><Checkbox id="tracking-matched" checked={matched} onCheckedChange={value => setMatched(value === true)} /><Label htmlFor="tracking-matched" className="leading-relaxed">The reports use matching dates, timezone and Meta paid campaign scope—not all website sessions.</Label></div>
        <div className="flex items-start gap-3"><Checkbox id="tracking-approved" checked={approved} onCheckedChange={value => setApproved(value === true)} /><Label htmlFor="tracking-approved" className="leading-relaxed">Send these aggregate figures and notes to Lovable AI. Each analysis uses workspace AI credits. No ad or tracking settings will change.</Label></div>
      </fieldset>
      {metrics && <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><dt>Landing-page views / outbound clicks</dt><dd className="font-serif text-2xl">{metrics.landingPageViewRate === null ? 'Unavailable' : `${metrics.landingPageViewRate}%`}</dd></div>
        <div><dt>GA4 sessions / landing-page views</dt><dd className="font-serif text-2xl">{metrics.sessionsPerLandingPageView === null ? 'Unavailable' : `${metrics.sessionsPerLandingPageView}%`}</dd></div>
      </dl>}
      <div className="flex flex-wrap gap-3"><BookButton type="submit" disabled={loading}>{loading ? 'Analysing…' : 'Diagnose tracking gaps'}</BookButton>{loading && <BookButton type="button" variant="outline" onClick={() => controller.current?.abort()}>Stop</BookButton>}</div>
    </form>
    {error && <p role="alert" className="mt-5 border-l-4 border-carnelian pl-4">{error}</p>}
    {output && <div className="mt-6" aria-live="polite" aria-busy={loading}><h3 className="font-serif text-xl mb-3">Tracking findings</h3><div className="whitespace-pre-wrap break-words leading-relaxed">{output}</div></div>}
  </section>;
}