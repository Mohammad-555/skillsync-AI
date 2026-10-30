import React from 'react';
import { useSector } from '../context/SectorContext';
import {
  Building2,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  FileText,
  Target,
  Brain,
  Layers,
  Award,
  Briefcase
} from 'lucide-react';

export const Hero = () => {
  const { selectGovSector, selectITSector } = useSector();

  return (
    <div style={{ padding: 'clamp(1.75rem, 4vw, 3.5rem) 0 2rem 0' }}>
      <div className="container">
        {/* Main Hero Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '860px',
          margin: '0 auto clamp(2rem, 4vw, 3.5rem) auto',
          position: 'relative'
        }}>
          {/* Subtle Ambient Glass Underlay for Max Text Contrast */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-color-subtle)',
            boxShadow: 'var(--shadow-sm)',
            zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(1rem, 3vw, 1.75rem)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--primary-lavender-border)',
              color: 'var(--primary-lavender)',
              fontWeight: '700',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Sparkles size={16} /> Next-Gen AI Platform for Career Success
            </div>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 5.5vw, 3.2rem)',
              lineHeight: '1.2',
              color: 'var(--text-main)',
              marginBottom: '1.25rem',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              Bridge the Gap Between{' '}
              <span style={{
                background: 'linear-gradient(135deg, #059669, #0284c7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '900'
              }}>
                Government Jobs
              </span>{' '}
              &{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '900'
              }}>
                IT Excellence
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
              color: 'var(--text-main)',
              opacity: 0.9,
              lineHeight: '1.65',
              maxWidth: '780px',
              margin: '0 auto 2rem auto',
              fontWeight: '500'
            }}>
              Skillsync AI delivers a dedicated suite of voice-narrated mock exams, official job tracking, AI resume builders, ATS score evaluation, and interactive voice interview coaching tailored specifically for your career domain.
            </p>

            {/* Quick Metrics Pills Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              fontSize: '0.85rem'
            }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'var(--bg-surface)',
                padding: '0.4rem 0.85rem',
                borderRadius: '50px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                fontWeight: '700',
                color: 'var(--text-main)'
              }}>
                <CheckCircle2 size={16} color="var(--accent-mint)" /> 100% Free Resources
              </span>

              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'var(--bg-surface)',
                padding: '0.4rem 0.85rem',
                borderRadius: '50px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                fontWeight: '700',
                color: 'var(--text-main)'
              }}>
                <Volume2 size={16} color="var(--primary-lavender)" /> AI Voice Controls
              </span>

              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'var(--bg-surface)',
                padding: '0.4rem 0.85rem',
                borderRadius: '50px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                fontWeight: '700',
                color: 'var(--text-main)'
              }}>
                <ShieldCheck size={16} color="var(--accent-blue)" /> Verified Job Links
              </span>
            </div>
          </div>
        </div>

        {/* Dedicated Sector Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1.25rem, 3vw, 2rem)',
          marginBottom: '3rem'
        }}>
          {/* Government Sector Card */}
          <div className="glass-panel" style={{
            padding: 'clamp(1.25rem, 3vw, 2.25rem)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--accent-mint)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'var(--accent-mint-subtle)',
                color: 'var(--accent-mint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building2 size={28} />
              </div>
              <span className="badge badge-mint">Official Portal Tracker</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: '800' }}>
              Government Sector
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Central & State job notification aggregators with qualification filters, expired vs active trackers, free YouTube & PDF prep guides, and AI voice mock test exams.
            </p>

            {/* Feature Bullet List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={18} color="var(--accent-mint)" />
                <span><strong>Job Notifications:</strong> Central/State & Qualification Filters</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <Volume2 size={18} color="var(--accent-mint)" />
                <span><strong>Voice Mock Tests:</strong> Speech narrated practice exams</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <Award size={18} color="var(--accent-mint)" />
                <span><strong>Free Learning:</strong> Curated YouTube & PDF study packs</span>
              </div>
            </div>

            <button
              onClick={() => selectGovSector('jobs')}
              className="btn btn-mint"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: '700' }}
            >
              Explore Government Sector <ArrowRight size={18} />
            </button>
          </div>

          {/* IT Sector Card */}
          <div className="glass-panel" style={{
            padding: 'clamp(1.25rem, 3vw, 2.25rem)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '4px solid var(--primary-lavender)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'var(--primary-lavender-subtle)',
                color: 'var(--primary-lavender)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Code2 size={28} />
              </div>
              <span className="badge badge-lavender">Tech & Software Hub</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: '800' }}>
              IT & Tech Sector
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Interactive Resume Builder with parsing, SkillSync skill-role alignment, real-time ATS scoring, and AI Voice-powered Technical & HR mock interview sessions.
            </p>

            {/* Feature Bullet List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <Briefcase size={18} color="var(--primary-lavender)" />
                <span><strong>IT Job Finder:</strong> Direct application links from trusted tech sites</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <FileText size={18} color="var(--primary-lavender)" />
                <span><strong>Resume Builder:</strong> Upload, parse & export modern templates</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--primary-lavender)' }}>
                <Brain size={18} color="var(--primary-lavender)" />
                <span><strong>AI Voice Interviewer:</strong> Live voice & text mock sessions</span>
              </div>
            </div>

            <button
              onClick={() => selectITSector('jobfinder')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: '700' }}
            >
              Explore IT Sector & Job Finder <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
