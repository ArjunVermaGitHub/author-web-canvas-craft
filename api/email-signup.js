
// Vercel serverless function for email signup
const { connectToDatabase } = require('./utils/mongodb');

module.exports = async (req, res) => {
  // Set CORS headers to allow requests from your frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST for this endpoint
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ error: 'Method not allowed' });
  // }

  try {
    const { email } = req.body;

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    const db = await connectToDatabase(MONGODB_URI);
    const collection = db.collection('rituraj-subscribers');

    // Check if email already exists
    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return res.status(200).json({ message: 'Email already registered', status: 'exists' });
    }

    // Insert new subscriber
    await collection.insertOne({
      email,
      subscribedAt: new Date(),
    });

    return res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error processing email signup:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
