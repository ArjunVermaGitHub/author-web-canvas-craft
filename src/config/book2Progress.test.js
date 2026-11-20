import { expect, test } from 'bun:test';
import { BOOK2_PROGRESS, BOOK2_SIGNUP_PATH } from './book2Progress';

test('Book 2 uses the supplied initial percentages and update date', () => {
  expect(BOOK2_PROGRESS.stages.map(stage => stage.percent)).toEqual([60, 10, 0, 0]);
  expect(BOOK2_PROGRESS.lastUpdated).toBe('2026-11-20');
  for (const stage of BOOK2_PROGRESS.stages) {
    expect(stage.percent).toBeGreaterThanOrEqual(0);
    expect(stage.percent).toBeLessThanOrEqual(100);
  }
});
test('Book 2 signup reuses the shop sample signup destination', () => {
  expect(BOOK2_SIGNUP_PATH).toBe('/shop#sample');
});
