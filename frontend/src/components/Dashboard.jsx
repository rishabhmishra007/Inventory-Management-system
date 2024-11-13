import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Assuming you'll put custom styles here
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Get total orders
      const ordersResponse = await axios.get('http://localhost:5000/api/orders');
      setTotalOrders(ordersResponse.data.length);

      // Get total suppliers
      const suppliersResponse = await axios.get('http://localhost:5000/api/suppliers');
      setTotalSuppliers(suppliersResponse.data.length);

      // Get total inventory items
      const inventoryResponse = await axios.get('http://localhost:5000/api/inventory');
      setTotalInventory(inventoryResponse.data.length);

      // Get total employees and employee data
      const employeesResponse = await axios.get('http://localhost:5000/api/employees');
      setTotalEmployees(employeesResponse.data.length);
      setEmployees(employeesResponse.data);

      // Dummy sales data
      const dummySalesData = [
        { month: 'January', sales: 500 },
        { month: 'February', sales: 700 },
        { month: 'March', sales: 800 },
        { month: 'April', sales: 600 },
        { month: 'May', sales: 900 },
        { month: 'June', sales: 750 },
        { month: 'July', sales: 650 },
        { month: 'August', sales: 850 },
        { month: 'September', sales: 700 },
        { month: 'October', sales: 950 },
        { month: 'November', sales: 900 },
        { month: 'December', sales: 1100 },
      ];
      setSalesData(dummySalesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message || error);
    }
  };

  const salesChartData = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: salesData.map((data) => data.sales),
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0 vh-100 bg-dark" style={{ position: 'fixed', left: 0, top: 0 }}>
            <Sidebar />
          </div>

          <div className="col-md-10 offset-md-2" style={{ marginTop: '60px' }}>
            <div className="mt-4 px-3">
              <h1>Admin Dashboard</h1>

              <div className="row mt-5">
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Orders</Card.Title>
                      <Card.Text>{totalOrders}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Suppliers</Card.Title>
                      <Card.Text>{totalSuppliers}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Inventory</Card.Title>
                      <Card.Text>{totalInventory}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Employees</Card.Title>
                      <Card.Text>{totalEmployees}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <h3>Employees</h3>
                  <Table className="custom-table" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee._id}>
                          <td>{employee.name}</td>
                          <td>{employee.department}</td>
                          <td>{employee.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <h3>Sales</h3>
                  <div className="chart-container">
                    <Bar data={salesChartData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
