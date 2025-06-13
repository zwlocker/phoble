import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import songRouter from "./routes/song.route.js";
import express from "express";

dotenv.config();

async function main() {
  connectDB();
  const app = express();
  app.use("/api/songs", songRouter);
  app.listen(5100);
}

main();
