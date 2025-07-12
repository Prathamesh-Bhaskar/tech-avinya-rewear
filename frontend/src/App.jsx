// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Header />

      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
