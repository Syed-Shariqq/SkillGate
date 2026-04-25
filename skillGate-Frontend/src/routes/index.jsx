import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// Pages
import LandingPage from '@/pages/LandingPage';
import DemoAssessment from '@/pages/DemoAssessment';
import DemoResult from '@/pages/DemoResult';

// Feature Pages
import AuthPage from '@/features/auth/pages/AuthPage';
import RoleSelectionPage from '@/features/auth/pages/RoleSelectionPage';
import CandidateDashboard from '@/features/candidate/pages/CandidateDashboard';
import RecruiterDashboard from '@/features/recruiter/pages/RecruiterDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<DemoAssessment />} />
      <Route path="/demo/result" element={<DemoResult />} />
      
      <Route 
        path="/auth" 
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } 
      />

      <Route 
        path="/role-selection" 
        element={
          <ProtectedRoute>
            <RoleSelectionPage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/candidate-dashboard" 
        element={
          <RoleRoute allowedRole="candidate">
            <CandidateDashboard />
          </RoleRoute>
        } 
      />

      <Route 
        path="/recruiter-dashboard" 
        element={
          <RoleRoute allowedRole="recruiter">
            <RecruiterDashboard />
          </RoleRoute>
        } 
      />

      <Route 
        path="*" 
        element={
          <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
            <h1 className="text-4xl font-bold">404 - Page not found</h1>
          </div>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
