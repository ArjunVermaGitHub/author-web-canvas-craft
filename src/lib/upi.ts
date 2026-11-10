// Builds a upi:// deep link for the signed-copy payment step.
// Kept pure so the exact parameters and encoding stay testable.

const NOTE_MAX_LENGTH = 40;

// The transaction note carries the Order ID so payments can be matched in the owner order log.
export function sanitizeUpiNote(orderId: string): string {
  const cleaned = orderId.replace(/[^a-zA-Z0-9 -]/g, '').trim();
  return (cleaned || 'Signed copy').slice(0, NOTE_MAX_LENGTH).trim();
}

export function buildUpiPayLink(upiId: string, payeeName: string, amount: number, orderId: string): string {
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName,
    am: String(amount),
    cu: 'INR',
    tn: sanitizeUpiNote(orderId),
  });
  return `upi://pay?${params.toString()}`;
}
