import { expect, test } from 'bun:test';
import { hashRedirect } from './hashRedirect';
for (const [hash, target] of Object.entries({'#book2-progress':'/books#book2-progress','#community':'/author#community','#buy':'/shop#buy','#story':'/books','#press':'/media','#author':'/author','#wiki':'/wiki','#news':'/world#news','#quiz':'/world#quiz','#video':'/world#video'})) {
  test(`${hash} retains its approved destination`, () => expect(hashRedirect(hash)).toBe(target));
}
for (const hash of ['#top', '#sample', '#order', '', '#unknown']) test(`${hash} stays on its page`, () => expect(hashRedirect(hash)).toBeNull());
