const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  supplierName: String,
  phone: String,
  email: String,
  address: String,
  supplyProducts: String,
  paymentTerms: String
});

module.exports = mongoose.model('Supplier', SupplierSchema);
