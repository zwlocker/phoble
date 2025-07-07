import express from "express";
import {
  getLatestSong,
  addComment,
  deleteComment,
} from "../controllers/song.controller.js";

const router = express.Router(); //create router object using Router constructor from express

router.get("/latest", getLatestSong);
router.post("/latest/comments", addComment);
router.delete("/latest/comments/:id", deleteComment);

export default router;
