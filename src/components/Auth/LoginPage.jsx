import React, { useState, useEffect } from 'react';
import { useAuth, MOCK_ADMIN_USER } from '../../context/AuthContext';
import { useSector } from '../../context/SectorContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sun,
  Moon,
  KeyRound,
  Shield,
  Trash2,
  User,
  UserPlus,
  CheckCircle2,
  ArrowLeft,
  Briefcase,
  ShieldAlert,
  Eye,
  EyeOff,
  RefreshCw,
  Check,
  Copy
} from 'lucide-react';
import './LoginPage.css';

export const LoginPage = () => {
  const {
    login,
    signup,
    requestPasswordReset,
    verifyResetOtp,
    completePasswordReset,
    isPasswordRecoveryActive,
    setIsPasswordRecoveryActive
  } = useAuth();
  const { goHome } = useSector();
  const { theme, toggleTheme } = useTheme();

  const parseAuthMode = () => {
    if (typeof window === 'undefined') return 'login';
    const hash = window.location.hash ? window.location.hash.replace(/^#\/?/, '').trim().toLowerCase() : '';
    if (hash === 'admin' || hash === 'admin-login') return 'admin';
    if (hash === 'signup' || hash === 'register') return 'signup';
    if (hash === 'forgot' || hash === 'forgot-password') return 'forgot';
    return 'login';
  };

  const [activeMode, setActiveModeState] = useState(parseAuthMode);

  const setActiveMode = (mode, replace = false) => {
    setActiveModeState(mode);
    const targetHash = mode === 'login' ? '#/login' : `#/${mode}`;
    if (window.location.hash !== targetHash) {
      if (replace) {
        window.history.replaceState({ authMode: mode }, '', targetHash);
      } else {
        window.history.pushState({ authMode: mode }, '', targetHash);
      }
    }
  };

  useEffect(() => {
    const handleAuthPop = () => {
      const mode = parseAuthMode();
      setActiveModeState(mode);
    };
    window.addEventListener('popstate', handleAuthPop);
    window.addEventListener('hashchange', handleAuthPop);
    return () => {
      window.removeEventListener('popstate', handleAuthPop);
      window.removeEventListener('hashchange', handleAuthPop);
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [sectorPref, setSectorPref] = useState('it');
  const [authError, setAuthError] = useState('');

  // Enhanced Forgot Password multi-step state: 'request' | 'verify' | 'reset' | 'success'
  const [forgotStep, setForgotStep] = useState('request');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Resend OTP countdown timer
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Handle Supabase recovery mode if triggered via email link
  useEffect(() => {
    if (isPasswordRecoveryActive) {
      setActiveMode('forgot');
      setForgotStep('reset');
    }
  }, [isPasswordRecoveryActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (activeMode === 'admin') {
      const cleanEmail = email.trim();
      const cleanPass = password.trim();
      if (!cleanEmail || !cleanPass) {
        setAuthError('Please enter both your administrator email and password.');
        return;
      }
      const res = await login(cleanEmail, cleanPass, 'admin');
      if (res.success) {
        goHome();
      } else {
        setAuthError(res.error || 'Invalid administrator credentials. Access denied.');
      }
    } else if (activeMode === 'signup') {
      const res = await signup(name, email, password, sectorPref);
      if (res.success) {
        goHome();
      } else {
        setAuthError(res.error || 'Failed to sign up. Please try again.');
      }
    } else {
      const res = await login(email, password);
      if (res.success) {
        goHome();
      } else {
        setAuthError(res.error || 'Invalid email or password.');
      }
    }
  };

  // Forgot Password Handlers
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setForgotError('');
    const targetEmail = (forgotEmail || email).trim();
    if (!targetEmail || !targetEmail.includes('@')) {
      setForgotError('Please enter a valid registered email address.');
      return;
    }
    setForgotEmail(targetEmail);
    setForgotLoading(true);

    try {
      const res = await requestPasswordReset(targetEmail);
      setForgotLoading(false);
      if (res.success) {
        setForgotStep('verify');
        setResendTimer(60);
      } else {
        setForgotError(res.error || 'Failed to dispatch verification code. Please try again.');
      }
    } catch (err) {
      setForgotLoading(false);
      setForgotError(err.message || 'An unexpected error occurred while requesting OTP.');
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setForgotError('');
    const cleanOtp = forgotOtp.trim();
    if (cleanOtp.length < 6) {
      setForgotError('Please enter the complete 6-digit OTP code.');
      return;
    }
    setForgotLoading(true);

    try {
      const res = await verifyResetOtp(forgotEmail, cleanOtp);
      setForgotLoading(false);
      if (res.success) {
        setForgotStep('reset');
      } else {
        setForgotError(res.error || 'Invalid or expired OTP code.');
      }
    } catch (err) {
      setForgotLoading(false);
      setForgotError(err.message || 'Verification failed. Please retry.');
    }
  };

  const handleCompleteReset = async (e) => {
    if (e) e.preventDefault();
    setForgotError('');
    if (newPassword.length < 6) {
      setForgotError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match. Please re-enter both fields.');
      return;
    }
    setForgotLoading(true);

    try {
      const res = await completePasswordReset(forgotEmail, newPassword);
      setForgotLoading(false);
      if (res.success) {
        setForgotStep('success');
      } else {
        setForgotError(res.error || 'Failed to update password.');
      }
    } catch (err) {
      setForgotLoading(false);
      setForgotError(err.message || 'Password update failed.');
    }
  };

  const handleReturnToLogin = () => {
    if (forgotEmail) setEmail(forgotEmail);
    if (newPassword && forgotStep === 'success') {
      setPassword(newPassword);
    }
    setActiveMode('login');
    setForgotStep('request');
    setForgotOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotError('');
    if (setIsPasswordRecoveryActive) setIsPasswordRecoveryActive(false);
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'transparent' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: '#ef4444' };
    if (score === 2) return { score: 50, label: 'Fair', color: '#f59e0b' };
    if (score === 3) return { score: 75, label: 'Good', color: '#3b82f6' };
    return { score: 100, label: 'Strong & Secure', color: '#10b981' };
  };

  const isAdminMode = activeMode === 'admin';
  const isSignUp = activeMode === 'signup';
  const isForgot = activeMode === 'forgot';

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'transparent',
      color: 'var(--text-main)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Header Layer — Pinned to Ends */}
      <header style={{
        padding: '0 2rem',
        height: '70px',
        width: '100%',
        zIndex: 10,
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color-subtle)',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxSizing: 'border-box'
        }}>
          {/* Brand Logo — Pinned to Far Left End */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
            <div style={{
              width: '42px',
              height: '42px',
              minWidth: '42px',
              minHeight: '42px',
              borderRadius: '12px',
              background: isAdminMode 
                ? 'linear-gradient(135deg, #1e3a8a, #0f172a)' 
                : 'linear-gradient(135deg, var(--primary-lavender), #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: isAdminMode ? '0 4px 14px rgba(30, 58, 138, 0.4)' : '0 4px 14px rgba(139, 92, 246, 0.3)',
              transition: 'all 500ms cubic-bezier(0, 0, 0.2, 1)',
              flexShrink: 0
            }}>
              {isAdminMode ? <Shield size={22} color="#93c5fd" /> : <Sparkles size={22} />}
            </div>
            <div style={{ flexShrink: 0 }}>
              <span style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                SkillSync<span style={{ color: isAdminMode ? '#2563eb' : 'var(--primary-lavender)', transition: 'color 500ms ease-out' }}>AI</span>
              </span>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block', whiteSpace: 'nowrap' }}>
                {isAdminMode ? 'System Administrator Portal' : 'Dual-Sector Career Gateway'}
              </span>
            </div>
          </div>

          {/* Right Controls — Pinned to Far Right End */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
              <ShieldCheck size={16} color={isAdminMode ? '#3b82f6' : 'var(--accent-mint)'} /> Encrypted Session
            </span>
            <button
              onClick={toggleTheme}
              className="btn btn-secondary"
              style={{
                padding: '0.5rem',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                minWidth: '38px',
                minHeight: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon size={18} color="var(--primary-lavender)" /> : <Sun size={18} color="#f59e0b" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Gateway Body with Smart Animate Frame Connection */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
        zIndex: 5
      }}>
        <div className={`smart-animate-card ${isAdminMode ? 'admin-theme' : ''}`}>

          {/* LAYER: Mode Switcher (Sign In vs Admin) */}
          <div className={`smart-expandable-section ${!isForgot && !isSignUp ? 'visible' : 'hidden'}`}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              background: 'var(--bg-subtle)',
              padding: '5px',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <button
                type="button"
                onClick={() => {
                  setActiveMode('login');
                  setEmail('');
                  setPassword('');
                  setAuthError('');
                }}
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
                  background: (!isAdminMode && activeMode === 'login') ? 'var(--bg-surface)' : 'transparent',
                  color: (!isAdminMode && activeMode === 'login') ? 'var(--primary-lavender)' : 'var(--text-muted)',
                  boxShadow: (!isAdminMode && activeMode === 'login') ? 'var(--shadow-sm)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <KeyRound size={16} /> Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMode('admin');
                  setEmail('');
                  setPassword('');
                  setAuthError('');
                }}
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
                  background: isAdminMode ? 'linear-gradient(135deg, #1e3a8a, #0f172a)' : 'transparent',
                  color: isAdminMode ? '#ffffff' : '#1e3a8a',
                  boxShadow: isAdminMode ? '0 4px 14px rgba(30, 58, 138, 0.4)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Shield size={16} color={isAdminMode ? '#93c5fd' : '#1e3a8a'} /> Admin Login
              </button>
            </div>
          </div>

          {/* LAYER: Header Badge Icon (Smart Animated) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div
              className="smart-layer-badge"
              style={{
                background: isAdminMode
                  ? 'rgba(30, 58, 138, 0.15)'
                  : isSignUp
                  ? 'var(--accent-mint-subtle)'
                  : isForgot
                  ? 'rgba(56, 189, 248, 0.15)'
                  : 'var(--primary-lavender-subtle)',
                color: isAdminMode
                  ? '#1e3a8a'
                  : isSignUp
                  ? 'var(--accent-mint)'
                  : isForgot
                  ? 'var(--accent-blue)'
                  : 'var(--primary-lavender)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isAdminMode ? (
                <Shield size={28} color="#1e3a8a" />
              ) : isSignUp ? (
                <UserPlus size={28} />
              ) : isForgot ? (
                <KeyRound size={28} />
              ) : (
                <KeyRound size={28} />
              )}
            </div>

            {/* LAYER: Frame Title (Smart Animated) */}
            <h2 className="smart-layer-title">
              {isAdminMode 
                ? 'Administrator Portal' 
                : isSignUp 
                ? 'Create New Account' 
                : isForgot 
                ? (forgotStep === 'verify'
                    ? 'Verify OTP Code'
                    : forgotStep === 'reset'
                    ? 'Create New Password'
                    : forgotStep === 'success'
                    ? 'Password Updated!'
                    : 'Reset Account Password')
                : 'Sign In to SkillSync AI'}
            </h2>

            {/* LAYER: Frame Subtitle (Smart Animated) */}
            <p className="smart-layer-subtitle">
              {isAdminMode 
                ? 'Secure Gateway for system operations & content management'
                : isSignUp
                ? 'Register your profile to access Government & IT career tools'
                : isForgot
                ? (forgotStep === 'verify'
                    ? `Enter the 6-digit verification code sent to ${forgotEmail || 'your email'}`
                    : forgotStep === 'reset'
                    ? 'Set a new strong password for your SkillSync AI account'
                    : forgotStep === 'success'
                    ? 'Your credentials have been securely updated'
                    : 'Enter your registered email to receive an instant verification code')
                : 'Sign in to access your dual-sector preparation dashboard'}
            </p>
          </div>

          {/* LAYER: FORGOT PASSWORD INTERFACE (Progressive 3-Step OTP Workflow) */}
          {isForgot ? (
            <div>
              {/* Error banner */}
              {forgotError && (
                <div style={{
                  padding: '0.75rem 0.95rem',
                  borderRadius: '0.65rem',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  animation: 'fadeIn 0.2s ease-in-out'
                }}>
                  <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                  <span>{forgotError}</span>
                </div>
              )}

              {/* STEP 1: REQUEST OTP */}
              {forgotStep === 'request' && (
                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      Registered Email Address
                    </label>
                    <div className="auth-input-wrapper">
                      <span className="auth-input-icon" style={{ color: 'var(--primary-lavender)' }}>
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="user@skillsync.ai"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="input-field"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    {forgotLoading ? (
                      <>
                        <RefreshCw size={16} className="spin-animation" /> Dispatching Verification Code...
                      </>
                    ) : (
                      <>
                        Send 6-Digit OTP Code 🚀
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReturnToLogin}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                  >
                    <ArrowLeft size={16} /> Return to Sign In
                  </button>
                </form>
              )}

              {/* STEP 2: VERIFY OTP */}
              {forgotStep === 'verify' && (
                <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {/* Delivery notification */}
                  <div style={{
                    padding: '0.9rem 1.1rem',
                    borderRadius: '0.75rem',
                    background: 'var(--primary-lavender-subtle)',
                    border: '1px solid var(--primary-lavender-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden' }}>
                        <Mail size={17} color="var(--primary-lavender)" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          Code sent to: <strong>{forgotEmail}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForgotStep('request')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary-lavender)',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          flexShrink: 0,
                          marginLeft: '0.5rem'
                        }}
                      >
                        Change Email
                      </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                      A 6-digit verification code has been dispatched to your email address. Please check your Inbox and Spam/Junk folder.
                    </p>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                      Enter 6-Digit Verification Code
                    </label>
                    <div className="auth-input-wrapper">
                      <span className="auth-input-icon" style={{ color: 'var(--primary-lavender)' }}>
                        <KeyRound size={18} />
                      </span>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        placeholder="••••••"
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        className="input-field"
                        style={{
                          letterSpacing: '0.35em',
                          fontFamily: 'monospace',
                          fontSize: '1.15rem',
                          fontWeight: '800'
                        }}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Didn't get the code?
                    </span>
                    <button
                      type="button"
                      disabled={resendTimer > 0 || forgotLoading}
                      onClick={handleSendOtp}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: resendTimer > 0 ? 'var(--text-muted)' : 'var(--primary-lavender)',
                        fontSize: '0.775rem',
                        fontWeight: '700',
                        cursor: resendTimer > 0 ? 'default' : 'pointer',
                        textDecoration: resendTimer > 0 ? 'none' : 'underline'
                      }}
                    >
                      {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend OTP 🔄'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading || forgotOtp.length < 6}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    {forgotLoading ? (
                      <>
                        <RefreshCw size={16} className="spin-animation" /> Verifying Code...
                      </>
                    ) : (
                      <>
                        Verify OTP & Continue <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReturnToLogin}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem' }}
                  >
                    Cancel & Return to Sign In
                  </button>
                </form>
              )}

              {/* STEP 3: CREATE NEW PASSWORD */}
              {forgotStep === 'reset' && (
                <form onSubmit={handleCompleteReset} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      New Password
                    </label>
                    <div className="auth-input-wrapper">
                      <span className="auth-input-icon" style={{ color: 'var(--primary-lavender)' }}>
                        <Lock size={18} />
                      </span>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field"
                        style={{ paddingRight: '2.5rem' }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0
                        }}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {newPassword && (
                      <div style={{ marginTop: '6px' }}>
                        <div style={{
                          height: '4px',
                          width: '100%',
                          background: 'var(--border-color-subtle)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${getPasswordStrength(newPassword).score}%`,
                            background: getPasswordStrength(newPassword).color,
                            transition: 'all 0.3s ease'
                          }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.72rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Strength:</span>
                          <strong style={{ color: getPasswordStrength(newPassword).color }}>
                            {getPasswordStrength(newPassword).label}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      Confirm New Password
                    </label>
                    <div className="auth-input-wrapper">
                      <span className="auth-input-icon" style={{ color: 'var(--primary-lavender)' }}>
                        <ShieldCheck size={18} />
                      </span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field"
                        style={{ paddingRight: '2.5rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0
                        }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading || newPassword.length < 6 || newPassword !== confirmPassword}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    {forgotLoading ? (
                      <>
                        <RefreshCw size={16} className="spin-animation" /> Updating Password...
                      </>
                    ) : (
                      <>
                        Set New Password & Save 🔒
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReturnToLogin}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem' }}
                  >
                    Cancel
                  </button>
                </form>
              )}

              {/* STEP 4: SUCCESS CONFIRMATION */}
              {forgotStep === 'success' && (
                <div style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  background: 'var(--accent-mint-subtle)',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--accent-mint)',
                  animation: 'fadeIn 0.3s ease-in-out'
                }}>
                  <CheckCircle2 size={44} color="var(--accent-mint)" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.4rem', fontWeight: '800' }}>
                    Password Successfully Reset! 🎉
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                    Your account security credentials have been updated. You can now log in with your new password.
                  </p>
                  <button
                    onClick={handleReturnToLogin}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.75rem 1.25rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <ArrowLeft size={16} /> Proceed to Sign In
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* LAYER: FORM (Matched Shared Elements Morphing via Smart Animate) */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {authError && (
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.6rem',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  animation: 'fadeIn 0.2s ease-in-out'
                }}>
                  <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                  <span>{authError}</span>
                </div>
              )}



              {/* SHARED LAYER: Full Name (Slides in smoothly for Sign-Up) */}
              <div className={`smart-expandable-section ${isSignUp ? 'visible' : 'hidden'}`}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon" style={{ color: 'var(--accent-mint)' }}>
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      required={isSignUp}
                      placeholder="Alex Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* SHARED LAYER: Email / Username */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  {isAdminMode ? 'Administrator Username or Email' : 'Email Address'}
                </label>
                <div className="auth-input-wrapper">
                  <span
                    className="auth-input-icon"
                    style={{
                      color: isAdminMode ? '#1e3a8a' : isSignUp ? 'var(--accent-mint)' : 'var(--primary-lavender)'
                    }}
                  >
                    <Mail size={18} />
                  </span>
                  <input
                    type={isAdminMode ? 'text' : 'email'}
                    required
                    placeholder={isAdminMode ? 'admin@skillsync.ai' : 'user@skillsync.ai'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    style={{
                      borderColor: isAdminMode ? '#1e3a8a' : undefined,
                      transition: 'all 500ms ease-out'
                    }}
                  />
                </div>
              </div>

              {/* SHARED LAYER: Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    {isAdminMode ? 'Administrator Key' : 'Password'}
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => {
                        if (email) setForgotEmail(email);
                        setActiveMode('forgot');
                        setForgotStep('request');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '0.775rem',
                        color: 'var(--primary-lavender)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="auth-input-wrapper">
                  <span
                    className="auth-input-icon"
                    style={{
                      color: isAdminMode ? '#1e3a8a' : isSignUp ? 'var(--accent-mint)' : 'var(--primary-lavender)'
                    }}
                  >
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{
                      borderColor: isAdminMode ? '#1e3a8a' : undefined,
                      paddingRight: '2.75rem',
                      transition: 'all 500ms ease-out'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      borderRadius: '6px',
                      transition: 'color 0.2s ease, background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--text-main)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* SHARED LAYER: Career Sector & Save Profile (Sign Up only) */}
              <div className={`smart-expandable-section ${isSignUp ? 'visible' : 'hidden'}`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      Primary Career Sector
                    </label>
                    <select
                      value={sectorPref}
                      onChange={(e) => setSectorPref(e.target.value)}
                      className="select-field"
                      style={{ width: '100%' }}
                    >
                      <option value="it">💻 IT & Tech Software Industry</option>
                      <option value="government">🏛️ Government Sector & Competitive Exams</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SHARED LAYER: Action Button (Morphed via Smart Animate 500ms Ease-Out) */}
              <button
                type="submit"
                className="smart-layer-button"
                style={{
                  background: isAdminMode 
                    ? 'linear-gradient(135deg, #1e3a8a, #172554)' 
                    : isSignUp
                    ? 'var(--accent-mint)'
                    : 'var(--primary-lavender)',
                  color: '#ffffff',
                  boxShadow: isAdminMode 
                    ? '0 4px 14px rgba(30, 58, 138, 0.45)' 
                    : isSignUp
                    ? '0 4px 14px rgba(5, 150, 105, 0.35)'
                    : '0 4px 14px rgba(139, 92, 246, 0.35)',
                  marginTop: '0.5rem'
                }}
              >
                {isAdminMode ? (
                  <>Sign In as Administrator <ArrowRight size={18} /></>
                ) : isSignUp ? (
                  <>Complete Registration & Sign In <ArrowRight size={18} /></>
                ) : (
                  <>Sign In <ArrowRight size={18} /></>
                )}
              </button>

              {/* SHARED LAYER: Frame Switcher Link */}
              {!isAdminMode && (
                <div style={{
                  marginTop: '0.75rem',
                  textAlign: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px dashed var(--border-color)',
                  transition: 'all 500ms ease-out'
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveMode(isSignUp ? 'login' : 'signup')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isSignUp ? 'var(--accent-mint)' : 'var(--primary-lavender)',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      textDecoration: 'underline',
                      transition: 'color 500ms ease-out'
                    }}
                  >
                    {isSignUp ? 'Sign In here →' : 'Sign Up to register →'}
                  </button>
                </div>
              )}
            </form>
          )}

        </div>
      </main>

      {/* Footer Layer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.25rem',
        fontSize: '0.825rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-color-subtle)'
      }}>
        © {new Date().getFullYear()} SkillSync AI Gateway. Dedicated Security & Authentication for Government & IT Careers.
      </footer>

    </div>
  );
};

export default LoginPage;
