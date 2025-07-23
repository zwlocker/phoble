import passport from "passport";

const authRoutes = (app) => {
  app.get("/auth/google", (req, res) => {
    const state = req.query.state;
    req.session.returnTo = state;
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: state,
    })(req, res);
  });

  app.get(
    "/auth/google/callback",
    (req, res, next) => {
      // Check both query.state and session
      const returnTo = req.query.state || req.session.returnTo;
      req.returnTo = returnTo; // Store for use after authentication
      next();
    },
    passport.authenticate("google"),
    (req, res) => {
      const returnTo = req.returnTo
        ? "http://localhost:5173" + decodeURIComponent(req.returnTo)
        : "http://localhost:5173";

      delete req.session.returnTo;
      res.redirect(returnTo);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

export default authRoutes;
