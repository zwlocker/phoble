import Song from "../models/song.js";

export const getLatestSong = async (req, res) => {
  try {
    console.log("you made it to the controller");
    const latestSong = await Song.findOne().sort({ createdAt: -1 });
    res.send(latestSong);
  } catch (error) {
    console.log(error);
  }
};
