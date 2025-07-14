import Song from "../models/song.js";

export const addComment = async (req, res) => {
  try {
    const comment = {
      message: req.body.message,
      likes: 0,
    };

    const id = req.params.id;
    console.log(id);
    let song;
    if (id === "latest") {
      song = await Song.findOne().sort({ createdAt: -1 });
    } else {
      song = await Song.findOne({ trackId: id });
    }

    song.comments.push(comment);
    await song.save();

    res.status(201).json(song.comments.at(-1));
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id || "latest";
    let song;

    if (id === "latest") {
      song = await Song.findOne().sort({ createdAt: -1 });
    } else {
      song = await Song.findOne({ trackId: id });
    }
    await Song.findByIdAndUpdate(
      song._id,
      { $pull: { comments: { _id: req.params.commentId } } }, //
      { new: true }
    );
    res.status(201).json(song.comments.at(-1));
  } catch (error) {
    console.log(error);
  }
};

export const getSongs = async (req, res) => {
  try {
    const allSongs = await Song.find();
    console.log(allSongs);
    res.send(allSongs);
  } catch (error) {
    console.log(error);
  }
};

export const getSong = async (req, res) => {
  try {
    const id = req.params.id || "latest";
    let song;

    if (id === "latest") {
      song = await Song.findOne().sort({ createdAt: -1 });
    } else {
      song = await Song.findOne({ trackId: id });
    }
    res.status(200).json(song);
  } catch (error) {
    console.log(error);
  }
};

export const toggleLike = async (req, res) => {
  try {
    const id = req.params.id;
    const commentId = req.params.commentId;
    const increment = req.params.increment;
    let song;

    if (id === "latest") {
      song = await Song.findOne().sort({ createdAt: -1 });
    } else {
      song = await Song.findOne({ trackId: id });
    }

    await Song.findOneAndUpdate(
      { _id: song._id, "comments._id": commentId },
      { $inc: { "comments.$.likes": increment } },
      { new: true }
    );

    res.status(200).json(song);
  } catch (error) {
    console.log(error);
  }
};
