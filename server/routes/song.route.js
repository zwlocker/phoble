import express from "express";
import { getLatestSong } from "../controllers/song.controller.js";

const router = express.Router(); //create router object using Router constructor from express

router.get("/latest", getLatestSong);

export default router;
