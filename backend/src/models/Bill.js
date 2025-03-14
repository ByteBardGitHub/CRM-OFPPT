const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur', required: true },
  date_facture: { type: Date, required: true },
  montant: { type: Number, required: true },
  statut_paiement: { type: String, enum: ['payé', 'en attente', 'en retard'], default: 'en attente' },
  reference: { type: String, required: true }
});

module.exports = mongoose.model('Bill', billSchema);
