const express = require('express');
const Reclamation = require('../models/Reclamation');

const router = express.Router();

// Get all reclamations
router.get('/', async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.json(reclamations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new reclamation
router.post('/', async (req, res) => {
  const { user_id, sujet, description } = req.body;
  try {
    const newReclamation = new Reclamation({ user_id, sujet, description });
    await newReclamation.save();
    res.status(201).json(newReclamation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a reclamation
router.put('/:id', async (req, res) => {
  const { sujet, description, statut } = req.body;
  try {
    const reclamation = await Reclamation.findById(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    reclamation.sujet = sujet;
    reclamation.description = description;
    reclamation.statut = statut;
    await reclamation.save();
    res.json(reclamation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a reclamation
router.delete('/:id', async (req, res) => {
  try {
    const reclamation = await Reclamation.findByIdAndDelete(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.json({ message: 'Reclamation deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
