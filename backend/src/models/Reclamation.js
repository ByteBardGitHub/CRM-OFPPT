const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sujet: { type: String, required: true },
  description: { type: String, required: true },
  statut: { type: String, enum: ['en attente', 'traité', 'rejeté'], default: 'en attente' },
  date_creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reclamation', reclamationSchema);
