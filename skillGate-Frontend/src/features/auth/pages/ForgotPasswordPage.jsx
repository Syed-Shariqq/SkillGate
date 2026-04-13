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
    <div className="flex min-h-screen items-center justify-center p-6 bg-[#121821] font-['Plus_Jakarta_Sans']">
      <Card className="w-full max-w-md !p-8 !rounded-2xl border border-[#273244] bg-[#1A2330] shadow-xl text-center" hoverable={false}>
        {!isSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-[#F1F5F9] mb-3">Reset your password</h1>
            <p className="text-[#94A3B8] text-sm mb-8">
              Enter your email and we'll send reset instructions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
              <div>
                <label className="block text-sm font-medium text-[#F1F5F9] mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="ahmed@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0F14] border border-[#273244] focus:border-[#6366F1] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]/30 text-[#F1F5F9] placeholder:text-[#94A3B8] transition-colors"
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
              className="mt-6 text-[#6366F1] hover:text-[#5a38e8] text-sm font-medium transition-colors cursor-pointer inline-block"
            >
              ← Back to login
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-6">✉️</div>
            <h1 className="text-2xl font-bold text-[#F1F5F9] mb-3">Check your email</h1>
            <p className="text-[#94A3B8] text-sm mb-8">
              We've sent instructions to <span className="text-[#F1F5F9] font-medium">{email}</span>. 
              Check your spam folder too.
            </p>

            <Button variant="ghost" className="w-full mb-6" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div> : 'Resend email'}
            </Button>

            <button 
              onClick={() => navigate('/auth')}
              className="text-[#6366F1] hover:text-[#5a38e8] text-sm font-medium transition-colors cursor-pointer inline-block"
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
