const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// POST a new report
router.post('/', async (req, res) => {
  try {
    const { type, description, latitude, longitude, isAnonymous } = req.body;
    const report = await Report.create({
      type,
      description,
      latitude,
      longitude,
      isAnonymous,
    });
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all reports (for dashboard/admin)
router.get('/', async (req, res) => {
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET stats for dashboard
router.get('/stats', async (req, res) => {
    try {
        const reports = await Report.findAll();
        const stats = {
            total: reports.length,
            byType: {},
        };
        reports.forEach(r => {
            stats.byType[r.type] = (stats.byType[r.type] || 0) + 1;
        });
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
