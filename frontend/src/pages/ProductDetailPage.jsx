import React, { useState } from 'react';
import ProductImage from '../components/productDetail/ProductImage';
import ProductInfo from '../components/productDetail/ProductInfo';
import PreviousListings from '../components/productDetail/PreviousListings';

function ProductDetailPage() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    condition: '',
    status: 'Available',
    image: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product added:', product);
    alert("Product added!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24">
      {/* Product Form */}
      <form
        className="bg-white p-6 rounded-lg shadow-md mb-10 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-2">Add a Product</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />

        <input
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />

        <input
          name="condition"
          placeholder="Condition"
          value={product.condition}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2"
        />

        <select
          name="status"
          value={product.status}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="Available">Available</option>
          <option value="Swapped">Swapped</option>
        </select>

        <input
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>

      {/* Product Preview */}
      {product.name && (
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-md mb-10">
          <ProductImage image={product.image || "https://via.placeholder.com/300"} />
          <ProductInfo product={product} />
        </div>
      )}

      {/* Previous Listings */}
      <PreviousListings />
    </div>
  );
}

export default ProductDetailPage;
