// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await authService.forgotPassword(email);
      setStatus({
        type: 'success',
        message: 'Password reset link has been sent to your email'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send reset link. Please check your email and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className="forgot-password-header">
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password</p>
        </div>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                <span>Send Reset Link</span>
              </>
            )}
          </button>

          <button 
            type="button" 
            className="back-to-login"
            onClick={() => navigate('/login')}
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;