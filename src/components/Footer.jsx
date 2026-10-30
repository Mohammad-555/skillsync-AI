import React from 'react';
import { useSector } from '../context/SectorContext';
import { Sparkles, Building2, Code2, Heart, Shield, Terminal, Globe } from 'lucide-react';

export const Footer = () => {
  const { selectGovSector, selectITSector, goHome } = useSector();

  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      padding: '3.5rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-color-subtle)'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'var(--primary-lavender)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'Outfit' }}>
                SkillSync<span style={{ color: 'var(--primary-lavender)' }}>AI</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
              The comprehensive dual-sector career intelligence platform empowering government job aspirants and IT software professionals with voice-assisted AI tools.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="badge badge-lavender">✨ AI Speech Synthesis</span>
              <span className="badge badge-mint">🛡️ Official Verified</span>
            </div>
          </div>

          {/* Government Sector Navigation */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building2 size={16} color="var(--accent-mint)" /> Government Sector
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li>
                <a href="#/government/jobs" onClick={(e) => { e.preventDefault(); selectGovSector('jobs'); }} style={{ cursor: 'pointer' }}>
                  Official Job Notifications (Central/State)
                </a>
              </li>
              <li>
                <a href="#/government/mocktest" onClick={(e) => { e.preventDefault(); selectGovSector('mocktest'); }} style={{ cursor: 'pointer' }}>
                  AI Voice Mock Test Exam Simulator
                </a>
              </li>
              <li>
                <a href="#/government/resources" onClick={(e) => { e.preventDefault(); selectGovSector('resources'); }} style={{ cursor: 'pointer' }}>
                  Curated YouTube & PDF Learning Prep
                </a>
              </li>
              <li><span style={{ color: 'var(--text-light)' }}>Expired & Active Exam Archives</span></li>
            </ul>
          </div>

          {/* IT Sector Navigation */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Code2 size={16} color="var(--primary-lavender)" /> IT Sector
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li>
                <a href="#/it/resumebuilder" onClick={(e) => { e.preventDefault(); selectITSector('resumebuilder'); }} style={{ cursor: 'pointer' }}>
                  Professional Resume Builder & Parser
                </a>
              </li>
              <li>
                <a href="#/it/skillsync" onClick={(e) => { e.preventDefault(); selectITSector('skillsync'); }} style={{ cursor: 'pointer' }}>
                  SkillSync Skill & Role Gap Matcher
                </a>
              </li>
              <li>
                <a href="#/it/ats" onClick={(e) => { e.preventDefault(); selectITSector('ats'); }} style={{ cursor: 'pointer' }}>
                  ATS Score Scanner & Optimizer
                </a>
              </li>
              <li>
                <a href="#/it/mockinterview" onClick={(e) => { e.preventDefault(); selectITSector('mockinterview'); }} style={{ cursor: 'pointer' }}>
                  AI Voice Mock Interview Simulator
                </a>
              </li>
              <li>
                <a href="#/it/resources" onClick={(e) => { e.preventDefault(); selectITSector('resources'); }} style={{ cursor: 'pointer' }}>
                  Free IT Roadmaps & Coding Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Info & Compliance */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Platform Information</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              SkillSync AI operates with client-side AI voice processing. All uploaded resumes and data remain private and secure in your browser session.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.825rem', color: 'var(--text-light)' }}>
              <Globe size={14} /> English & Regional Support
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          paddingTop: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.825rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} SkillSync AI Platform. Crafted for Government Seekers & IT Pioneers.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
