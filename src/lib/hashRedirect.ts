const REDIRECTS: Record<string, string> = {
  '#buy': '/shop#buy', '#book2-progress': '/books#book2-progress', '#community': '/author#community', '#story': '/books', '#press': '/media', '#author': '/author',
  '#wiki': '/wiki', '#news': '/world#news', '#quiz': '/world#quiz', '#video': '/world#video',
};
export function hashRedirect(hash: string): string | null { return REDIRECTS[hash] ?? null; }
