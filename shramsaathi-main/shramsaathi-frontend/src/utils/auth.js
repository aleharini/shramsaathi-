import api from './api';
import { encryptData, decryptData } from './encryption';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

export const UserRoles = {
  WORKER: 'WORKER',
  OWNER: 'OWNER',
  ADMIN: 'ADMIN'
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/auth/login', { username, password });
    const { token, user } = response.data;
    
    // Store encrypted token and user data
    localStorage.setItem(AUTH_TOKEN_KEY, encryptData(token));
    localStorage.setItem(USER_DATA_KEY, encryptData(JSON.stringify(user)));
    
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  window.location.href = '/login';
};

export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (!userData) return null;
    
    return JSON.parse(decryptData(userData));
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;
    
    return decryptData(token);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user && user.role === requiredRole;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Verify document upload for role verification
export const verifyDocument = async (userId, documentType, file) => {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);
    formData.append('userId', userId);

    const response = await api.post('/api/verification/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Document verification failed:', error);
    throw error;
  }
};

// Check verification status
export const checkVerificationStatus = async (userId) => {
  try {
    const response = await api.get(`/api/verification/status/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking verification status:', error);
    throw error;
  }
};