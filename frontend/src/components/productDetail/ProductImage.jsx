// src/components/productDetail/ProductImage.jsx
import React from 'react';

function ProductImage({ image }) {
  return (
    <div className="w-full max-w-sm">
      <img
        src={image}
        alt="Product"
        className="w-full h-auto rounded-md shadow-md object-cover"
      />
    </div>
  );
}

export default ProductImage;
