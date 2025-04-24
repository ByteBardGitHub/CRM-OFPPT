// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect directly to MongoDB
mongoose.connect('mongodb://localhost:27017/crmofppt')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Stock Model (models/Stock.js)
const stockSchema = new mongoose.Schema({
  produit: String,
  quantite: Number,
  zone: String,
  date_entree: { type: Date, default: Date.now }
});
const Stock = mongoose.model('Stock', stockSchema);

// CRUD Routes
app.post('/api/stocks', async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/stocks/zone/:zone', async (req, res) => {
  try {
    const stocks = await Stock.find({ zone: req.params.zone });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/stocks/:id', async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/stocks/:id', async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3002, () => console.log('Server running on http://localhost:3002'));