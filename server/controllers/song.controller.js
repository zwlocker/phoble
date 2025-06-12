import Song from "../models/song.js";
import mongoose from "mongoose";

export const getLatestSong = async (req, res) => {
  try {
    const latestSong = await Song.findOne().sort({ createdAt: -1 });
    console.log(latestSong);
  } catch (error) {}
};
