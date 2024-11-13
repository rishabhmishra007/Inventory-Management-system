// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');

// @route   GET /api/employees
// @desc    Get all employees
// @access  Public
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get employee count
router.get('/count', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// @route   POST /api/employees
// @desc    Add a new employee
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, department, email } = req.body;

    // Create a new employee
    const newEmployee = new Employee({
      name,
      department,
      email,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/employees/:id
// @desc    Update an employee
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, email } = req.body;

    // Find the employee by id and update it
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, department, email },
      { new: true } // Returns the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/employees/:id
// @desc    Delete an employee
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by id and delete it
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
