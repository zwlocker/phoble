import mongoose, { mongo } from "mongoose";

const reply = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const comment = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  replies: {
    type: [reply],
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

const Song = mongoose.model("Song", songSchema);
export default Song;
