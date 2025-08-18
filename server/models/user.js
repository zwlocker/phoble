import mongoose from "mongoose";
import { comment } from "./song.js";

// User schema for Google OAuth Authenticated users
const userSchema = new mongoose.Schema(
  {
    // Google OAuth unique identifier
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Display name from Google profile
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Custom username chosen by user
    // Allows users to have a handle different from their Google name
    username: {
      type: String,
      required: false,
      unique: true,
      maxlength: 25,
    },

    // Email from Google OAuth
    email: {
      type: String,
      required: false,
    },

    // Stored for faster page rendering
    pastComments: {
      type: [comment],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
