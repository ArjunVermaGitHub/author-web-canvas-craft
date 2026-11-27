import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import type { ReactNode } from 'react';
import { AppShell } from './App';

/** Build-time render of one route: resolves lazy pages, returns markup plus collected head tags. */
export function render(url: string): Promise<{ html: string; helmet: Record<string, { toString(): string }> }> {
  const helmetContext: { helmet?: Record<string, { toString(): string }> } = {};
  const Router = ({ children }: { children: ReactNode }) => <StaticRouter location={url}>{children}</StaticRouter>;
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new PassThrough();
    sink.on('data', chunk => { html += chunk; });
    sink.on('end', () => resolve({ html, helmet: helmetContext.helmet ?? {} }));
    const stream = renderToPipeableStream(<AppShell router={Router} helmetContext={helmetContext} />, {
      onAllReady() { stream.pipe(sink); },
      onShellError: reject,
      onError: reject,
    });
  });
}
