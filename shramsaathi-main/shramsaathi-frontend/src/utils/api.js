import axios from 'axios';
import { encryptSensitiveData, decryptSensitiveData } from './encryption';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8083';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to encrypt sensitive data
api.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = encryptSensitiveData(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to decrypt sensitive data
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      if (Array.isArray(response.data)) {
        response.data = response.data.map(item => decryptSensitiveData(item));
      } else {
        response.data = decryptSensitiveData(response.data);
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;