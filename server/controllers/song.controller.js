import Song from "../models/song.js";

export const getLatestSong = async (req, res) => {
  try {
    const latestSong = await Song.findOne().sort({ createdAt: -1 });
    res.send(latestSong);
  } catch (error) {}
};
