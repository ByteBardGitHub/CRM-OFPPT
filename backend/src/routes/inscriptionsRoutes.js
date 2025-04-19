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

router.post('/', async (req, res) => {
  const { name, phone, email, address, birthDate, criteriaPoints, distance, points } = req.body;

  try {
    const newInscription = new Inscription({
      name,
      phone,
      email,
      address,
      birthDate,
      criteriaPoints,
      distance,
      points,
    });

    await newInscription.save();

    res.status(201).json({
      message: 'Inscription created successfully',
      inscription: newInscription,
    });
  } catch (error) {
    console.error('Error creating inscription:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Edit an inscription by ID
router.put('/:id', async (req, res) => {
  try {
    // Find the inscription by ID
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) {
      return res.status(404).json({ message: 'Inscription not found' });
    }

    // Extract fields from the request body
    const { name, phone, email, address, birthDate, criteriaPoints, distance, status } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !address || !birthDate || !distance) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure distance is a number
    const parsedDistance = parseFloat(distance);
    if (isNaN(parsedDistance)) {
      return res.status(400).json({ message: 'Invalid distance value' });
    }

    // Ensure criteriaPoints is a valid object
    if (typeof criteriaPoints !== 'object') {
      return res.status(400).json({ message: 'Invalid criteriaPoints format' });
    }

    // Update the inscription fields
    inscription.name = name || inscription.name;
    inscription.phone = phone || inscription.phone;
    inscription.email = email || inscription.email;
    inscription.address = address || inscription.address;
    inscription.birthDate = birthDate || inscription.birthDate;
    inscription.criteriaPoints = criteriaPoints || inscription.criteriaPoints;
    inscription.distance = parsedDistance;  // Set the parsed distance
    inscription.status = status || inscription.status;

    // Recalculate the total points
    let totalPoints = 0;
    if (inscription.criteriaPoints) {
      for (const criterion in inscription.criteriaPoints) {
        totalPoints += inscription.criteriaPoints[criterion];
      }
    }
    inscription.points = totalPoints;

    // Save the updated inscription
    await inscription.save();

    // Respond with the updated inscription
    res.json(inscription);
  } catch (err) {
    // Log the error for debugging
    console.error(err);

    // Check if it's a validation or database-related error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: err.errors });
    }

    // Catch unexpected server errors
    res.status(500).json({ message: 'Server error', error: err.message });
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
