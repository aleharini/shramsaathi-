// src/components/Layout.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Update page title based on current route
    const path = location.pathname;
    const title = path === '/' 
      ? 'Dashboard'
      : path.substring(1).split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    setPageTitle(title);
    // Update document title
    document.title = `ShramSaathi | ${title}`;
  }, [location]);

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-body">
        <Header pageTitle={pageTitle} />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
