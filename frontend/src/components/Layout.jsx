import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
        <Sidebar />
        <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', marginTop: '50px' }}>
          {/* 70px is for the height of your Navbar */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;