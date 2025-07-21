import mongoose from "mongoose";

const comment = new mongoose.Schema({
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
});

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

export default mongoose.model("Song", songSchema);
