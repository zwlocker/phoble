import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(`Error: MongoDB not connected - ${error.message}`);
    process.exit(1); // 1 code means exit with failure, 0 means success
  }
};
