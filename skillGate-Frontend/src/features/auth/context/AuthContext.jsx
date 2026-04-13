import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const result = authService.login(credentials);
    if (result.status === 'success' || result.status === 'pending_role') {
      setUser(result.user);
    }
    return result;
  };

  const register = async (userData) => {
    const result = authService.register(userData);
    if (result.status === 'success' || result.status === 'pending_role') {
      setUser(result.user);
    }
    return result;
  };

  const assignRole = async (email, role) => {
    const result = authService.assignRole(email, role);
    if (result.status === 'success') {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const resetPassword = async (email) => {
    return authService.resetPassword(email);
  };

  const sendVerificationEmail = async (email) => {
    return authService.sendVerificationEmail(email);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    role: user?.role || null,
    login,
    register,
    assignRole,
    logout,
    resetPassword,
    sendVerificationEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
