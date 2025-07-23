import passport from "passport";

const authRoutes = (app) => {
  app.get(
    "/auth/google", (req, res) => {
    //console.log("referer", req.get('Referer')); //logging where the website was before hitting "login"
    console.log(req.sessionID);
    req.session.returnTo = req.query.returnTo;
    console.log("/auth/google", req.session.returnTo);
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res);
});

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log(req.sessionID);
      let returnTo;
      console.log(req.session.returnTo);
      ( req.session.returnTo ? returnTo = "http://localhost:5173" + req.session.returnTo : returnTo = "http://localhost:5173")
      console.log(returnTo);
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
