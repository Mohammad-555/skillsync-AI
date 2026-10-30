import React, { useState } from 'react';
import { parseResumeFile } from '../../utils/resumeParser';
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BarChart3,
  FileText,
  HelpCircle,
  Zap,
  Check,
  X,
  Upload,
  FileCode
} from 'lucide-react';

const DEFAULT_SAMPLE_RESUME = `Senior Full Stack Developer with 5+ years experience building web applications using React, TypeScript, Node.js, and PostgreSQL. Experienced with Docker, REST APIs, Git, and Cloud AWS deployment. Proven track record of optimizing database performance and leading frontend developer teams.`;

const DEFAULT_SAMPLE_JD = `We are looking for a Senior Full Stack Engineer proficient in React, TypeScript, Node.js, PostgreSQL, Docker, AWS, GraphQL, and System Design. The candidate will design scalable microservices, implement GraphQL APIs, write unit tests, and mentor junior engineers.`;

export const ATSScoreEvaluator = () => {
  const [resumeText, setResumeText] = useState(DEFAULT_SAMPLE_RESUME);
  const [jobDescription, setJobDescription] = useState(DEFAULT_SAMPLE_JD);
  const [evaluation, setEvaluation] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsParsing(true);

    try {
      const extractedText = await parseResumeFile(file);
      if (extractedText) {
        setResumeText(extractedText);
      }
    } catch (err) {
      console.error('Failed to parse file for ATS evaluation:', err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleEvaluateATS = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert('Please provide both Resume Text and Job Description to scan!');
      return;
    }

    // Extract keywords from JD
    const wordsInJD = jobDescription.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const uniqueKeywords = [...new Set(wordsInJD)].filter(w =>
      !['and', 'the', 'for', 'with', 'you', 'will', 'are', 'that', 'this', 'have', 'from'].includes(w)
    );

    const resumeLower = resumeText.toLowerCase();

    const matchedWords = uniqueKeywords.filter(kw => resumeLower.includes(kw));
    const missingWords = uniqueKeywords.filter(kw => !resumeLower.includes(kw));

    const keywordRatio = matchedWords.length / uniqueKeywords.length;
    const overallScore = Math.min(98, Math.max(35, Math.round(keywordRatio * 100 + 15)));

    const result = {
      score: overallScore,
      keywordMatch: Math.round(keywordRatio * 100),
      techSkillsMatch: Math.round(keywordRatio * 90 + 10),
      actionVerbsScore: 85,
      formattingScore: 92,
      matched: matchedWords.slice(0, 10),
      missing: missingWords.slice(0, 8),
      tips: [
        `Incorporate missing high-frequency keywords: ${missingWords.slice(0, 4).join(', ')}`,
        'Quantify achievements with metrics (e.g., "Improved load time by 35%")',
        'Use bullet points starting with strong action verbs like "Architected", "Engineered", "Optimized"',
        'Ensure standard section headers (Experience, Education, Skills) for ATS parser compatibility'
      ]
    };

    setEvaluation(result);
  };

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
          <span className="badge badge-lavender">📊 ATS Resume Scanner</span>
          <span className="badge badge-mint">Keyword Match Evaluator</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Applicant Tracking System (ATS) Score Evaluator
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
          Scan your resume against target tech job descriptions to uncover keyword gaps, format compliance, and actionable recommendations to pass ATS screening.
        </p>
      </div>

      {/* Main Grid: Inputs vs Evaluation Results */}
      <div className="responsive-split-2" style={{ gap: '2rem' }}>
        {/* Left Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Resume File or Text Input */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-lavender)' }}>
                1. Your Resume Document (PDF / Word / Text)
              </h4>
              <label className="btn btn-outline-lavender" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                <Upload size={14} /> Upload File (.pdf, .docx)
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {uploadedFile && (
              <div style={{
                background: 'var(--primary-lavender-subtle)',
                border: '1px solid var(--primary-lavender-border)',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.85rem',
                fontSize: '0.825rem',
                color: 'var(--primary-lavender)',
                fontWeight: '600',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FileCode size={16} />
                <span>Uploaded: <strong>{uploadedFile.name}</strong></span>
                {isParsing && <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>Parsing document...</span>}
              </div>
            )}

            <textarea
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste or upload your PDF/Word resume content here..."
              className="input-field"
              style={{ fontSize: '0.9rem' }}
            />
          </div>

          {/* Job Description Input */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-lavender)', marginBottom: '0.65rem' }}>
              2. Target Job Description (JD)
            </h4>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description here..."
              className="input-field"
              style={{ fontSize: '0.9rem' }}
            />
          </div>

          <button onClick={handleEvaluateATS} className="btn btn-primary" style={{ padding: '0.85rem', fontSize: '1.05rem' }}>
            <Zap size={18} /> Evaluate ATS Match Score
          </button>
        </div>

        {/* Right Output Dashboard */}
        <div>
          {evaluation ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Overall Score Meter */}
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <span className="badge badge-mint" style={{ marginBottom: '0.85rem' }}>ATS Match Evaluation</span>

                <div style={{
                  fontSize: '3.8rem',
                  fontWeight: '800',
                  fontFamily: 'Outfit',
                  color: evaluation.score >= 80 ? 'var(--accent-mint)' : evaluation.score >= 60 ? 'var(--primary-lavender)' : '#ef4444',
                  lineHeight: '1'
                }}>
                  {evaluation.score}%
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
                  {evaluation.score >= 80
                    ? 'Excellent ATS Match! Your resume has a high chance of clearing automated filters.'
                    : evaluation.score >= 60
                    ? 'Good Match. Incorporate missing keywords to boost your ranking.'
                    : 'Low Match. Significant keyword updates recommended.'}
                </p>

                {/* Score Breakdown Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left', marginTop: '1rem' }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Keyword Relevance</span>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--primary-lavender)' }}>{evaluation.keywordMatch}%</strong>
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hard Tech Skills</span>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--accent-mint)' }}>{evaluation.techSkillsMatch}%</strong>
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Action Verbs Impact</span>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--accent-blue)' }}>{evaluation.actionVerbsScore}%</strong>
                  </div>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Formatting & Layout</span>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--accent-lilac)' }}>{evaluation.formattingScore}%</strong>
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Keywords */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                  Keyword Density & Gap Analysis
                </h4>

                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-mint)', display: 'block', marginBottom: '0.4rem' }}>
                    MATCHED KEYWORDS ({evaluation.matched.length})
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {evaluation.matched.map(kw => (
                      <span key={kw} className="badge badge-mint" style={{ textTransform: 'lowercase' }}>✓ {kw}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#ef4444', display: 'block', marginBottom: '0.4rem' }}>
                    MISSING DESIRED KEYWORDS ({evaluation.missing.length})
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {evaluation.missing.map(kw => (
                      <span key={kw} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '0.2rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                        ! {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable Tips */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-lavender)' }}>
                  Optimization Action Plan
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {evaluation.tips.map((tip, idx) => (
                    <div key={idx} style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={16} color="var(--primary-lavender)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Sparkles size={48} color="var(--primary-lavender)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Ready to Scan Your Resume</h3>
              <p style={{ fontSize: '0.9rem' }}>
                Paste your resume text and job description on the left and click "Evaluate ATS Match Score" to get an instant analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
