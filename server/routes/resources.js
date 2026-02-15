const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// GET all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
