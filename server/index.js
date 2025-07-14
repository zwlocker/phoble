import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import songRouter from "./routes/song.route.js";
import express from "express";
import { addSong } from "./services/songAdd.js";
import cors from "cors";

dotenv.config();

async function main() {
  connectDB();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // await addSong();
  app.use("/api/songs", songRouter);
  app.listen(5100);
}

main();
