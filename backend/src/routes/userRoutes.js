const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Admin check middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé. Admin requis' });
  }
  next();
};

// Get all users (Admin only)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-mot_de_passe');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Create user (Admin only)
router.post('/', isAdmin, async (req, res) => {
  const { nom, prenom, email, mot_de_passe, role } = req.body;

  try {
    // Validation
    if (!nom || !prenom || !email || !mot_de_passe) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(mot_de_passe, 12);

    // Create user
    const newUser = new User({
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();
    
    // Return user without password
    const userResponse = newUser.toObject();
    delete userResponse.mot_de_passe;
    
    res.status(201).json(userResponse);

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: err.name === 'ValidationError' 
        ? 'Erreur de validation' 
        : 'Erreur serveur'
    });
  }
});

// Update user (Admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Update fields
    user.nom = req.body.nom || user.nom;
    user.prenom = req.body.prenom || user.prenom;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.date_modification = Date.now();

    // Save changes
    const updatedUser = await user.save();
    
    // Return user without password
    const userResponse = updatedUser.toObject();
    delete userResponse.mot_de_passe;
    
    res.json(userResponse);

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: err.name === 'ValidationError' 
        ? 'Erreur de validation' 
        : 'Erreur serveur'
    });
  }
});

// Delete user (Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;