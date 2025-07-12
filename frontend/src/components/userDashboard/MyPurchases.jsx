import React from 'react';
import ItemCard from '../itemListing/ItemCard';

const myPurchasedItems = [
  {
    id: 101,
    name: 'Cotton Kurta',
    description: 'Gently used, size M',
    image: 'https://via.placeholder.com/150',
  },
];

function MyPurchases() {
  return (
    <div className="dashboard-section">
      <h3>My Purchases / Swaps</h3>
      {myPurchasedItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MyPurchases;
