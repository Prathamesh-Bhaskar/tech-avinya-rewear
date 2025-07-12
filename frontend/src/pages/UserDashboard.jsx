// src/pages/UserDashboard.jsx
import React from 'react';
import UserProfile from '../components/userDashboard/UserProfile';
import MyListings from '../components/userDashboard/MyListings';
import MyPurchases from '../components/userDashboard/MyPurchases';
import './UserDashboard.css';

function UserDashboard() {
  return (
    <div className="user-dashboard">
      <UserProfile />
      <MyListings />
      <MyPurchases />
    </div>
  );
}

export default UserDashboard;
