import React, { useState, useEffect } from 'react';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(prev => ({
            ...prev,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address
          }));
        }
      } catch (error) {
        setMessage({ text: 'Failed to load profile', type: 'error' });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setMessage({ text: 'Profile updated successfully', type: 'success' });
      } else {
        setMessage({ text: 'Failed to update profile', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred', type: 'error' });
    }
  };

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
        </div>
        <h3>Change Password</h3>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={profile.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={profile.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={profile.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettings;