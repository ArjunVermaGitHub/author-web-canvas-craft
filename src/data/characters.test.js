import { expect, test } from 'bun:test';
import { CHARACTERS } from './characters';
test('no characters are invented before author supplies them', () => expect(CHARACTERS).toEqual([]));
