import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import songRouter from "./routes/song.route.js";
import express from "express";
import { addSong } from "./services/songAdd.js";

dotenv.config();

async function main() {
  connectDB();
  const app = express();
  // addSong();
  app.use("/api/songs", songRouter);
  app.listen(5100);
}

main();
