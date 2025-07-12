// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>ReWear</h3>
          <p>Swap. Reuse. Sustain.</p>
        </div>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
        <div className="footer-right">
          <p>© {new Date().getFullYear()} ReWear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
