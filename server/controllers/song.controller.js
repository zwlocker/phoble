import Song from "../models/song.js";

export const getLatestSong = async (req, res) => {
  try {
    const latestSong = await Song.findOne().sort({ createdAt: -1 });
    res.send(latestSong);
  } catch (error) {
    console.log(error);
  }
};

export const updateComments = async (req, res) => {
  try {
    console.log("Updating comments");
  } catch (error) {
    console.log(error);
  }
};
