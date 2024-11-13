// src/components/ManageSales.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSales = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sales/');
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales records:', error);
    }
  };

  const deleteSale = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sales/${id}`);
      setSales(sales.filter((sale) => sale._id !== id));
      alert('Sale record deleted successfully!');
    } catch (error) {
      console.error('Error deleting sale record:', error);
    }
  };

  // Filter sales based on the search term
  const filteredSales = sales.filter(
    (sale) =>
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>Manage Sales Records</h3>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by customer or product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sales Records Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.customerName}</td>
              <td>{sale.productName}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteSale(sale._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSales;
