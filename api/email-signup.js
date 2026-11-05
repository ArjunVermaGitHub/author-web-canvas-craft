
// api/email-signup.js
import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';
import nodemailer from 'nodemailer';

const FROM = 'Rituraj Verma <support@riturajverma.com>';
const SAMPLE_URL = 'https://riturajverma.com/Raghav-Kartikeya-Sample-Chapters.pdf';
const SIGNED_URL = 'https://riturajverma.com';
const AMAZON_URL = 'https://www.amazon.in/dp/9358984015';

async function sendWelcomeEmail(to) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error('Welcome email not sent: SMTP environment variables are missing');
    return false;
  }
  try {
    const port = Number(SMTP_PORT);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: FROM,
      replyTo: 'support@riturajverma.com',
      to,
      subject: 'Your free sample: the first two chapters',
      text: [
        'Thank you for signing up to read Raghav Kartikeya and the Tablets of Dharma.',
        "I'm so glad you're here, and I hope you enjoy meeting Raghav.",
        '',
        `Read the first two chapters: ${SAMPLE_URL}`,
        '',
        `Order a signed copy: ${SIGNED_URL}`,
        `Order from Amazon India: ${AMAZON_URL}`,
        '',
        "I'll let you know when Book 2 is ready.",
        'You can reply to this email to unsubscribe.',
        '',
        'Rituraj Verma',
      ].join('\n'),
    });
    return true;
  } catch (err) {
    console.error('Welcome email failed:', err);
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = await buffer(req);
    const { email, name } = JSON.parse(rawBody.toString());

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Name is optional: the sample form only collects an email.

    const MONGODB_URI = process.env.MONGODB_URI;
    const db = await connectToDatabase(MONGODB_URI);
    const collection = db.collection('rituraj-subscribers');

    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return res.status(200).json({ message: 'Email already registered', status: 'exists' });
    }

    await collection.insertOne({
      email,
      name: typeof name === 'string' && name.trim() ? name.trim() : null,
      source: 'chapter-one',
      subscribedAt: new Date(),
    });

    const emailSent = await sendWelcomeEmail(email);
    return res.status(201).json({ message: 'Subscribed successfully', emailSent });
  } catch (error) {
    console.error('Error processing email signup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
