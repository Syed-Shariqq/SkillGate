import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../../../components/ui/Button';
import logo from '../../../assets/skillGate-logo.png';

const RoleSelectionPage = () => {
  const { assignRole, user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/auth', { replace: true });
      } else if (user?.role) {
        navigate(user.role === 'candidate' ? '/candidate-dashboard' : '/recruiter-dashboard', { replace: true });
      }
    }
  }, [loading, isAuthenticated, user, navigate]);

  const handleConfirm = async () => {
    if (!selectedRole || isSubmitting || !user?.email) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await assignRole(user.email, selectedRole);

      if (result.status === 'success') {
        navigate(selectedRole === 'candidate' ? '/candidate-dashboard' : '/recruiter-dashboard');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-primary text-text-primary font-['Plus_Jakarta_Sans'] p-6 relative">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="logo" className="w-8 h-8"></img>
        <span className="text-xl bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent font-bold tracking-tight">SkillGate</span>
      </div>

      <div className="text-center w-full max-w-3xl mt-16 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How will you use SkillGate?</h1>
        <p className="text-text-secondary mb-12">You can always add the other role later in settings.</p>

        {error && (
          <div className="mb-8 max-w-md mx-auto bg-error/10 border border-error/30 text-error rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mb-12">
          {/* Candidate Card */}
          <div 
            onClick={() => setSelectedRole('candidate')}
            className={`relative flex flex-col items-center text-center p-8 rounded-2xl cursor-pointer min-w-[240px] max-w-[280px] mx-auto md:mx-0 transition-all duration-200 border ${
              selectedRole === 'candidate' 
                ? 'border-accent-primary bg-bg-secondary ring-2 ring-accent-primary/20 -translate-y-1' 
                : 'border-bg-secondary bg-bg-card hover:border-accent-primary/50 hover:-translate-y-1'
            }`}
          >
            {selectedRole === 'candidate' && (
              <div className="absolute top-4 right-4 bg-accent-primary text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
            )}
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-xl font-semibold mb-2">I'm Looking for Work</h2>
            <p className="text-text-secondary text-sm">Find jobs and prove your skills with AI-powered assessments</p>
          </div>

          {/* Recruiter Card */}
          <div 
            onClick={() => setSelectedRole('recruiter')}
            className={`relative flex flex-col items-center text-center p-8 rounded-2xl cursor-pointer min-w-[240px] max-w-[280px] mx-auto md:mx-0 transition-all duration-200 border ${
              selectedRole === 'recruiter' 
                ? 'border-accent-primary bg-bg-secondary ring-2 ring-accent-primary/20 -translate-y-1' 
                : 'border-bg-secondary bg-bg-card hover:border-accent-primary/50 hover:-translate-y-1'
            }`}
          >
            {selectedRole === 'recruiter' && (
              <div className="absolute top-4 right-4 bg-accent-primary text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
            )}
            <div className="text-4xl mb-4">🏢</div>
            <h2 className="text-xl font-semibold mb-2">I'm Hiring</h2>
            <p className="text-text-secondary text-sm">Post jobs and let AI screen candidates before they reach you</p>
          </div>
        </div>

        <div className={`transition-all duration-300 ${selectedRole ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <Button variant="primary" size="lg" className="px-12" onClick={handleConfirm} disabled={isSubmitting || !selectedRole}>
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              selectedRole === 'candidate' ? 'Continue as Candidate →' : 'Continue as Recruiter →'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
