// src/components/productDetail/ProductInfo.jsx
import React from 'react';

function ProductInfo({ product }) {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>

      <p className="mb-1">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="mb-1">
        <strong>Condition:</strong> {product.condition}
      </p>
      <p className="mb-1">
        <strong>Status:</strong>{" "}
        <span
          className={`font-semibold px-2 py-1 rounded ${
            product.status.toLowerCase() === 'available'
              ? 'text-green-600 bg-green-100'
              : 'text-red-600 bg-red-100'
          }`}
        >
          {product.status}
        </span>
      </p>
    </div>
  );
}

export default ProductInfo;
