const express = require('express');
const ActivityLog = require('../models/ActivityLog');

const router = express.Router();

// Get all logs
router.get('/', async (req, res) => {
  try {
    const logs = await ActivityLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new log
router.post('/', async (req, res) => {
  const { user_id, action, details } = req.body;
  try {
    const newLog = new ActivityLog({ user_id, action, details });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a log
router.delete('/:id', async (req, res) => {
  try {
    const log = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
