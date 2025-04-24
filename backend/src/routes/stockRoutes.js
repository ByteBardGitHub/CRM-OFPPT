const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const ExcelJS = require('exceljs');

// Enhanced GET endpoint with zone filtering
router.get('/zone/:zone', async (req, res) => {
  try {
    const stocks = await Stock.find({ zone: req.params.zone });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ 
      message: `Error retrieving ${req.params.zone} stock`,
      error: err.message 
    });
  }
});

// Excel Export Endpoint
router.get('/export/zone/:zone', async (req, res) => {
  try {
    const stocks = await Stock.find({ zone: req.params.zone });
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(req.params.zone);

    // French headers
    worksheet.columns = [
      { header: 'Produit', key: 'produit', width: 30 },
      { header: 'Quantité', key: 'quantite', width: 15 },
      { header: 'Zone', key: 'zone', width: 20 },
      { header: 'Date Entrée', key: 'date_entree', width: 25 }
    ];

    stocks.forEach(stock => {
      worksheet.addRow({
        produit: stock.produit,
        quantite: stock.quantite,
        zone: stock.zone,
        date_entree: stock.date_entree.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      });
    });

    res.setHeader('Content-Type', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 
      `attachment; filename=stock-${req.params.zone}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    res.status(500).json({
      message: `Export failed for ${req.params.zone}`,
      error: err.message
    });
  }
});

// Enhanced POST with validation
router.post('/', async (req, res) => {
  const { produit, quantite, zone } = req.body;
  
  if (!['Épicerie', 'Fruits et Légumes', 'Conserves', 'Produits et Matériaux'].includes(zone)) {
    return res.status(400).json({ message: 'Zone invalide' });
  }

  try {
    const newStock = new Stock({
      produit,
      quantite: Math.max(1, quantite), // Ensure minimum quantity
      zone
    });
    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({
      message: 'Validation error',
      error: err.message
    });
  }
});

module.exports = router;