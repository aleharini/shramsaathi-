// src/components/Sidebar.js
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/map', icon: '🗺️', label: 'Map' },
    { path: '/register', icon: '👷', label: 'Register Worker' },
    { path: '/register-owner', icon: '💼', label: 'Register Owner' },
    { path: '/search', icon: '🔍', label: 'Search Worker' },
    { path: '/jobs', icon: '📝', label: 'Nearby Jobs' },
    { path: '/ownerworkerslist', icon: '👥', label: 'Owner View' },
    { path: '/faq', icon: '❓', label: 'FAQ' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>ShramSaathi</h2>
        <p className="sidebar-subtitle">Work Management</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(({ path, icon, label }) => (
            <li key={path}>
              <Link 
                to={path} 
                className={`sidebar-link ${location.pathname === path ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{icon}</span>
                <span className="sidebar-label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>© 2025 ShramSaathi</p>
      </div>
    </aside>
  );
};

export default Sidebar;
