const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  montant: { type: Number, required: true },
  date_paiement: { type: Date, required: true },
  statut: { type: String, enum: ['payé', 'en attente', 'en retard'], default: 'en attente' }
});

module.exports = mongoose.model('Payment', paymentSchema);
