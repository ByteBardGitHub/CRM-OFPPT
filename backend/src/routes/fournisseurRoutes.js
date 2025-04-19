const express = require('express');
const Fournisseur = require('../models/Fournisseur');

const router = express.Router();

// Get all fournisseurs
router.get('/', async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.json(fournisseurs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new fournisseur
router.post('/', async (req, res) => {
  const { nom, contact, adresse, email } = req.body;
  try {
    const newFournisseur = new Fournisseur({ nom, contact, adresse, email });
    await newFournisseur.save();
    res.status(201).json(newFournisseur);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a fournisseur
router.put('/:id', async (req, res) => {
  const { nom, contact, adresse, email } = req.body;
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) {
      return res.status(404).json({ message: 'Fournisseur not found' });
    }
    fournisseur.nom = nom;
    fournisseur.contact = contact;
    fournisseur.adresse = adresse;
    fournisseur.email = email;
    await fournisseur.save();
    res.json(fournisseur);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a fournisseur
router.delete('/:id', async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
    if (!fournisseur) {
      return res.status(404).json({ message: 'Fournisseur not found' });
    }
    res.json({ message: 'Fournisseur deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
