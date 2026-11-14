export function whatsappUrl(touch: boolean, number: string, message: string) {
  return touch
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
}