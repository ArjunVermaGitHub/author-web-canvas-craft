// Book purchase configuration — change these values in one place.
import sampleChapters from '@/assets/sample-chapters.pdf.asset.json';

export const SAMPLE_CHAPTERS_URL = `https://author-web-canvas-craft.lovable.app${sampleChapters.url}`;
export const BOOK_TITLE = "Raghav Kartikeya and the Tablets of Dharma";
export { TOTAL_PRICE } from './bookPrice.js'; // ₹ — shared server/client price
export const PAYEE_NAME = "Rituraj Narayan Verma";
export const UPI_ID = "riturajverma2005@ybl";

// India-only Flipkart listing; not part of the multi-country Amazon selector.
export const FLIPKART_URL = "https://www.flipkart.com/raghav-kartikeya-tablets-dharma/p/itmd457e27c6c425?pid=9789358984019&marketplace=FLIPKART";

// Author follow links (shown under the Buy on Amazon button).
export const INSTAGRAM_URL = "https://www.instagram.com/raghav.kartikeya.series/";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61574944773635";

export const COMMUNITY_WHATSAPP_NUMBER = "919324893014";
export const COMMUNITY_WHATSAPP_URL = `https://wa.me/${COMMUNITY_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Rituraj, I'm a reader of Raghav Kartikeya and the Tablets of Dharma.")}`;

// Set this to the author's YouTube watch or share URL to show the video section.
export const AUTHOR_VIDEO_URL = "";

// Canonical web addresses used by social sharing (Pinterest Save button).
// The apex domain redirects to www, so both values use www.
export const SITE_URL = "https://www.riturajverma.com/";
export const COVER_IMAGE_URL = "https://www.riturajverma.com/raghav-ebook-cover.jpg";
export const PINTEREST_DESCRIPTION =
  "Raghav Kartikeya and the Tablets of Dharma by Rituraj Verma — a nine-year-old from Mumbai can read the undeciphered Indus Valley script, and that is why an immortal warlord hunts him. Book 1 of a mythological fantasy series. Order a signed copy.";
