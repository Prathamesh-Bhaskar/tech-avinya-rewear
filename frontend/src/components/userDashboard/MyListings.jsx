import React from 'react';
import ItemCard from '../itemListing/ItemCard';

const myListedItems = [
  {
    id: 1,
    name: 'Vintage Denim Jacket',
    description: 'Used once, size L',
    image: 'https://via.placeholder.com/150',
  },
];

function MyListings() {
  return (
    <div className="dashboard-section">
      <h3>My Listings</h3>
      {myListedItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MyListings;
