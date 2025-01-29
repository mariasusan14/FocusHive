const express = require("express");
const passport = require("passport");

const router = express.Router();

// Google Authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/signin",
  })
);

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ error: "Error destroying session" });
      }
      res.clearCookie("connect.sid"); // Clear session cookie
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

// Get Authenticated User
router.get("/user", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
