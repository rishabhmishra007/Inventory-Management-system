import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Sidebar = () => {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSuppliersOpen, setIsSuppliersOpen] = useState(false); 
  const [isInventoryOpen, setIsInventoryOpen] = useState(false); 
  const [isSalesOpen, setIsSalesOpen]  = useState(false); 
  const [isEmployeesOpen,setIsEmployeesOpen] =  useState(false); 



  const toggleOrdersDropdown = () => {
    setIsOrdersOpen(!isOrdersOpen);
  };

  const toggleSuppliersDropdown = () => {
    setIsSuppliersOpen(!isSuppliersOpen);
  };

  const toggleInventoryDropdown = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };
  const toggleSalesDropdown  = () => {
    setIsSalesOpen(!isSalesOpen);
  };
  
  const  toggleEmployeesDropdown = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

  return (
    <div className="bg-dark text-white vh-100 p-3">
      <h4>Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>

        {/* Orders Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleOrdersDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-receipt me-2"></i> Orders
            <i className={`bi ${isOrdersOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isOrdersOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/orders/add" className="nav-link text-white">
                  Add Orders
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/orders/view" className="nav-link text-white">
                  View Orders
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/orders/manage" className="nav-link text-white">
                  Manage Orders
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Suppliers Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleSuppliersDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-truck me-2"></i> Suppliers
            <i className={`bi ${isSuppliersOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isSuppliersOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/suppliers/add" className="nav-link text-white">
                  Add Supplier
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/suppliers/manage" className="nav-link text-white">
                  Manage Suppliers
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Inventory Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleInventoryDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-boxes me-2"></i> Inventory
            <i className={`bi ${isInventoryOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isInventoryOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/inventory/add" className="nav-link text-white">
                  Add Inventory
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/inventory/add1" className="nav-link text-white">
                  Manage Inventory
                </Link>
              </li>
            </ul>
          )}
        </li>
        
       {/* Sales Dropdown */}
       <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleSalesDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-receipt me-2"></i> Sales & Reports
            <i className={`bi ${isSalesOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isSalesOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/sales/add" className="nav-link text-white">
                Add Sales Record
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/sales/manage" className="nav-link text-white">
                Manage Sales
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/sales/report" className="nav-link text-white">
                Generate Report
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        {/* Employees Dropdown */}
        <li className="nav-item mb-3">
          <button 
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start" 
            onClick={toggleEmployeesDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-receipt me-2"></i> Employees
            <i className={`bi ${isEmployeesOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isEmployeesOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/Employeess/add" className="nav-link text-white">
                  Add Employees
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/Employees/manage" className="nav-link text-white">
                  Manage Employees
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item mb-3">
          <Link to="/dashboard/settings" className="nav-link text-white d-flex align-items-center">
            <i className="bi bi-gear me-2"></i> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
