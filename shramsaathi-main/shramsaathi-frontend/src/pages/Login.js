import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();

  // Monitor online/offline status
  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setError('');
    };
    const handleOffline = () => {
      setIsOnline(false);
      setError('No internet connection. Please check your network.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOnline) {
      setError('No internet connection. Please check your network.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await authService.login(formData.email, formData.password);
      setRetryCount(0); // Reset retry count on successful login
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.message.includes('Unable to connect to the server')) {
        // Implement auto-retry for server connection issues
        if (retryCount < 2) { // Try up to 2 times
          setRetryCount(prev => prev + 1);
          setError('Attempting to reconnect to server...');
          setTimeout(() => handleSubmit(e), 2000); // Retry after 2 seconds
          return;
        }
      }

      setError(err.message || 'Invalid email or password');
      
      // Only clear password on auth errors, not on network errors
      if (err.message.includes('Invalid credentials')) {
        setFormData(prev => ({
          ...prev,
          password: ''
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Login to ShramSaathi</h2>
          <p>Welcome back! Please login to your account.</p>
        </div>
        {error && (
          <div className={`message ${error.includes('Attempting to reconnect') ? 'warning' : 'error'}`} role="alert">
            <i className={`fas ${error.includes('Attempting to reconnect') ? 'fa-sync fa-spin' : 'fa-exclamation-circle'}`}></i>
            {error}
            {error.includes('Unable to connect to the server') && (
              <div className="error-help">
                <small>
                  Make sure the backend server is running and accessible at http://localhost:8080
                </small>
              </div>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                disabled={loading}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                disabled={loading}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          <button 
            type="submit" 
            className={`login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;