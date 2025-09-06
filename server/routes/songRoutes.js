import express from "express";
import {
  addComment,
  deleteComment,
  getSongs,
  getSong,
  toggleLike,
  initUser,
} from "../controllers/song.controller.js";

// Song API Routes
// Handles song-related operations including comments and other user interactions
const router = express.Router();

router.get("/latest", getSong);
router.get("/:id", getSong);
router.post("/:id/comments", addComment);
router.delete("/:id/comments/:commentId", deleteComment);
router.get("/", getSongs);
router.post("/:id/comments/:commentId/:increment", toggleLike);
router.post("/initUser", initUser);

export default router;
