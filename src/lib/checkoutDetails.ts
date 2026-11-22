import { z } from 'zod';

export type PostalLocation = { district: string; state: string };
export const CHECKOUT_FIELDS = ['phone', 'name', 'email', 'pincode', 'address', 'message'] as const;
export type CheckoutField = typeof CHECKOUT_FIELDS[number];

export function normalizeMobile(value: string): string {
  if (!/^[+\d\s()-]*$/.test(value)) return value.trim();
  return value.replace(/\D/g, '').slice(-10);
}

export function mergePostalAddress(address: string, location: PostalLocation | null): string {
  const trimmed = address.trim();
  if (!location || trimmed.toLowerCase().includes(location.district.toLowerCase())) return trimmed;
  return `${trimmed}, ${location.district}, ${location.state}`;
}

// Treat the public directory's response as untrusted; no HTML or arbitrary field values reach the address.
const placeName = z.string().trim().min(1).max(100).regex(/^[\p{L}\p{M}\s.'()-]+$/u);
const postalResponse = z.array(z.object({
  Status: z.literal('Success'),
  PostOffice: z.array(z.object({ District: placeName, State: placeName })).min(1),
})).min(1);

export function parsePostalLocation(value: unknown): PostalLocation | null {
  const parsed = postalResponse.safeParse(value);
  if (!parsed.success) return null;
  const office = parsed.data[0]?.PostOffice[0];
  return office ? { district: office.District, state: office.State } : null;
}