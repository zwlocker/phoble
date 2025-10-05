import mongoose from "mongoose";

// Represents individual user comments on songs
export const comment = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    displayName: {
      type: String,
      required: true,
    },
    // Optional star rating (0.0-5.0 scale used)
    stars: {
      type: Number,
      required: false,
    },
    // Separated song data for faster queries
    songName: {
      type: String,
      required: true,
    },
    songCover: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Song schema for music catalog
const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    // Unique identifier from Spotify
    trackId: {
      type: String,
      required: true,
    },
    comments: {
      type: [comment],
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

songSchema.index({ trackId: 1 });

export default mongoose.model("Song", songSchema);
