import mongoose from "mongoose";

/**
 * connectDB
 * Connects to MongoDB Atlas. Called once at server startup.
 * Exits the process on failure so the server doesn't silently
 * run without a database connection.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
