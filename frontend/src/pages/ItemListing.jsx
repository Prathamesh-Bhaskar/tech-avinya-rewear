// src/pages/ItemListing.jsx
import React from 'react';
import ItemSearch from '../components/itemListing/ItemSearch';
import ItemFilters from '../components/itemListing/ItemFilters';
import ItemGrid from '../components/itemListing/ItemGrid';
import './ItemListing.css';

function ItemListing() {
  return (
    <div className="item-listing-page">
      <ItemSearch />
      <div className="item-layout">
        <ItemFilters />
        <ItemGrid />
      </div>
    </div>
  );
}

export default ItemListing;
