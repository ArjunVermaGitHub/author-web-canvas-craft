import { describe, expect, test } from 'bun:test';
import { buildUpiPayLink, sanitizeUpiNote } from './upi';
import { PAYEE_NAME, TOTAL_PRICE, UPI_ID } from '../config/book';

describe('UPI pay link', () => {
  test('builds the link with the configured payee, amount and currency', () => {
    const link = buildUpiPayLink(UPI_ID, PAYEE_NAME, TOTAL_PRICE, 'RK-ABC123');
    expect(link.startsWith('upi://pay?')).toBe(true);
    const params = new URLSearchParams(link.slice('upi://pay?'.length));
    expect(params.get('pa')).toBe('riturajverma2005@ybl');
    expect(params.get('pn')).toBe('Rituraj Narayan Verma');
    expect(params.get('am')).toBe('335');
    expect(params.get('cu')).toBe('INR');
  });
  test('puts the Order ID in the transaction note so payments can be matched', () => {
    const link = buildUpiPayLink(UPI_ID, PAYEE_NAME, TOTAL_PRICE, 'RK-ABC123');
    const params = new URLSearchParams(link.slice('upi://pay?'.length));
    expect(params.get('tn')).toBe('RK-ABC123');
  });
  test('URL-encodes the payee name and note', () => {
    const link = buildUpiPayLink(UPI_ID, PAYEE_NAME, TOTAL_PRICE, 'RK-ABC123');
    expect(link).toContain('pn=Rituraj+Narayan+Verma');
    expect(link).not.toContain(' ');
  });
  test('removes special characters from the note and caps it near 40 characters', () => {
    expect(sanitizeUpiNote('RK-AB@C1!23')).toBe('RK-ABC123');
    const long = sanitizeUpiNote('RK-ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    expect(long.length).toBeLessThanOrEqual(40);
  });
  test('falls back to a plain note when the Order ID has no usable characters', () => {
    expect(sanitizeUpiNote('@@@')).toBe('Signed copy');
    expect(sanitizeUpiNote('')).toBe('Signed copy');
  });
});
