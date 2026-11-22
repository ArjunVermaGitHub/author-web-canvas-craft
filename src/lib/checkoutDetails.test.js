import { describe, expect, test } from 'bun:test';
import { mergePostalAddress, normalizeMobile, parsePostalLocation } from './checkoutDetails';

describe('checkout mobile normalization', () => {
  test('accepts +91 and spaces as the last ten digits', () => {
    expect(normalizeMobile('+91 98765 43210')).toBe('9876543210');
  });
  test('accepts a leading zero', () => {
    expect(normalizeMobile('09876543210')).toBe('9876543210');
  });
  test('preserves a ten-digit mobile and leaves short numbers invalid', () => {
    expect(normalizeMobile('9876543210')).toBe('9876543210');
    expect(normalizeMobile('98765')).toBe('98765');
  });
  test('does not silently accept letters mixed into a mobile number', () => {
    expect(normalizeMobile('abc9876543210')).toBe('abc9876543210');
  });
});

describe('checkout address merge', () => {
  const mumbai = { district: 'Mumbai', state: 'Maharashtra' };
  test('appends the detected district and state', () => {
    expect(mergePostalAddress('Flat 4B, Linking Road, Bandra West', mumbai)).toBe('Flat 4B, Linking Road, Bandra West, Mumbai, Maharashtra');
  });
  test('does not duplicate a district already present, case-insensitively', () => {
    expect(mergePostalAddress('  Flat 4B, MUMBAI  ', mumbai)).toBe('Flat 4B, MUMBAI');
  });
  test('keeps the manually entered address when lookup fails', () => {
    expect(mergePostalAddress(' Flat 4B, Mumbai, Maharashtra ', null)).toBe('Flat 4B, Mumbai, Maharashtra');
  });
  test('repeated merges do not append twice', () => {
    const once = mergePostalAddress('Flat 4B, Linking Road', mumbai);
    expect(mergePostalAddress(once, mumbai)).toBe(once);
  });
});

describe('untrusted postal directory results', () => {
  test('reads a successful Mumbai result', () => {
    expect(parsePostalLocation([{ Status: 'Success', PostOffice: [{ District: 'Mumbai', State: 'Maharashtra' }] }])).toEqual({ district: 'Mumbai', state: 'Maharashtra' });
  });
  test('ignores failures, empty offices and unsafe place names', () => {
    for (const data of [null, [{ Status: 'Error', PostOffice: null }], [{ Status: 'Success', PostOffice: [] }], [{ Status: 'Success', PostOffice: [{ District: '<script>', State: 'Maharashtra' }] }]]) {
      expect(parsePostalLocation(data)).toBeNull();
    }
  });
});