import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import songRouter from "./routes/songRoutes.js";
import express from "express";
import cors from "cors";
import passport from "./services/passport.js";
import authRoutes from "./routes/authRoutes.js";
import session from "cookie-session";

dotenv.config();
console.log("✅ Environment variables loaded");
console.log("📍 NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("🔌 PORT:", process.env.PORT || "not set");
console.log("🍃 MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Missing");
console.log("🔑 COOKIE_KEY:", process.env.COOKIE_KEY ? "✅ Set" : "❌ Missing");
console.log(
  "🔐 GOOGLE_CLIENT_ID:",
  process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"
);
console.log(
  "🔐 GOOGLE_CLIENT_SECRET:",
  process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing"
);

// Main server initialization function
// Sets up Express server with middleware, authentication, and routes
async function main() {
  console.log("🔄 Attempting database connection...");

  await connectDB();
  console.log("✅ Database connected successfully");

  const app = express();

  console.log("🌐 Setting up CORS...");

  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  console.log("✅ CORS configured");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Session configuration to handle authentication persistance
  app.use(
    session({
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: true, // Set to true in production with HTTPS
        sameSite: "lax",
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Authentication routes
  authRoutes(app);

  // API routes for song operations
  app.use("/api/songs", songRouter);

  const PORT = process.env.PORT || 3000;
  console.log("🚀 About to start server on port:", PORT);

  app.listen(PORT, "0.0.0.0", () => {
    console.log("🎉 SERVER SUCCESSFULLY STARTED!");
    console.log("📡 Server is listening on port:", PORT);
    console.log("🌍 Server is accessible from all interfaces (0.0.0.0)");
    console.log("=" * 50);
  });
}

main();
