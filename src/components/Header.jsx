import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSector } from '../context/SectorContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './Auth/AuthModal';
import {
  Sun,
  Moon,
  Building2,
  Code2,
  Sparkles,
  BookOpen,
  FileText,
  Target,
  Brain,
  MessageSquareQuote,
  Briefcase,
  Layers,
  Home,
  User,
  LogOut,
  LayoutDashboard,
  LogIn,
  ChevronDown
} from 'lucide-react';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { activeSector, setActiveSector, govTab, setGovTab, itTab, setItTab, selectGovSector, selectITSector, selectDashboard, goHome } = useSector();
  const { user, isLoggedIn, logout } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const openAuth = (tab = 'login') => {
    setAuthDefaultTab(tab);
    setAuthModalOpen(true);
  };

  const handleProfileClick = () => {
    if (selectDashboard) {
      selectDashboard('overview');
    } else {
      setActiveSector('dashboard');
    }
    setShowUserMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      minWidth: '100%',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="main-app-header-container">
        {/* Brand Logo & Name — Pinned to Far Left End */}
        <div
          onClick={goHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            minHeight: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary-lavender), #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            flexShrink: 0
          }}>
            <Sparkles size={20} />
          </div>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', lineHeight: '1.2' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                SkillSync<span style={{ color: 'var(--primary-lavender)' }}>AI</span>
              </span>
            </div>
            <span className="header-brand-subtitle" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '500', whiteSpace: 'nowrap' }}>
              Gov & IT Career Intelligence
            </span>
          </div>
        </div>

        {/* Right Action Bar — Pinned to Far Right End */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexShrink: 0,
          whiteSpace: 'nowrap'
        }}>
          {/* 1. Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              minWidth: '38px',
              minHeight: '38px',
              flexShrink: 0
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={17} color="var(--primary-lavender)" /> : <Sun size={17} color="#f59e0b" />}
          </button>

          {/* 2. Home Symbol Icon Only */}
          <button
            onClick={goHome}
            className="btn btn-secondary"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              minWidth: '38px',
              minHeight: '38px',
              flexShrink: 0,
              background: activeSector === 'landing' ? 'var(--primary-lavender-subtle)' : 'var(--bg-subtle)',
              border: activeSector === 'landing' ? '1px solid var(--primary-lavender-border)' : '1px solid var(--border-color)'
            }}
            title="Go to Home Hero Section"
            aria-label="Home"
          >
            <Home size={17} color={activeSector === 'landing' ? 'var(--primary-lavender)' : 'var(--text-main)'} />
          </button>

          {/* 3. User Profile Button */}
          {!isLoggedIn ? (
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
              <button onClick={() => openAuth('login')} className="btn btn-secondary" style={{ padding: '0.45rem 0.75rem', fontSize: '0.825rem', flexShrink: 0 }}>
                <LogIn size={14} /> Sign In
              </button>
              <button onClick={() => openAuth('signup')} className="btn btn-primary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.825rem', flexShrink: 0 }}>
                <span className="auth-btn-label-desktop">Create Account</span>
                <span className="auth-btn-label-mobile">Sign Up</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              <button
                onClick={handleProfileClick}
                className="btn btn-secondary"
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  border: user.isAdmin 
                    ? '2px solid #f59e0b' 
                    : activeSector === 'dashboard' 
                    ? '2px solid var(--primary-lavender)' 
                    : '1px solid var(--border-color)',
                  background: user.isAdmin 
                    ? 'rgba(245, 158, 11, 0.12)' 
                    : activeSector === 'dashboard' 
                    ? 'var(--primary-lavender-subtle)' 
                    : 'var(--bg-subtle)'
                }}
                title={user.isAdmin ? "Open Administrator Management Center" : "Open My Dashboard"}
              >
                <div style={{
                  width: '26px',
                  height: '26px',
                  minWidth: '26px',
                  minHeight: '26px',
                  borderRadius: '50%',
                  background: user.isAdmin 
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                    : 'linear-gradient(135deg, var(--primary-lavender), #7c3aed)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  flexShrink: 0,
                  boxShadow: user.isAdmin ? '0 2px 6px rgba(245, 158, 11, 0.35)' : '0 2px 6px rgba(139, 92, 246, 0.25)'
                }}>
                  {user.isAdmin ? '👑' : user.name.charAt(0)}
                </div>
                <span className="header-username-text" style={{ fontSize: '0.85rem', fontWeight: '700', color: user.isAdmin ? '#d97706' : 'var(--text-main)', whiteSpace: 'nowrap' }}>
                  {user.isAdmin ? 'Admin' : user.name.split(' ')[0]}
                </span>
              </button>

              <button
                onClick={logout}
                className="btn btn-secondary"
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  minWidth: '38px',
                  minHeight: '38px',
                  flexShrink: 0,
                  color: '#ef4444',
                  border: '1px solid var(--border-color)'
                }}
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contextual Secondary Module Sub-Header */}
      {activeSector !== 'landing' && activeSector !== 'dashboard' && (
        <div style={{
          background: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-color-subtle)',
          padding: '0.4rem 0',
          width: '100%',
          minWidth: '100%'
        }}>
          <div className="sub-header-nav-scroll touch-scroll-row" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            width: '100%',
            padding: '0 2rem',
            boxSizing: 'border-box',
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none'
          }}>
            {activeSector === 'government' && (
              <>
                <button
                  onClick={() => setGovTab('jobs')}
                  className={`btn ${govTab === 'jobs' ? 'btn-mint' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <Briefcase size={14} /> Job Notification Aggregator
                </button>
                <button
                  onClick={() => setGovTab('mocktest')}
                  className={`btn ${govTab === 'mocktest' ? 'btn-mint' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <Brain size={14} /> AI Voice Mock Test Module
                </button>
                <button
                  onClick={() => setGovTab('resources')}
                  className={`btn ${govTab === 'resources' ? 'btn-mint' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <BookOpen size={14} /> Free Learning Resources
                </button>
              </>
            )}

            {activeSector === 'it' && (
              <>
                <button
                  onClick={() => setItTab('jobfinder')}
                  className={`btn ${itTab === 'jobfinder' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <Briefcase size={14} /> IT Job Finder (Direct Links)
                </button>
                <button
                  onClick={() => setItTab('resumebuilder')}
                  className={`btn ${itTab === 'resumebuilder' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <FileText size={14} /> Resume Builder Module
                </button>
                <button
                  onClick={() => setItTab('skillsync')}
                  className={`btn ${itTab === 'skillsync' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <Target size={14} /> SkillSync Role & Suggestions
                </button>
                <button
                  onClick={() => setItTab('ats')}
                  className={`btn ${itTab === 'ats' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <Layers size={14} /> ATS Score Evaluator
                </button>
                <button
                  onClick={() => setItTab('mockinterview')}
                  className={`btn ${itTab === 'mockinterview' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <MessageSquareQuote size={14} /> AI Voice Mock Interview
                </button>
                <button
                  onClick={() => setItTab('resources')}
                  className={`btn ${itTab === 'resources' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  <BookOpen size={14} /> Free IT Resources
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authDefaultTab}
      />
    </header>
  );
};
