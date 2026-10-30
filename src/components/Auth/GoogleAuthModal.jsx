import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSector } from '../../context/SectorContext';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { supabaseSignInWithOAuth } from '../../services/supabaseService';
import { X, UserPlus, Globe, AlertCircle } from 'lucide-react';

export const GoogleAuthModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const { selectGovSector, selectITSector } = useSector();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [oauthError, setOauthError] = useState('');

  if (!isOpen) return null;

  const hasSupabase = isSupabaseConfigured();

  const handleLiveOAuth = async () => {
    setIsLoading(true);
    setOauthError('');
    try {
      const { error } = await supabaseSignInWithOAuth('google');
      if (error) {
        setOauthError(error.message || 'Failed to initiate Google OAuth. Check Supabase settings.');
        setIsLoading(false);
      }
    } catch (err) {
      setOauthError(err.message || 'Google OAuth failed.');
      setIsLoading(false);
    }
  };

  const GOOGLE_ACCOUNTS = [
    {
      id: 'g-acc-1',
      name: 'Alex Vance',
      email: 'alex.vance@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      sector: 'it'
    },
    {
      id: 'g-acc-2',
      name: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      sector: 'government'
    }
  ];

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
    setIsLoading(true);
    setTimeout(async () => {
      const res = await login(account.email, '', account.sector === 'government' ? 'gov' : 'it');
      setIsLoading(false);
      if (res && res.success) {
        if (account.sector === 'government') {
          selectGovSector();
        } else {
          selectITSector();
        }
        if (onClose) onClose();
      }
    }, 600);
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;
    setIsLoading(true);
    setTimeout(async () => {
      const res = await login(customEmail, '', 'google');
      setIsLoading(false);
      if (res && res.success) {
        selectITSector();
        if (onClose) onClose();
      }
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: '#ffffff',
        color: '#202124',
        borderRadius: '1.5rem',
        padding: '2.25rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        position: 'relative',
        fontFamily: "'Google Sans', Roboto, Arial, sans-serif"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f1f3f4',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#5f6368'
          }}
        >
          <X size={18} />
        </button>

        {/* Google Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ margin: '0 auto 0.75rem auto', display: 'flex', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '500', color: '#202124', marginBottom: '0.35rem' }}>
            Choose an account
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#5f6368' }}>
            to continue to <strong style={{ color: '#1a73e8' }}>SkillSync AI Gateway</strong>
          </p>
        </div>

        {/* Loading Spinner State */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #1a73e8',
              borderRadius: '50%',
              margin: '0 auto 1.25rem auto',
              animation: 'spin 1s linear infinite'
            }} />
            <h4 style={{ fontSize: '1.05rem', color: '#202124', marginBottom: '0.4rem' }}>
              Authenticating with Google...
            </h4>
            <p style={{ fontSize: '0.825rem', color: '#5f6368' }}>
              Signing in as {selectedAccount ? selectedAccount.email : (customEmail || 'Google Account')}
            </p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <div>
            {oauthError && (
              <div style={{
                padding: '0.75rem',
                marginBottom: '1rem',
                borderRadius: '0.5rem',
                background: '#fde8e8',
                border: '1px solid #f98080',
                color: '#9b1c1c',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{oauthError}</span>
              </div>
            )}

            {/* Live OAuth Button (if Supabase configured) */}
            {hasSupabase && (
              <div style={{ marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={handleLiveOAuth}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.65rem',
                    background: '#1a73e8',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(26,115,232,0.3)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1557b0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#1a73e8'}
                >
                  <Globe size={18} />
                  Sign In with Live Google (Supabase)
                </button>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0.85rem 0', color: '#5f6368', fontSize: '0.72rem', fontWeight: '600' }}>
                  <div style={{ flex: 1, height: '1px', background: '#dadce0' }} />
                  <span style={{ padding: '0 0.5rem' }}>OR CHOOSE A QUICK DEMO PROFILE</span>
                  <div style={{ flex: 1, height: '1px', background: '#dadce0' }} />
                </div>
              </div>
            )}

            {/* List of Google Accounts */}
            {!showCustomInput ? (
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #dadce0', borderBottom: '1px solid #dadce0', marginBottom: '1.5rem' }}>
                {GOOGLE_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => handleSelectAccount(acc)}
                    style={{
                      padding: '0.9rem 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f1f3f4',
                      transition: 'background 0.2s ease'
                    }}
                    className="google-acc-row"
                  >
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '0.925rem', color: '#202124', display: 'block', lineHeight: '1.3', fontWeight: '500' }}>
                        {acc.name}
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: '#5f6368' }}>
                        {acc.email}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Add Another Account Button */}
                <div
                  onClick={() => setShowCustomInput(true)}
                  style={{
                    padding: '0.9rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer'
                  }}
                  className="google-acc-row"
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#f1f3f4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5f6368'
                  }}>
                    <UserPlus size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.9rem', color: '#1a73e8', fontWeight: '500' }}>
                      Use another Google account
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Custom Google Email Form */
              <form onSubmit={handleCustomGoogleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '500', color: '#202124', display: 'block', marginBottom: '6px' }}>
                    Enter Google Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #dadce0',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #dadce0',
                      background: '#fff',
                      color: '#1a73e8',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: '#1a73e8',
                      color: '#fff',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* Google Security Policy Footer */}
            <p style={{ fontSize: '0.775rem', color: '#5f6368', textAlign: 'center', lineHeight: '1.4' }}>
              To continue, Google will share your name, email address, language preference, and profile picture with SkillSync AI.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .google-acc-row:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};
