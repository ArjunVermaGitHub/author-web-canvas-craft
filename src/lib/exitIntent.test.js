import { describe, expect, test } from 'bun:test';
import { allowsExitPopup, shouldShowExitPopup, EXIT_POPUP_DELAY_MS } from './exitIntent';

const ready = { finePointer: true, clientY: 0, relatedTarget: null, elapsed: 15000, shown: false, blocked: false };
describe('Instagram exit intent', () => {
  test('waits fifteen seconds before a desktop top-edge exit', () => {
    expect(EXIT_POPUP_DELAY_MS).toBe(15000);
    expect(shouldShowExitPopup(ready)).toBe(true);
    expect(shouldShowExitPopup({ ...ready, elapsed: 14999 })).toBe(false);
  });
  test('does not trigger on touch devices or other exit edges', () => {
    expect(shouldShowExitPopup({ ...ready, finePointer: false })).toBe(false);
    expect(shouldShowExitPopup({ ...ready, clientY: 300 })).toBe(false);
    expect(shouldShowExitPopup({ ...ready, relatedTarget: {} })).toBe(false);
  });
  test('shows once per visit and never over another dialog', () => {
    expect(shouldShowExitPopup({ ...ready, shown: true })).toBe(false);
    expect(shouldShowExitPopup({ ...ready, blocked: true })).toBe(false);
  });
  test('leaves checkout, private tools and unknown pages uninterrupted', () => {
    for (const path of ['/shop', '/signed-copy', '/owner/insights', '/privacy', '/index']) expect(allowsExitPopup(path)).toBe(false);
    for (const path of ['/', '/books', '/other-books', '/lph/alternate-endings/the-soul-mate-theorist']) expect(allowsExitPopup(path)).toBe(true);
  });
});