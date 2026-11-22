import { describe, expect, test } from 'bun:test';
import { recentScrollUp, shouldShowTouchExit, TOUCH_EXIT_DELAY_MS, TOUCH_EXIT_SCROLL_UP_PX, TOUCH_EXIT_WINDOW_MS } from './exitIntent';

const ready = { elapsed: 12000, scrollUp: 250, shown: false, blocked: false, openedByButton: false, nearOrder: false };
describe('touch exit intent', () => {
  test('uses 12 seconds, 250px and 500ms thresholds', () => {
    expect([TOUCH_EXIT_DELAY_MS, TOUCH_EXIT_SCROLL_UP_PX, TOUCH_EXIT_WINDOW_MS]).toEqual([12000, 250, 500]);
  });
  test('fires on a fast upward scroll after 12 seconds', () => {
    expect(shouldShowTouchExit(ready)).toBe(true);
    expect(shouldShowTouchExit({ ...ready, elapsed: 11999 })).toBe(false);
    expect(shouldShowTouchExit({ ...ready, scrollUp: 249 })).toBe(false);
  });
  test('never fires twice, over a dialog, after the button, or near checkout', () => {
    for (const key of ['shown', 'blocked', 'openedByButton', 'nearOrder']) expect(shouldShowTouchExit({ ...ready, [key]: true })).toBe(false);
  });
  test('measures upward distance only within the window', () => {
    expect(recentScrollUp([{ t: 0, y: 1000 }, { t: 400, y: 700 }], 400)).toBe(300);
    expect(recentScrollUp([{ t: 0, y: 1000 }, { t: 600, y: 700 }], 600)).toBe(0);
    expect(recentScrollUp([{ t: 0, y: 100 }, { t: 300, y: 800 }], 300)).toBe(0);
    expect(recentScrollUp([], 0)).toBe(0);
  });
});
