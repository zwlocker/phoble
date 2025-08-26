import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import songRouter from "./routes/songRoutes.js";
import express from "express";
import cors from "cors";
import passport from "./services/passport.js";
import authRoutes from "./routes/authRoutes.js";
import session from "cookie-session";

dotenv.config();

// Main server initialization function
// Sets up Express server with middleware, authentication, and routes
async function main() {
  connectDB();
  const app = express();
  app.use(
    cors({
      origin: "https://www.phoble.net",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.options("*", cors());

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

  function printRoutes(app) {
    console.log("\n--- Registered Routes ---");
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        console.log(
          `${Object.keys(middleware.route.methods)} ${middleware.route.path}`
        );
      } else if (middleware.name === "router") {
        middleware.handle.stack.forEach((handler) => {
          const route = handler.route;
          if (route) {
            console.log(`${Object.keys(route.methods)} ${route.path}`);
          }
        });
      }
    });
    console.log("--- End Routes ---\n");
  }

  printRoutes(app);
  app.listen(process.env.PORT);
}

main();
