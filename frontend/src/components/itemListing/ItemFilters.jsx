import React from 'react';
import './ItemFilters.css';

function ItemFilters() {
  return (
    <div className="item-filters">
      <h3>Filters</h3>

      <div className="filter-section">
        <label>Category</label>
        <select>
          <option>All</option>
          <option>Tops</option>
          <option>Jeans</option>
          <option>Traditional Wear</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Size</label>
        <select>
          <option>All</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Condition</label>
        <select>
          <option>All</option>
          <option>New</option>
          <option>Gently Used</option>
          <option>Worn</option>
        </select>
      </div>
    </div>
  );
}

export default ItemFilters;
