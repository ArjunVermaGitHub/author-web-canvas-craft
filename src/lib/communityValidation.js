import { z } from 'zod';

export const NAME_RE = /^[\p{L} .'-]{2,100}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_ERROR = 'Enter an Indian mobile starting 6–9 (10 digits), or + followed by 8–14 digits.';

export function normalizeCommunityPhone(value) {
  const phone = value.replace(/[\s-]/g, '');
  return /^[6-9]\d{9}$/.test(phone) ? `+91${phone}` : phone;
}

export const communitySchema = z.object({
  name: z.string().trim().regex(NAME_RE, 'Enter a valid name (2–100 characters, letters and name punctuation only).'),
  email: z.string().trim().toLowerCase().max(254, 'Email must be 254 characters or fewer.').email('Enter a valid email address.').regex(EMAIL_RE, 'Enter a valid email address.'),
  phone: z.string().max(40, PHONE_ERROR).transform(value => value.replace(/[\s-]/g, '')).refine(value => /^[6-9]\d{9}$/.test(value) || /^\+[1-9]\d{7,13}$/.test(value), PHONE_ERROR).transform(normalizeCommunityPhone),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please agree to receive updates before joining.' }) }),
  honeypot: z.string().max(200).default(''),
});