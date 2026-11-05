import { buffer } from 'micro';
import { timingSafeEqual } from 'crypto';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const config = { api: { bodyParser: false } };

const MAX_DATA_CHARS = 200_000;
const RUN_ID_HEADER = 'X-Lovable-AIG-Run-ID';

function codeMatches(given, expected) {
  const a = Buffer.from(String(given || ''));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function createRunIdFetch() {
  let runId;
  return {
    getRunId: () => runId,
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(RUN_ID_HEADER)) headers.set(RUN_ID_HEADER, runId);
      const response = await fetch(input, { ...init, headers });
      runId ??= response.headers.get(RUN_ID_HEADER)?.trim() || undefined;
      return response;
    },
  };
}

const INSTRUCTIONS = `You analyse marketing event data for an author's website that sells one novel two ways:
1) signed copies ordered on the site (order form -> PhonePe QR payment -> "I've paid" button), and
2) clicks out to Amazon ("Order from Amazon India").
The owner will paste Google Tag Manager / GA4 event exports (CSV, JSON or text).
Identify useful, evidence-based patterns in what leads to signed-copy orders versus Amazon clicks:
traffic sources, pages/sections, devices, time of day/week, funnel drop-off steps, and anything unusual.
Rules: only state what the data supports and quote the numbers; say clearly when data is too thin;
never invent events. Format in short Markdown sections: Summary, Signed-copy conversions,
Amazon conversions, Funnel drop-off, Recommended actions (max 5, concrete), Data gaps.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ownerCode = process.env.OWNER_ACCESS_CODE;
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!ownerCode || !apiKey) {
    return res.status(500).json({ error: 'Server not configured: set OWNER_ACCESS_CODE and LOVABLE_API_KEY in Vercel.' });
  }

  let body;
  try {
    body = JSON.parse((await buffer(req, { limit: '1mb' })).toString());
  } catch {
    return res.status(400).json({ error: 'Invalid request' });
  }
  if (!codeMatches(body.code, ownerCode)) {
    return res.status(401).json({ error: 'Wrong access code' });
  }
  const data = typeof body.data === 'string' ? body.data.trim() : '';
  const question = typeof body.question === 'string' ? body.question.trim().slice(0, 500) : '';
  if (data.length < 20) return res.status(400).json({ error: 'Please provide some event data' });
  if (data.length > MAX_DATA_CHARS) {
    return res.status(400).json({ error: `Data is too large (max ${MAX_DATA_CHARS.toLocaleString()} characters). Export a shorter date range.` });
  }

  const controller = new AbortController();
  req.on('close', () => { if (!res.writableEnded) controller.abort(); });

  const runIdFetch = createRunIdFetch();
  const openai = createOpenAI({
    baseURL: 'https://ai.gateway.lovable.dev/v1',
    apiKey,
    headers: { 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    fetch: runIdFetch.fetch,
  });

  let streamError;
  const result = streamText({
    model: openai.responses('openai/gpt-6-astra'),
    system: INSTRUCTIONS,
    prompt: `${question ? `Owner's question: ${question}\n\n` : ''}Event data:\n${data}`,
    abortSignal: controller.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: 'medium',
        reasoningSummary: 'auto',
        store: false,
        include: ['reasoning.encrypted_content'],
      },
    },
    onError: ({ error }) => { streamError = error; },
  });

  let started = false;
  try {
    for await (const chunk of result.textStream) {
      if (!started) {
        started = true;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        const runId = runIdFetch.getRunId();
        if (runId) res.setHeader(RUN_ID_HEADER, runId);
      }
      res.write(chunk);
    }
  } catch (e) {
    streamError ??= e;
  }

  if (streamError && !controller.signal.aborted) {
    console.error('Insights AI error:', streamError);
    const status = streamError?.statusCode || 500;
    let message = 'The analysis failed. Please try again later.';
    if (status === 402) message = 'Out of AI credits. Add credits in Lovable Settings → Plans & credits.';
    else if (status === 429) message = 'Too many requests right now. Wait a minute and try again.';
    else if (status === 401) message = 'The LOVABLE_API_KEY in Vercel is missing or invalid.';
    else if (status === 403) message = 'AI access is blocked for this workspace. A workspace admin needs to check AI settings.';
    if (!started) return res.status(status).json({ error: message });
    res.write(`\n\n[Error: ${message}]`);
  } else if (!started && !controller.signal.aborted) {
    return res.status(502).json({ error: 'The AI returned no answer. Try a different data export.' });
  }
  res.end();
}
