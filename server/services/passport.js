import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

// Serialize user for session storage
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Where Google redirects after authentication
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },

    // OAuth callback handler
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        console.log(profile.emails);
        const newUser = new User({
          googleId: profile.id, // Google's unique user identifier
          name: profile.displayName, // User's displayname from Google
          email: profile.emails[0].value,
        });

        const savedUser = await newUser.save();
        done(null, savedUser);
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        done(error, null);
      }
    }
  )
);

export default passport;
