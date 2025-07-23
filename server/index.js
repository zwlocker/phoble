import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import songRouter from "./routes/song.route.js";
import express from "express";
import { addSong } from "./services/songAdd.js";
import cors from "cors";
import passport from "./services/passport.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";

dotenv.config();

async function main() {
  connectDB();

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: 'lax',
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  authRoutes(app);

  // await addSong();
  app.use("/api/songs", songRouter);
  app.listen(5100);
}

main();
