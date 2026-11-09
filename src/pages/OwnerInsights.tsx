import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import BookButton from '@/components/BookButton';
import TrackingComparison from '@/components/TrackingComparison';
import OrderLog, { type Order } from '@/components/OrderLog';

const MAX_CHARS = 200_000;

type Compare = { opens24h: number; opensTotal: number; uniq24h: number; uniqTotal: number; since: string | null };
type Campaign = { campaign: string; source: string; medium: string; today: number; total: number };
type Counts = { week: number; prevWeek: number; all: number };
type Stats = { campaigns?: Campaign[]; last24h: number; total: number; orderCounts?: { placed: Counts; paid: Counts; pending: Counts }; compare?: Compare };

const fmt = (n: number) => Number(n || 0).toLocaleString('en-IN');
const ratio = (opens: number, uniq: number) => (uniq ? (opens / uniq).toFixed(1) : '–');

const OwnerInsights = () => {
  const [code, setCode] = useState('');
  const [data, setData] = useState('');
  const [question, setQuestion] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);

  const loadStats = async () => {
    setError('');
    if (!code.trim()) return setError('Enter your access code.');
    setStatsLoading(true);
    try {
      const post = (url: string) => fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      }).then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
        return body;
      });
      const [body, log] = await Promise.all([post('/api/visits'), post('/api/owner-orders')]);
      setStats(body);
      setOrders(log.orders || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setStatsLoading(false);
    }
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData(await file.text());
  };

  const analyse = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOutput('');
    if (!code.trim()) return setError('Enter your access code.');
    if (data.trim().length < 20) return setError('Paste or upload your event data first.');
    if (data.length > MAX_CHARS) return setError('That export is too large. Choose a shorter date range.');

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, data, question }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setError((err as Error).message);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-stonepage text-lapis px-4 py-10 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl mb-2">Sales insights</h1>
        <p className="mb-8 text-lapis/80">
          Paste or upload a Google Tag Manager / GA4 events export. The AI looks for patterns behind
          signed-copy orders and Amazon clicks.
        </p>

        <form onSubmit={analyse} className="space-y-5 border-t-4 border-lapis pt-6">
          <div className="space-y-2">
            <Label htmlFor="owner-code">Access code</Label>
            <Input id="owner-code" type="password" value={code} onChange={(e) => setCode(e.target.value)} className="min-h-[44px] rounded-none bg-white/60" autoComplete="current-password" />
          </div>
          <div className="space-y-3">
            <BookButton type="button" variant="outline" onClick={loadStats} disabled={statsLoading}>
              {statsLoading ? 'Loading…' : 'Show visitors and orders'}
            </BookButton>
            {stats && (
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ['Visitors, last 24 hours', stats.last24h],
                  ['Visitors, all time', stats.total],
                ].map(([label, value]) => (
                  <div key={label} className="border-t-4 border-lapis pt-2">
                    <dt className="text-base text-lapis/70">{label}</dt>
                    <dd className="font-serif text-3xl">{Number(value).toLocaleString('en-IN')}</dd>
                  </div>
                ))}
              </dl>
            )}
            {stats?.orderCounts && (
              <section className="border-t-4 border-lapis pt-4 mt-2" aria-labelledby="orders-heading">
                <h2 id="orders-heading" className="font-serif text-2xl mb-1">Signed copies</h2>
                <p className="text-base text-lapis/70 mb-4">Cancelled orders are not counted in placed or pending.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-base">
                    <thead>
                      <tr className="border-b-2 border-lapis">
                        <th className="py-2 pr-4"></th><th className="py-2 pr-4">Last 7 days</th><th className="py-2 pr-4">Previous 7 days</th><th className="py-2">All time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        ['Orders placed', stats.orderCounts.placed],
                        ['Paid (confirmed in PhonePe)', stats.orderCounts.paid],
                        ['Pending verification', stats.orderCounts.pending],
                      ] as const).map(([label, c]) => (
                        <tr key={label} className="border-b border-lapis/30">
                          <td className="py-2 pr-4">{label}</td>
                          <td className="py-2 pr-4 font-serif text-xl">{fmt(c.week)}</td>
                          <td className="py-2 pr-4 font-serif text-xl">{fmt(c.prevWeek)}</td>
                          <td className="py-2 font-serif text-xl">{fmt(c.all)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            {orders && <OrderLog code={code} orders={orders} setOrders={(fn) => setOrders((o) => fn(o || []))} />}
            {stats?.compare && (
              <section className="border-t-4 border-lapis pt-4 mt-2" aria-labelledby="compare-heading">
                <h2 id="compare-heading" className="font-serif text-2xl mb-1">Page opens vs unique visitors</h2>
                <p className="text-base text-lapis/70 mb-4">
                  {stats.compare.since
                    ? `All time means since page-open counting began on ${new Date(stats.compare.since).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.`
                    : 'No page opens recorded yet.'}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-base">
                    <thead>
                      <tr className="border-b-2 border-lapis">
                        <th className="py-2 pr-4">Period</th>
                        <th className="py-2 pr-4">Page opens</th>
                        <th className="py-2 pr-4">Unique visitors</th>
                        <th className="py-2">Opens per visitor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        ['Last 24 hours', stats.compare.opens24h, stats.compare.uniq24h],
                        ['All time', stats.compare.opensTotal, stats.compare.uniqTotal],
                      ] as const).map(([label, o, u]) => (
                        <tr key={label} className="border-b border-lapis/30">
                          <td className="py-2 pr-4">{label}</td>
                          <td className="py-2 pr-4 font-serif text-xl">{fmt(o)}</td>
                          <td className="py-2 pr-4 font-serif text-xl">{fmt(u)}</td>
                          <td className="py-2 font-serif text-xl">{ratio(o, u)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            {stats?.campaigns && (
              <section className="border-t-4 border-lapis pt-4 mt-2" aria-labelledby="campaign-heading">
                <h2 id="campaign-heading" className="font-serif text-2xl mb-1">Visits by campaign</h2>
                <p className="text-base text-lapis/70 mb-4">One visit per browser session. Today means since midnight India time.</p>
                {stats.campaigns.length === 0 ? <p>No campaign visits recorded yet.</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-base">
                      <thead>
                        <tr className="border-b-2 border-lapis">
                          <th className="py-2 pr-4">Campaign</th><th className="py-2 pr-4">Source</th><th className="py-2 pr-4">Medium</th>
                          <th className="py-2 pr-4">Visits today</th><th className="py-2">Visits all time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.campaigns.map((c) => (
                          <tr key={`${c.campaign}|${c.source}|${c.medium}`} className="border-b border-lapis/30">
                            <td className="py-2 pr-4 break-all">{c.campaign}</td>
                            <td className="py-2 pr-4 break-all">{c.source}</td>
                            <td className="py-2 pr-4 break-all">{c.medium}</td>
                            <td className="py-2 pr-4 font-serif text-xl">{fmt(c.today)}</td>
                            <td className="py-2 font-serif text-xl">{fmt(c.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner-file">Upload export (CSV, JSON or text)</Label>
            <Input id="owner-file" type="file" accept=".csv,.json,.txt,.tsv" onChange={onFile} className="min-h-[44px] rounded-none bg-white/60" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner-data">Event data</Label>
            <Textarea id="owner-data" value={data} onChange={(e) => setData(e.target.value)} rows={10} placeholder="event_name,page,source,device,count..." className="rounded-none bg-white/60 font-mono text-base" />
            <p className="text-base text-lapis/70">{data.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner-question">Specific question (optional)</Label>
            <Input id="owner-question" value={question} maxLength={500} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. Why do mobile visitors pick Amazon?" className="min-h-[44px] rounded-none bg-white/60" />
          </div>
          <div className="flex gap-3">
            <BookButton type="submit" disabled={loading}>{loading ? 'Analysing…' : 'Find patterns'}</BookButton>
            {loading && (
              <BookButton type="button" variant="outline" onClick={() => abortRef.current?.abort()}>Stop</BookButton>
            )}
          </div>
        </form>

        {error && <p role="alert" className="mt-6 border-l-4 border-carnelian pl-4">{error}</p>}
        {output && (
          <section className="mt-8 border-t-4 border-lapis pt-6">
            <h2 className="font-serif text-2xl mb-4">Findings</h2>
            <div className="whitespace-pre-wrap break-words leading-relaxed">{output}</div>
          </section>
        )}
        <TrackingComparison code={code} />
      </div>
    </div>
  );
};

export default OwnerInsights;
