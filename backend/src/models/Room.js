const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  capacite: { type: Number, required: true },
  etat: { type: String, enum: ['libre', 'occupée'], default: 'libre' }
});

module.exports = mongoose.model('Room', roomSchema);
