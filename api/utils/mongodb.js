
// MongoDB connection utility
import { MongoClient } from 'mongodb';

// Cache the MongoDB connection to reuse it across function invocations
let cachedDb = null;

export async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri);
  await client.connect();
  
  const db = client.db('test');
  cachedDb = db;
  
  return db;
}