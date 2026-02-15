const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// GET all approved stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.findAll({ where: { isApproved: true } });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new story
router.post('/', async (req, res) => {
  try {
    const { title, content, authorAlias } = req.body;
    const story = await Story.create({
      title,
      content,
      authorAlias,
    });
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
