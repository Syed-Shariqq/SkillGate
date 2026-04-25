import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import useDebounce from '@/shared/hooks/useDebounce';
import logo from '@/assets/skillGate-logo.png';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const debouncedFormData = useDebounce(formData, 300);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

  const validateField = (name, value) => {
    let error = null;
    if (name === 'name' && mode === 'signup') {
      if (!value) error = 'Name is required';
      else if (value.length < 2) error = 'Name must be at least 2 characters';
      else if (value.length > 50) error = 'Name must be less than 50 characters';
    }
    if (name === 'email') {
      if (!value) error = 'Email is required';
      else if (!validateEmail(value)) error = 'Invalid email address';
    }
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (mode === 'signup' && !validatePassword(value)) {
        error = 'Password must be at least 8 characters, contain 1 uppercase and 1 number';
      }
    }
    return error;
  };

  useEffect(() => {
    if (debouncedFormData.name !== '') {
      const err = validateField('name', debouncedFormData.name);
      setErrors((prev) => ({ ...prev, name: err }));
    }
  }, [debouncedFormData.name, mode]);

  useEffect(() => {
    if (debouncedFormData.email !== '') {
      const err = validateField('email', debouncedFormData.email);
      setErrors((prev) => ({ ...prev, email: err }));
    }
  }, [debouncedFormData.email]);

  useEffect(() => {
    if (debouncedFormData.password !== '') {
      const err = validateField('password', debouncedFormData.password);
      setErrors((prev) => ({ ...prev, password: err }));
    }
  }, [debouncedFormData.password, mode]);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError(null);
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Final validation sync round
    const nameErr = mode === 'signup' ? validateField('name', formData.name) : null;
    const emailErr = validateField('email', formData.email);
    const passErr = validateField('password', formData.password);

    if (nameErr || emailErr || passErr) {
      setErrors({ name: nameErr, email: emailErr, password: passErr });
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const reqData = mode === 'signup'
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const result = mode === 'signup' ? await register(reqData) : await login(reqData);

      if (result.status === 'success' || result.status === 'pending_role') {
        const role = result.user?.role;
        if (role === 'candidate') navigate('/candidate-dashboard');
        else if (role === 'recruiter') navigate('/recruiter-dashboard');
        else navigate('/role-selection');
      } else {
        if (result.status === 'exists') setServerError('An account with this email already exists. Log in instead?');
        else if (result.status === 'not_found') setServerError('No account found with this email.');
        else if (result.status === 'wrong_password') setServerError('Incorrect password. Please try again.');
        else setServerError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-bg-primary text-text-primary font-['Plus_Jakarta_Sans']">
      {/* Left Panel */}
      <div className="hidden bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.12),transparent_40%)] md:flex flex-col justify-between w-[40%] p-12 bg-bg-primary border-r border-border">
        <div className="backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-12">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="text-xl bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent font-bold tracking-tight">SkillGate</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
            The smarter way to hire and get hired.
          </h1>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-success text-xl">✓</span>
              <span className="text-text-secondary">AI screens candidates before they reach you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success text-xl">✓</span>
              <span className="text-text-secondary">Industry-relevant assessments. No DSA.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success text-xl">✓</span>
              <span className="text-text-secondary">Fair evaluation. Zero bias.</span>
            </li>
          </ul>
          <p className="text-text-secondary font-medium opacity-80 mt-6 bg-bg-card inline-block px-4 py-2 rounded-full text-sm border border-border">
            ⭐️ Trusted by 500+ companies
          </p>
        </div>
        <div className="text-text-secondary text-sm opacity-60">
          © {new Date().getFullYear()} SkillGate. All rights reserved.
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.08),transparent_40%)] min-h-screen flex flex-col items-center justify-center p-6 md:p-12 w-full bg-bg-secondary">
        <Card className="w-full backdrop-blur-sm max-w-md p-8! rounded-2xl! border border-border transition-all duration-300 bg-bg-card" hoverable={false}>
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-8">
            <img src={logo} className="w-8 h-8"></img>
            <span className="text-xl bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent font-bold tracking-tight">SkillGate</span>
          </div>

          <div className="flex gap-6 mb-8 font-semibold border-b border-border">
            <button
              className={`pb-3 cursor-pointer border-b-[3px] transition-colors ${mode === 'signup' ? 'text-white border-accent-primary' : 'text-text-secondary/70 border-transparent hover:text-white'}`}
              onClick={() => { setMode('signup'); setErrors({}); setServerError(null); }}
            >
              Sign Up
            </button>
            <button
              className={`pb-3 cursor-pointer border-b-[3px] transition-colors ${mode === 'login' ? 'text-white border-accent-primary' : 'text-text-secondary/70 border-transparent hover:text-white'}`}
              onClick={() => { setMode('login'); setErrors({}); setServerError(null); }}
            >
              Log In
            </button>
          </div>

          {serverError && (
            <div className="mb-6 bg-error/10 border border-error/30 text-error rounded-lg p-3 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Full Name</label>
                <input
                  type="text" name="name"
                  placeholder="Ahmed Khan"
                  value={formData.name} onChange={handleChange} onBlur={handleBlur}
                  className={`w-full bg-bg-primary border ${errors.name ? 'border-error/40' : 'border-border focus:border-accent-primary'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary/30 text-text-primary placeholder:text-text-secondary transition-colors`}
                />
                {errors.name && <p className="text-error/80 text-xs mt-1.5">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Email Address</label>
              <input
                type="email" name="email"
                placeholder="ahmed@example.com"
                value={formData.email} onChange={handleChange} onBlur={handleBlur}
                className={`w-full bg-bg-primary border ${errors.email ? 'border-error/40' : 'border-border focus:border-accent-primary'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary/30 text-text-primary placeholder:text-text-secondary transition-colors`}
              />
              {errors.email && <p className="text-error/80 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-sm font-medium text-text-primary">Password</label>
                {mode === 'login' && (
                  <button type="button" onClick={() => navigate('/forgot-password')} className="text-accent-primary hover:text-[#5a38e8] text-sm font-medium cursor-pointer">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password} onChange={handleChange} onBlur={handleBlur}
                  className={`w-full bg-bg-primary border ${errors.password ? 'border-error/40' : 'border-border focus:border-accent-primary'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary/30 text-text-primary placeholder:text-text-secondary transition-colors`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary focus:outline-none">
                  {showPassword ? (
                    <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-error/80 text-xs mt-1.5">{errors.password}</p>}
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (mode === 'signup' ? 'Create Account' : 'Log In')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            {mode === 'signup' ? 'Already have an account? ' : 'Don\'t have an account? '}
            <button
              onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setErrors({}); setServerError(null); }}
              className="text-accent-primary cursor-pointer hover:text-accent-secondary font-medium transition-colors"
            >
              {mode === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
