// src/components/landing/SearchCTA.jsx
import React from 'react';
import './SearchCTA.css';

function SearchCTA() {
  return (
    <div className="search-cta">
      <input type="text" placeholder="Search for clothes..." />
      <button>Browse Items</button>
    </div>
  );
}

export default SearchCTA;
