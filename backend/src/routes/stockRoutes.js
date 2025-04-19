const express = require('express');
const Stock = require('../models/Stock');

const router = express.Router();

// Get all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new stock
router.post('/', async (req, res) => {
  const { produit, quantite, zone } = req.body;
  try {
    const newStock = new Stock({ produit, quantite, zone });
    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a stock
router.put('/:id', async (req, res) => {
  const { produit, quantite, zone } = req.body;
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    stock.produit = produit;
    stock.quantite = quantite;
    stock.zone = zone;
    await stock.save();
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a stock
router.delete('/:id', async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json({ message: 'Stock deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
