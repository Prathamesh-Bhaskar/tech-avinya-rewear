// src/components/landing/ImpactMetrics.jsx
import React from 'react';
import './ImpactMetrics.css';

function ImpactMetrics() {
  return (
    <section className="impact">
      <h2>Your Impact Matters</h2>
      <div className="impact-grid">
        <div className="impact-box">
          <h3>128</h3>
          <p>Clothes Saved from Landfill</p>
        </div>
        <div className="impact-box">
          <h3>4,500L</h3>
          <p>Water Saved</p>
        </div>
        <div className="impact-box">
          <h3>56kg</h3>
          <p>CO₂ Emissions Reduced</p>
        </div>
      </div>
    </section>
  );
}

export default ImpactMetrics;
