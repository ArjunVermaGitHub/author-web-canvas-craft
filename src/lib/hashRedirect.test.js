import { expect, test } from 'bun:test';
import { hashRedirect } from './hashRedirect';
for (const [hash, target] of Object.entries({'#buy':'/shop#buy','#story':'/books','#press':'/media','#author':'/author','#wiki':'/wiki','#news':'/world#news','#quiz':'/world#quiz','#video':'/world#video','#sample':'/shop#sample'})) {
  test(`${hash} retains its approved destination`, () => expect(hashRedirect(hash)).toBe(target));
}
for (const hash of ['#community', '#top', '', '#unknown']) test(`${hash} stays on its page`, () => expect(hashRedirect(hash)).toBeNull());
