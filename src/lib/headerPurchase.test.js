import { describe, expect, test } from 'bun:test';
import { shouldShowPurchaseButtons } from './headerPurchase';
import { OTHER_BOOK_SERIES } from '@/data/otherBooks';

describe('shouldShowPurchaseButtons', () => {
  test('hides Raghav purchase buttons throughout the LPH book section', () => {
    for (const path of ['/lph', '/lph/alternate-endings', '/lph/alternate-endings/a-high-like-heaven', ...['1-2', '2-2', '3-2'].map(slug => `/lph/alternate-endings/a-high-like-heaven/${slug}`)]) {
      expect(shouldShowPurchaseButtons(path)).toBe(false);
      expect(shouldShowPurchaseButtons(`${path}/`)).toBe(false);
    }
    expect(shouldShowPurchaseButtons('/lph-other')).toBe(true);
  });
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
