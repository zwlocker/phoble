import mongoose from "mongoose";
import { comment } from "./song.js";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    username: {
      type: String,
      required: false,
      unique: true,
      maxlength: 25,
    },

    email: {
      type: String,
      required: false,
    },

    pastComments: {
      type: [comment],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
