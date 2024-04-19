const mongoose = require('mongoose');

exports.dbConnect = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
      console.log('MONGODB_URL not found in env file');
    }
    await mongoose.connect(MONGODB_URL);
    console.log('Database Connected');
  } catch (error) {
    console.log('Error while connecting to Database');
  }
};
