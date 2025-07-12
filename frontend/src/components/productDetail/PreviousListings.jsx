// src/components/productDetail/PreviousListings.jsx
import React from 'react';

const previousItems = [
  { id: 1, name: "Past Item 1", image: "https://via.placeholder.com/120" },
  { id: 2, name: "Past Item 2", image: "https://via.placeholder.com/120" },
  { id: 3, name: "Past Item 3", image: "https://via.placeholder.com/120" },
];

function PreviousListings() {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Previously Swapped Items</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {previousItems.map(item => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 min-w-[150px] text-center flex-shrink-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto rounded-md mb-2"
            />
            <p className="text-sm text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviousListings;
