// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = ({ pageTitle }) => {
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">{pageTitle}</h1>
          <span className="header-time">{currentTime}</span>
        </div>
        <div className="header-right">
          <div className="header-search">
            <input type="search" placeholder="Search..." />
          </div>
          <div className="header-actions">
            <button className="header-notification" aria-label="Notifications">
              🔔
            </button>
            <button className="header-profile" aria-label="User Profile">
              👤
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
