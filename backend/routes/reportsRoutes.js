const express = require('express');
const Sales = require('../models/sales');
const router = express.Router();

// Generate sales report based on date range
router.get('/sales-report', async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const report = await Sales.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $group: { _id: '$productName', totalSales: { $sum: '$price' }, totalQuantity: { $sum: '$quantity' } } }
    ]);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
});

module.exports = router;
