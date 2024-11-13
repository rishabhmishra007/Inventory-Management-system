// src/components/ManageEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: '', department: '', email: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee._id);
    setFormData({ name: employee.name, department: employee.department, email: employee.email });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${editingEmployee}`, formData);
      setEditingEmployee(null);
      setFormData({ name: '', department: '', email: '' });
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h3>Manage Employees</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, department, or email"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEmployee && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h4>Edit Employee</h4>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Employee</button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingEmployee(null);
              setFormData({ name: '', department: '', email: '' });
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageEmployee;
