import mongoose from "mongoose";

// Connects to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(`Error: MongoDB not connected - ${error.message}`);
    process.exit(1);
  }
};
