// src/services/authService.js

// Base API URL for authentication endpoints
const AUTH_URL = 'http://localhost:8080/api/auth';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Try to get error message from response
        try {
          const error = await response.json();
          throw new Error(error.message || 'Invalid credentials');
        } catch (e) {
          // If response isn't JSON
          throw new Error(response.status === 401 ? 'Invalid credentials' : 'Server error occurred');
        }
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      if (!window.navigator.onLine) {
        throw new Error('No internet connection. Please check your network and try again.');
      }
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please make sure the backend server is running.');
      }
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${AUTH_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to process password reset request');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await fetch(`${AUTH_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reset password');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Add token to requests
  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};

export default authService;