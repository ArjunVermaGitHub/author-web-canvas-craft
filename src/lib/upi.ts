// Builds a upi:// deep link for the signed-copy payment step.
// Kept pure so the exact parameters and encoding stay testable.

const NOTE_MAX_LENGTH = 40;

export function sanitizeUpiNote(firstName: string): string {
  const cleaned = firstName.replace(/[^a-zA-Z0-9 -]/g, '').trim();
  const note = cleaned ? `Signed copy - ${cleaned}` : 'Signed copy';
  return note.slice(0, NOTE_MAX_LENGTH).trim();
}

export function buildUpiPayLink(upiId: string, payeeName: string, amount: number, firstName: string): string {
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName,
    am: String(amount),
    cu: 'INR',
    tn: sanitizeUpiNote(firstName),
  });
  return `upi://pay?${params.toString()}`;
}
