// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import ItemListing from './pages/ItemListing';
import UserDashboard from './pages/UserDashboard';
import ProductDetailPage from "./pages/ProductDetailPage";


import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/items" element={<ItemListing />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
