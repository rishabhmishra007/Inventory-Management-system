const express = require('express');
const Sales = require('../models/sales');
const router = express.Router();

// Add a new sales record
router.post('/add', async (req, res) => {
  try {
    const newSale = new Sales(req.body);
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: 'Error adding sale', error });
  }
});

// Get all sales data
router.get('/', async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all sales records
router.get('/', async (req, res) => {
  try {
    const sales = await Sales.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error });
  }
});

// Update a sales record
router.put('/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    Object.assign(sale, req.body);
    await sale.save();
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sale', error });
  }
});

// Delete a sales record
router.delete('/:id', async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json({ message: 'Sale deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sale', error });
  }
});

module.exports = router;
