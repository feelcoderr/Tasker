// routes/userRoutes.js
const express = require("express");
const User = require("../models/user");
const { generateToken, verifyToken } = require("../utils/jwt");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  const token = generateToken(user);
  res.json({ user, token });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user);
  res.json({ user, token });
});

// Protect routes using authMiddleware
router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
