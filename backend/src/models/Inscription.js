const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  birthDate: { type: String, required: true },
  criteriaPoints: { type: Map, of: Number },  // Store criteria as an object with points
  distance: { type: Number, required: true }, // Distance in km
  points: { type: Number, default: 0 }, // Total points
  status: { type: String, default: 'Pending' }, // Status field with default 'Pending'
  dateApplied: { type: Date, default: Date.now }
});

// No method for calculating points since calculation is handled in the routes

module.exports = mongoose.model('Inscription', inscriptionSchema);
