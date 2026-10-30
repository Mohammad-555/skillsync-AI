import React, { useState, useEffect } from 'react';
import { useAuth, MOCK_ADMIN_USER } from '../../context/AuthContext';
import { useSector } from '../../context/SectorContext';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  HelpCircle,
  ArrowLeft,
  Trash2,
  Wrench,
  ShieldAlert,
  KeyRound,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const {
    login,
    signup,
    quickAccessAccounts,
    removeQuickAccessAccount,
    requestPasswordReset,
    verifyResetOtp,
    completePasswordReset
  } = useAuth();
  const { selectGovSector, selectITSector } = useSector();

  const [activeTab, setActiveTab] = useState(defaultTab); // 'login' | 'signup' | 'forgot' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [sectorPref, setSectorPref] = useState('it');
  const [addToQuickAccess, setAddToQuickAccess] = useState(true);
  const [authError, setAuthError] = useState('');

  // Multi-step Forgot Password state: 'request' | 'verify' | 'reset' | 'success'
  const [forgotStep, setForgotStep] = useState('request');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [simulatedOtpNotice, setSimulatedOtpNotice] = useState('');
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

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (activeTab === 'login') {
      const res = await login(email, password);
      if (res.success) {
        if (res.user?.sectorPreference === 'government') selectGovSector();
        else selectITSector();
        onClose();
      } else {
        setAuthError(res.error || 'Invalid email or password.');
      }
    } else if (activeTab === 'signup') {
      const res = await signup(name, email, password, sectorPref, addToQuickAccess);
      if (res.success) {
        if (sectorPref === 'government') selectGovSector();
        else selectITSector();
        onClose();
      } else {
        setAuthError(res.error || 'Failed to sign up. Please try again.');
      }
    } else if (activeTab === 'admin') {
      const cleanEmail = email.trim();
      const cleanPass = password.trim();
      if (!cleanEmail || !cleanPass) {
        setAuthError('Please enter both administrator email and password.');
        return;
      }
      const res = await login(cleanEmail, cleanPass, 'admin');
      if (res.success) {
        selectITSector();
        onClose();
      } else {
        setAuthError(res.error || 'Invalid administrator credentials. Access denied.');
      }
    }
  };

  // Forgot Password handlers
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
        setSimulatedOtpNotice(res.otp || '');
        setForgotStep('verify');
        setResendTimer(60);
      } else {
        setForgotError(res.error || 'Failed to send OTP code.');
      }
    } catch (err) {
      setForgotLoading(false);
      setForgotError(err.message || 'Error sending verification code.');
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
      setForgotError(err.message || 'Verification failed.');
    }
  };

  const handleCompleteReset = async (e) => {
    if (e) e.preventDefault();
    setForgotError('');
    if (newPassword.length < 6) {
      setForgotError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match.');
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
    setActiveTab('login');
    setForgotStep('request');
    setForgotOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotError('');
    setSimulatedOtpNotice('');
  };

  const handleSelectQuickAccount = async (account) => {
    setEmail(account.email);
    setPassword('••••••••');
    const demoKey = account.demoKey || (account.isAdmin ? 'admin' : account.sectorPreference === 'government' ? 'gov' : 'it');
    const res = await login(account.email, 'password', demoKey);
    if (res && res.success) {
      if (account.sectorPreference === 'government') selectGovSector('jobs');
      else selectITSector('resumebuilder');
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '500px',
        width: '100%',
        padding: '2.25rem',
        background: 'var(--bg-surface)',
        position: 'relative',
        borderRadius: '1.25rem',
        border: activeTab === 'admin' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-color)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: activeTab === 'admin' ? 'rgba(239, 68, 68, 0.15)' : 'linear-gradient(135deg, var(--primary-lavender), #7c3aed)',
            color: activeTab === 'admin' ? '#ef4444' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.85rem auto'
          }}>
            {activeTab === 'admin' ? <ShieldAlert size={24} /> : <Sparkles size={24} />}
          </div>
          <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            {activeTab === 'login' && 'Welcome Back to SkillSync AI'}
            {activeTab === 'signup' && 'Create Your Career Account'}
            {activeTab === 'admin' && 'Administrator Control Gateway'}
            {activeTab === 'forgot' && 'Reset Account Password'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Access tailored tools for Government & IT career development
          </p>
        </div>

        {/* Mode Switcher Bar */}
        {activeTab !== 'forgot' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '4px',
            background: 'var(--bg-subtle)',
            padding: '4px',
            borderRadius: '0.75rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setActiveTab('login')}
              style={{
                padding: '0.5rem 0.35rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '0.825rem',
                fontWeight: '700',
                cursor: 'pointer',
                background: activeTab === 'login' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'login' ? 'var(--primary-lavender)' : 'var(--text-muted)',
                boxShadow: activeTab === 'login' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              style={{
                padding: '0.5rem 0.35rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '0.825rem',
                fontWeight: '700',
                cursor: 'pointer',
                background: activeTab === 'signup' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'signup' ? 'var(--primary-lavender)' : 'var(--text-muted)',
                boxShadow: activeTab === 'signup' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Register
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setEmail('');
                setPassword('');
                setAuthError('');
              }}
              style={{
                padding: '0.5rem 0.35rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '0.825rem',
                fontWeight: '700',
                cursor: 'pointer',
                background: activeTab === 'admin' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'admin' ? '#ef4444' : 'var(--text-muted)',
                boxShadow: activeTab === 'admin' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              🛠️ Admin
            </button>
          </div>
        )}

        {/* GOOGLE SIGN IN BUTTON */}
        {(activeTab === 'login' || activeTab === 'signup') && (
          <>
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="account-card-hover"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Sign in with Google
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1rem 0',
              color: 'var(--text-muted)',
              fontSize: '0.725rem',
              fontWeight: '700'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color-subtle)' }} />
              <span style={{ padding: '0 0.65rem', letterSpacing: '0.04em' }}>OR CONTINUE WITH EMAIL</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color-subtle)' }} />
            </div>
          </>
        )}

        {/* Standard Quick Access Accounts List (Only in Sign In Tab) */}
        {activeTab === 'login' && (quickAccessAccounts || []).length > 0 && (
          <div style={{
            marginBottom: '1.25rem',
            padding: '0.85rem',
            borderRadius: '0.85rem',
            background: 'var(--primary-lavender-subtle)',
            border: '1px dashed var(--primary-lavender-border)'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-lavender)', display: 'block', marginBottom: '0.65rem' }}>
              👤 QUICK ACCESS ACCOUNTS
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {quickAccessAccounts.map((account, idx) => (
                <div
                  key={account.id || account.demoKey || idx}
                  onClick={() => handleSelectQuickAccount(account)}
                  style={{
                    padding: '0.65rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="account-card-hover"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary-lavender-subtle)',
                      color: 'var(--primary-lavender)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem'
                    }}>
                      {account.name ? account.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block', lineHeight: '1.2' }}>
                        {account.name}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {account.email}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeQuickAccessAccount(account.id || account.demoKey);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    title="Delete Account from Quick Access"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORGOT PASSWORD PROGRESSIVE OTP FORM */}
        {activeTab === 'forgot' ? (
          <div>
            {forgotError && (
              <div style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '0.5rem',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid #ef4444',
                color: '#ef4444',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '1rem'
              }}>
                <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                <span>{forgotError}</span>
              </div>
            )}

            {/* STEP 1: REQUEST OTP */}
            {forgotStep === 'request' && (
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Registered Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      required
                      placeholder="user@skillsync.ai"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="input-field"
                      style={{ paddingLeft: '2.5rem' }}
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {forgotLoading ? (
                    <><RefreshCw size={15} className="spin-animation" /> Dispatching OTP...</>
                  ) : (
                    <>Send 6-Digit OTP Code 🚀</>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReturnToLogin}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.55rem', fontSize: '0.85rem' }}
                >
                  <ArrowLeft size={14} /> Return to Sign In
                </button>
              </form>
            )}

            {/* STEP 2: VERIFY OTP */}
            {forgotStep === 'verify' && (
              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  background: 'var(--primary-lavender-subtle)',
                  border: '1px solid var(--primary-lavender-border)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
                    <Mail size={14} color="var(--primary-lavender)" style={{ flexShrink: 0 }} />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      Sent to: <strong>{forgotEmail}</strong>
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
                      textDecoration: 'underline'
                    }}
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                    Enter 6-Digit OTP Code
                  </label>
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-lavender)' }} />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="••••••"
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value.replace(/[^0-9]/g, ''))}
                      className="input-field"
                      style={{
                        paddingLeft: '2.5rem',
                        letterSpacing: '0.3em',
                        fontFamily: 'monospace',
                        fontWeight: '800'
                      }}
                      autoFocus
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Didn't receive it?</span>
                  <button
                    type="button"
                    disabled={resendTimer > 0 || forgotLoading}
                    onClick={handleSendOtp}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: resendTimer > 0 ? 'var(--text-muted)' : 'var(--primary-lavender)',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      cursor: resendTimer > 0 ? 'default' : 'pointer',
                      textDecoration: resendTimer > 0 ? 'none' : 'underline'
                    }}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP 🔄'}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading || forgotOtp.length < 6}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {forgotLoading ? (
                    <><RefreshCw size={15} className="spin-animation" /> Verifying...</>
                  ) : (
                    <>Verify Code & Continue <ArrowRight size={15} /></>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReturnToLogin}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.55rem', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
              </form>
            )}

            {/* STEP 3: SET NEW PASSWORD */}
            {forgotStep === 'reset' && (
              <form onSubmit={handleCompleteReset} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-lavender)' }} />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-field"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <ShieldCheck size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-lavender)' }} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading || newPassword.length < 6 || newPassword !== confirmPassword}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {forgotLoading ? (
                    <><RefreshCw size={15} className="spin-animation" /> Updating Password...</>
                  ) : (
                    <>Update Password 🔒</>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReturnToLogin}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.55rem', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
              </form>
            )}

            {/* STEP 4: SUCCESS */}
            {forgotStep === 'success' && (
              <div style={{
                textAlign: 'center',
                padding: '1.25rem',
                background: 'var(--accent-mint-subtle)',
                borderRadius: '0.85rem',
                border: '1px solid var(--accent-mint)'
              }}>
                <CheckCircle2 size={36} color="var(--accent-mint)" style={{ margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem', fontWeight: '800' }}>
                  Password Reset Complete! 🎉
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
                  Your password has been changed. You can now sign in with your updated credentials.
                </p>
                <button
                  onClick={handleReturnToLogin}
                  className="btn btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                >
                  <ArrowLeft size={14} /> Back to Sign In
                </button>
              </div>
            )}
          </div>
        ) : (
          /* STANDARD FORM INPUTS */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {authError && (
              <div style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '0.5rem',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid #ef4444',
                color: '#ef4444',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}>
                <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}
            {activeTab === 'signup' && (
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Alex Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                {activeTab === 'admin' ? 'Administrator Username or Email' : 'Email Address'}
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: activeTab === 'admin' ? '#ef4444' : 'var(--text-muted)' }} />
                <input
                  type={activeTab === 'admin' ? 'text' : 'email'}
                  required
                  placeholder={activeTab === 'admin' ? 'admin@skillsync.ai' : 'name@domain.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                  {activeTab === 'admin' ? 'Administrator Key' : 'Password'}
                </label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot');
                      setForgotStep('request');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.75rem',
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
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: activeTab === 'admin' ? '#ef4444' : 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
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
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Primary Career Sector</label>
                  <select
                    value={sectorPref}
                    onChange={(e) => setSectorPref(e.target.value)}
                    className="select-field"
                    style={{ width: '100%' }}
                  >
                    <option value="it">IT & Tech Software Sector</option>
                    <option value="government">Government & Competitive Exam Sector</option>
                  </select>
                </div>

                {/* Quick Access Account Checkbox */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '0.65rem',
                  background: 'var(--primary-lavender-subtle)',
                  border: '1px solid var(--primary-lavender-border)'
                }}>
                  <input
                    type="checkbox"
                    id="modalQuickAccessCheck"
                    checked={addToQuickAccess}
                    onChange={(e) => setAddToQuickAccess(e.target.checked)}
                    style={{ marginTop: '3px', cursor: 'pointer', width: '15px', height: '15px', accentColor: 'var(--primary-lavender)' }}
                  />
                  <label htmlFor="modalQuickAccessCheck" style={{ fontSize: '0.8rem', color: 'var(--text-main)', cursor: 'pointer', lineHeight: '1.3' }}>
                    <strong>Add to Quick Access Accounts</strong>
                    <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                      Save profile to Quick Access list on this device.
                    </span>
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                marginTop: '0.5rem',
                background: activeTab === 'admin' ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : undefined
              }}
            >
              {activeTab === 'login' && <>Sign In to Account <ArrowRight size={16} /></>}
              {activeTab === 'signup' && <>Create Account & Save <ArrowRight size={16} /></>}
              {activeTab === 'admin' && <>Authenticate as Administrator 🛠️ <ArrowRight size={16} /></>}
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
