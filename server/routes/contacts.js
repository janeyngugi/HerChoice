const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new contact
router.post('/', async (req, res) => {
  try {
    const { name, role, phone } = req.body;
    const contact = await Contact.create({
      name,
      role,
      phone,
    });
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
