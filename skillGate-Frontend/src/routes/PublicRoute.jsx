import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-zinc-950 z-50">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated && role) {
    return role === 'candidate' 
      ? <Navigate to="/candidate-dashboard" replace />
      : <Navigate to="/recruiter-dashboard" replace />;
  }

  if (isAuthenticated && !role) {
    return <Navigate to="/role-selection" replace />;
  }

  return children;
};

export default PublicRoute;
