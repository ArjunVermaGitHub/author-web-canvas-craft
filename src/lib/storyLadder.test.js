import { describe, expect, test } from 'bun:test';
import { createOnceTracker, selectLadderHook, stepFromHash, LADDER_BUTTON_EVENTS } from './storyLadder';
import { trackPurchaseClick } from './purchase';

describe('story ladder', () => {
  test('fires each event once per page load even when revisiting screens', () => {
    const sent = [];
    const fire = createOnceTracker(e => sent.push(e));
    ['LadderStart', 'LadderRung1', 'LadderStart', 'LadderRung1', 'LadderOfferShown', 'LadderOfferShown'].forEach(fire);
    expect(sent).toEqual(['LadderStart', 'LadderRung1', 'LadderOfferShown']);
  });
  test('maps screen buttons 0-3 to start and rungs', () => {
    expect(LADDER_BUTTON_EVENTS).toEqual(['LadderStart', 'LadderRung1', 'LadderRung2', 'LadderRung3']);
  });
  test('unknown utm_content falls back to the default hook', () => {
    expect(selectLadderHook('nope').headline).toBe('A sick nine-year-old can read a script no one alive can read.');
    expect(selectLadderHook(null)).toEqual(selectLadderHook('default'));
  });
  test('reads screens from #s1-#s5 only', () => {
    expect(stepFromHash('#s3')).toBe(3);
    expect(stepFromHash('#s6')).toBe(0);
    expect(stepFromHash('')).toBe(0);
  });
});

describe('ladder pixel events', () => {
  test('pass placement and utm_content through', () => {
    const calls = [];
    for (const e of ['LadderStart', 'LadderRung1', 'LadderRung2', 'LadderRung3', 'LadderOfferShown']) {
      trackPurchaseClick(e, 'story', undefined, (...a) => calls.push(a), { utm_content: 'v1' });
    }
    expect(calls[0]).toEqual(['trackCustom', 'LadderStart', { placement: 'story', utm_content: 'v1' }]);
    expect(calls.map(c => c[1])).toEqual(['LadderStart', 'LadderRung1', 'LadderRung2', 'LadderRung3', 'LadderOfferShown']);
  });
  test('omits utm_content when absent and keeps old calls unchanged', () => {
    const calls = [];
    trackPurchaseClick('LadderStart', 'story', undefined, (...a) => calls.push(a), {});
    trackPurchaseClick('OrderClick', 'landing_hero', undefined, (...a) => calls.push(a));
    expect(calls).toEqual([['trackCustom', 'LadderStart', { placement: 'story' }], ['trackCustom', 'OrderClick', { placement: 'landing_hero' }]]);
  });
});
