import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/features/auth/context/AuthContext';
import AppRoutes from '@/routes/index';
import './index.css';

const RootRedirect = ({ children }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Intercept initial app load only on the root path
    if (!loading && isAuthenticated && window.location.pathname === '/') {
      if (role === null) {
        navigate('/role-selection', { replace: true });
      } else if (role === 'candidate') {
        navigate('/candidate-dashboard', { replace: true });
      } else if (role === 'recruiter') {
        navigate('/recruiter-dashboard', { replace: true });
      }
    }
  }, [loading, isAuthenticated, role, navigate]);

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RootRedirect>
          <AppRoutes />
        </RootRedirect>
      </AuthProvider>
    </BrowserRouter>
  );
}