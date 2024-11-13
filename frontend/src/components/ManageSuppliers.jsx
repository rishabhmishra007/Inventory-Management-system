// components/ManageSuppliers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/suppliers', {
          params: { search, filter }
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error.response ? error.response.data : error.message);
      }
    };

    fetchSuppliers();
  }, [search, filter]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      setSuppliers(suppliers.filter(supplier => supplier._id !== id));
    } catch (error) {
      console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Suppliers</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <Link to="/dashboard/suppliers/add" className="btn btn-primary mb-3">Add New Supplier</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Supply Products</th>
            <th>Payment Terms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? suppliers.map(supplier => (
            <tr key={supplier._id}>
              <td>{supplier.supplierName}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
              <td>{supplier.address}</td>
              <td>{supplier.supplyProducts}</td>
              <td>{supplier.paymentTerms}</td>
              <td>
                <Link to={`/dashboard/suppliers/edit/${supplier._id}`} className="btn btn-warning me-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(supplier._id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" className="text-center">No suppliers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSuppliers;
