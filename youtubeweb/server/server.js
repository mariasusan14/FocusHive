// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(
//   session({
//     secret: "your_secret_key",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport Google OAuth strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Default Route
// app.get("/", (req, res) => {
//   res.send("Server is running. Use /auth/google to authenticate.");
// });

// // Authentication Routes
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:3000/dashboard",
//     failureRedirect: "http://localhost:3000/signin",
//   })
// );

// // Backend logout route
// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       console.error("Logout error:", err);
//       return res.status(500).json({ error: "Logout failed" });
//     }
//     req.session.destroy((err) => {
//       if (err) {
//         console.error("Session destroy error:", err);
//         return res.status(500).json({ error: "Error destroying session" });
//       }
//       res.clearCookie("connect.sid"); // Clear session cookie
//       res.status(200).json({ message: "Logged out successfully" });
//     });
//   });
// });

// app.get("/auth/user", (req, res) => {
//   res.json(req.user || null);
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
require("./services/passportConfig"); // Import Passport Config

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Server is running. Use /auth/google to authenticate.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
