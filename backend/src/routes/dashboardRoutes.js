const express = require('express');
const Stock = require('../models/Stock');
const Payment = require('../models/Payment');

const router = express.Router();

// Get dashboard KPIs
router.get('/kpis', async (req, res) => {
  try {
    const totalProducts = await Stock.countDocuments();
    const totalPayments = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$montant" } } }
    ]);

    res.json({
      totalProducts,
      totalPayments: totalPayments[0] ? totalPayments[0].total : 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by month
router.get('/products-by-month', async (req, res) => {
  try {
    const productsByMonth = await Stock.aggregate([
      {
        $group: {
          _id: { $month: "$date_entree" },
          totalQuantity: { $sum: "$quantite" }
        }
      }
    ]);

    res.json(productsByMonth);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
