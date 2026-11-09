// Shared order-status rules for the owner order log (server and owner page).
import { timingSafeEqual } from 'crypto';

export const ORDER_STATUSES = ['pending_verification', 'paid', 'cancelled'];
const ORDER_ID_RE = /^RK-[0-9A-F]{6}$/;

export const isOrderId = (v) => typeof v === 'string' && ORDER_ID_RE.test(v);
export const isOrderStatus = (v) => ORDER_STATUSES.includes(v);

export function codeMatches(given, expected) {
  if (!expected) return false;
  const a = Buffer.from(String(given || ''));
  const b = Buffer.from(String(expected));
  return a.length === b.length && timingSafeEqual(a, b);
}

// Mongo filters per count. Orders saved before statuses existed count as pending.
export const STATUS_FILTERS = {
  placed: { status: { $ne: 'cancelled' } },
  paid: { status: 'paid' },
  pending: { status: { $nin: ['paid', 'cancelled'] } },
};
