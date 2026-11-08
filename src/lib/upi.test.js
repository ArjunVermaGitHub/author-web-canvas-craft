import { describe, expect, test } from 'bun:test';
import { buildUpiPayLink, sanitizeUpiNote } from './upi';
import { PAYEE_NAME, TOTAL_PRICE, UPI_ID } from '../config/book';

describe('UPI pay link', () => {
  test('builds the link with the configured payee, amount and currency', () => {
    const link = buildUpiPayLink(UPI_ID, PAYEE_NAME, TOTAL_PRICE, 'Asha');
    expect(link.startsWith('upi://pay?')).toBe(true);
    const params = new URLSearchParams(link.slice('upi://pay?'.length));
    expect(params.get('pa')).toBe('riturajverma2005@ybl');
    expect(params.get('pn')).toBe('Rituraj Narayan Verma');
    expect(params.get('am')).toBe('335');
    expect(params.get('cu')).toBe('INR');
    expect(params.get('tn')).toBe('Signed copy - Asha');
  });
  test('encodes spaces in the payee name and note', () => {
    const link = buildUpiPayLink(UPI_ID, PAYEE_NAME, TOTAL_PRICE, 'Asha');
    expect(link).toContain('pn=Rituraj+Narayan+Verma');
    expect(link).toContain('tn=Signed+copy+-+Asha');
    expect(link).not.toContain(' ');
  });
  test('removes special characters from the note and caps it near 40 characters', () => {
    expect(sanitizeUpiNote('An@ya! Sharma')).toBe('Signed copy - Anya Sharma');
    const long = sanitizeUpiNote('Alexandermaximillianconstantine');
    expect(long.length).toBeLessThanOrEqual(40);
    expect(long.startsWith('Signed copy - ')).toBe(true);
  });
  test('falls back to a plain note when the name has no usable characters', () => {
    expect(sanitizeUpiNote('@@@')).toBe('Signed copy');
    expect(sanitizeUpiNote('')).toBe('Signed copy');
  });
});
