import { expect, test } from 'bun:test';
import { BOOKS } from './books';
test('only the supplied first book is listed', () => { expect(BOOKS).toHaveLength(1); expect(BOOKS[0].title).toBe('Raghav Kartikeya and the Tablets of Dharma'); });
for (const [key,value] of [['Genre','Mythological fantasy, teens and young adults'],['Series','Book 1'],['Publisher','Qurate Books, August 2026'],['ISBN','9789358987447']]) test(`preserve supplied ${key}`, () => expect(BOOKS[0].facts.find(f=>f[0]===key)?.[1]).toBe(value));
