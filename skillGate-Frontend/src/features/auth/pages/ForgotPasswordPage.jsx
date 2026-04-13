import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    await resetPassword(email);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 800); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-bg-secondary font-['Plus_Jakarta_Sans']">
      <Card className="w-full max-w-md p-8! rounded-2xl! border border-bg-secondary bg-bg-card shadow-xl text-center" hoverable={false}>
        {!isSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-text-primary mb-3">Reset your password</h1>
            <p className="text-text-secondary text-sm mb-8">
              Enter your email and we'll send reset instructions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="ahmed@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-primary border border-border focus:border-accent-primary rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary/30 text-text-primary placeholder:text-text-secondary transition-colors"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting || !email}>
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : 'Send Reset Link'}
              </Button>
            </form>

            <button 
              onClick={() => navigate('/auth')}
              className="mt-6 text-accent-primary hover:text-accent-secondary text-sm font-medium transition-colors cursor-pointer inline-block"
            >
              ← Back to login
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-6">✉️</div>
            <h1 className="text-2xl font-bold text-text-primary mb-3">Check your email</h1>
            <p className="text-text-secondary text-sm mb-8">
              We've sent instructions to <span className="text-text-primary font-medium">{email}</span>. 
              Check your spam folder too.
            </p>

            <Button variant="ghost" className="w-full mb-6" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div> : 'Resend email'}
            </Button>

            <button 
              onClick={() => navigate('/auth')}
              className="text-accent-primary hover:text-[#5a38e8] text-sm font-medium transition-colors cursor-pointer inline-block"
            >
              ← Back to login
            </button>
          </>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
