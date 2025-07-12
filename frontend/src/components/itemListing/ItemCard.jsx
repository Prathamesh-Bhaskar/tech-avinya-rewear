import React from 'react';
import './ItemCard.css';

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default ItemCard;
