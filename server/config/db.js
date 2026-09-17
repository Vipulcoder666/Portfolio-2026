const mongoose = require('mongoose');

let isConnectedToMongo = false;
let inMemorySubmissions = [];

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vipul_portfolio';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnectedToMongo = true;
    console.log(`[MongoDB] Connected successfully to ${MONGO_URI}`);
  } catch (err) {
    isConnectedToMongo = false;
    console.warn(`[MongoDB Notice] Local/Remote MongoDB instance not running (${err.message}).`);
    console.log(`[Database Fallback] Operating in resilient Memory Store mode. Contact inquiries & stats will be saved seamlessly.`);
  }
};

const isMongoActive = () => isConnectedToMongo;

const saveInMemoryContact = (data) => {
  const submission = { id: Date.now().toString(), timestamp: new Date(), ...data };
  inMemorySubmissions.push(submission);
  return submission;
};

const getInMemoryContacts = () => inMemorySubmissions;

module.exports = {
  connectDB,
  isMongoActive,
  saveInMemoryContact,
  getInMemoryContacts
};
