import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import './ItemGrid.css';

function ItemGrid() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading items...</div>;

  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemCard key={item._id} item={{
          name: item.title,
          description: item.description,
          image: item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'
        }} />
      ))}
    </div>
  );
}

export default ItemGrid;
