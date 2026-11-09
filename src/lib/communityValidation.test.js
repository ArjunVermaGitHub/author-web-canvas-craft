import { expect, test } from 'bun:test';
import { communitySchema } from './communityValidation.js';

const valid = { name: 'Rituraj Verma', email: 'reader@example.com', phone: '9876543210', consent: true, honeypot: '' };
test('Indian mobile numbers start 6–9 and normalize to +91', () => {
  for (const first of ['6', '7', '8', '9']) expect(communitySchema.parse({ ...valid, phone: `${first}876543210` }).phone).toBe(`+91${first}876543210`);
  for (const phone of ['5876543210', '987654321', '98765432100']) expect(communitySchema.safeParse({ ...valid, phone }).success).toBe(false);
});
test('international numbers require + and 8–14 digits', () => {
  for (const phone of ['+12345678', '+12345678901234']) expect(communitySchema.parse({ ...valid, phone }).phone).toBe(phone);
  for (const phone of ['+1234567', '+123456789012345', '12345678', '+012345678', '+12(345)678']) expect(communitySchema.safeParse({ ...valid, phone }).success).toBe(false);
});
test('spaces and dashes are stripped before storing', () => {
  expect(communitySchema.parse({ ...valid, phone: '98765 432-10' }).phone).toBe('+919876543210');
  expect(communitySchema.parse({ ...valid, phone: '+44 7700-900123' }).phone).toBe('+447700900123');
});
test('email is lowercased and limited to 254 characters', () => {
  expect(communitySchema.parse({ ...valid, email: ' Reader@Example.COM ' }).email).toBe('reader@example.com');
  for (const email of ['bad', 'a@b', 'a b@example.com', 'a@example.com\nInjected']) expect(communitySchema.safeParse({ ...valid, email }).success).toBe(false);
  const exact = `${'a'.repeat(64)}@${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(61)}`;
  expect(exact.length).toBe(254);
  expect(communitySchema.safeParse({ ...valid, email: exact }).success).toBe(true);
  expect(communitySchema.safeParse({ ...valid, email: `${exact}d` }).success).toBe(false);
});
test('name follows order rules and consent must be true', () => {
  expect(communitySchema.safeParse({ ...valid, name: "Éva O'Neil" }).success).toBe(true);
  for (const name of ['A', 'Reader123', '<script>', 'a'.repeat(101)]) expect(communitySchema.safeParse({ ...valid, name }).success).toBe(false);
  for (const consent of [false, 'true', undefined]) expect(communitySchema.safeParse({ ...valid, consent }).success).toBe(false);
});