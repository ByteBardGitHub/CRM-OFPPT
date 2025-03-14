const express = require('express');
const Payment = require('../models/Payment');

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new payment
router.post('/', async (req, res) => {
  const { student_id, montant, date_paiement, statut } = req.body;
  try {
    const newPayment = new Payment({ student_id, montant, date_paiement, statut });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a payment
router.put('/:id', async (req, res) => {
  const { student_id, montant, date_paiement, statut } = req.body;
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    payment.student_id = student_id;
    payment.montant = montant;
    payment.date_paiement = date_paiement;
    payment.statut = statut;
    await payment.save();
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
