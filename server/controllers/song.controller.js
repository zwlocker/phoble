import Song from "../models/song.js";
import User from "../models/user.js";
import { addSong } from "../services/songAdd.js";
import mongoose from "mongoose";
import hasProfanity from "../services/profanityFilter.js";

/**
 * Song Controllers
 * Handles all operations for songs including comments, likes, and initializing users
 */

// Adds a new comment to a song
export const addComment = async (req, res) => {
  try {
    const author = await User.findById(req.body.userId);
    const commentId = new mongoose.Types.ObjectId();

    const id = req.params.id;

    let song;
    if (id === "latest") {
      song = await Song.findOne().sort({ createdAt: -1 });
    } else {
      song = await Song.findOne({ trackId: id });
    }

    const comment = {
      _id: commentId,
      message: req.body.message,
      createdBy: req.body.userId,
      likedBy: [],
      displayName: author.username,
      stars: req.body.rating,
      songName: song.name,
      songCover: song.cover,
    };

    author.pastComments.push(comment);
    await author.save();

    song.comments.push(comment);
    await song.save();

    res.status(201).json(song.comments.at(-1));
  } catch (error) {
    console.log(error);
  }
};

// Deletes a comment made by the user who created it
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

    // Removes from song collection
    await Song.findByIdAndUpdate(
      song._id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    // Removes from user collection
    await User.findByIdAndUpdate(
      commentToDelete.createdBy,
      { $pull: { pastComments: { _id: commentId } } },
      { new: true }
    );

    res.status(200).json(song.comments.at(-1));
  } catch (error) {
    console.log(error);
  }
};

// Returns every song that has been stored in the database
export const getSongs = async (req, res) => {
  try {
    const allSongs = await Song.find();
    res.send(allSongs);
  } catch (error) {
    console.log(error);
  }
};

// Returns the latest song or the song that matches the id passed in
export const getSong = async (req, res) => {
  try {
    console.log("made it to get song controller");
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

// Likes or unlikes a comment on a song
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
      // Adds user like from comment in song collection
      await Song.findOneAndUpdate(
        { _id: song._id, "comments._id": commentId },
        { $addToSet: { "comments.$.likedBy": userId } }, //
        { new: true }
      );
      // Adds user like from comment in user collection
      await User.findOneAndUpdate(
        { "pastComments._id": commentId },
        { $addToSet: { "pastComments.$.likedBy": userId } }
      );
    } else {
      // Removes user like from comment in song collection
      await Song.findOneAndUpdate(
        { _id: song._id, "comments._id": commentId },
        { $pull: { "comments.$.likedBy": userId } }, //
        { new: true }
      );
      // Removes user like from comment in user collection
      await User.findOneAndUpdate(
        { "pastComments._id": commentId },
        { $pull: { "pastComments.$.likedBy": userId } }
      );
    }

    res.status(200).json(song);
  } catch (error) {
    console.log(error);
  }
};

// Adds the newest song once daily
export const refreshSong = async (req, res) => {
  await addSong();
};

// Initializes the display name of each user
export const initUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const username = req.body.username;

    if (!username) {
      return res.status(400).json({ error: "Username cannot be empty" });
    }

    if (username.includes(" ")) {
      return res.status(400).json({ error: "Username cannot have spaces" });
    }

    if (!isValidUsername(username)) {
      return res.status(400).json({
        error:
          "Username can only contain lowercase letters, numbers, underscores, dots, and hyphens",
      });
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

const isValidUsername = (str) => {
  return /^[a-z0-9_.-]*$/.test(str);
};
