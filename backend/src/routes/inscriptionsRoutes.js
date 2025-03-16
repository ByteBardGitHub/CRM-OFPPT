const express = require('express');
const Inscription = require('../models/Inscription');

const router = express.Router();

// Get all inscriptions (sorted by points)
router.get('/', async (req, res) => {
  try {
    const inscriptions = await Inscription.find().sort({ points: -1 });
    res.json(inscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific inscription by ID (View Inscription Card)
router.get('/:id', async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) {
      return res.status(404).json({ message: 'Inscription not found' });
    }
    res.json(inscription);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new inscription
router.post('/', async (req, res) => {
  const { name, phone, email, address, birthDate, criteriaPoints, distance, status } = req.body;

  try {
    const newInscription = new Inscription({
      name,
      phone,
      email,
      address,
      birthDate,
      criteriaPoints,
      distance,
      status: status || 'Pending', // Default status to 'Pending'
    });

    // Calculate total points based on criteriaPoints
    let totalPoints = 0;
    for (const criterion in criteriaPoints) {
      totalPoints += criteriaPoints[criterion];
    }
    newInscription.points = totalPoints;

    await newInscription.save();
    res.status(201).json(newInscription);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit an inscription by ID
router.put('/:id', async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) {
      return res.status(404).json({ message: 'Inscription not found' });
    }

    const { name, phone, email, address, birthDate, criteriaPoints, distance, status } = req.body;

    // Update the fields
    inscription.name = name || inscription.name;
    inscription.phone = phone || inscription.phone;
    inscription.email = email || inscription.email;
    inscription.address = address || inscription.address;
    inscription.birthDate = birthDate || inscription.birthDate;
    inscription.criteriaPoints = criteriaPoints || inscription.criteriaPoints;
    inscription.distance = distance || inscription.distance;
    inscription.status = status || inscription.status;

    // Recalculate the total points
    let totalPoints = 0;
    for (const criterion in inscription.criteriaPoints) {
      totalPoints += inscription.criteriaPoints[criterion];
    }
    inscription.points = totalPoints;

    await inscription.save();
    res.json(inscription);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an inscription by ID
router.delete('/:id', async (req, res) => {
  try {
    const inscription = await Inscription.findByIdAndDelete(req.params.id);
    if (!inscription) {
      return res.status(404).json({ message: 'Inscription not found' });
    }
    res.json({ message: 'Inscription deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
