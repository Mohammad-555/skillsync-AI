import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { parseResumeFile, extractStructuredResumeFields } from '../../utils/resumeParser';
import { extractResumeDataWithAI } from '../../utils/openRouterService';
import {
  FileText,
  Upload,
  Download,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  Eye,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  FileCode,
  Check,
  Award,
  Layers,
  UserCheck
} from 'lucide-react';

export const FRESHER_RESUME_DATA = {
  fullName: 'Rohan Verma',
  title: 'Computer Science Graduate & Full Stack Developer Aspirant',
  email: 'rohan.verma@csgrad.in',
  phone: '+91 98765 43210',
  location: 'Bangalore, India',
  github: 'github.com/rohanverma-dev',
  linkedin: 'linkedin.com/in/rohanverma-cs',
  summary: 'Motivated Computer Science graduate with strong foundational knowledge in Data Structures, Algorithms, and Full Stack Web Development (MERN). Built multiple real-world full-stack web applications and secured Top 5 in National Hackathon 2026.',
  skills: ['React.js', 'JavaScript (ES6+)', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Git & GitHub', 'Data Structures', 'REST APIs', 'Tailwind CSS'],
  education: [
    {
      id: 'edu-f-1',
      degree: 'B.Tech in Computer Science & Engineering (CGPA: 8.85 / 10)',
      institution: 'Indian Institute of Information Technology (IIIT)',
      period: '2022 - 2026'
    }
  ],
  projects: [
    {
      id: 'proj-f-1',
      name: 'SkillSync AI Career Portal',
      tech: 'React, Node.js, Express, SpeechSynthesis API',
      description: 'Engineered a voice-enabled mock test and ATS resume evaluator platform used by 500+ college peers for campus placement preparation.'
    },
    {
      id: 'proj-f-2',
      name: 'Real-time Collaborative Code Editor',
      tech: 'React, Socket.io, Node.js, Docker',
      description: 'Built a multi-user online IDE supporting syntax highlighting, live room sharing, and instant code execution across 5 programming languages.'
    }
  ],
  experience: [
    {
      id: 'exp-f-1',
      role: 'Full Stack Web Developer Intern',
      company: 'NextGen Solutions Startup',
      period: 'Jan 2026 - May 2026',
      details: 'Assisted in building responsive React UI components and optimized REST endpoints, improving page load speed by 25% across mobile browsers.'
    }
  ]
};

export const EXPERIENCED_RESUME_DATA = {
  fullName: 'Alex Vance',
  title: 'Senior Full Stack Software Engineer & Tech Lead',
  email: 'alex.vance@techdev.io',
  phone: '+1 (555) 349-8201',
  location: 'San Francisco, CA',
  github: 'github.com/alexvance',
  linkedin: 'linkedin.com/in/alexvance',
  summary: 'Results-driven Senior Full Stack Engineer with 6+ years of experience architecting high-throughput microservices, scaling web applications to 300k+ MAU, and mentoring cross-functional engineering teams.',
  skills: ['React 19', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'System Design', 'GraphQL', 'CI/CD Pipelines'],
  experience: [
    {
      id: 'exp-e-1',
      role: 'Senior Staff Frontend Lead',
      company: 'Apex Tech Solutions',
      period: '2023 - Present',
      details: 'Architected micro-frontend architecture for core enterprise platform serving 300,000+ active users. Reduced bundle size by 42% and spearheaded team migration to Vite & TypeScript.'
    },
    {
      id: 'exp-e-2',
      role: 'Full Stack Software Engineer',
      company: 'DataFlow Technologies',
      period: '2021 - 2023',
      details: 'Engineered high-performance REST & GraphQL microservices handling 15,000 requests/sec. Optimized PostgreSQL queries and query index execution, reducing database P99 latency by 55%.'
    }
  ],
  education: [
    {
      id: 'edu-e-1',
      degree: 'B.S. in Computer Science',
      institution: 'State University of Technology',
      period: '2017 - 2021'
    }
  ],
  projects: [
    {
      id: 'proj-e-1',
      name: 'Distributed Event Streaming Service',
      tech: 'Node.js, Kafka, Redis, Docker',
      description: 'Designed fault-tolerant event broker pipeline capable of processing 100k events/min with zero data loss.'
    }
  ]
};

export const ResumeBuilder = () => {
  const [careerStage, setCareerStage] = useState('fresher'); // 'fresher' or 'experienced'
  const [template, setTemplate] = useState('fresher-academic'); // 'fresher-academic', 'fresher-compact', 'fresher-modern', 'exp-executive', 'exp-sidebar', 'exp-minimal'
  const [resumeData, setResumeData] = useState(FRESHER_RESUME_DATA);
  const [isUserCustomized, setIsUserCustomized] = useState(false);

  const [uploadText, setUploadText] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [isExtractingAI, setIsExtractingAI] = useState(false);
  const [extractionAlert, setExtractionAlert] = useState(null);

  const handleStageChange = (stage) => {
    setCareerStage(stage);

    // Switch to recommended template for the selected stage if current doesn't match
    if (stage === 'fresher') {
      if (!template.startsWith('fresher-')) {
        setTemplate('fresher-academic');
      }
    } else {
      if (!template.startsWith('exp-')) {
        setTemplate('exp-executive');
      }
    }

    // PRESERVE EXTRACTED & CUSTOM USER DATA:
    // Only load initial placeholder mock data if the user hasn't extracted or customized their resume yet
    const hasCustomData =
      isUserCustomized ||
      (resumeData.fullName &&
        resumeData.fullName !== FRESHER_RESUME_DATA.fullName &&
        resumeData.fullName !== EXPERIENCED_RESUME_DATA.fullName);

    if (!hasCustomData) {
      setResumeData(stage === 'fresher' ? FRESHER_RESUME_DATA : EXPERIENCED_RESUME_DATA);
    }
  };

  // File Upload Handler (PDF, Word, TXT)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsParsingFile(true);

    try {
      const extractedText = await parseResumeFile(file);
      setUploadText(extractedText);
    } catch (err) {
      console.error('File parsing failed:', err);
    } finally {
      setIsParsingFile(false);
    }
  };

  // Field Update Helper
  const updateResumeField = (field, val) => {
    setIsUserCustomized(true);
    setResumeData(prev => ({ ...prev, [field]: val }));
  };

  // Experience Handlers
  const handleAddExperience = () => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: `exp-${Date.now()}`, role: 'Software Engineer', company: 'Company Name', period: '2022 - Present', details: 'Describe key responsibilities and achievements...' }
      ]
    }));
  };

  const handleUpdateExp = (id, field, val) => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(item => item.id === id ? { ...item, [field]: val } : item)
    }));
  };

  const handleDeleteExp = (id) => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  // Skill Handlers
  const handleAddSkill = (skillStr) => {
    if (!skillStr.trim()) return;
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      skills: [...new Set([...prev.skills, skillStr.trim()])]
    }));
  };

  const handleDeleteSkill = (skillToDelete) => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToDelete)
    }));
  };

  // Education Handlers
  const handleAddEdu = () => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: `edu-${Date.now()}`, degree: 'B.S. Computer Science', institution: 'University Name', period: '2022 - 2026' }
      ]
    }));
  };

  const handleUpdateEdu = (id, field, val) => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => item.id === id ? { ...item, [field]: val } : item)
    }));
  };

  const handleDeleteEdu = (id) => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  // Project Handlers
  const handleAddProject = () => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: `proj-${Date.now()}`, name: 'New Tech Project', tech: 'React, Node.js', description: 'Briefly explain key feature and impact...' }
      ]
    }));
  };

  const handleUpdateProject = (id, field, val) => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(item => item.id === id ? { ...item, [field]: val } : item)
    }));
  };

  const handleDeleteProject = (id) => {
    setIsUserCustomized(true);
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  // Resume Upload / Extract info handler with AI / API precision extraction
  const handleExtractResumeInfo = async () => {
    if (!uploadText.trim()) return;

    setIsExtractingAI(true);
    try {
      // 1. Attempt High-Precision AI Extraction via OpenRouter API
      let extracted = await extractResumeDataWithAI(uploadText);
      
      // 2. Fallback to advanced rule-based parser if API was offline / not returned
      if (!extracted) {
        extracted = extractStructuredResumeFields(uploadText);
      }

      if (extracted) {
        // Set career stage if detected
        if (extracted.careerStage) {
          setCareerStage(extracted.careerStage);
        }

        // PERFECT FIT: Map extracted data cleanly into template, replacing mock data with ONLY candidate's authentic data
        setResumeData({
          fullName: extracted.fullName || '',
          title: extracted.title || '',
          email: extracted.email || '',
          phone: extracted.phone || '',
          location: extracted.location || '',
          github: extracted.github || '',
          linkedin: extracted.linkedin || '',
          summary: extracted.summary || '',
          skills: Array.isArray(extracted.skills) ? extracted.skills : [],
          education: Array.isArray(extracted.education) ? extracted.education : [],
          experience: Array.isArray(extracted.experience) ? extracted.experience : [],
          projects: Array.isArray(extracted.projects) ? extracted.projects : []
        });

        setExtractionAlert(`✨ Resume Data Extracted & Fitted! Mapped ${extracted.skills?.length || 0} skills, ${extracted.education?.length || 0} education qualifications, ${extracted.experience?.length || 0} work experiences, and ${extracted.projects?.length || 0} projects with 100% precision.`);
        setIsUserCustomized(true);
      }
    } catch (err) {
      console.error('Resume extraction error:', err);
      // Fallback
      const fallback = extractStructuredResumeFields(uploadText);
      if (fallback) {
        setResumeData({
          fullName: fallback.fullName || '',
          title: fallback.title || '',
          email: fallback.email || '',
          phone: fallback.phone || '',
          location: fallback.location || '',
          github: fallback.github || '',
          linkedin: fallback.linkedin || '',
          summary: fallback.summary || '',
          skills: fallback.skills?.length > 0 ? fallback.skills : [],
          education: fallback.education?.length > 0 ? fallback.education : [],
          experience: fallback.experience?.length > 0 ? fallback.experience : [],
          projects: fallback.projects?.length > 0 ? fallback.projects : []
        });
        setIsUserCustomized(true);
        setExtractionAlert(`✨ Extracted resume data mapped into template.`);
      }
    } finally {
      setIsExtractingAI(false);
      setShowUploadModal(false);
      setUploadText('');
      setUploadedFile(null);
    }
  };

  // PDF Export Download (Standard A4 Format: 210mm x 297mm)
  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview-doc');
    const opt = {
      margin: 0,
      filename: `${resumeData.fullName.replace(/\s+/g, '_')}_Resume_A4.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  // Word Document (.doc / .docx) Export Download
  const handleDownloadWord = () => {
    const element = document.getElementById('resume-preview-doc');
    if (!element) return;

    const contentHtml = element.innerHTML;

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${resumeData.fullName} Resume</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 20mm 15mm 20mm 15mm;
          }
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #0f172a; line-height: 1.45; }
          h1 { font-size: 22pt; color: #6d28d9; margin-bottom: 2pt; font-weight: bold; }
          h3 { font-size: 11pt; color: #475569; margin-bottom: 8pt; font-weight: normal; }
          h4 { font-size: 11pt; color: #7c3aed; text-transform: uppercase; margin-top: 12pt; margin-bottom: 4pt; font-weight: bold; border-bottom: 1pt solid #cbd5e1; }
          p { margin-top: 2pt; margin-bottom: 6pt; }
        </style>
      </head>
      <body>
        ${contentHtml}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + header], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isFresher = careerStage === 'fresher';

  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: isFresher
          ? 'linear-gradient(135deg, var(--accent-mint-subtle), var(--bg-surface))'
          : 'linear-gradient(135deg, var(--primary-lavender-subtle), var(--bg-surface))',
        borderLeft: `5px solid ${isFresher ? 'var(--accent-mint)' : 'var(--primary-lavender)'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className={`badge ${isFresher ? 'badge-mint' : 'badge-lavender'}`}>
                {isFresher ? '🎓 Fresher & Graduate Templates' : '💼 Experienced Professional Templates'}
              </span>
              <span className="badge badge-blue">PDF & Word Export Enabled</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              ATS-Optimized Tech Resume Builder
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
              6 specialized ATS-friendly templates. Export directly to <strong>PDF (.pdf)</strong> or <strong>Microsoft Word (.doc / .docx)</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button onClick={() => setShowUploadModal(true)} className="btn btn-secondary" style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}>
              <Upload size={16} /> Import Old Resume (PDF/Word)
            </button>
            <button onClick={handleDownloadPDF} className="btn btn-primary" style={{ padding: '0.55rem 0.95rem', fontSize: '0.85rem' }}>
              <Download size={16} /> Download PDF
            </button>
            <button onClick={handleDownloadWord} className="btn btn-mint" style={{ padding: '0.55rem 0.95rem', fontSize: '0.85rem' }}>
              <FileCode size={16} /> Download Word (.doc)
            </button>
          </div>
        </div>

        {/* Stage Selector Bar */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-color-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>
            Select Career Stage:
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-subtle)', padding: '4px', borderRadius: '0.65rem' }}>
            <button
              onClick={() => handleStageChange('fresher')}
              className={`btn ${careerStage === 'fresher' ? 'btn-mint' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              🎓 Fresher / Graduate (0 - 2 yrs)
            </button>
            <button
              onClick={() => handleStageChange('experienced')}
              className={`btn ${careerStage === 'experienced' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              💼 Experienced Lead (2+ yrs)
            </button>
          </div>

          <button
            onClick={() => {
              setIsUserCustomized(false);
              setResumeData(isFresher ? FRESHER_RESUME_DATA : EXPERIENCED_RESUME_DATA);
            }}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', marginLeft: 'auto' }}
          >
            🔄 Load {isFresher ? 'Fresher' : 'Experienced'} Sample Data
          </button>
        </div>
      </div>

      {/* EXTRACTION SUCCESS ALERT */}
      {extractionAlert && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: '0.85rem',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(16, 185, 129, 0.15))',
          border: '1px solid var(--primary-lavender)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.3s ease-in-out',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Sparkles size={20} color="var(--primary-lavender)" />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {extractionAlert}
            </span>
          </div>
          <button
            onClick={() => setExtractionAlert(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.85rem'
            }}
          >
            Dismiss ✕
          </button>
        </div>
      )}

      {/* Main Grid: Left Editor | Right Live Preview */}
      <div className="responsive-split-2" style={{ gap: '2rem', alignItems: 'start' }}>
        {/* Editor Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Template Selector */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={16} color="var(--primary-lavender)" /> CHOOSE RESUME TEMPLATE (6 DISTINCT DESIGNS)
              </label>
              <span className="badge badge-lavender" style={{ fontSize: '0.725rem' }}>
                {template.toUpperCase()} ACTIVE
              </span>
            </div>

            {/* Template Selector Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
              <button
                onClick={() => setTemplate('fresher-academic')}
                className={`btn ${template === 'fresher-academic' ? 'btn-mint' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 0.75rem', fontSize: '0.785rem', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}
              >
                <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  🎓 Emerald Academic
                </div>
                <span style={{ fontSize: '0.685rem', opacity: 0.8 }}>Campus & Placement Ready</span>
              </button>

              <button
                onClick={() => setTemplate('fresher-compact')}
                className={`btn ${template === 'fresher-compact' ? 'btn-mint' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 0.75rem', fontSize: '0.785rem', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}
              >
                <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  📑 Silicon Grid 1-Page
                </div>
                <span style={{ fontSize: '0.685rem', opacity: 0.8 }}>High-Density Split Layout</span>
              </button>

              <button
                onClick={() => setTemplate('fresher-modern')}
                className={`btn ${template === 'fresher-modern' ? 'btn-mint' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 0.75rem', fontSize: '0.785rem', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}
              >
                <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  ⚡ Neo-Tech Blue Wave
                </div>
                <span style={{ fontSize: '0.685rem', opacity: 0.8 }}>Modern Tech Stack Focus</span>
              </button>

              <button
                onClick={() => setTemplate('exp-executive')}
                className={`btn ${template === 'exp-executive' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 0.75rem', fontSize: '0.785rem', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}
              >
                <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  💼 Royal Lavender Suite
                </div>
                <span style={{ fontSize: '0.685rem', opacity: 0.8 }}>Executive Senior Lead</span>
              </button>

              <button
                onClick={() => setTemplate('exp-sidebar')}
                className={`btn ${template === 'exp-sidebar' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 0.75rem', fontSize: '0.785rem', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}
              >
                <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  🏛️ Swiss Dark Sidebar
                </div>
                <span style={{ fontSize: '0.685rem', opacity: 0.8 }}>2-Column Modern Split</span>
              </button>

              <button
                onClick={() => setTemplate('exp-minimal')}
                className={`btn ${template === 'exp-minimal' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 0.75rem', fontSize: '0.785rem', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}
              >
                <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  🚀 FAANG Monochrome
                </div>
                <span style={{ fontSize: '0.685rem', opacity: 0.8 }}>100% ATS Top Tier</span>
              </button>
            </div>
          </div>

          {/* Personal Info Editor */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: isFresher ? 'var(--accent-mint)' : 'var(--primary-lavender)' }}>
              Personal & Contact Details
            </h4>
            <div className="responsive-form-row-2">
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600' }}>Full Name</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => updateResumeField('fullName', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600' }}>Professional Title / Goal</label>
                <input
                  type="text"
                  value={resumeData.title}
                  onChange={(e) => updateResumeField('title', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600' }}>Email Address</label>
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => updateResumeField('email', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600' }}>Phone</label>
                <input
                  type="text"
                  value={resumeData.phone}
                  onChange={(e) => updateResumeField('phone', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600' }}>Location</label>
                <input
                  type="text"
                  value={resumeData.location}
                  onChange={(e) => updateResumeField('location', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600' }}>GitHub / Portfolio Link</label>
                <input
                  type="text"
                  value={resumeData.github}
                  onChange={(e) => updateResumeField('github', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ marginTop: '0.85rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600' }}>Professional Summary / Objective</label>
              <textarea
                rows={3}
                value={resumeData.summary}
                onChange={(e) => updateResumeField('summary', e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Education Editor */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ fontSize: '1.1rem', color: isFresher ? 'var(--accent-mint)' : 'var(--primary-lavender)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GraduationCap size={18} /> Education & Academic Credentials
              </h4>
              <button onClick={handleAddEdu} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.775rem' }}>
                <Plus size={14} /> Add Education
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {resumeData.education.map(edu => (
                <div key={edu.id} style={{ padding: '0.85rem', background: 'var(--bg-subtle)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem' }}>Degree / Specialization</strong>
                    <button onClick={() => handleDeleteEdu(edu.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEdu(edu.id, 'degree', e.target.value)}
                    className="input-field"
                    style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}
                  />
                  <div className="responsive-form-row-2" style={{ gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="University / Institute"
                      value={edu.institution}
                      onChange={(e) => handleUpdateEdu(edu.id, 'institution', e.target.value)}
                      className="input-field"
                      style={{ fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Period (e.g. 2022-2026)"
                      value={edu.period}
                      onChange={(e) => handleUpdateEdu(edu.id, 'period', e.target.value)}
                      className="input-field"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Projects Editor */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ fontSize: '1.1rem', color: isFresher ? 'var(--accent-mint)' : 'var(--primary-lavender)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FolderGit2 size={18} /> Projects & Technical Applications
              </h4>
              <button onClick={handleAddProject} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.775rem' }}>
                <Plus size={14} /> Add Project
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {resumeData.projects.map(proj => (
                <div key={proj.id} style={{ padding: '0.85rem', background: 'var(--bg-subtle)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem' }}>Project Title</strong>
                    <button onClick={() => handleDeleteProject(proj.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => handleUpdateProject(proj.id, 'name', e.target.value)}
                    className="input-field"
                    style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Tech Stack Used (e.g. React, Node.js, Docker)"
                    value={proj.tech}
                    onChange={(e) => handleUpdateProject(proj.id, 'tech', e.target.value)}
                    className="input-field"
                    style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}
                  />
                  <textarea
                    rows={2}
                    placeholder="Key features and achievements..."
                    value={proj.description}
                    onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Experience Editor */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ fontSize: '1.1rem', color: isFresher ? 'var(--accent-mint)' : 'var(--primary-lavender)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Briefcase size={18} /> {isFresher ? 'Internships & Work History' : 'Corporate Work Experience'}
              </h4>
              <button onClick={handleAddExperience} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.775rem' }}>
                <Plus size={14} /> Add Experience
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {resumeData.experience.map(exp => (
                <div key={exp.id} style={{ padding: '0.85rem', background: 'var(--bg-subtle)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem' }}>Role Title & Company</strong>
                    <button onClick={() => handleDeleteExp(exp.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="responsive-form-row-2" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="Role (e.g. Frontend Developer)"
                      value={exp.role}
                      onChange={(e) => handleUpdateExp(exp.id, 'role', e.target.value)}
                      className="input-field"
                      style={{ fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => handleUpdateExp(exp.id, 'company', e.target.value)}
                      className="input-field"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Period (e.g. 2023 - Present)"
                    value={exp.period}
                    onChange={(e) => handleUpdateExp(exp.id, 'period', e.target.value)}
                    className="input-field"
                    style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}
                  />
                  <textarea
                    rows={2}
                    placeholder="Responsibilities and metrics..."
                    value={exp.details}
                    onChange={(e) => handleUpdateExp(exp.id, 'details', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skills Editor */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.85rem', color: isFresher ? 'var(--accent-mint)' : 'var(--primary-lavender)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Code size={18} /> Core Skills & Technologies
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
              {resumeData.skills.map(skill => (
                <span
                  key={skill}
                  style={{
                    background: isFresher ? 'var(--accent-mint-subtle)' : 'var(--primary-lavender-subtle)',
                    color: isFresher ? 'var(--accent-mint)' : 'var(--primary-lavender)',
                    border: `1px solid ${isFresher ? 'var(--accent-mint-border)' : 'var(--primary-lavender-border)'}`,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  {skill}
                  <button onClick={() => handleDeleteSkill(skill)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0 }}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                id="new-skill-input"
                placeholder="Add skill (e.g. Next.js, Docker)"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSkill(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById('new-skill-input');
                  if (input) {
                    handleAddSkill(input.value);
                    input.value = '';
                  }
                }}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Live Document Preview Panel - Renders ONLY user data in standard A4 sheet (Sticky position on scroll) */}
        <div className="resume-preview-panel-column">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Eye size={16} /> LIVE PREVIEW: {template.toUpperCase()}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className="badge badge-blue">📄 Standard A4 (210mm × 297mm)</span>
              <span className={`badge ${isFresher ? 'badge-mint' : 'badge-lavender'}`}>
                {careerStage.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Printable Document Container — Standard International A4 Page Dimensions (210mm x 297mm) */}
          <div className="resume-preview-container">
            <div
              id="resume-preview-doc"
            style={{
              width: '100%',
              maxWidth: '210mm',
              minHeight: '260mm',
              margin: '0 auto',
              background: '#ffffff',
              color: '#0f172a',
              padding: template === 'exp-sidebar' ? '0' : template === 'fresher-compact' ? '8mm 10mm' : '12mm 12mm',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0,0,0,0.04)',
              fontFamily: template === 'exp-minimal' ? 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' : 'Inter, sans-serif',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              boxSizing: 'border-box',
              overflow: 'hidden',
              position: 'relative',
              lineHeight: '1.45'
            }}
          >
            {/* ========================================================================= */}
            {/* TEMPLATE 1: FRESHER ACADEMIC PRESTIGE (Emerald Academic Ivy)               */}
            {/* ========================================================================= */}
            {template === 'fresher-academic' && (
              <div>
                {/* Header */}
                <div style={{ textAlign: 'center', borderBottom: '2px solid #059669', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                  <h1 style={{ fontSize: '1.85rem', color: '#065f46', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>
                    {resumeData.fullName || 'Your Full Name'}
                  </h1>
                  {resumeData.title && (
                    <h3 style={{ fontSize: '0.95rem', color: '#047857', fontWeight: '600', marginBottom: '0.45rem' }}>
                      {resumeData.title}
                    </h3>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.775rem', color: '#334155' }}>
                    {resumeData.email && <span>✉ {resumeData.email}</span>}
                    {resumeData.phone && <span>• 📞 {resumeData.phone}</span>}
                    {resumeData.location && <span>• 📍 {resumeData.location}</span>}
                    {resumeData.github && <span>• 🌐 {resumeData.github}</span>}
                    {resumeData.linkedin && <span>• 🔗 {resumeData.linkedin}</span>}
                  </div>
                </div>

                {/* Academic Profile / Objective */}
                {resumeData.summary && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#047857', fontWeight: '800', borderBottom: '1px solid #a7f3d0', paddingBottom: '2px', marginBottom: '0.35rem' }}>
                      Academic Profile & Career Objective
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: '#334155', lineHeight: '1.45' }}>
                      {resumeData.summary}
                    </p>
                  </div>
                )}

                {/* Education Section */}
                {resumeData.education.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#047857', fontWeight: '800', borderBottom: '1px solid #a7f3d0', paddingBottom: '2px', marginBottom: '0.45rem' }}>
                      Education & Academic Credentials
                    </h4>
                    {resumeData.education.map(edu => (
                      <div key={edu.id} style={{ marginBottom: '0.45rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: '700', color: '#064e3b' }}>
                          <span>{edu.degree}</span>
                          <span style={{ fontSize: '0.775rem', color: '#047857', fontWeight: '600' }}>{edu.period}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>{edu.institution}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Academic & Technical Projects */}
                {resumeData.projects.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#047857', fontWeight: '800', borderBottom: '1px solid #a7f3d0', paddingBottom: '2px', marginBottom: '0.45rem' }}>
                      Technical Projects & Applications
                    </h4>
                    {resumeData.projects.map(proj => (
                      <div key={proj.id} style={{ marginBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>
                          <span>{proj.name}</span>
                          {proj.tech && (
                            <span style={{ fontSize: '0.725rem', color: '#065f46', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.1rem 0.45rem', borderRadius: '4px', fontWeight: '600' }}>
                              {proj.tech}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.15rem', lineHeight: '1.4' }}>
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Core Technical Skills */}
                {resumeData.skills.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#047857', fontWeight: '800', borderBottom: '1px solid #a7f3d0', paddingBottom: '2px', marginBottom: '0.45rem' }}>
                      Technical Competencies & Skills
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {resumeData.skills.map(s => (
                        <span key={s} style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internships / Work Experience (if present) */}
                {resumeData.experience.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#047857', fontWeight: '800', borderBottom: '1px solid #a7f3d0', paddingBottom: '2px', marginBottom: '0.45rem' }}>
                      Internships & Industry Experience
                    </h4>
                    {resumeData.experience.map(exp => (
                      <div key={exp.id} style={{ marginBottom: '0.55rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>
                          <span>{exp.role} — <span style={{ color: '#047857', fontWeight: '600' }}>{exp.company}</span></span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{exp.period}</span>
                        </div>
                        {exp.details && (
                          <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.15rem', lineHeight: '1.4' }}>
                            {exp.details}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* TEMPLATE 2: FRESHER COMPACT 1-PAGE (Silicon Grid High-Density)            */}
            {/* ========================================================================= */}
            {template === 'fresher-compact' && (
              <div>
                {/* Header with High-Density Pill */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #4f46e5', paddingBottom: '0.65rem', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h1 style={{ fontSize: '1.75rem', color: '#312e81', fontWeight: '900', letterSpacing: '-0.02em', margin: 0 }}>
                      {resumeData.fullName || 'Candidate Name'}
                    </h1>
                    <div style={{ fontSize: '0.875rem', color: '#4f46e5', fontWeight: '700', marginTop: '0.15rem' }}>
                      {resumeData.title || 'Software Developer Aspirant'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.725rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    {resumeData.email && <div>✉ {resumeData.email}</div>}
                    {resumeData.phone && <div>📞 {resumeData.phone} | 📍 {resumeData.location}</div>}
                    {resumeData.github && <div>🌐 {resumeData.github}</div>}
                  </div>
                </div>

                {/* 2-Column Split Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.75fr', gap: '1rem' }}>
                  {/* Left Column: Education & Skills */}
                  <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '0.85rem' }}>
                    {/* Education */}
                    {resumeData.education.length > 0 && (
                      <div style={{ marginBottom: '0.85rem' }}>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4338ca', fontWeight: '800', marginBottom: '0.35rem' }}>
                          🎓 Education
                        </h4>
                        {resumeData.education.map(edu => (
                          <div key={edu.id} style={{ marginBottom: '0.45rem', fontSize: '0.75rem' }}>
                            <strong style={{ display: 'block', color: '#0f172a' }}>{edu.degree}</strong>
                            <div style={{ color: '#475569' }}>{edu.institution}</div>
                            <div style={{ color: '#6366f1', fontWeight: '600' }}>{edu.period}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technical Skills */}
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4338ca', fontWeight: '800', marginBottom: '0.35rem' }}>
                          ⚡ Core Skills
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                          {resumeData.skills.map(s => (
                            <span key={s} style={{ background: '#eef2ff', color: '#3730a3', border: '1px solid #c7d2fe', padding: '0.1rem 0.4rem', borderRadius: '3px', fontSize: '0.7rem', fontWeight: '600' }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Objective, Projects, Experience */}
                  <div>
                    {/* Summary */}
                    {resumeData.summary && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4338ca', fontWeight: '800', marginBottom: '0.25rem' }}>
                          🎯 Profile Objective
                        </h4>
                        <p style={{ fontSize: '0.775rem', color: '#334155', lineHeight: '1.4' }}>
                          {resumeData.summary}
                        </p>
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects.length > 0 && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4338ca', fontWeight: '800', marginBottom: '0.35rem' }}>
                          🚀 Technical Projects
                        </h4>
                        {resumeData.projects.map(proj => (
                          <div key={proj.id} style={{ marginBottom: '0.5rem', background: '#f8fafc', padding: '0.45rem 0.6rem', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>
                              <span>{proj.name}</span>
                              <span style={{ fontSize: '0.675rem', color: '#4f46e5' }}>{proj.tech}</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0.2rem 0 0 0', lineHeight: '1.35' }}>
                              {proj.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4338ca', fontWeight: '800', marginBottom: '0.35rem' }}>
                          💼 Experience & Internships
                        </h4>
                        {resumeData.experience.map(exp => (
                          <div key={exp.id} style={{ marginBottom: '0.45rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', fontWeight: '700', color: '#0f172a' }}>
                              <span>{exp.role} — {exp.company}</span>
                              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{exp.period}</span>
                            </div>
                            <p style={{ fontSize: '0.735rem', color: '#475569', margin: '0.15rem 0 0 0' }}>
                              {exp.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TEMPLATE 3: FRESHER MODERN BLUE WAVE (Neo-Tech Developer)                 */}
            {/* ========================================================================= */}
            {template === 'fresher-modern' && (
              <div>
                {/* Modern Banner Header */}
                <div style={{ borderLeft: '4px solid #0284c7', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
                  <h1 style={{ fontSize: '1.95rem', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
                    {resumeData.fullName}
                  </h1>
                  <h3 style={{ fontSize: '1rem', color: '#0284c7', fontWeight: '700', margin: '0.25rem 0 0.5rem 0' }}>
                    {resumeData.title || 'Software Development Engineer'}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', fontSize: '0.785rem', color: '#475569' }}>
                    {resumeData.email && <span>✉ {resumeData.email}</span>}
                    {resumeData.phone && <span>📞 {resumeData.phone}</span>}
                    {resumeData.location && <span>📍 {resumeData.location}</span>}
                    {resumeData.github && <span>🌐 {resumeData.github}</span>}
                    {resumeData.linkedin && <span>🔗 {resumeData.linkedin}</span>}
                  </div>
                </div>

                {/* Summary */}
                {resumeData.summary && (
                  <div style={{ marginBottom: '1.1rem', background: '#f0f9ff', padding: '0.65rem 0.9rem', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                    <p style={{ fontSize: '0.825rem', color: '#0369a1', margin: 0, lineHeight: '1.45', fontWeight: '500' }}>
                      {resumeData.summary}
                    </p>
                  </div>
                )}

                {/* Core Stack */}
                {resumeData.skills.length > 0 && (
                  <div style={{ marginBottom: '1.1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0284c7', fontWeight: '800', borderBottom: '1.5px solid #e0f2fe', paddingBottom: '3px', marginBottom: '0.45rem' }}>
                      ⚡ Technical Stack & Core Competencies
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {resumeData.skills.map(s => (
                        <span key={s} style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', padding: '0.2rem 0.55rem', borderRadius: '5px', fontSize: '0.75rem', fontWeight: '600' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Projects */}
                {resumeData.projects.length > 0 && (
                  <div style={{ marginBottom: '1.1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0284c7', fontWeight: '800', borderBottom: '1.5px solid #e0f2fe', paddingBottom: '3px', marginBottom: '0.55rem' }}>
                      🚀 Featured Software Engineering Projects
                    </h4>
                    {resumeData.projects.map(proj => (
                      <div key={proj.id} style={{ marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.875rem', fontWeight: '700', color: '#0f172a' }}>
                          <span>{proj.name}</span>
                          <span style={{ fontSize: '0.725rem', color: '#0284c7', fontWeight: '600' }}>{proj.tech}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.15rem', lineHeight: '1.4' }}>
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div style={{ marginBottom: '1.1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0284c7', fontWeight: '800', borderBottom: '1.5px solid #e0f2fe', paddingBottom: '3px', marginBottom: '0.45rem' }}>
                      🎓 Education & Degrees
                    </h4>
                    {resumeData.education.map(edu => (
                      <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.825rem' }}>
                        <div>
                          <strong style={{ color: '#0f172a' }}>{edu.degree}</strong>
                          <div style={{ color: '#64748b' }}>{edu.institution}</div>
                        </div>
                        <span style={{ color: '#0284c7', fontWeight: '600', fontSize: '0.775rem' }}>{edu.period}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0284c7', fontWeight: '800', borderBottom: '1.5px solid #e0f2fe', paddingBottom: '3px', marginBottom: '0.45rem' }}>
                      💼 Work Experience & Internships
                    </h4>
                    {resumeData.experience.map(exp => (
                      <div key={exp.id} style={{ marginBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>
                          <span>{exp.role} — <span style={{ color: '#0284c7' }}>{exp.company}</span></span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{exp.period}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.15rem' }}>
                          {exp.details}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* TEMPLATE 4: EXPERIENCED SENIOR EXECUTIVE (Royal Lavender Executive Suite)   */}
            {/* ========================================================================= */}
            {template === 'exp-executive' && (
              <div>
                {/* Executive Header */}
                <div style={{ borderBottom: '3px solid #6d28d9', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h1 style={{ fontSize: '2.1rem', color: '#4c1d95', fontWeight: '900', letterSpacing: '-0.02em', margin: 0 }}>
                        {resumeData.fullName}
                      </h1>
                      <h3 style={{ fontSize: '1.05rem', color: '#6d28d9', fontWeight: '700', margin: '0.2rem 0 0 0' }}>
                        {resumeData.title || 'Senior Software Engineering Leader'}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.785rem', color: '#475569' }}>
                      <div>{resumeData.email} | {resumeData.phone}</div>
                      <div>{resumeData.location} {resumeData.github && `| ${resumeData.github}`}</div>
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                {resumeData.summary && (
                  <div style={{ marginBottom: '1.25rem', background: '#faf5ff', borderLeft: '3px solid #7c3aed', padding: '0.75rem 1rem', borderRadius: '0 6px 6px 0' }}>
                    <h4 style={{ fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6d28d9', fontWeight: '800', margin: '0 0 0.25rem 0' }}>
                      Executive Profile
                    </h4>
                    <p style={{ fontSize: '0.835rem', color: '#334155', margin: 0, lineHeight: '1.45' }}>
                      {resumeData.summary}
                    </p>
                  </div>
                )}

                {/* Professional Work Experience */}
                {resumeData.experience.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6d28d9', fontWeight: '800', borderBottom: '1px solid #e9d5ff', paddingBottom: '3px', marginBottom: '0.65rem' }}>
                      Professional Work Experience
                    </h4>
                    {resumeData.experience.map(exp => (
                      <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
                          <span>{exp.role} <span style={{ color: '#6d28d9', fontWeight: '600' }}>• {exp.company}</span></span>
                          <span style={{ fontSize: '0.775rem', color: '#6b7280', fontWeight: '600' }}>{exp.period}</span>
                        </div>
                        <p style={{ fontSize: '0.825rem', color: '#334155', marginTop: '0.2rem', lineHeight: '1.45' }}>
                          {exp.details}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Core Technical Matrix */}
                {resumeData.skills.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6d28d9', fontWeight: '800', borderBottom: '1px solid #e9d5ff', paddingBottom: '3px', marginBottom: '0.5rem' }}>
                      Core Competencies & Technical Skills
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {resumeData.skills.map(s => (
                        <span key={s} style={{ background: '#ede9fe', color: '#5b21b6', border: '1px solid #ddd6fe', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.765rem', fontWeight: '600' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architectural Projects */}
                {resumeData.projects.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6d28d9', fontWeight: '800', borderBottom: '1px solid #e9d5ff', paddingBottom: '3px', marginBottom: '0.55rem' }}>
                      Architectural & Flagship Projects
                    </h4>
                    {resumeData.projects.map(proj => (
                      <div key={proj.id} style={{ marginBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.865rem', fontWeight: '700', color: '#0f172a' }}>
                          <span>{proj.name}</span>
                          <span style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: '600' }}>{proj.tech}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.15rem' }}>
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6d28d9', fontWeight: '800', borderBottom: '1px solid #e9d5ff', paddingBottom: '3px', marginBottom: '0.45rem' }}>
                      Education & Academic Background
                    </h4>
                    {resumeData.education.map(edu => (
                      <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span><strong style={{ color: '#0f172a' }}>{edu.degree}</strong> — {edu.institution}</span>
                        <span style={{ fontSize: '0.775rem', color: '#6b7280' }}>{edu.period}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* TEMPLATE 5: TWO-COLUMN SIDEBAR (Swiss Modern Split)                      */}
            {/* ========================================================================= */}
            {template === 'exp-sidebar' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', minHeight: '260mm', boxSizing: 'border-box' }}>
                {/* Left Sidebar */}
                <div style={{ background: '#0f172a', color: '#f8fafc', padding: '1.5rem 1.25rem' }}>
                  <h1 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '0.2rem', color: '#ffffff', letterSpacing: '-0.01em' }}>
                    {resumeData.fullName}
                  </h1>
                  <h3 style={{ fontSize: '0.85rem', color: '#c4b5fd', fontWeight: '600', marginBottom: '1.25rem' }}>
                    {resumeData.title || 'Software Engineer'}
                  </h3>

                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {resumeData.email && <div>✉ {resumeData.email}</div>}
                    {resumeData.phone && <div>📞 {resumeData.phone}</div>}
                    {resumeData.location && <div>📍 {resumeData.location}</div>}
                    {resumeData.github && <div>🌐 {resumeData.github}</div>}
                    {resumeData.linkedin && <div>🔗 {resumeData.linkedin}</div>}
                  </div>

                  {/* Skills */}
                  {resumeData.skills.length > 0 && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.785rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#a78bfa', fontWeight: '800', marginBottom: '0.45rem' }}>
                        Core Skills
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {resumeData.skills.map(s => (
                          <span key={s} style={{ background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {resumeData.education.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.785rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#a78bfa', fontWeight: '800', marginBottom: '0.45rem' }}>
                        Education
                      </h4>
                      {resumeData.education.map(edu => (
                        <div key={edu.id} style={{ fontSize: '0.735rem', marginBottom: '0.45rem', color: '#cbd5e1' }}>
                          <strong style={{ color: '#ffffff', display: 'block' }}>{edu.degree}</strong>
                          {edu.institution} <span style={{ color: '#94a3b8' }}>({edu.period})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Main Column */}
                <div style={{ padding: '1.5rem 1.25rem' }}>
                  {/* Summary */}
                  {resumeData.summary && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#7c3aed', fontWeight: '800', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '0.4rem' }}>
                        Executive Summary
                      </h4>
                      <p style={{ fontSize: '0.825rem', lineHeight: '1.45', color: '#334155' }}>
                        {resumeData.summary}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {resumeData.experience.length > 0 && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#7c3aed', fontWeight: '800', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '0.6rem' }}>
                        Professional Experience
                      </h4>
                      {resumeData.experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.865rem', fontWeight: '700', color: '#0f172a' }}>
                            <span>{exp.role} — <span style={{ color: '#6d28d9' }}>{exp.company}</span></span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{exp.period}</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.2rem', lineHeight: '1.4' }}>
                            {exp.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Projects */}
                  {resumeData.projects.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#7c3aed', fontWeight: '800', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '0.5rem' }}>
                        Key Technical Projects
                      </h4>
                      {resumeData.projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '0.65rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.835rem', fontWeight: '700', color: '#0f172a' }}>
                            <span>{proj.name}</span>
                            <span style={{ fontSize: '0.725rem', color: '#6d28d9' }}>{proj.tech}</span>
                          </div>
                          <p style={{ fontSize: '0.785rem', color: '#475569', marginTop: '0.15rem' }}>
                            {proj.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TEMPLATE 6: FAANG MINIMALIST MONOCHROME (Clean 100% ATS Classic)           */}
            {/* ========================================================================= */}
            {template === 'exp-minimal' && (
              <div>
                {/* Clean Centered Monochrome Header */}
                <div style={{ textAlign: 'center', borderBottom: '1.5px solid #000000', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <h1 style={{ fontSize: '2rem', color: '#000000', fontWeight: '900', letterSpacing: '-0.03em', margin: '0 0 0.15rem 0' }}>
                    {resumeData.fullName}
                  </h1>
                  {resumeData.title && (
                    <div style={{ fontSize: '0.95rem', color: '#374151', fontWeight: '600', marginBottom: '0.35rem' }}>
                      {resumeData.title}
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', fontSize: '0.785rem', color: '#111827' }}>
                    {resumeData.email && <span>{resumeData.email}</span>}
                    {resumeData.phone && <span>| {resumeData.phone}</span>}
                    {resumeData.location && <span>| {resumeData.location}</span>}
                    {resumeData.github && <span>| {resumeData.github}</span>}
                    {resumeData.linkedin && <span>| {resumeData.linkedin}</span>}
                  </div>
                </div>

                {/* Professional Summary */}
                {resumeData.summary && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000000', fontWeight: '900', borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: '0.35rem' }}>
                      Professional Summary
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: '#111827', lineHeight: '1.45', margin: 0 }}>
                      {resumeData.summary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000000', fontWeight: '900', borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: '0.5rem' }}>
                      Work Experience
                    </h4>
                    {resumeData.experience.map(exp => (
                      <div key={exp.id} style={{ marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: '800', color: '#000000' }}>
                          <span>{exp.role}</span>
                          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{exp.period}</span>
                        </div>
                        <div style={{ fontSize: '0.825rem', fontStyle: 'italic', color: '#374151', marginBottom: '0.2rem' }}>
                          {exp.company}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#111827', lineHeight: '1.4', margin: 0 }}>
                          • {exp.details}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Core Technical Skills */}
                {resumeData.skills.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000000', fontWeight: '900', borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: '0.35rem' }}>
                      Technical Skills
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#111827', lineHeight: '1.45' }}>
                      <strong>Languages & Technologies: </strong>
                      {resumeData.skills.join(' • ')}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000000', fontWeight: '900', borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: '0.45rem' }}>
                      Key Projects
                    </h4>
                    {resumeData.projects.map(proj => (
                      <div key={proj.id} style={{ marginBottom: '0.6rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '800', color: '#000000' }}>
                          <span>{proj.name}</span>
                          <span style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#4b5563' }}>{proj.tech}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#111827', marginTop: '0.1rem', margin: 0 }}>
                          • {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000000', fontWeight: '900', borderBottom: '1px solid #111827', paddingBottom: '2px', marginBottom: '0.35rem' }}>
                      Education
                    </h4>
                    {resumeData.education.map(edu => (
                      <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.25rem' }}>
                        <div>
                          <strong style={{ color: '#000000' }}>{edu.degree}</strong>, {edu.institution}
                        </div>
                        <span style={{ fontWeight: '600' }}>{edu.period}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Existing Resume Modal */}
      {showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '640px', width: '100%', padding: '1.75rem', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-lavender)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={20} /> Import & Parse Resume File
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem' }}>
                ✕
              </button>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Upload your existing resume in <strong>any format</strong>: Google Docs Text (.txt), Word (.docx, .doc), PDF (.pdf), OpenDocument (.odt), RTF (.rtf), HTML, Markdown, or paste raw text directly.
            </p>

            {/* File Upload Dropzone */}
            <div style={{
              border: '2px dashed var(--primary-lavender-border)',
              borderRadius: '0.85rem',
              padding: '1.5rem',
              textAlign: 'center',
              background: 'var(--primary-lavender-subtle)',
              marginBottom: '1.25rem',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <input
                type="file"
                accept="*/*,.pdf,.doc,.docx,.txt,.rtf,.odt,.html,.htm,.md,.markdown,.gdoc,.tex,text/*,application/*"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <FileCode size={36} color="var(--primary-lavender)" style={{ marginBottom: '0.5rem' }} />
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                {uploadedFile ? uploadedFile.name : 'Click or Drag & Drop Any Resume File Here'}
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Supports 📄 PDF, 📝 Word (.docx, .doc), 📑 Google Docs (.txt), 📋 RTF, 📄 ODT, 🌐 HTML, 📝 Markdown, or Any Document
              </span>
              {isParsingFile && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--primary-lavender)', fontWeight: '700' }}>
                  ⏳ Extracting document content from file...
                </div>
              )}
              {isExtractingAI && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--primary-lavender)', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} className="spin-icon" color="var(--primary-lavender)" />
                  ⚡ AI Extracting skills, education, projects & experience with zero hallucination...
                </div>
              )}
            </div>

            {/* Manual Text Preview or Edit Area */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                EXTRACTED RESUME CONTENT PREVIEW (OR PASTE OLD RESUME TEXT DIRECTLY)
              </label>
              <textarea
                rows={7}
                placeholder="Upload a PDF/Word file or paste your existing resume text directly here to extract..."
                value={uploadText}
                onChange={(e) => setUploadText(e.target.value)}
                className="input-field"
                style={{ fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                🔒 Zero Extra Data: Only extracts your authentic skills, projects, and career records.
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setShowUploadModal(false)} className="btn btn-secondary" disabled={isExtractingAI}>
                  Cancel
                </button>
                <button
                  onClick={handleExtractResumeInfo}
                  disabled={!uploadText.trim() || isParsingFile || isExtractingAI}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Sparkles size={16} />
                  <span>{isExtractingAI ? 'Extracting with AI...' : 'Extract & Fit into Template →'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
