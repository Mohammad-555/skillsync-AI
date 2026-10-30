import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  ExternalLink,
  Video,
  FileCode2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Search,
  Play,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Bookmark,
  BookmarkCheck,
  Shield,
  Database,
  Cloud,
  TrendingUp,
  Award
} from 'lucide-react';
import { generateITLearningGuideAI } from '../../utils/openRouterService';

const IT_RESOURCES_DATA = {
  frontend: {
    title: 'Frontend & Modern Web Engineering',
    badge: 'UI & Web Standards',
    description: 'Master modern component architectures, Server Components, TypeScript, and high-performance web applications.',
    videos: [
      {
        id: 'fe-1',
        title: 'React 19 & Next.js Full Stack Architecture Masterclass',
        channel: 'FreeCodeCamp / Traversy Media',
        duration: '4h 15m',
        level: 'Intermediate - Advanced',
        tags: ['React 19', 'Next.js App Router', 'Server Components', 'TypeScript'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=React+19+Nextjs+App+Router+Full+Stack+Architecture+Course'
      },
      {
        id: 'fe-2',
        title: 'TypeScript in Depth: Generics, Utility Types & Type Guards',
        channel: 'Matt Pocock / Total TypeScript',
        duration: '2h 30m',
        level: 'All Levels',
        tags: ['TypeScript', 'Generics', 'Type Narrowing', 'Best Practices'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=TypeScript+Generics+Advanced+Type+System+Tutorial'
      },
      {
        id: 'fe-3',
        title: 'Core Web Vitals & Frontend Performance Optimization (LCP, FID, CLS)',
        channel: 'Web Dev Simplified',
        duration: '1h 50m',
        level: 'Advanced',
        tags: ['Performance', 'LCP', 'CLS', 'Rendering Pipeline', 'Chrome DevTools'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Web+Performance+Core+Web+Vitals+Optimization+Tutorial'
      },
      {
        id: 'fe-4',
        title: 'Tailwind CSS & Modern Design Systems at Scale',
        channel: 'Tailwind Labs',
        duration: '2h 10m',
        level: 'Beginner - Intermediate',
        tags: ['Tailwind CSS', 'Design Systems', 'Responsive UI', 'Accessibility'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Tailwind+CSS+Design+System+Component+Patterns'
      }
    ]
  },
  backend: {
    title: 'Backend, Microservices & Distributed Systems',
    badge: 'High-Throughput APIs',
    description: 'Build enterprise microservices, optimize asynchronous non-blocking event loops, and implement event streaming.',
    videos: [
      {
        id: 'be-1',
        title: 'Microservices Architecture & Distributed System Design',
        channel: 'ByteByteGo / Hussein Nasser',
        duration: '3h 40m',
        level: 'Senior Architect',
        tags: ['Microservices', 'API Gateway', 'Circuit Breaker', 'Distributed Tracing'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Microservices+Architecture+Distributed+Systems+Design+Course'
      },
      {
        id: 'be-2',
        title: 'Node.js & Express Production Scalability & Event Loop Deep Dive',
        channel: 'Hussein Nasser',
        duration: '2h 20m',
        level: 'Advanced',
        tags: ['Node.js', 'Event Loop', 'Libuv', 'Clustering', 'Memory Management'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Nodejs+Event+Loop+Architecture+Performance+Hussein+Nasser'
      },
      {
        id: 'be-3',
        title: 'Apache Kafka Event-Driven Architecture & Streaming',
        channel: 'Confluent / Amigoscode',
        duration: '3h 15m',
        level: 'Intermediate - Advanced',
        tags: ['Kafka', 'Event Streaming', 'Producer/Consumer', 'Partitioning'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Apache+Kafka+Event+Driven+Architecture+Complete+Course'
      },
      {
        id: 'be-4',
        title: 'PostgreSQL Database Performance Tuning & Indexing Strategies',
        channel: 'Continuous Delivery / Tech Primers',
        duration: '1h 45m',
        level: 'Advanced',
        tags: ['PostgreSQL', 'B-Tree Indexing', 'EXPLAIN ANALYZE', 'Connection Pooling'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=PostgreSQL+Indexing+Query+Optimization+Performance+Tuning'
      }
    ]
  },
  ai_ml: {
    title: 'AI, Machine Learning & Generative AI (LLMs)',
    badge: 'GenAI & MLOps',
    description: 'Develop Retrieval-Augmented Generation (RAG) pipelines, explore neural architectures, and master LangChain.',
    videos: [
      {
        id: 'ai-1',
        title: 'Complete Generative AI & LLM Applications Course (LangChain & RAG)',
        channel: 'Krish Naik / FreeCodeCamp',
        duration: '5h 30m',
        level: 'All Levels',
        tags: ['LangChain', 'RAG Pipelines', 'Vector Databases', 'OpenAI API'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Generative+AI+LLM+LangChain+RAG+Pipeline+Complete+Course'
      },
      {
        id: 'ai-2',
        title: 'PyTorch Deep Learning & Neural Network Foundations from Scratch',
        channel: 'Daniel Bourke / FreeCodeCamp',
        duration: '4h 50m',
        level: 'Beginner - Intermediate',
        tags: ['PyTorch', 'CNNs', 'Tensors', 'Backpropagation', 'Model Training'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=PyTorch+Deep+Learning+Neural+Networks+Full+Course'
      },
      {
        id: 'ai-3',
        title: 'Transformer Architecture & Attention Mechanism Explained',
        channel: 'StatQuest / 3Blue1Brown',
        duration: '1h 30m',
        level: 'Intermediate',
        tags: ['Transformers', 'Self-Attention', 'Positional Encoding', 'LLM Internals'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Transformer+Architecture+Attention+Mechanism+Deep+Learning'
      },
      {
        id: 'ai-4',
        title: 'MLOps: Deploying Machine Learning Models to Production with FastAPI & Docker',
        channel: 'AssemblyAI / DataTalksClub',
        duration: '2h 40m',
        level: 'Advanced',
        tags: ['MLOps', 'FastAPI', 'Docker', 'Model Monitoring', 'CI/CD for ML'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=MLOps+Machine+Learning+Production+Deployment+FastAPI+Docker'
      }
    ]
  },
  cloud_devops: {
    title: 'Cloud Infrastructure, DevOps & Kubernetes (SRE)',
    badge: 'Cloud Native & IaC',
    description: 'Containerize enterprise workloads with Docker, orchestrate with Kubernetes, and provision via Terraform.',
    videos: [
      {
        id: 'dev-1',
        title: 'Docker & Kubernetes (K8s) Zero to Production Hero',
        channel: 'TechWorld with Nana',
        duration: '4h 30m',
        level: 'All Levels',
        tags: ['Docker', 'Kubernetes', 'Pods', 'Deployments', 'Services', 'Ingress'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Docker+Kubernetes+Complete+Course+TechWorld+with+Nana'
      },
      {
        id: 'dev-2',
        title: 'Terraform (IaC) Infrastructure as Code Masterclass',
        channel: 'Anton Putra / FreeCodeCamp',
        duration: '3h 10m',
        level: 'Intermediate',
        tags: ['Terraform', 'IaC', 'AWS Modules', 'State Management'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Terraform+Infrastructure+as+Code+AWS+Complete+Tutorial'
      },
      {
        id: 'dev-3',
        title: 'AWS Certified Solutions Architect Core Services Hands-on',
        channel: 'Andrew Brown / FreeCodeCamp',
        duration: '6h 00m',
        level: 'Intermediate - Advanced',
        tags: ['AWS', 'EC2', 'S3', 'VPC', 'IAM', 'Lambda', 'ECS'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=AWS+Solutions+Architect+Associate+Full+Course+FreeCodeCamp'
      },
      {
        id: 'dev-4',
        title: 'CI/CD Automation with GitHub Actions & Prometheus Observability',
        channel: 'NetworkChuck / DevOps Toolkit',
        duration: '2h 15m',
        level: 'Intermediate',
        tags: ['GitHub Actions', 'Prometheus', 'Grafana', 'Automated Testing'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=GitHub+Actions+CI+CD+Pipeline+Prometheus+Monitoring'
      }
    ]
  },
  cybersecurity: {
    title: 'Cybersecurity, Ethical Hacking & Cloud Defense',
    badge: 'Security & Penetration Testing',
    description: 'Explore vulnerability assessments, OWASP Top 10 web vulnerabilities, cryptography, and network defense.',
    videos: [
      {
        id: 'sec-1',
        title: 'Complete Ethical Hacking & Penetration Testing Boot Camp',
        channel: 'The Cyber Mentor / NetworkChuck',
        duration: '5h 00m',
        level: 'All Levels',
        tags: ['Ethical Hacking', 'Kali Linux', 'Nmap', 'Reconnaissance', 'Burp Suite'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Ethical+Hacking+Penetration+Testing+Full+Course+Cyber+Mentor'
      },
      {
        id: 'sec-2',
        title: 'OWASP Top 10 Web Application Vulnerabilities & Exploits Explained',
        channel: 'PwnFunction / LiveOverflow',
        duration: '2h 20m',
        level: 'Intermediate',
        tags: ['OWASP Top 10', 'SQL Injection', 'XSS', 'CSRF', 'Broken Auth'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=OWASP+Top+10+Web+Vulnerabilities+Exploitation+Prevention'
      },
      {
        id: 'sec-3',
        title: 'Network Security, Wireshark Packet Analysis & Firewalls',
        channel: 'David Bombal / NetworkChuck',
        duration: '3h 15m',
        level: 'Beginner - Intermediate',
        tags: ['Wireshark', 'Packet Sniffing', 'TCP/IP Handshake', 'TLS/SSL'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Wireshark+Packet+Analysis+Network+Security+Full+Tutorial'
      }
    ]
  },
  dsa_system_design: {
    title: 'Data Structures, Algorithms & System Design',
    badge: 'Tech Placement & Interviews',
    description: 'Master core patterns in dynamic programming, graphs, trees, and scalable high-level system design.',
    videos: [
      {
        id: 'dsa-1',
        title: 'System Design Interview: Step-by-Step Scalable Architecture',
        channel: 'ByteByteGo / Gaurav Sen',
        duration: '3h 45m',
        level: 'Advanced',
        tags: ['System Design', 'Caching', 'Load Balancing', 'Database Sharding', 'CDN'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=System+Design+Interview+Complete+Guide+ByteByteGo'
      },
      {
        id: 'dsa-2',
        title: 'Blind 75 & NeetCode 150 Core DSA Algorithms Cheat Sheet',
        channel: 'NeetCode',
        duration: '4h 20m',
        level: 'All Levels',
        tags: ['DSA', 'Two Pointers', 'Sliding Window', 'Dynamic Programming', 'Graphs'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=NeetCode+Blind+75+Algorithms+Data+Structures+Full+Guide'
      },
      {
        id: 'dsa-3',
        title: 'Dynamic Programming & Recursion Patterns Complete Mastery',
        channel: 'Striver (take U forward)',
        duration: '3h 30m',
        level: 'Intermediate - Advanced',
        tags: ['Dynamic Programming', 'Memoization', 'Tabulation', 'Subsequences'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=Dynamic+Programming+Playlist+Striver+take+U+forward'
      }
    ]
  },
  gov_open_source: {
    title: 'Government Tech, Public Digital Infrastructure & Open Source',
    badge: 'Digital India & OpenForge',
    description: 'Study India Stack, ONDC open network protocols, Aadhaar e-Sign APIs, UPI switches, and GovTech software standards.',
    videos: [
      {
        id: 'gov-1',
        title: 'India Stack Architecture: Identity, Payments & Data Empowerment',
        channel: 'iSPIRT / National Payments Corp',
        duration: '2h 10m',
        level: 'All Levels',
        tags: ['India Stack', 'UPI Protocols', 'Aadhaar Auth', 'DigiLocker API'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=India+Stack+Architecture+UPI+DigiLocker+Open+APIs'
      },
      {
        id: 'gov-2',
        title: 'Open Network for Digital Commerce (ONDC) Protocol Explained',
        channel: 'ONDC Official / TechSparks',
        duration: '1h 40m',
        level: 'Intermediate',
        tags: ['ONDC', 'Beckn Protocol', 'Decentralized Commerce', 'Open APIs'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=ONDC+Architecture+Beckn+Protocol+Open+APIs'
      },
      {
        id: 'gov-3',
        title: 'OpenForge & Government of India Open Source Software Initiative',
        channel: 'National Informatics Centre (NIC)',
        duration: '1h 20m',
        level: 'All Levels',
        tags: ['OpenForge', 'NIC Tech', 'GovTech Open Source', 'Public Software'],
        youtubeUrl: 'https://www.youtube.com/results?search_query=OpenForge+Government+of+India+Open+Source+Software+NIC'
      }
    ]
  }
};

export const ITResources = () => {
  const [activeDomain, setActiveDomain] = useState('frontend');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [savedResources, setSavedResources] = useState({});

  // AI Learning Guide Synthesizer State
  const [aiTopicInput, setAiTopicInput] = useState('');
  const [isGeneratingAiGuide, setIsGeneratingAiGuide] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [aiGuideResult, setAiGuideResult] = useState(null);
  const [activeGuideTab, setActiveGuideTab] = useState('notes'); // 'notes' | 'matrix' | 'traps' | 'courses' | 'quiz'
  const [userQuizAnswers, setUserQuizAnswers] = useState({});
  const [copySuccess, setCopySuccess] = useState(false);

  const currentDomainData = IT_RESOURCES_DATA[activeDomain] || IT_RESOURCES_DATA.frontend;

  const generationSteps = [
    '🔍 Analyzing tech stack RFCs, official specs & enterprise patterns...',
    '💻 Synthesizing production architecture & concurrency models...',
    '⚠️ Pinpointing real-world memory leaks, security flaws & gotchas...',
    '🎥 Curating top verified staff engineer video masterclasses...',
    '🎯 Formulating scenario-based tech interview & code challenges...'
  ];

  const handleGenerateAiGuide = async (topicOverride) => {
    const topicToQuery = (typeof topicOverride === 'string' ? topicOverride : aiTopicInput).trim();
    if (!topicToQuery) return;

    setIsGeneratingAiGuide(true);
    setGenerationStep(0);
    setUserQuizAnswers({});
    setActiveGuideTab('notes');

    const stepInterval = setInterval(() => {
      setGenerationStep(prev => (prev < generationSteps.length - 1 ? prev + 1 : prev));
    }, 550);

    try {
      const result = await generateITLearningGuideAI({
        topic: topicToQuery,
        techDomain: currentDomainData.title
      });
      setAiGuideResult(result);
    } catch (err) {
      console.error('Failed to generate IT guide:', err);
    } finally {
      clearInterval(stepInterval);
      setIsGeneratingAiGuide(false);
    }
  };

  const toggleSaveResource = (id) => {
    setSavedResources(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleQuizSelect = (qIdx, optIdx) => {
    setUserQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleCopyNotes = () => {
    if (!aiGuideResult) return;
    const textContent = `=== AI TECH STUDY GUIDE: ${aiGuideResult.topic} ===
Domain: ${aiGuideResult.domainBadge || aiGuideResult.techDomain}

--- ARCHITECTURAL & CONCEPTUAL OVERVIEW ---
${aiGuideResult.overviewNotes ? aiGuideResult.overviewNotes.join('\n\n') : aiGuideResult.summary}

--- CORE TECH & SYNTAX MATRIX ---
${aiGuideResult.coreMatrix ? aiGuideResult.coreMatrix.map(m => `• ${m.key}: ${m.value}`).join('\n') : ''}

--- PRODUCTION GOTCHAS & PITFALLS ---
${aiGuideResult.examinerTraps ? aiGuideResult.examinerTraps.join('\n') : ''}

--- HIGH YIELD INTERVIEW TIPS ---
${aiGuideResult.highYieldPoints ? aiGuideResult.highYieldPoints.join('\n') : ''}

--- RECOMMENDED VIDEO COURSES ---
${aiGuideResult.recommendedCourses ? aiGuideResult.recommendedCourses.map(c => `• ${c.title} (${c.channel}) - ${c.youtubeUrl}`).join('\n') : ''}
`;

    navigator.clipboard.writeText(textContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }).catch(err => console.error('Failed to copy notes:', err));
  };

  // Filter curated videos based on search and level
  const filteredVideos = currentDomainData.videos.filter(v => {
    const matchesSearch =
      searchQuery === '' ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLevel =
      selectedLevel === 'All' ||
      v.level.toLowerCase().includes(selectedLevel.toLowerCase());

    return matchesSearch && matchesLevel;
  });

  const popularSampleTopics = [
    'React 19 Server Components',
    'Kafka Partitioning & Consumer Groups',
    'Transformer Attention Mechanism',
    'Docker & Kubernetes Ingress',
    'Redis Distributed Caching & Locks',
    'OWASP Top 10 Web Vulnerabilities',
    'URL Shortener System Design',
    'India Stack & UPI Protocols'
  ];

  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, var(--primary-lavender-subtle), var(--bg-surface))',
        borderLeft: '5px solid var(--primary-lavender)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-lavender">📚 IT Tech Knowledge Hub</span>
          <span className="badge badge-mint">100% Free Verified Courses</span>
          <span className="badge badge-blue">✨ AI Learning Guide Synthesizer</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Free IT Sector Resources & Architectural Roadmaps
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '850px', lineHeight: '1.5' }}>
          Curated production masterclasses, verified developer roadmaps, and an intelligent Staff-Engineer AI study synthesizer covering Full Stack, Cloud, AI/ML, Cybersecurity, System Design, and Digital India Open Tech.
        </p>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: AI TECH LEARNING GUIDE SYNTHESIZER              */}
      {/* ========================================================= */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2.5rem', border: '1px solid var(--primary-lavender)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={22} color="var(--primary-lavender)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800' }}>
              Staff-Engineer AI Study Guide Synthesizer
            </h3>
          </div>
          <span className="badge badge-lavender" style={{ fontSize: '0.75rem' }}>
            Powered by Deep Tech AI Architecture
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Type any technical framework, architectural pattern, algorithm, or protocol to generate instant conceptual notes, Big-O tables, production traps, and interactive self-check quizzes:
        </p>

        {/* Input & Action Form */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={aiTopicInput}
              onChange={(e) => setAiTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateAiGuide()}
              placeholder="e.g. React 19 Server Components, Kafka Consumer Groups, Docker Networking, RAG Pipelines..."
              className="input-field"
              style={{ paddingLeft: '2.5rem', width: '100%', fontSize: '0.9rem' }}
            />
          </div>

          <button
            onClick={() => handleGenerateAiGuide()}
            disabled={isGeneratingAiGuide || !aiTopicInput.trim()}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '700'
            }}
          >
            {isGeneratingAiGuide ? (
              <>
                <Zap size={16} className="animate-spin" /> Synthesizing...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Generate Tech Guide
              </>
            )}
          </button>
        </div>

        {/* Quick Sample Topic Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: '700' }}>
            Trending Topics:
          </span>
          {popularSampleTopics.map(topic => (
            <button
              key={topic}
              onClick={() => {
                setAiTopicInput(topic);
                handleGenerateAiGuide(topic);
              }}
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                background: 'var(--bg-subtle)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-lavender)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              ⚡ {topic}
            </button>
          ))}
        </div>

        {/* Real-time Generation Progress Animation */}
        {isGeneratingAiGuide && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-lavender)', animation: 'pulse 1.5s infinite' }}></div>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {generationSteps[generationStep]}
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((generationStep + 1) / generationSteps.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--primary-lavender), var(--accent-mint))',
                transition: 'width 0.4s ease'
              }}></div>
            </div>
          </div>
        )}

        {/* AI Guide Output Container */}
        {aiGuideResult && !isGeneratingAiGuide && (
          <div style={{
            marginTop: '1.75rem',
            padding: '1.5rem',
            borderRadius: '1rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            animation: 'fadeIn 0.3s ease'
          }}>
            {/* Guide Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span className="badge badge-mint">{aiGuideResult.domainBadge || 'Engineering Guide'}</span>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Staff Architect Synthesis</span>
                </div>
                <h4 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '800' }}>
                  {aiGuideResult.topic}
                </h4>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={handleCopyNotes}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  {copySuccess ? <CheckCircle2 size={15} color="var(--accent-mint)" /> : <BookOpen size={15} />}
                  {copySuccess ? 'Copied Cheatsheet!' : 'Copy Study Notes'}
                </button>
              </div>
            </div>

            {/* Guide Tab Navigation */}
            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color-subtle)' }}>
              {[
                { id: 'notes', label: '📖 Architecture & Notes' },
                { id: 'matrix', label: '📊 Code & Tech Matrix' },
                { id: 'traps', label: '⚠️ Production Gotchas' },
                { id: 'courses', label: '🎥 Curated Lectures' },
                { id: 'quiz', label: '🎯 Tech Check Quiz' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGuideTab(tab.id)}
                  className={`btn ${activeGuideTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap', borderRadius: '0.5rem' }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Notes & Concepts */}
            {activeGuideTab === 'notes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', lineHeight: '1.6', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                {aiGuideResult.overviewNotes?.map((para, idx) => (
                  <p key={idx} style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '0.65rem', borderLeft: '3px solid var(--primary-lavender)' }}>
                    {para}
                  </p>
                ))}

                {aiGuideResult.highYieldPoints?.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.65rem', color: 'var(--accent-mint)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Lightbulb size={16} /> High-Yield Production & Interview Insights:
                    </h5>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {aiGuideResult.highYieldPoints.map((pt, idx) => (
                        <li key={idx} style={{ listStyleType: 'disc' }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Tech & Code Matrix */}
            {activeGuideTab === 'matrix' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                {aiGuideResult.coreMatrix?.map((m, idx) => (
                  <div key={idx} style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-lavender)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                      {m.key}
                    </span>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.45', margin: 0 }}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Production Gotchas & Traps */}
            {activeGuideTab === 'traps' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '0.65rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <AlertTriangle size={18} color="#ef4444" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ef4444' }}>
                    Examiner Traps, Race Conditions & Production Failure Modes
                  </span>
                </div>
                {aiGuideResult.examinerTraps?.map((trap, idx) => (
                  <div key={idx} style={{ padding: '1rem', borderRadius: '0.65rem', background: 'var(--bg-subtle)', borderLeft: '3px solid #ef4444', fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                    <strong>Gotcha #{idx + 1}:</strong> {trap}
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: Curated Courses */}
            {activeGuideTab === 'courses' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {aiGuideResult.recommendedCourses?.map((course, idx) => (
                  <div key={idx} style={{ padding: '1.1rem', borderRadius: '0.75rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary-lavender)', fontWeight: '700' }}>{course.channel}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⏱ {course.duration}</span>
                      </div>
                      <h5 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: '700' }}>
                        {course.title}
                      </h5>
                    </div>
                    <a
                      href={course.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-lavender"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '0.5rem' }}
                    >
                      <Play size={14} /> Watch Free Course <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 5: Interactive Quiz */}
            {activeGuideTab === 'quiz' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {aiGuideResult.practiceCheckMCQs?.map((mcq, qIdx) => {
                  const selectedOpt = userQuizAnswers[qIdx];
                  const isAnswered = selectedOpt !== undefined;

                  return (
                    <div key={qIdx} style={{ padding: '1.25rem', borderRadius: '0.75rem', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)' }}>
                      <h5 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.85rem', fontWeight: '700' }}>
                        Q{qIdx + 1}: {mcq.question}
                      </h5>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.85rem' }}>
                        {mcq.options.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          const isCorrect = isAnswered && oIdx === mcq.correctIndex;
                          const isWrong = isAnswered && isSelected && oIdx !== mcq.correctIndex;

                          let btnStyle = {
                            padding: '0.65rem 1rem',
                            borderRadius: '0.5rem',
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-surface)',
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease'
                          };

                          if (isCorrect) {
                            btnStyle.background = 'rgba(16, 185, 129, 0.15)';
                            btnStyle.borderColor = '#10b981';
                            btnStyle.color = '#10b981';
                          } else if (isWrong) {
                            btnStyle.background = 'rgba(239, 68, 68, 0.15)';
                            btnStyle.borderColor = '#ef4444';
                            btnStyle.color = '#ef4444';
                          } else if (isSelected) {
                            btnStyle.borderColor = 'var(--primary-lavender)';
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => !isAnswered && handleQuizSelect(qIdx, oIdx)}
                              style={btnStyle}
                            >
                              <span>{opt}</span>
                              {isCorrect && <CheckCircle2 size={16} color="#10b981" />}
                              {isWrong && <AlertTriangle size={16} color="#ef4444" />}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'rgba(139, 92, 246, 0.08)', borderLeft: '3px solid var(--primary-lavender)', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
                          <strong>Technical Explanation:</strong> {mcq.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: CURATED DOMAIN TRACKS & VERIFIED COURSES        */}
      {/* ========================================================= */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: '800' }}>
              Curated Free IT Domain Tracks ({Object.keys(IT_RESOURCES_DATA).length} Tech Categories)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Comprehensive syllabus-mapped courses from verified educators & open-source platforms
            </p>
          </div>
        </div>

        {/* Domain Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          scrollbarWidth: 'thin'
        }}>
          {[
            { id: 'frontend', label: '💻 Frontend & Web', icon: Code2 },
            { id: 'backend', label: '⚙️ Backend & Microservices', icon: Cpu },
            { id: 'ai_ml', label: '🤖 AI & Generative AI', icon: Sparkles },
            { id: 'cloud_devops', label: '☁️ Cloud & DevOps (SRE)', icon: Cloud },
            { id: 'cybersecurity', label: '🛡️ Cybersecurity', icon: Shield },
            { id: 'dsa_system_design', label: '📐 DSA & System Design', icon: Layers },
            { id: 'gov_open_source', label: '🇮🇳 GovTech & India Stack', icon: Award }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveDomain(tab.id);
                setSearchQuery('');
              }}
              className={`btn ${activeDomain === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '0.6rem 1.1rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                borderRadius: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Domain Overview Card & Search Bar */}
        <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-lavender">{currentDomainData.badge}</span>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: '800' }}>
                {currentDomainData.title}
              </h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {currentDomainData.description}
            </p>
          </div>

          {/* Search & Difficulty Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter videos or stack..."
                className="input-field"
                style={{ paddingLeft: '2.2rem', paddingRight: '0.5rem', fontSize: '0.825rem', height: '36px' }}
              />
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input-field"
              style={{ height: '36px', fontSize: '0.825rem', padding: '0 0.75rem' }}
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
          {filteredVideos.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-subtle)', borderRadius: '1rem' }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                No resources found matching "{searchQuery}"
              </p>
              <button onClick={() => { setSearchQuery(''); setSelectedLevel('All'); }} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            filteredVideos.map(video => {
              const isSaved = savedResources[video.id];

              return (
                <div
                  key={video.id}
                  className="glass-panel"
                  style={{
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-lavender)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <div>
                    {/* Top Row: Provider & Level */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span style={{ fontSize: '0.775rem', fontWeight: '700', color: 'var(--primary-lavender)' }}>
                        {video.channel}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>⏱ {video.duration}</span>
                        <button
                          onClick={() => toggleSaveResource(video.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isSaved ? 'var(--primary-lavender)' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          title={isSaved ? 'Bookmarked' : 'Save resource'}
                        >
                          {isSaved ? <BookmarkCheck size={18} color="var(--primary-lavender)" /> : <Bookmark size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: '700', lineHeight: '1.4' }}>
                      {video.title}
                    </h4>

                    {/* Skill Tags */}
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                      {video.tags.map(t => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.725rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            background: 'var(--bg-subtle)',
                            color: 'var(--text-light)',
                            border: '1px solid var(--border-color-subtle)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer Action */}
                  <div style={{
                    borderTop: '1px dashed var(--border-color)',
                    paddingTop: '0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Level: <strong>{video.level}</strong>
                    </span>

                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-lavender"
                      style={{
                        padding: '0.45rem 0.95rem',
                        fontSize: '0.825rem',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Play size={14} /> Open Course <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ITResources;
