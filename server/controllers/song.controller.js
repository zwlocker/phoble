import Song from "../models/song.js";

export const getLatestSong = async (req, res) => {
  try {
    const latestSong = await Song.findOne().sort({ createdAt: -1 });
    res.send(latestSong);
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const comment = {
      message: req.body.message,
      likes: 0,
    };

    const latestSong = await Song.findOne().sort({ createdAt: -1 });
    latestSong.comments.push(comment);
    await latestSong.save();

    res.status(201).json(latestSong.comments.at(-1));
  } catch (error) {
    console.log(error);
  }
};
