
// MongoDB connection utility
const { MongoClient } = require('mongodb');

// Cache the MongoDB connection to reuse it across function invocations
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri);
  await client.connect();
  
  const db = client.db('reading_club_db');
  cachedDb = db;
  
  return db;
}

module.exports = { connectToDatabase };
