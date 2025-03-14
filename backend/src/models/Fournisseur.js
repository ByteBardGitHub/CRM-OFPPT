const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  contact: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true },
  date_creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fournisseur', fournisseurSchema);
