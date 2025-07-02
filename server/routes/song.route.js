import express from "express";
import { getLatestSong, addComment } from "../controllers/song.controller.js";

const router = express.Router(); //create router object using Router constructor from express

router.get("/latest", getLatestSong);
router.post("/latest/comments", addComment);

export default router;
