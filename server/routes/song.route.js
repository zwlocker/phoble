import express from "express";
import {
  getLatestSong,
  updateComments,
} from "../controllers/song.controller.js";

const router = express.Router(); //create router object using Router constructor from express

router.get("/latest", getLatestSong);
router.patch("/:id", updateComments);

export default router;
