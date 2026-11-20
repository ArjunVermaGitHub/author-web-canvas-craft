import { expect, test } from 'bun:test';
import { START_HERE_STEPS } from './StartHere';
import { NAV_PAGES } from '../config/site';

test('Start Here directs readers through the existing sample, characters, wiki and shop pages', () => {
  expect(START_HERE_STEPS.map(step => step.href)).toEqual(['/shop#sample', '/characters', '/wiki', '/shop']);
});

test('Start Here follows Home and has its own search title', () => {
  expect(NAV_PAGES[1].path).toBe('/start-here');
  expect(NAV_PAGES[1].seoTitle).toBe('Start Here – What Is the Raghav Kartikeya Series? | Rituraj Verma');
});