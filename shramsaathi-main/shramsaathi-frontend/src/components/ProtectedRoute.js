// In your registration form
import { UserRoles } from '../utils/auth';

// Set role based on registration type
const role = isWorker ? UserRoles.WORKER : UserRoles.OWNER;import { checkVerificationStatus } from '../utils/auth';

// In your component
useEffect(() => {
  const checkStatus = async () => {
    const status = await checkVerificationStatus(user.id);
    if (!status.isVerified) {
      navigate('/verification');
    }
  };
  checkStatus();
}, []);const status = await checkVerificationStatus(userId);
if (status.pending) {
  return <div>Your account is pending verification</div>;
}import api from '../utils/api';// It will automatically handle encryption/decryption
const response = await api.get('/api/users');
const result = await api.post('/api/workers', workerData);import PageHeader from '../components/PageHeader';

// In your component:
<PageHeader 
  title="Page Title"
  subtitle="Optional subtitle or description"
/>
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to unauthorized page if role doesn't match
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;