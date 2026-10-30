import React, { useState } from 'react';
import {
  BookOpen,
  Video,
  ExternalLink,
  Play,
  Layers,
  Award,
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { generateGovLearningGuideAI } from '../../utils/openRouterService';

const GOV_RESOURCES = {
  gk: {
    title: 'General Knowledge & Indian Polity',
    videos: [
      {
        id: 'v1',
        title: 'Indian Constitution Complete Revision (Articles 1-395)',
        channel: 'StudyIQ IAS',
        duration: '2h 45m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Indian+Constitution+Complete+Revision+Articles+StudyIQ+IAS'
      },
      {
        id: 'v2',
        title: 'Modern Indian History & Freedom Movement Masterclass',
        channel: 'Unacademy Govt Exams',
        duration: '3h 10m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Modern+Indian+History+Freedom+Movement+Govt+Exams+Masterclass'
      },
      {
        id: 'v2b',
        title: 'Indian Geography & Mapping Master Series',
        channel: 'Drishti IAS English',
        duration: '2h 15m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Indian+Geography+Mapping+Master+Series+Govt+Exams'
      },
      {
        id: 'v2c',
        title: 'Environment & Ecology Complete Syllabus for Prelims',
        channel: 'Sleepy Classes Govt Exams',
        duration: '3h 30m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Environment+and+Ecology+UPSC+SSC+Revision+Lectures'
      }
    ]
  },
  aptitude: {
    title: 'Quantitative Aptitude & Mathematics',
    videos: [
      {
        id: 'v3',
        title: 'Vedic Math Shortcuts for Fast Calculations in 5 Seconds',
        channel: 'Careerwave Aptitude',
        duration: '1h 15m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Vedic+Math+Shortcuts+Fast+Calculations+Aptitude'
      },
      {
        id: 'v4',
        title: 'Percentage, Profit & Loss Complete Shortcut Series',
        channel: 'SSC Adda247',
        duration: '2h 05m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Percentage+Profit+and+Loss+SSC+Adda247'
      },
      {
        id: 'v4b',
        title: 'Data Interpretation (DI) High-Yield Masterclass',
        channel: 'Adda247 Banking',
        duration: '1h 55m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Data+Interpretation+DI+High+Yield+Masterclass+Banking+SSC'
      },
      {
        id: 'v4c',
        title: 'Time, Speed, Distance & Train Problems Shortcuts',
        channel: 'Wi-Fi Study',
        duration: '1h 40m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Time+Speed+Distance+Train+Problems+Shortcuts'
      }
    ]
  },
  reasoning: {
    title: 'Logical Reasoning & Data Sufficiency',
    videos: [
      {
        id: 'v5',
        title: 'Syllogism & Venn Diagrams - Zero to Hero Tricks',
        channel: 'Reasoning Masterclass',
        duration: '1h 40m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Syllogism+Venn+Diagrams+Zero+to+Hero+Reasoning'
      },
      {
        id: 'v5b',
        title: 'Seating Arrangement & Puzzle Solving Shortcuts',
        channel: 'Bankers Way',
        duration: '2h 15m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Seating+Arrangement+Puzzle+Solving+Shortcuts+Bank+PO'
      },
      {
        id: 'v5c',
        title: 'Blood Relations & Direction Sense Complete Concept',
        channel: 'SSC Makers',
        duration: '1h 20m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Blood+Relations+Direction+Sense+Reasoning+Govt+Exams'
      },
      {
        id: 'v5d',
        title: 'Statement & Assumptions / Critical Reasoning',
        channel: 'Oliveboard Govt Exams',
        duration: '1h 50m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Critical+Reasoning+Statement+Assumptions+Govt+Exams'
      }
    ]
  },
  current_affairs: {
    title: 'Monthly Current Affairs & General Awareness',
    videos: [
      {
        id: 'v6',
        title: 'Annual Current Affairs 2026 Compilation for Govt Exams',
        channel: 'Current Affairs Daily',
        duration: '4h 00m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Annual+Current+Affairs+2026+Compilation+for+Govt+Exams'
      },
      {
        id: 'v6b',
        title: 'Government Schemes & Union Budget 2026 Analysis',
        channel: 'Drishti IAS',
        duration: '1h 50m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Government+Schemes+and+Union+Budget+2026+Analysis'
      },
      {
        id: 'v6c',
        title: 'National & International Summits, Appointments & Awards',
        channel: 'Next IAS',
        duration: '2h 10m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Summits+Appointments+Awards+2026+Current+Affairs'
      },
      {
        id: 'v6d',
        title: 'Monthly Economic Survey & RBI Monetary Policy Review',
        channel: 'Rau IAS Study Circle',
        duration: '1h 35m',
        youtubeUrl: 'https://www.youtube.com/results?search_query=Economic+Survey+Monetary+Policy+Review+Govt+Exams'
      }
    ]
  }
};

export const GovResources = () => {
  const [activeSubject, setActiveSubject] = useState('gk');
  const [aiSearchTopic, setAiSearchTopic] = useState('');
  const [isGeneratingAiGuide, setIsGeneratingAiGuide] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [aiGuideResult, setAiGuideResult] = useState(null);
  const [activeNoteTab, setActiveNoteTab] = useState('notes'); // 'notes' | 'matrix' | 'videos' | 'mcqs' | 'mains'
  const [userMcqAnswers, setUserMcqAnswers] = useState({});
  const [copySuccess, setCopySuccess] = useState(false);

  const subjectData = GOV_RESOURCES[activeSubject] || GOV_RESOURCES.gk;

  const generationSteps = [
    '🔍 Analyzing UPSC / SSC exam syllabus & weightage...',
    '📝 Synthesizing comprehensive theory & constitutional articles...',
    '⚠️ Identifying frequently tested examiner traps & exceptions...',
    '🎥 Curating top verified educator YouTube courses & playlists...',
    '🎯 Formulating interactive self-test check questions...'
  ];

  const handleGenerateAiGuide = async (topicOverride) => {
    const topicToQuery = (typeof topicOverride === 'string' ? topicOverride : aiSearchTopic).trim();
    if (!topicToQuery) return;
    
    setIsGeneratingAiGuide(true);
    setGenerationStep(0);
    setUserMcqAnswers({});
    setActiveNoteTab('notes');

    // Smooth progress step transitions while synthesizing
    const stepInterval = setInterval(() => {
      setGenerationStep(prev => (prev < generationSteps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const result = await generateGovLearningGuideAI({
        topic: topicToQuery,
        examTarget: 'UPSC / SSC / Banking / State PSC'
      });
      setAiGuideResult(result);
    } catch (e) {
      console.error('Failed to generate AI guide:', e);
    } finally {
      clearInterval(stepInterval);
      setIsGeneratingAiGuide(false);
    }
  };

  const handleMcqSelect = (mcqIdx, optIdx) => {
    setUserMcqAnswers(prev => ({
      ...prev,
      [mcqIdx]: optIdx
    }));
  };

  const handleCopyNotes = () => {
    if (!aiGuideResult) return;
    const textContent = `=== AI STUDY NOTES: ${aiGuideResult.topic} ===
Target Exam: ${aiGuideResult.examTarget} | Domain: ${aiGuideResult.domainBadge || 'General Studies'}

--- CONCEPTUAL OVERVIEW ---
${aiGuideResult.overviewNotes ? aiGuideResult.overviewNotes.join('\n\n') : aiGuideResult.summary}

--- KEY ARTICLES, FORMULAS & PRECEDENTS ---
${aiGuideResult.coreMatrix ? aiGuideResult.coreMatrix.map(m => `• ${m.key}: ${m.value}`).join('\n') : ''}

--- HIGH YIELD POINTS ---
${aiGuideResult.highYieldPoints ? aiGuideResult.highYieldPoints.join('\n') : ''}

--- EXAMINER'S TRAP WARNING ---
${aiGuideResult.examinerTraps ? aiGuideResult.examinerTraps.join('\n') : aiGuideResult.prelimsTrapAlert || ''}

--- RECOMMENDED YOUTUBE COURSES ---
${aiGuideResult.recommendedCourses ? aiGuideResult.recommendedCourses.map(c => `• ${c.title} (${c.channel}) - ${c.youtubeUrl}`).join('\n') : ''}
`;

    navigator.clipboard.writeText(textContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }).catch(err => console.error('Failed to copy notes:', err));
  };

  const getYoutubeSearchUrl = (query) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' govt exam preparation lecture')}`;
  };

  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, var(--accent-mint-subtle), var(--bg-surface))',
        borderLeft: '5px solid var(--accent-mint)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-mint">100% Free Materials</span>
            <span className="badge badge-lavender">Direct YouTube Lectures</span>
            <span className="badge badge-blue">✨ AI Deep Topic Notes</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Free Educational Resources & YouTube Video Lectures
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
            Direct access to verified top YouTube educator courses, masterclasses, and instant in-depth AI study notes for any syllabus topic across UPSC, SSC, IBPS, and State PSC exams.
          </p>
        </div>
      </div>

      {/* AI Dynamic Topic YouTube Course Finder */}
      <div className="glass-panel" style={{
        padding: '1.75rem',
        marginBottom: '2rem',
        border: '1.5px solid rgba(16, 185, 129, 0.4)',
        background: 'linear-gradient(180deg, var(--bg-surface), var(--bg-subtle))',
        borderRadius: '1rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
              AI Live Topic Notes & YouTube Course Generator
            </h3>
          </div>
          <span className="badge badge-mint" style={{ fontSize: '0.75rem' }}>
            Comprehensive Syllabus Engine
          </span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
          Enter any syllabus topic to generate master-level revision notes, landmark articles & formulas, examiner traps, direct YouTube video courses, and interactive practice questions:
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="e.g. Fundamental Rights Article 32, Vedic Math Shortcuts, Union Budget 2026, Inflation & Repo Rate..."
            value={aiSearchTopic}
            onChange={(e) => setAiSearchTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleGenerateAiGuide(); }}
            className="input-field"
            style={{ flex: 1, minWidth: '280px', fontSize: '0.95rem', padding: '0.75rem 1rem' }}
          />
          <button
            onClick={() => handleGenerateAiGuide()}
            disabled={isGeneratingAiGuide || !aiSearchTopic.trim()}
            className="btn btn-mint"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: isGeneratingAiGuide ? 'wait' : 'pointer'
            }}
          >
            {isGeneratingAiGuide ? <Zap size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {isGeneratingAiGuide ? 'Synthesizing Detailed Notes...' : 'Generate In-Depth Notes & Courses'}
          </button>
        </div>

        {/* Quick Topic Chips */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: isGeneratingAiGuide ? '1.5rem' : '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600' }}>Popular Topics:</span>
          {[
            'Article 32 & Writs (Polity)',
            'Vedic Math & Speed Calculation',
            'Union Budget 2026 & Fiscal Deficit',
            'Indian River Systems & Antecedent Drainage',
            'Inflation Targeting & RBI Repo Rate',
            'Quit India Movement 1942'
          ].map((topicChip, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAiSearchTopic(topicChip);
                handleGenerateAiGuide(topicChip);
              }}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '9999px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.78rem',
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-mint)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              + {topicChip}
            </button>
          ))}
        </div>

        {/* Generating Progress State */}
        {isGeneratingAiGuide && (
          <div style={{
            marginTop: '1.25rem',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            background: 'var(--bg-surface)',
            border: '1.5px dashed var(--accent-mint)',
            textAlign: 'center'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent-mint-subtle)', marginBottom: '0.75rem' }}>
              <Zap size={22} color="var(--accent-mint)" className="animate-spin" />
            </div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {generationSteps[generationStep]}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Preparing comprehensive syllabus breakdown, landmark references, and verified YouTube lectures...
            </p>
          </div>
        )}

        {/* AI Guide Result Card */}
        {aiGuideResult && !isGeneratingAiGuide && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            borderRadius: '0.875rem',
            background: 'var(--bg-surface)',
            border: '1.5px solid #86efac',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.12)'
          }}>
            {/* Note Header & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-mint">Master Revision Notes</span>
                  {aiGuideResult.domainBadge && <span className="badge badge-lavender">{aiGuideResult.domainBadge}</span>}
                  <span className="badge badge-blue">{aiGuideResult.examTarget}</span>
                </div>
                <h4 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: '0.25rem 0' }}>
                  {aiGuideResult.topic}
                </h4>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopyNotes}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.5rem 0.9rem',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontWeight: '600'
                  }}
                  title="Copy full study note text to clipboard"
                >
                  <CheckCircle2 size={15} color={copySuccess ? '#10b981' : 'var(--text-muted)'} />
                  {copySuccess ? 'Copied to Clipboard! ✓' : 'Copy Full Notes'}
                </button>

                <a
                  href={getYoutubeSearchUrl(aiGuideResult.topic)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{
                    padding: '0.5rem 0.95rem',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#ef4444',
                    borderColor: '#fca5a5',
                    fontWeight: '700'
                  }}
                >
                  <Video size={15} color="#ef4444" /> Watch YouTube Lectures <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Note Sub-Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.4rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '0.5rem',
              marginBottom: '1.25rem',
              overflowX: 'auto'
            }}>
              {[
                { id: 'notes', label: '📖 Comprehensive Theory', count: null },
                { id: 'matrix', label: '⚡ Articles & Formulas', count: aiGuideResult.coreMatrix?.length },
                { id: 'traps', label: '⚠️ Examiner Traps', count: aiGuideResult.examinerTraps?.length },
                { id: 'videos', label: '🎥 YouTube Courses', count: aiGuideResult.recommendedCourses?.length || 4 },
                { id: 'mcqs', label: '🎯 Practice MCQs', count: aiGuideResult.practiceMCQs?.length || 2 },
                { id: 'mains', label: '✍️ Mains Framework', count: null }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveNoteTab(tab.id)}
                  style={{
                    background: activeNoteTab === tab.id ? 'var(--accent-mint)' : 'transparent',
                    color: activeNoteTab === tab.id ? '#ffffff' : 'var(--text-main)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.825rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                  {tab.count !== null && tab.count !== undefined && (
                    <span style={{
                      background: activeNoteTab === tab.id ? 'rgba(255,255,255,0.25)' : 'var(--bg-subtle)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '999px',
                      fontSize: '0.7rem'
                    }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab 1: Comprehensive Theory & Overview */}
            {activeNoteTab === 'notes' && (
              <div>
                <div style={{ background: 'var(--bg-subtle)', padding: '1rem 1.25rem', borderRadius: '0.65rem', marginBottom: '1.25rem', lineHeight: '1.65' }}>
                  {aiGuideResult.overviewNotes ? (
                    aiGuideResult.overviewNotes.map((para, pIdx) => (
                      <p key={pIdx} style={{ margin: '0 0 0.85rem 0', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        {para}
                      </p>
                    ))
                  ) : (
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>{aiGuideResult.summary}</p>
                  )}
                </div>

                <div>
                  <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-mint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                    📌 High-Yield Takeaways for Prelims & Mains
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                    {aiGuideResult.highYieldPoints?.map((pt, idx) => (
                      <div key={idx} style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.85rem',
                        color: 'var(--text-main)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem'
                      }}>
                        <span style={{ color: 'var(--accent-mint)', fontWeight: '700' }}>✓</span>
                        <div>{pt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Key Articles, Formulas & Data Matrix */}
            {activeNoteTab === 'matrix' && (
              <div>
                <h5 style={{ fontSize: '0.9rem', color: 'var(--primary-lavender)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  ⚡ Landmark Articles, Formulas & Precedents
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {aiGuideResult.coreMatrix?.map((row, rIdx) => (
                    <div key={rIdx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '0.5rem',
                      background: 'var(--bg-subtle)',
                      borderLeft: '4px solid var(--primary-lavender)',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)', minWidth: '180px' }}>
                        {row.key}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flex: 1 }}>
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Examiner Traps & Common Pitfalls */}
            {activeNoteTab === 'traps' && (
              <div>
                <h5 style={{ fontSize: '0.9rem', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  ⚠️ Examiner's Trap Warnings & Common Student Errors
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(aiGuideResult.examinerTraps || [aiGuideResult.prelimsTrapAlert]).map((trap, tIdx) => (
                    <div key={tIdx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '1rem 1.25rem',
                      borderRadius: '0.65rem',
                      background: '#fef3c7',
                      color: '#92400e',
                      fontSize: '0.875rem',
                      border: '1px solid #fde68a'
                    }}>
                      <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ lineHeight: '1.5' }}>
                        <strong>Trap #{tIdx + 1}: </strong>
                        {trap}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Recommended YouTube Video Courses & Playlists */}
            {activeNoteTab === 'videos' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h5 style={{ fontSize: '0.9rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                    🎥 Verified YouTube Masterclasses & Video Courses
                  </h5>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Direct YouTube search redirection with authentic keywords
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
                  {(aiGuideResult.recommendedCourses || []).map((course, cIdx) => (
                    <div key={cIdx} style={{
                      padding: '1rem 1.15rem',
                      borderRadius: '0.65rem',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span className="badge badge-lavender" style={{ fontSize: '0.7rem' }}>
                            {course.videoType || 'Video Lecture'}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            ⏱️ {course.duration || 'Full Session'}
                          </span>
                        </div>
                        <h6 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: '0 0 0.35rem 0', lineHeight: '1.4' }}>
                          {course.title}
                        </h6>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.85rem 0' }}>
                          Channel: <strong>{course.channel}</strong>
                        </p>
                      </div>

                      <a
                        href={course.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          padding: '0.45rem 0.85rem',
                          fontSize: '0.825rem',
                          color: '#ef4444',
                          borderColor: '#fca5a5',
                          fontWeight: '700',
                          textDecoration: 'none'
                        }}
                      >
                        <Video size={14} color="#ef4444" /> Watch on YouTube ↗
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Practice Self-Assessment MCQs */}
            {activeNoteTab === 'mcqs' && (
              <div>
                <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-mint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
                  🎯 Interactive Self-Assessment MCQs ({aiGuideResult.topic})
                </h5>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {aiGuideResult.practiceMCQs?.map((mcq, mIdx) => {
                    const selectedOpt = userMcqAnswers[mIdx];
                    const isAnswered = selectedOpt !== undefined;

                    return (
                      <div key={mIdx} style={{
                        padding: '1.15rem',
                        borderRadius: '0.65rem',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-color)'
                      }}>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.85rem', lineHeight: '1.5' }}>
                          Q{mIdx + 1}. {mcq.question}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', marginBottom: '0.85rem' }}>
                          {mcq.options.map((opt, oIdx) => {
                            let optBg = 'var(--bg-surface)';
                            let optBorder = 'var(--border-color)';
                            let optColor = 'var(--text-main)';

                            if (isAnswered) {
                              if (oIdx === mcq.correct) {
                                optBg = 'rgba(16, 185, 129, 0.15)';
                                optBorder = '#10b981';
                                optColor = '#065f46';
                              } else if (selectedOpt === oIdx) {
                                optBg = 'rgba(239, 68, 68, 0.15)';
                                optBorder = '#ef4444';
                                optColor = '#991b1b';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleMcqSelect(mIdx, oIdx)}
                                style={{
                                  padding: '0.6rem 0.85rem',
                                  borderRadius: '0.45rem',
                                  background: optBg,
                                  border: `1.5px solid ${optBorder}`,
                                  color: optColor,
                                  textAlign: 'left',
                                  fontSize: '0.825rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '0.5rem',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <span style={{ fontWeight: '700' }}>{String.fromCharCode(65 + oIdx)}.</span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered && (
                          <div style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            background: selectedOpt === mcq.correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            borderLeft: `4px solid ${selectedOpt === mcq.correct ? '#10b981' : '#ef4444'}`,
                            fontSize: '0.825rem'
                          }}>
                            <strong>{selectedOpt === mcq.correct ? '✓ Correct Answer!' : '✗ Incorrect.'} </strong>
                            {mcq.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 6: Mains Answer Writing Framework */}
            {activeNoteTab === 'mains' && (
              <div>
                <h5 style={{ fontSize: '0.9rem', color: 'var(--primary-lavender)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  ✍️ Model Mains Analytical Question & Answering Framework
                </h5>

                {aiGuideResult.mainsQuestionFramework && (
                  <div style={{ padding: '1.15rem', borderRadius: '0.65rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)' }}>
                    <div style={{
                      fontSize: '0.92rem',
                      fontWeight: '700',
                      color: 'var(--text-main)',
                      marginBottom: '1rem',
                      padding: '0.75rem',
                      background: 'var(--bg-surface)',
                      borderRadius: '0.45rem',
                      borderLeft: '4px solid var(--primary-lavender)'
                    }}>
                      {aiGuideResult.mainsQuestionFramework.question}
                    </div>

                    <h6 style={{ fontSize: '0.825rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                      Recommended Structural Blueprint:
                    </h6>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {aiGuideResult.mainsQuestionFramework.approach.map((step, sIdx) => (
                        <div key={sIdx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subject Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveSubject('gk')}
          className={`btn ${activeSubject === 'gk' ? 'btn-mint' : 'btn-secondary'}`}
        >
          General Knowledge & Polity
        </button>
        <button
          onClick={() => setActiveSubject('aptitude')}
          className={`btn ${activeSubject === 'aptitude' ? 'btn-mint' : 'btn-secondary'}`}
        >
          Quantitative Aptitude
        </button>
        <button
          onClick={() => setActiveSubject('reasoning')}
          className={`btn ${activeSubject === 'reasoning' ? 'btn-mint' : 'btn-secondary'}`}
        >
          Logical Reasoning
        </button>
        <button
          onClick={() => setActiveSubject('current_affairs')}
          className={`btn ${activeSubject === 'current_affairs' ? 'btn-mint' : 'btn-secondary'}`}
        >
          Current Affairs 2026
        </button>
      </div>

      {/* Recommended YouTube Video Courses Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Video color="#ef4444" size={24} /> Recommended YouTube Video Masterclasses ({subjectData.title})
          </h3>
          <a
            href={getYoutubeSearchUrl(subjectData.title)}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.85rem',
              color: 'var(--primary-lavender)',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              textDecoration: 'none'
            }}
          >
            Explore Complete {subjectData.title} YouTube Playlists <ExternalLink size={14} />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
          {subjectData.videos.map(vid => (
            <div key={vid.id} className="glass-panel" style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '0.875rem',
              border: '1px solid var(--border-color)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-lavender" style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                    Verified Lecture
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    ⏱️ {vid.duration}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.35', marginBottom: '0.4rem', fontWeight: '700' }}>
                  {vid.title}
                </h4>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'block' }}>
                  Channel: <strong style={{ color: 'var(--accent-mint)' }}>{vid.channel}</strong>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={vid.youtubeUrl || getYoutubeSearchUrl(vid.title + ' ' + vid.channel)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    color: '#ef4444',
                    borderColor: 'rgba(239, 68, 68, 0.4)',
                    fontWeight: '700'
                  }}
                >
                  <Play size={14} color="#ef4444" /> Watch on YouTube <ExternalLink size={13} />
                </a>
                <a
                  href={getYoutubeSearchUrl(vid.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-lavender"
                  style={{
                    padding: '0.55rem 0.75rem',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}
                  title="Find similar lectures on YouTube"
                >
                  Similar <Search size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

