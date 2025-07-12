import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add your landing/dashboard routes here */}
        <Route path="/" element={<div style={{textAlign:'center',marginTop:'3rem'}}><h1>Welcome to ReWear</h1><a href="/login">Login</a> | <a href="/register">Register</a></div>} />
      </Routes>
    </Router>
  );
}

export default App;
