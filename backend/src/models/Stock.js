const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  produit: { type: String, required: true },
  quantite: { type: Number, required: true },
  zone: { type: String, enum: ['Épicerie', 'Fruits et Légumes', 'Conserves', 'Produits et Matériaux'], required: true },
  date_entree: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', stockSchema);
