// src/components/landing/CategoryFilters.jsx
import React from 'react';
import './CategoryFilters.css';

function CategoryFilters() {
  const categories = ['Tops', 'Jeans', 'Traditional Wear', 'Footwear', 'Winter Wear'];

  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>{cat}</div>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilters;
