import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AddSupplier = () => {
  // State to manage form data
  const [supplier, setSupplier] = useState({
    supplierName: '',
    phone: '',
    email: '',
    address: '',
    supplyProducts: '',
    paymentTerms: '',
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending data to the backend
      await axios.post('http://localhost:5000/api/suppliers', supplier);
      alert('Supplier added successfully');
      setSupplier({
        supplierName: '',
        phone: '',
        email: '',
        address: '',
        supplyProducts: '',
        paymentTerms: '',
      });
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            value={supplier.supplierName}
            onChange={(e) => setSupplier({ ...supplier, supplierName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={supplier.phone}
            onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={supplier.email}
            onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={supplier.address}
            onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Supply Products</label>
          <input
            type="text"
            className="form-control"
            value={supplier.supplyProducts}
            onChange={(e) => setSupplier({ ...supplier, supplyProducts: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Terms</label>
          <input
            type="text"
            className="form-control"
            value={supplier.paymentTerms}
            onChange={(e) => setSupplier({ ...supplier, paymentTerms: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplier;
