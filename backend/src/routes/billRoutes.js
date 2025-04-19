const express = require('express');
const Bill = require('../models/Bill');

const router = express.Router();

// Get all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new bill
router.post('/', async (req, res) => {
  const { supplier_id, date_facture, montant, statut_paiement, reference } = req.body;
  try {
    const newBill = new Bill({ supplier_id, date_facture, montant, statut_paiement, reference });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a bill
router.put('/:id', async (req, res) => {
  const { supplier_id, date_facture, montant, statut_paiement, reference } = req.body;
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    bill.supplier_id = supplier_id;
    bill.date_facture = date_facture;
    bill.montant = montant;
    bill.statut_paiement = statut_paiement;
    bill.reference = reference;
    await bill.save();
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a bill
router.delete('/:id', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
