import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import songRouter from "./routes/songRoutes.js";
import express from "express";
import cors from "cors";
import passport from "./services/passport.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { addSong } from "./services/songAdd.js";
import cron from "node-cron";

dotenv.config();

// Main server initialization function
// Sets up Express server with middleware, authentication, and routes
async function main() {
  await connectDB();
  console.log("Database connected successfully");

  const app = express();

  app.set("trust proxy", 1); // Trust first proxy

  app.use(
    cors({
      origin: ["https://www.phoble.net", "https://phoble.net"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      sameSite: "none",
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session configuration to handle authentication persistance
  app.use(
    session({
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
      name: "phoble-session",
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production", // Only secure in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // More permissive for mobile
        httpOnly: true, // Prevent XSS attacks
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600,
        ttl: 30 * 24 * 60 * 60,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Authentication routes
  authRoutes(app);

  // API routes for song operations
  app.use("/api/songs", songRouter);

  process.env.TZ = "UTC";

  cron.schedule("0 0 * * *", async () => {
    try {
      await addSong();
    } catch (error) {
      console.error("Error during song refresh:", error);
    }
  });
  await addSong();

  const PORT = process.env.PORT || 3000;
  console.log("🚀 About to start server on port:", PORT);

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is listening on port:", PORT);
  });
}

main();
