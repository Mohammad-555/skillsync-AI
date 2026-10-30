import React, { useState, useEffect, useMemo } from 'react';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  TrendingUp,
  Cpu,
  Plus,
  X,
  Code,
  Search,
  Filter,
  RefreshCw,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { fetchITRolesFromAPI, COMPREHENSIVE_IT_ROLES } from '../../services/rolesApiService';

const ROLE_CATEGORIES = [
  'All',
  'Web & Full Stack',
  'AI & Data Science',
  'Cloud & DevOps',
  'Cybersecurity',
  'Mobile Apps',
  'Quality & Testing',
  'Web3 & Emerging',
  'Systems & Hardware'
];

export const SkillSyncRoleMatcher = () => {
  const [allRoles, setAllRoles] = useState(COMPREHENSIVE_IT_ROLES);
  const [rolesList, setRolesList] = useState(COMPREHENSIVE_IT_ROLES);
  const [selectedRoleId, setSelectedRoleId] = useState('fullstack');
  const [roleSearchTerm, setRoleSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [apiSource, setApiSource] = useState('live-api');

  const [userSkills, setUserSkills] = useState(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']);
  const [customSkillsPool, setCustomSkillsPool] = useState(['Vue.js', 'Go', 'Rust']);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Fetch roles from API with search & category filters
  useEffect(() => {
    let isMounted = true;
    const loadRoles = async () => {
      setIsLoadingRoles(true);
      try {
        const response = await fetchITRolesFromAPI({
          search: roleSearchTerm,
          category: selectedCategory
        });
        if (isMounted && response?.data) {
          setRolesList(response.data);
          if (response.source) setApiSource(response.source);
        }
      } catch (err) {
        console.error('Failed to load roles from API:', err);
      } finally {
        if (isMounted) setIsLoadingRoles(false);
      }
    };

    const timer = setTimeout(loadRoles, 150);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [roleSearchTerm, selectedCategory]);

  // Active target role (searched first from current filtered, then fallback to full catalog)
  const targetRole = useMemo(() => {
    return (
      rolesList.find(r => r.id === selectedRoleId) ||
      allRoles.find(r => r.id === selectedRoleId) ||
      rolesList[0] ||
      allRoles[0]
    );
  }, [rolesList, allRoles, selectedRoleId]);

  // Dynamically compile available industry skills pool from all catalog roles
  const fullSkillsPool = useMemo(() => {
    const skillsSet = new Set();
    allRoles.forEach(role => {
      role.requiredSkills?.forEach(s => skillsSet.add(s));
      role.niceToHave?.forEach(s => skillsSet.add(s));
    });
    customSkillsPool.forEach(s => skillsSet.add(s));
    return Array.from(skillsSet);
  }, [allRoles, customSkillsPool]);

  const [showAllSkills, setShowAllSkills] = useState(false);

  // Keep selected skills and custom skills at the front of the list so they remain visible
  const sortedSkillsPool = useMemo(() => {
    const selected = [];
    const unselected = [];
    fullSkillsPool.forEach(skill => {
      if (userSkills.includes(skill) || customSkillsPool.includes(skill)) {
        selected.push(skill);
      } else {
        unselected.push(skill);
      }
    });
    return [...selected, ...unselected];
  }, [fullSkillsPool, userSkills, customSkillsPool]);

  const INITIAL_SKILLS_LIMIT = 15;
  const visibleSkills = showAllSkills ? sortedSkillsPool : sortedSkillsPool.slice(0, INITIAL_SKILLS_LIMIT);
  const remainingCount = Math.max(0, sortedSkillsPool.length - INITIAL_SKILLS_LIMIT);

  const toggleSkill = (skill) => {
    setUserSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e) => {
    e?.preventDefault();
    const cleaned = newSkillInput.trim();
    if (!cleaned) return;

    if (!customSkillsPool.includes(cleaned) && !fullSkillsPool.includes(cleaned)) {
      setCustomSkillsPool(prev => [...prev, cleaned]);
    }
    if (!userSkills.includes(cleaned)) {
      setUserSkills(prev => [...prev, cleaned]);
    }
    setNewSkillInput('');
  };

  const handleRemoveCustomSkill = (skill) => {
    setCustomSkillsPool(prev => prev.filter(s => s !== skill));
    setUserSkills(prev => prev.filter(s => s !== skill));
  };

  // Calculate Match Score
  const matchedRequired = targetRole?.requiredSkills ? targetRole.requiredSkills.filter(s => userSkills.includes(s)) : [];
  const missingRequired = targetRole?.requiredSkills ? targetRole.requiredSkills.filter(s => !userSkills.includes(s)) : [];
  const matchPercentage = targetRole?.requiredSkills?.length
    ? Math.round((matchedRequired.length / targetRole.requiredSkills.length) * 100)
    : 0;

  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, var(--primary-lavender-subtle), var(--bg-surface))',
        borderLeft: '5px solid var(--primary-lavender)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-lavender">🎯 Precision Role Matcher</span>
          <span className="badge badge-mint">AI Career Alignment</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          SkillSync — Role & Skill Gap Analysis
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
          Select your target IT career role, check your current tech stack, or add custom unlisted skills to evaluate role compatibility and get a personalized growth path.
        </p>
      </div>

      <div className="skillsync-layout-grid">
        {/* Left: Role Selection & Skill Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0, width: '100%' }}>
          {/* Target Role Selector with Live Search & API Integration */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '0.04em' }}>
                SELECT TARGET IT ROLE
              </label>
              <span className="badge badge-mint" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                {rolesList.length} Roles • API Connected
              </span>
            </div>

            {/* Role Search Bar */}
            <div style={{ position: 'relative', marginBottom: '0.85rem' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                value={roleSearchTerm}
                onChange={(e) => setRoleSearchTerm(e.target.value)}
                placeholder="Search roles (e.g. Frontend, DevOps, AI, iOS, Security)..."
                className="input-field"
                style={{
                  paddingLeft: '2.4rem',
                  paddingRight: roleSearchTerm ? '2.2rem' : '1rem',
                  fontSize: '0.875rem',
                  width: '100%',
                  borderRadius: '0.65rem'
                }}
              />
              {roleSearchTerm && (
                <button
                  type="button"
                  onClick={() => setRoleSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    padding: '2px'
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div style={{
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              marginBottom: '0.85rem',
              scrollbarWidth: 'thin'
            }}>
              {ROLE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.725rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    borderRadius: '9999px'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scrollable Role List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              maxHeight: '380px',
              overflowY: 'auto',
              paddingRight: '0.25rem'
            }}>
              {isLoadingRoles ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  <RefreshCw size={20} className="animate-spin" style={{ margin: '0 auto 0.5rem auto', color: 'var(--primary-lavender)', animation: 'spin 1s linear infinite' }} />
                  Fetching roles via API...
                </div>
              ) : rolesList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'var(--bg-subtle)', borderRadius: '0.75rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    No roles found matching "{roleSearchTerm}"
                  </p>
                  <button
                    type="button"
                    onClick={() => { setRoleSearchTerm(''); setSelectedCategory('All'); }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                  >
                    Reset Search & Filters
                  </button>
                </div>
              ) : (
                rolesList.map(role => {
                  const isSelected = selectedRoleId === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRoleId(role.id)}
                      style={{
                        padding: '0.9rem 1rem',
                        borderRadius: '0.75rem',
                        border: `2px solid ${isSelected ? 'var(--primary-lavender)' : 'var(--border-color)'}`,
                        background: isSelected ? 'var(--primary-lavender-subtle)' : 'var(--bg-surface)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.25rem', fontWeight: '700' }}>
                          {role.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{role.category}</span>
                          <span style={{
                            fontSize: '0.675rem',
                            color: 'var(--accent-mint)',
                            background: 'var(--accent-mint-subtle)',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            fontWeight: '600'
                          }}>
                            {role.requiredSkills?.length || 0} Core Skills
                          </span>
                        </div>
                      </div>
                      <Target size={20} color={isSelected ? 'var(--primary-lavender)' : 'var(--text-light)'} />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* User Skills Selector */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-lavender)' }}>
              Select Your Current Skills ({userSkills.length})
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Click to toggle skills you master, or add custom skills not listed in the pool below:
            </p>

            {/* Add Custom Skill Input Form */}
            <form onSubmit={handleAddCustomSkill} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add unlisted skill (e.g. Vue.js, Go, Rust, Swift)..."
                className="input-field"
                style={{ fontSize: '0.875rem' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
                <Plus size={16} /> Add
              </button>
            </form>

            {/* Skill Pills Pool */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {visibleSkills.map(skill => {
                const isSelected = userSkills.includes(skill);
                const isCustom = customSkillsPool.includes(skill);
                return (
                  <div
                    key={skill}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`btn ${isSelected ? (isCustom ? 'btn-mint' : 'btn-primary') : 'btn-secondary'}`}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.825rem', borderRadius: '6px' }}
                    >
                      {isSelected && <CheckCircle2 size={13} />} {skill} {isCustom && '⭐'}
                    </button>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomSkill(skill)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Remove custom skill"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* View More / Show Less Skills Toggle Button */}
            {sortedSkillsPool.length > INITIAL_SKILLS_LIMIT && (
              <div style={{ marginTop: '1rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.85rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    padding: '0.55rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    background: 'var(--bg-subtle)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--primary-lavender)',
                    borderRadius: '0.65rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {showAllSkills ? (
                    <>
                      <span>Show Less Skills</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>View More Skills (+{remainingCount} more in catalog)</span>
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Alignment Match Dashboard & Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0, width: '100%' }}>
          {/* Match Score & Compatibility Command Center */}
          <div className="glass-panel" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
            {/* Top row: Badge & Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="var(--primary-lavender)" />
                <span style={{ fontSize: '0.825rem', fontWeight: '800', letterSpacing: '0.04em', color: 'var(--text-main)', textTransform: 'uppercase' }}>
                  Overall Compatibility Score
                </span>
              </div>
              <span className={`badge ${matchPercentage >= 75 ? 'badge-mint' : matchPercentage >= 50 ? 'badge-lavender' : 'badge-lavender'}`} style={{
                background: matchPercentage >= 75 ? 'var(--accent-mint-subtle)' : matchPercentage >= 50 ? 'rgba(139, 92, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                color: matchPercentage >= 75 ? 'var(--accent-mint)' : matchPercentage >= 50 ? 'var(--primary-lavender)' : '#d97706',
                fontWeight: '700',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem'
              }}>
                {matchPercentage >= 75 ? '🟢 High Match (Ready)' : matchPercentage >= 50 ? '🟡 Moderate Match (Bridge Gaps)' : '🔴 Early Stage (Action Needed)'}
              </span>
            </div>

            {/* Visual Gauge + Role Summary Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.25rem',
              background: 'var(--bg-subtle)',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)',
              marginBottom: '1.25rem',
              flexWrap: 'wrap'
            }}>
              {/* Circular Radial Score Widget */}
              <div style={{
                width: '104px',
                height: '104px',
                borderRadius: '50%',
                background: `conic-gradient(${matchPercentage >= 75 ? '#10b981' : matchPercentage >= 50 ? 'var(--primary-lavender)' : '#f59e0b'} ${matchPercentage * 3.6}deg, var(--border-color-subtle) 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'var(--bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '1.85rem',
                    fontWeight: '800',
                    fontFamily: 'Outfit',
                    lineHeight: '1',
                    color: matchPercentage >= 75 ? 'var(--accent-mint)' : matchPercentage >= 50 ? 'var(--primary-lavender)' : '#f59e0b'
                  }}>
                    {matchPercentage}%
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>
                    Match
                  </span>
                </div>
              </div>

              {/* Assessment Description */}
              <div style={{ flex: '1 1 200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                  <Target size={16} color="var(--primary-lavender)" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                    {targetRole?.name || 'Selected Role'}
                  </h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 0.5rem 0' }}>
                  {matchPercentage >= 75
                    ? 'Strong technical alignment! Your profile matches the primary core requirements for this position.'
                    : matchPercentage >= 50
                    ? 'Good baseline fit. Bridge the critical missing skill gaps below to reach high competitive alignment.'
                    : 'Foundational match. Follow the step-by-step roadmap below to develop the required skill prerequisites.'}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Domain Category: <strong style={{ color: 'var(--text-main)' }}>{targetRole?.category || 'IT'}</strong>
                </span>
              </div>
            </div>

            {/* Quick Summary Metrics Tri-Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                background: 'var(--bg-surface-elevated)',
                padding: '0.75rem 1rem',
                borderRadius: '0.65rem',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                  Required Skills
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--text-main)', marginTop: '2px' }}>
                  {targetRole?.requiredSkills?.length || 0}
                </div>
              </div>

              <div style={{
                background: 'var(--accent-mint-subtle)',
                padding: '0.75rem 1rem',
                borderRadius: '0.65rem',
                border: '1px solid var(--accent-mint-border)',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-mint)', textTransform: 'uppercase', fontWeight: '700' }}>
                  Matched
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--accent-mint)', marginTop: '2px' }}>
                  {matchedRequired.length}
                </div>
              </div>

              <div style={{
                background: missingRequired.length > 0 ? 'rgba(239, 68, 68, 0.08)' : 'var(--accent-mint-subtle)',
                padding: '0.75rem 1rem',
                borderRadius: '0.65rem',
                border: missingRequired.length > 0 ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--accent-mint-border)',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.7rem', color: missingRequired.length > 0 ? '#ef4444' : 'var(--accent-mint)', textTransform: 'uppercase', fontWeight: '700' }}>
                  Missing Gaps
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'Outfit', color: missingRequired.length > 0 ? '#ef4444' : 'var(--accent-mint)', marginTop: '2px' }}>
                  {missingRequired.length}
                </div>
              </div>
            </div>

            {/* Glowing Linear Progress Bar */}
            <div>
              <div style={{
                height: '10px',
                width: '100%',
                background: 'var(--bg-subtle)',
                borderRadius: '9999px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${matchPercentage}%`,
                  background: matchPercentage >= 75
                    ? 'linear-gradient(90deg, #10b981, #059669)'
                    : matchPercentage >= 50
                    ? 'linear-gradient(90deg, var(--primary-lavender), var(--accent-mint))'
                    : 'linear-gradient(90deg, #f59e0b, #ef4444)',
                  borderRadius: '9999px',
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: matchPercentage >= 50 ? '0 0 10px rgba(139, 92, 246, 0.4)' : 'none'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontWeight: '600' }}>
                <span>0% Entry</span>
                <span>50% Competitive</span>
                <span>100% Full Mastery</span>
              </div>
            </div>
          </div>

          {/* Dedicated Skill Gap Analysis & Acquired Competencies */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <TrendingUp size={20} color="var(--primary-lavender)" /> Core Skill Alignment & Gap Analysis
              </h4>
              <span className="badge badge-lavender" style={{ fontSize: '0.75rem' }}>
                {matchedRequired.length} of {targetRole?.requiredSkills?.length || 0} Core Skills Acquired
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* 1. CRITICAL MISSING SKILL GAPS (High Priority) */}
              <div style={{
                background: missingRequired.length > 0 ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-subtle)',
                padding: '1.25rem',
                borderRadius: '0.85rem',
                border: missingRequired.length > 0 ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid var(--border-color)',
                borderLeft: missingRequired.length > 0 ? '5px solid #ef4444' : '5px solid var(--accent-mint)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={17} color={missingRequired.length > 0 ? '#ef4444' : 'var(--accent-mint)'} />
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: missingRequired.length > 0 ? '#ef4444' : 'var(--accent-mint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Missing Skill Gaps ({missingRequired.length})
                    </span>
                  </div>
                  {missingRequired.length > 0 && (
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                      💡 Click any skill to add it to your profile
                    </span>
                  )}
                </div>

                {missingRequired.length > 0 ? (
                  <>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: '1.5' }}>
                      To become a competitive candidate for <strong>{targetRole?.name}</strong>, focus on acquiring these high-priority skill requirements:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {missingRequired.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className="btn btn-secondary"
                          style={{
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontSize: '0.825rem',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'var(--bg-surface)',
                            border: '1px solid rgba(239, 68, 68, 0.35)',
                            color: '#ef4444',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                            e.currentTarget.style.borderColor = '#ef4444';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--bg-surface)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.35)';
                          }}
                          title={`Click to mark "${skill}" as acquired and add to your skills`}
                        >
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            fontSize: '0.7rem',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            !
                          </span>
                          <span>{skill}</span>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px',
                            fontSize: '0.68rem',
                            background: 'rgba(239, 68, 68, 0.15)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            color: '#ef4444',
                            fontWeight: '700'
                          }}>
                            <Plus size={11} /> Add
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                    <CheckCircle2 size={24} color="var(--accent-mint)" />
                    <div>
                      <strong style={{ color: 'var(--accent-mint)', fontSize: '0.9rem' }}>
                        All Core Skill Requirements Met! 🎉
                      </strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                        You possess 100% of the foundational skills for this role. You are primed to apply or interview!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. MATCHED REQUIRED SKILLS (Acquired Competencies) */}
              <div style={{
                background: 'var(--accent-mint-subtle)',
                padding: '1.25rem',
                borderRadius: '0.85rem',
                border: '1px solid var(--accent-mint-border)',
                borderLeft: '5px solid var(--accent-mint)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={17} color="var(--accent-mint)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-mint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Matched Core Competencies ({matchedRequired.length})
                    </span>
                  </div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    Verified in your profile
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {matchedRequired.length > 0 ? (
                    matchedRequired.map(skill => (
                      <div
                        key={skill}
                        style={{
                          padding: '0.4rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.825rem',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--accent-mint-border)',
                          color: 'var(--accent-mint)',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <CheckCircle2 size={15} color="var(--accent-mint)" />
                        <span>{skill}</span>
                      </div>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      None of your selected skills match the core requirements for this role yet. Toggle your skills on the left or click missing skills to add them.
                    </span>
                  )}
                </div>
              </div>

              {/* 3. NICE-TO-HAVE BONUS SKILLS (If Present in Role) */}
              {targetRole?.niceToHave && targetRole.niceToHave.length > 0 && (
                <div style={{
                  background: 'var(--bg-subtle)',
                  padding: '1.1rem 1.25rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border-color)',
                  borderLeft: '5px solid var(--primary-lavender)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Award size={16} color="var(--primary-lavender)" />
                      <span style={{ fontSize: '0.825rem', fontWeight: '800', color: 'var(--primary-lavender)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Recommended Industry Bonus Skills ({targetRole.niceToHave.length})
                      </span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Gives competitive edge
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {targetRole.niceToHave.map(s => {
                      const hasSkill = userSkills.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSkill(s)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            fontSize: '0.775rem',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: hasSkill ? 'var(--primary-lavender-subtle)' : 'var(--bg-surface)',
                            border: `1px solid ${hasSkill ? 'var(--primary-lavender-border)' : 'var(--border-color)'}`,
                            color: hasSkill ? 'var(--primary-lavender)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          title={hasSkill ? `Already in your skills` : `Click to add ${s}`}
                        >
                          {hasSkill ? <CheckCircle2 size={13} color="var(--primary-lavender)" /> : <Plus size={13} />}
                          <span>{s}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Personalized Recommendations & Roadmap */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <h5 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <BookOpen size={16} color="var(--primary-lavender)" /> Personalized Career Roadmap for {targetRole?.name || 'Selected Role'}:
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {(targetRole?.roadmap || []).map((step, idx) => (
                  <div key={idx} style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '0.65rem',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color-subtle)',
                    fontSize: '0.85rem',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--primary-lavender-subtle)',
                      color: 'var(--primary-lavender)',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ lineHeight: '1.4' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSyncRoleMatcher;
