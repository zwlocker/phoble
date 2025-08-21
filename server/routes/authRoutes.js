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
    (req, res, next) => {
      const returnTo = req.query.state || req.session.returnTo;
      req.returnTo = returnTo;
      next();
    },
    passport.authenticate("google"),
    (req, res) => {
      const returnTo = req.returnTo
        ? "http://localhost:5173" + decodeURIComponent(req.returnTo)
        : "http://localhost:5173";

      delete req.session.returnTo;

      req.user.username
        ? res.redirect(returnTo)
        : res.redirect("http://localhost:5173/initUser");
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
