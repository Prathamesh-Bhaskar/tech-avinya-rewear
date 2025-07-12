import React from 'react';
import ItemCard from './ItemCard';
import './ItemGrid.css';

const sampleItems = [
  {
    id: 1,
    name: 'Blue Cotton Shirt',
    description: 'Lightly used, size M, soft fabric',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Traditional Kurta',
    description: 'Good condition, worn only once',
    image: 'https://via.placeholder.com/150',
  },
];

function ItemGrid() {
  return (
    <div className="item-grid">
      {sampleItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ItemGrid;
