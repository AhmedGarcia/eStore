// Import mongoose to handle database operations
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    // Exit process with failure if connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
