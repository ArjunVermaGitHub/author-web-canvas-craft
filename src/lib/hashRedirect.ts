const REDIRECTS: Record<string, string> = {
  '#buy': '/shop#buy', '#story': '/books', '#press': '/media', '#author': '/author',
  '#wiki': '/wiki', '#news': '/world#news', '#quiz': '/world#quiz', '#video': '/world#video', '#sample': '/shop#sample',
};
export function hashRedirect(hash: string): string | null { return REDIRECTS[hash] ?? null; }
