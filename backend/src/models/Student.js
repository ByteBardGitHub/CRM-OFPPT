const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_naissance: { type: Date, required: true },
  chambre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  statut: { type: String, enum: ['actif', 'inactif'], default: 'actif' },
  date_inscription: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
