// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">ReWear</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
