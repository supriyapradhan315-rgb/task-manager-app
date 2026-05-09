const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

module.exports = router;