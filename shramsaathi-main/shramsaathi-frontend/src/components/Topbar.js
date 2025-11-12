// src/components/Topbar.js
import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="topbar-title">Welcome to ShramSaathi</div>
      <div className="topbar-right">
        <button className="logout-button">Logout</button>
      </div>
    </header>
  );
};

export default Topbar;
