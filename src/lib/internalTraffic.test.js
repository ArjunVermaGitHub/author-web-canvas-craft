import { expect, test } from 'bun:test';
import { buildInternalCookie, internalCookieDomain, markInternalTraffic, shouldMarkInternal } from './internalTraffic';

test('cookie carries the requested flags and two-year max-age', () => {
  const cookie = buildInternalCookie('www.riturajverma.com');
  expect(cookie).toBe('rv_internal=1; path=/; max-age=63072000; SameSite=Lax; Secure; domain=.riturajverma.com');
});

test('domain attribute covers www and apex, and is omitted off-domain', () => {
  expect(internalCookieDomain('riturajverma.com')).toBe('.riturajverma.com');
  expect(internalCookieDomain('www.riturajverma.com')).toBe('.riturajverma.com');
  expect(internalCookieDomain('WWW.RITURAJVERMA.COM')).toBe('.riturajverma.com');
  expect(internalCookieDomain('notriturajverma.com')).toBeNull();
  expect(internalCookieDomain('localhost')).toBeNull();
  expect(buildInternalCookie('localhost')).toBe('rv_internal=1; path=/; max-age=63072000; SameSite=Lax; Secure');
});

test('owner routes and ?internal=1 trigger the marker, other pages do not', () => {
  expect(shouldMarkInternal('/owner/insights')).toBe(true);
  expect(shouldMarkInternal('/owner')).toBe(true);
  expect(shouldMarkInternal('/', '?internal=1')).toBe(true);
  expect(shouldMarkInternal('/shop', '?utm_campaign=x&internal=1')).toBe(true);
  expect(shouldMarkInternal('/')).toBe(false);
  expect(shouldMarkInternal('/ownership')).toBe(false);
  expect(shouldMarkInternal('/', '?internal=0')).toBe(false);
  expect(shouldMarkInternal('/', '?internal=true')).toBe(false);
});

test('marker writes the cookie and tags the live Clarity session', () => {
  const calls = [];
  const doc = { cookie: '' };
  const target = { location: { hostname: 'riturajverma.com', pathname: '/owner/insights' }, document: doc, clarity: (...args) => calls.push(args) };
  expect(markInternalTraffic(target)).toBe(true);
  expect(doc.cookie).toBe('rv_internal=1; path=/; max-age=63072000; SameSite=Lax; Secure; domain=.riturajverma.com');
  expect(calls).toEqual([['set', 'internal', '1']]);
});

test('absent or failing Clarity never breaks the page', () => {
  const doc = { cookie: '' };
  const target = { location: { hostname: 'localhost', pathname: '/' }, document: doc };
  expect(markInternalTraffic(target)).toBe(true);
  expect(doc.cookie).toBe('rv_internal=1; path=/; max-age=63072000; SameSite=Lax; Secure');
  expect(() => markInternalTraffic({ location: { hostname: 'localhost', pathname: '/' }, clarity: () => { throw Error('blocked'); } })).not.toThrow();
  expect(markInternalTraffic(undefined)).toBe(false);
});
