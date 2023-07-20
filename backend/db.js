require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.DB_URL;

async function connect() {
  try {
    await mongoose.connect(url, {
      dbName: 'Test',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connect };