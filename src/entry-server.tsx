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
    // Minimal writable sink so the browser typecheck needs no Node type definitions.
    const decoder = new TextDecoder();
    const sink = {
      write(chunk: Uint8Array | string) { html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true }); return true; },
      end() { resolve({ html, helmet: helmetContext.helmet ?? {} }); },
      on() { return sink; }, once() { return sink; }, emit() { return true; }, removeListener() { return sink; },
    };
    const stream = renderToPipeableStream(<AppShell router={Router} helmetContext={helmetContext} />, {
      onAllReady() { stream.pipe(sink as unknown as Parameters<typeof stream.pipe>[0]); },
      onShellError: reject,
      onError: reject,
    });
  });
}
