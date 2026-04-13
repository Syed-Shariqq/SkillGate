import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const EmailVerificationPendingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  // In a real app we'd get this from state or context seamlessly
  const email = 'user@example.com'; 

  const handleResend = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await sendVerificationEmail(email);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Verification email sent!');
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[#121821] font-['Plus_Jakarta_Sans']">
      <Card className="w-full max-w-md !p-8 !rounded-2xl border border-[#273244] bg-[#1A2330] shadow-xl text-center" hoverable={false}>
        <div className="text-5xl mb-6">✉️</div>
        <h1 className="text-2xl font-bold text-[#F1F5F9] mb-3">Verify your email</h1>
        <p className="text-[#94A3B8] text-sm mb-8">
          We've sent a verification link to <span className="text-[#F1F5F9] font-medium">{email}</span>. 
          Click the link to activate your account.
        </p>

        <Button variant="ghost" className="w-full mb-6" onClick={handleResend} disabled={isSubmitting}>
          {isSubmitting ? <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div> : 'Resend verification email'}
        </Button>

        <p className="text-[#94A3B8] text-sm mb-4">
          Wrong email? <button onClick={() => navigate('/auth')} className="text-[#6366F1] hover:text-[#5a38e8] transition-colors cursor-pointer">Sign up again</button>
        </p>

        <button 
          onClick={() => navigate('/auth')}
          className="text-[#94A3B8] hover:text-[#F1F5F9] text-sm font-medium transition-colors cursor-pointer"
        >
          ← Back to login
        </button>
      </Card>
    </div>
  );
};

export default EmailVerificationPendingPage;
