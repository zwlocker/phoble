import passport from "passport";

// Authentication routes with comprehensive error handling and logging
const authRoutes = (app) => {
  // Initiate Google OAuth login
  app.get("/auth/google", (req, res, next) => {
    try {
      console.log("🔵 Starting OAuth - Query params:", req.query);
      const state = req.query.returnTo;

      if (state) {
        req.session.returnTo = state;
        console.log("📝 Stored returnTo in session:", state);
      }

      passport.authenticate("google", {
        scope: ["profile", "email"],
        state: state,
      })(req, res, next);
    } catch (error) {
      console.error("❌ Error in /auth/google:", error);
      res
        .status(500)
        .json({
          error: "Authentication initiation failed",
          details: error.message,
        });
    }
  });

  // Google OAuth callback handler with extensive debugging
  app.get(
    "/auth/google/callback",
    (req, res, next) => {
      console.log("🟡 Callback middleware - Query params:", req.query);
      console.log("🟡 Callback middleware - Session ID:", req.sessionID);
      console.log("🟡 Callback middleware - Session data:", req.session);
      next();
    },
    (req, res, next) => {
      console.log("🟠 Starting passport authentication...");
      passport.authenticate("google", (err, user, info) => {
        console.log("🟠 Passport authenticate callback:");
        console.log("   Error:", err);
        console.log(
          "   User:",
          user ? { id: user.id, email: user.email } : null
        );
        console.log("   Info:", info);

        if (err) {
          console.error("❌ Passport authentication error:", err);
          return res.redirect("https://www.phoble.net?error=auth_failed");
        }

        if (!user) {
          console.error("❌ No user returned from passport");
          return res.redirect("https://www.phoble.net?error=no_user");
        }

        req.logIn(user, (loginErr) => {
          if (loginErr) {
            console.error("❌ Login error:", loginErr);
            return res.redirect("https://www.phoble.net?error=login_failed");
          }
          console.log("✅ User logged in successfully");
          next();
        });
      })(req, res, next);
    },
    (req, res) => {
      try {
        console.log("🟢 Final callback handler");
        console.log(
          "   User after auth:",
          req.user
            ? {
                id: req.user.id,
                email: req.user.email,
                username: req.user.username,
                name: req.user.name,
              }
            : null
        );
        console.log("   Session ID:", req.sessionID);
        console.log("   Session keys:", Object.keys(req.session || {}));

        // Validate user exists
        if (!req.user) {
          console.error("❌ No user found in final handler");
          return res.redirect("https://www.phoble.net?error=no_user_final");
        }

        // Get returnTo with extensive logging
        const queryState = req.query.state;
        const sessionReturnTo = req.session.returnTo;

        console.log("📍 ReturnTo values:");
        console.log("   Query state:", queryState);
        console.log("   Session returnTo:", sessionReturnTo);

        let returnTo = queryState || sessionReturnTo;
        console.log("   Final returnTo:", returnTo);

        // Build redirect URL with error handling
        let redirectUrl = "https://www.phoble.net";

        if (returnTo && typeof returnTo === "string") {
          try {
            const decodedReturnTo = decodeURIComponent(returnTo);
            console.log("   Decoded returnTo:", decodedReturnTo);

            // Validate the returnTo path
            if (
              decodedReturnTo.startsWith("/") &&
              !decodedReturnTo.includes("..")
            ) {
              redirectUrl = "https://www.phoble.net" + decodedReturnTo;
            } else {
              console.warn("⚠️ Invalid returnTo path, using default");
            }
          } catch (decodeError) {
            console.error("❌ Error decoding returnTo:", decodeError);
            // Use default URL
          }
        }

        console.log("🎯 Final redirect URL:", redirectUrl);

        // Clean up session
        delete req.session.returnTo;

        // Check user state and redirect
        const hasUsername =
          req.user.username && req.user.username.trim() !== "";
        console.log(
          "👤 User has username:",
          hasUsername,
          "Value:",
          req.user.username
        );

        if (hasUsername) {
          console.log("✅ Redirecting to:", redirectUrl);
          res.redirect(redirectUrl);
        } else {
          console.log("✅ Redirecting to initUser");
          res.redirect("https://www.phoble.net/initUser");
        }
      } catch (error) {
        console.error("❌ Error in final callback handler:", error);
        console.error("Error stack:", error.stack);
        res.redirect("https://www.phoble.net?error=callback_error");
      }
    }
  );

  // Enhanced logout with error handling
  app.get("/api/logout", (req, res) => {
    try {
      console.log("🔴 Logout request for session:", req.sessionID);

      req.logout((err) => {
        if (err) {
          console.error("❌ Logout error:", err);
          return res
            .status(500)
            .json({ error: "Logout failed", details: err.message });
        }

        console.log("✅ User logged out successfully");
        res.json({ message: "Logged out successfully" });
      });
    } catch (error) {
      console.error("❌ Error in logout route:", error);
      res.status(500).json({ error: "Logout failed", details: error.message });
    }
  });

  // Enhanced current user with debugging
  app.get("/api/current_user", (req, res) => {
    try {
      console.log("📋 Current user request:");
      console.log("   Session ID:", req.sessionID);
      console.log(
        "   User:",
        req.user
          ? {
              id: req.user.id,
              email: req.user.email,
              username: req.user.username,
            }
          : null
      );

      res.json(req.user || null);
    } catch (error) {
      console.error("❌ Error in current_user route:", error);
      res
        .status(500)
        .json({ error: "Failed to get current user", details: error.message });
    }
  });
};

export default authRoutes;
