import Song from "../models/song.js";
import User from "../models/user.js";
import { addSong } from "../services/songAdd.js";
import mongoose from "mongoose";
import hasProfanity from "../services/profanityFilter.js";

export const addComment = async (req, res) => {
  try {
    const author = await User.findById(req.body.userId);
    const commentId = new mongoose.Types.ObjectId();

    const comment = {
      _id: commentId,
      message: req.body.message,
      createdBy: req.body.userId,
      likedBy: [],
      displayName: author.username,
    };
    const id = req.params.id;

    let song;
    if (id === "latest") {
      song = await Song.findOne().sort({ createdAt: -1 });
    } else {
      song = await Song.findOne({ trackId: id });
    }

    author.pastComments.push(comment);
    await author.save();

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
    const commentId = req.params.commentId;
    let song;

    if (id === "latest") {
      song = await Song.findOne().sort({ createdAt: -1 });
    } else {
      song = await Song.findOne({ trackId: id });
    }

    const commentToDelete = song.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    await Song.findByIdAndUpdate(
      song._id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      commentToDelete.createdBy,
      { $pull: { pastComments: { _id: commentId } } },
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
    const userId = req.body.userId;
    let song;

    const user = await User.findById(req.body.userId);

    if (id === "latest") {
      song = await Song.findOne().sort({ createdAt: -1 });
    } else {
      song = await Song.findOne({ trackId: id });
    }

    if (increment == 1) {
      await Song.findOneAndUpdate(
        { _id: song._id, "comments._id": commentId },
        { $addToSet: { "comments.$.likedBy": userId } }, //
        { new: true }
      );

      await user.save();
    } else {
      await Song.findOneAndUpdate(
        { _id: song._id, "comments._id": commentId },
        { $pull: { "comments.$.likedBy": userId } }, //
        { new: true }
      );
      await user.save();
    }

    res.status(200).json(song);
  } catch (error) {
    console.log(error);
  }
};

export const refreshSong = async (req, res) => {
  await addSong();
};

export const initUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const username = req.body.username;

    if (!username) {
      return res.status(400).json({ error: "Username cannot be empty" });
    }

    if (username.length > 25) {
      return res
        .status(400)
        .json({ error: "Username length cannot exceed 25 characters" });
    }

    if (hasProfanity(username)) {
      return res.status(400).json({ error: "Username is not allowed" });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ error: "Username is already taken" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { username: username },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
