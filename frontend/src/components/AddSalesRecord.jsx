// src/components/AddSalesRecord.js
import React, { useState } from 'react';
import axios from 'axios';

const AddSalesRecord = () => {
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSale = { customerName, productName, quantity, price };
      await axios.post('http://localhost:5000/api/sales/add', newSale);
      setCustomerName('');
      setProductName('');
      setQuantity('');
      setPrice('');
      alert('Sale record added successfully!');
    } catch (error) {
      console.error('Error adding sale record:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Sales Record</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Sale</button>
      </form>
    </div>
  );
};

export default AddSalesRecord;
