import { describe, expect, test } from 'bun:test';
import { shouldShowPurchaseButtons } from './headerPurchase';
import { OTHER_BOOK_SERIES } from '@/data/otherBooks';

describe('shouldShowPurchaseButtons', () => {
  test('hides Raghav purchase buttons on every pen-name page, with or without trailing slash', () => {
    for (const series of OTHER_BOOK_SERIES) {
      expect(shouldShowPurchaseButtons(series.path)).toBe(false);
      expect(shouldShowPurchaseButtons(`${series.path}/`)).toBe(false);
    }
    expect(shouldShowPurchaseButtons('/james-furrington')).toBe(false);
    expect(shouldShowPurchaseButtons('/james-furrington/')).toBe(false);
  });
  test('shows Raghav purchase buttons on Raghav pages', () => {
    expect(shouldShowPurchaseButtons('/')).toBe(true);
    expect(shouldShowPurchaseButtons('/privacy')).toBe(true);
    expect(shouldShowPurchaseButtons('/owner/insights')).toBe(true);
  });
});
