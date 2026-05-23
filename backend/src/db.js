const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);
const DB_NAME = 'caterersDB';
const COLLECTION_NAME = 'caterers';

let client = null;

async function connectDB() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB at', MONGO_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

function getDB() {
  if (!client) {
    throw new Error('MongoDB client not initialized. Call connectDB() first.');
  }
  return client.db(DB_NAME);
}

function getCollection() {
  return getDB().collection(COLLECTION_NAME);
}

module.exports = { connectDB, getDB, getCollection, ObjectId };
