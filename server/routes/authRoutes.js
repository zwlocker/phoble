import passport from "passport";

// Authentication routes
const authRoutes = (app) => {
  // Initiate Google OAuth login
  app.get("/auth/google", (req, res) => {
    const state = req.query.returnTo;
    req.session.returnTo = state;
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: state,
    })(req, res);
  });

  // Google OAuth callback handler
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log("User after auth:", req.user);
      console.log("Session ID:", req.sessionID);
      console.log("Session data:", req.session);

      const returnTo = req.query.state || req.session.returnTo;
      const redirectUrl = returnTo
        ? "https://www.phoble.net" + decodeURIComponent(returnTo)
        : "https://www.phoble.net";

      delete req.session.returnTo;

      req.user.username
        ? res.redirect(redirectUrl)
        : res.redirect("https://www.phoble.net/initUser");
    }
  );

  // Destroys authentication state and clears user session
  app.get("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current authenticated user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

export default authRoutes;
