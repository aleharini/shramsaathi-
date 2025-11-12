import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './Dashboard.css';

const AnimatedNumber = ({ value, duration = 800 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const diff = value - start;
    if (diff <= 0) {
      setDisplay(value);
      return;
    }
    const stepTime = Math.max(Math.floor(duration / Math.max(diff,1)), 12);
    const timer = setInterval(() => {
      start += Math.max(1, Math.ceil(diff * (stepTime / duration)));
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setDisplay(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{display}</span>;
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ workers: 0, districts: 0, workTypes: 0 });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/api/users');
        const users = Array.isArray(res.data) ? res.data : [];

        const uniqueDistricts = new Set(users.map(user => user.district).filter(Boolean));
        const workTypeCounts = {};
        users.forEach(u => {
          if (!u.workType) return;
          workTypeCounts[u.workType] = (workTypeCounts[u.workType] || 0) + 1;
        });

        setUsers(users);
        setStats({
          workers: users.length,
          districts: uniqueDistricts.size,
          workTypes: Object.keys(workTypeCounts).length,
          workTypeCounts
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetch();
  }, []);

  // Prepare top work types for small chart
  const topWorkTypes = () => {
    const counts = stats.workTypeCounts || {};
    const items = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const max = items.length ? items[0][1] : 1;
    return { items, max };
  };

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Overview of workers, coverage and activity</p>
        </div>
        <div className="quick-actions">
          <button className="btn btn-primary">Add Worker</button>
          <button className="btn">Import</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="cards">
          <StatCard title="Total Workers" emoji="👷" value={stats.workers} />
          <StatCard title="Districts Covered" emoji="🌍" value={stats.districts} />
          <StatCard title="Work Types" emoji="🛠️" value={stats.workTypes} />
        </div>

        <div className="panels">
          <div className="panel chart-panel">
            <h3>Top Work Types</h3>
            <div className="bar-list">
              {topWorkTypes().items.map(([type, count]) => (
                <div className="bar-row" key={type}>
                  <div className="bar-label">{type}</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${(count / topWorkTypes().max) * 100}%` }} />
                  </div>
                  <div className="bar-count">{count}</div>
                </div>
              ))}
              {topWorkTypes().items.length === 0 && <div className="muted">No data yet</div>}
            </div>
          </div>

          <div className="panel recent-panel">
            <h3>Recent Registrations</h3>
            <div className="recent-list">
              {users.slice().reverse().slice(0, 6).map(u => (
                <div className="recent-item" key={u.id}>
                  <div className="avatar">{u.name ? u.name.charAt(0).toUpperCase() : '?'}</div>
                  <div className="recent-body">
                    <div className="recent-name">{u.name}</div>
                    <div className="recent-meta">{u.workType} • {u.district}</div>
                  </div>
                  <div className="recent-action">{u.phone}</div>
                </div>
              ))}
              {users.length === 0 && <div className="muted">No registrations yet</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, emoji, value }) => (
  <div className="stat-card">
    <div className="stat-icon">{emoji}</div>
    <div className="stat-body">
      <div className="stat-title">{title}</div>
      <div className="stat-value"><AnimatedNumber value={value || 0} /></div>
    </div>
  </div>
);

export default Dashboard;
