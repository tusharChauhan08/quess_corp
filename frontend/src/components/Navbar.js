import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          HRMS Lite
        </Link>
        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>
            Dashboard
          </Link>
          <Link to="/employees" className={isActive('/employees')}>
            Employees
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
