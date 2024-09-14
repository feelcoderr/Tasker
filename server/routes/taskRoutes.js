// routes/taskRoutes.js
const express = require("express");
const Task = require("../models/task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  const { task } = req.body;
  const newTask = new Task({ user: req.user._id, task });
  await newTask.save();
  res.json(newTask);
});

// Get User Tasks
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

module.exports = router;
