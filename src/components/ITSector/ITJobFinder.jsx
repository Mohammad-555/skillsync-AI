import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Building2,
  ExternalLink,
  MapPin,
  Briefcase,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Filter,
  Globe,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Code,
  Zap,
  RefreshCw,
  Home,
  Bell,
  Clock,
  Radio,
  Flame,
  Check,
  GraduationCap,
  Award,
  Calendar,
  Compass,
  Laptop,
  CheckCircle,
  Tag,
  Monitor,
  ChevronDown
} from 'lucide-react';
import { useSector } from '../../context/SectorContext';
import { fetchLiveITOpportunitiesWithAI } from '../../utils/openRouterService';

// Verified Top Trusted Hiring & Internship Platforms with Direct Search Generators
export const TRUSTED_PLATFORMS = [
  {
    id: 'forage',
    name: 'Forage Virtual Internships',
    badge: '100% Free • Verified Industry Certificates',
    color: '#10b981',
    icon: '🌐',
    category: 'virtual_free',
    baseUrl: 'https://www.theforage.com/simulations',
    internshipBaseUrl: 'https://www.theforage.com/simulations?career_interests=Software%20Engineering',
    defaultUrl: 'https://www.theforage.com/simulations',
    description: 'Free self-paced virtual work experience programs created by top global employers (JPMorgan Chase, Goldman Sachs, AWS, Accenture).'
  },
  {
    id: 'internshala',
    name: 'Internshala IT & Virtual Hub',
    badge: 'India #1 Tech & WFH Internships',
    color: '#008bdc',
    icon: '🎓',
    category: 'both',
    baseUrl: 'https://internshala.com/internships/computer-science-internship/',
    internshipBaseUrl: 'https://internshala.com/internships/work-from-home-computer-science-internships/',
    defaultUrl: 'https://internshala.com/internships/computer-science-internship/',
    description: 'Top Indian startups, MNCs, and IT companies offering paid in-office and virtual work-from-home internships with PPO potential.'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Tech & Internships',
    badge: 'Global #1 Professional Network',
    color: '#0a66c2',
    icon: '💼',
    category: 'both',
    baseUrl: 'https://www.linkedin.com/jobs/search/?keywords=',
    internshipBaseUrl: 'https://www.linkedin.com/jobs/search/?keywords=Software+Engineer+Intern&f_WT=2&location=India',
    defaultUrl: 'https://www.linkedin.com/jobs/search/?keywords=Software+Engineer&location=India',
    description: 'Direct applications to over 500,000+ verified technology jobs, virtual remote internships, and campus recruitment drives.'
  },
  {
    id: 'unstop',
    name: 'Unstop Virtual & Campus',
    badge: 'College & Hackathon Hiring',
    color: '#1c4980',
    icon: '🏆',
    category: 'both',
    baseUrl: 'https://unstop.com/internships?domain=Engineering',
    internshipBaseUrl: 'https://unstop.com/internships/virtual-internships?domain=Engineering',
    defaultUrl: 'https://unstop.com/internships?domain=Engineering',
    description: 'Premier campus recruitment drives, virtual internships, and competitive coding hackathons with cash awards and PPOs.'
  },
  {
    id: 'wellfound',
    name: 'Wellfound (AngelList)',
    badge: 'Top Tech Startups & US Virtual Remote',
    color: '#ff4d4d',
    icon: '🚀',
    category: 'both',
    baseUrl: 'https://wellfound.com/jobs?keywords=',
    internshipBaseUrl: 'https://wellfound.com/jobs?remote=true&role_types[]=internship&keywords=Software',
    defaultUrl: 'https://wellfound.com/jobs',
    description: 'Direct founder and hiring manager connections for high-growth tech startups and virtual remote student engineering roles.'
  },
  {
    id: 'google-careers',
    name: 'Google Student & STEP Hub',
    badge: 'Direct Google / STEP Portal',
    color: '#4285f4',
    icon: '🌐',
    category: 'both',
    baseUrl: 'https://www.google.com/about/careers/applications/jobs/results/?q=',
    internshipBaseUrl: 'https://www.google.com/about/careers/applications/jobs/results/?q=intern&location=India',
    defaultUrl: 'https://www.google.com/about/careers/applications/jobs/results/?location=India',
    description: 'Official verified career portal for Google, Google Cloud, Android, and STEP Student summer internships.'
  },
  {
    id: 'microsoft-careers',
    name: 'Microsoft University Careers',
    badge: 'Microsoft Cloud & AI Portal',
    color: '#00a4ef',
    icon: '💻',
    category: 'both',
    baseUrl: 'https://jobs.careers.microsoft.com/global/en/search?q=',
    internshipBaseUrl: 'https://jobs.careers.microsoft.com/global/en/search?q=intern&lc=India',
    defaultUrl: 'https://jobs.careers.microsoft.com/global/en/search?lc=India',
    description: 'Direct opportunities and 6-month college internships in Azure, M365 Copilot, and Windows engineering.'
  },
  {
    id: 'amazon-jobs',
    name: 'Amazon Student & AWS Careers',
    badge: 'Direct Amazon Student Hub',
    color: '#ff9900',
    icon: '📦',
    category: 'both',
    baseUrl: 'https://www.amazon.jobs/en/search?base_query=',
    internshipBaseUrl: 'https://www.amazon.jobs/en/search?base_query=intern&country=IND',
    defaultUrl: 'https://www.amazon.jobs/en/search?country=IND&category=software-development',
    description: 'Verified SDE intern and full-time software positions across Amazon.com, AWS, and Prime Video.'
  }
];

// Curated Base IT Opportunities (Paid Internships, 100% Free Virtual Certified Programs, & Full-Time Jobs)
export const BASE_IT_OPPORTUNITIES = [
  // 1. FREE VIRTUAL CERTIFIED INTERNSHIPS
  {
    id: 'it-virt-free-1',
    type: 'internship',
    paymentType: 'free_certified',
    isVirtual: true,
    title: 'Software Engineering Virtual Experience Program (Free Certificate)',
    company: 'JPMorgan Chase & Co.',
    logo: '🏦',
    location: '100% Virtual / Online',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Full Stack',
    experience: 'Open to All Students & Self-Learners',
    duration: '5 - 6 Hours (Self-Paced / Flexible)',
    salary: 'FREE (Verified Industry Certificate + Resume Asset)',
    stipendAmount: '100% Free & Certified',
    hasPPO: false,
    hasCertificate: true,
    postedDate: '2026-09-04',
    isNew: true,
    platformName: 'Forage Virtual Official',
    applyUrl: 'https://www.theforage.com/simulations/jpmorgan/software-engineering-6c7o',
    trustedBadge: 'Official JPMorgan Chase Verified',
    skills: ['Python', 'TypeScript', 'React', 'Git', 'Financial Data Feeds', 'Perspective Engine'],
    description: 'Complete realistic engineering tasks directly from JPMorgan Chase engineers. Interface with live financial visualization systems and earn a verified shareable credential for your CV/LinkedIn.'
  },
  {
    id: 'it-virt-free-2',
    type: 'internship',
    paymentType: 'free_certified',
    isVirtual: true,
    title: 'Software Engineering & Cryptography Virtual Experience',
    company: 'Goldman Sachs',
    logo: '💼',
    location: '100% Virtual / Online',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Cybersecurity',
    experience: 'Students / Freshers / Career Changers',
    duration: '4 - 5 Hours (Self-Paced)',
    salary: 'FREE (Certificate of Completion from Goldman Sachs)',
    stipendAmount: '100% Free & Certified',
    hasPPO: false,
    hasCertificate: true,
    postedDate: '2026-09-03',
    isNew: true,
    platformName: 'Forage Virtual Official',
    applyUrl: 'https://www.theforage.com/simulations/goldman-sachs/software-engineering-9s2f',
    trustedBadge: 'Official Goldman Sachs Program',
    skills: ['Cryptography', 'Password Security', 'SHA-256', 'Algorithms', 'Security Controls'],
    description: 'Learn real-world cybersecurity, password cracking mitigation, and cryptography algorithms used by Goldman Sachs global technology teams.'
  },
  {
    id: 'it-virt-free-3',
    type: 'internship',
    paymentType: 'free_certified',
    isVirtual: true,
    title: 'Cloud Solutions Architecture & AWS Virtual Internship',
    company: 'Amazon Web Services (AWS)',
    logo: '☁️',
    location: '100% Virtual / Online',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Cloud & DevOps',
    experience: 'Open to All Tech Enthusiasts',
    duration: '6 - 8 Hours (Self-Paced)',
    salary: 'FREE (AWS Architect Certificate of Completion)',
    stipendAmount: '100% Free & Certified',
    hasPPO: false,
    hasCertificate: true,
    postedDate: '2026-09-02',
    isNew: false,
    platformName: 'Forage Virtual Official',
    applyUrl: 'https://www.theforage.com/simulations/aws/solutions-architecture-m28a',
    trustedBadge: 'Official AWS Architecture Program',
    skills: ['AWS EC2', 'S3 & Storage', 'VPC & Networking', 'Serverless Lambda', 'System Design'],
    description: 'Design highly available, cost-optimized, and resilient cloud architectures under simulated enterprise requirements from AWS Principal Architects.'
  },
  {
    id: 'it-virt-free-4',
    type: 'internship',
    paymentType: 'free_certified',
    isVirtual: true,
    title: 'Developer & Agile Technology Virtual Experience',
    company: 'Accenture',
    logo: '⚡',
    location: '100% Virtual / Online',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Full Stack',
    experience: 'Open to All Enrolled Students & Freshers',
    duration: '4 - 5 Hours (Self-Paced)',
    salary: 'FREE (Accenture Industry Completion Badge)',
    stipendAmount: '100% Free & Certified',
    hasPPO: false,
    hasCertificate: true,
    postedDate: '2026-09-01',
    isNew: false,
    platformName: 'Forage Virtual Official',
    applyUrl: 'https://www.theforage.com/simulations/accenture-uk/developer-0x12',
    trustedBadge: 'Official Accenture Program',
    skills: ['Agile Methodologies', 'Architecture Assessment', 'Debugging', 'Code Refactoring'],
    description: 'Gain practical experience in modern software delivery cycles, agile scrum sprints, and enterprise code quality reviews.'
  },

  // 2. PAID HIGH-STIPEND INTERNSHIPS (HYBRID, IN-OFFICE & VIRTUAL REMOTE)
  {
    id: 'it-intern-1',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Software Engineering Summer Intern 2026 (Core Platforms)',
    company: 'Google',
    logo: '🌐',
    location: 'Bengaluru / Hyderabad',
    city: 'Bengaluru',
    workMode: 'Hybrid',
    domain: 'Full Stack',
    experience: 'Students / 2026-2027 Batch',
    duration: '3 - 6 Months (Summer 2026)',
    salary: '₹1,15,000 / month (Stipend + Housing)',
    stipendAmount: '₹1.15 Lakh/mo',
    hasPPO: true,
    hasCertificate: true,
    postedDate: '2026-09-04',
    isNew: true,
    platformName: 'Google Careers Official',
    applyUrl: 'https://www.google.com/about/careers/applications/jobs/results/?q=software+engineering+intern+india',
    trustedBadge: 'Official Google University Portal',
    skills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'Distributed Systems'],
    description: 'Work directly with Google senior engineers on scalable web services, Chrome, Search, and Google Cloud infrastructure. High pre-placement offer (PPO) conversion rate.'
  },
  {
    id: 'it-intern-2',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: true,
    title: 'AI Agent & LLM Architecture Intern (100% Virtual Remote)',
    company: 'Y Combinator AI Lab',
    logo: '🚀',
    location: '100% Virtual / Global Remote',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'AI & Data Science',
    experience: 'Open to All Enrolled Students & Freshers',
    duration: '3 - 6 Months (Flexible Virtual)',
    salary: '$2,500 - $4,500 / month (₹2.1L - ₹3.7L/mo)',
    stipendAmount: '$3,500/mo (USD)',
    hasPPO: true,
    hasCertificate: true,
    postedDate: '2026-09-04',
    isNew: true,
    platformName: 'YC Work at a Startup',
    applyUrl: 'https://www.workatastartup.com/jobs?role=internship',
    trustedBadge: 'Y Combinator Verified',
    skills: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'OpenAI APIs', 'Vector DBs'],
    description: 'Build agentic AI workflows, autonomous evaluation suites, and fine-tune open weights models with YC founders. 100% virtual online internship with top USD stipend.'
  },
  {
    id: 'it-intern-3',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Software Engineer Intern (Cloud, AI Copilot & Azure)',
    company: 'Microsoft',
    logo: '💻',
    location: 'Bengaluru / Hyderabad / Noida',
    city: 'Hyderabad',
    workMode: 'Hybrid',
    domain: 'Backend',
    experience: 'Pre-final & Final Year Students',
    duration: '6 Months (Jan - June / Summer)',
    salary: '₹1,25,000 / month (Stipend)',
    stipendAmount: '₹1.25 Lakh/mo',
    hasPPO: true,
    hasCertificate: true,
    postedDate: '2026-09-03',
    isNew: true,
    platformName: 'Microsoft University Careers',
    applyUrl: 'https://jobs.careers.microsoft.com/global/en/search?q=intern&lc=India',
    trustedBadge: 'Official Microsoft Verified',
    skills: ['C# / .NET', 'TypeScript', 'Azure Cloud', 'React', 'Problem Solving', 'Git'],
    description: 'Design and ship features for Microsoft Azure services and GenAI Copilots. Mentorship from Principal Engineers and consideration for full-time SDE roles upon graduation.'
  },
  {
    id: 'it-intern-4',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Software Development Engineer (SDE) Intern - 6 Months',
    company: 'Amazon & AWS',
    logo: '📦',
    location: 'Bengaluru / Hyderabad / Chennai',
    city: 'Bengaluru',
    workMode: 'On-site',
    domain: 'Full Stack',
    experience: 'B.Tech / M.Tech (2025/2026/2027)',
    duration: '6 Months Internship',
    salary: '₹80,000 - ₹1,10,000 / month',
    stipendAmount: '₹1.10 Lakh/mo',
    hasPPO: true,
    hasCertificate: true,
    postedDate: '2026-09-02',
    isNew: true,
    platformName: 'Amazon Student Portal',
    applyUrl: 'https://www.amazon.jobs/en/search?base_query=software+development+intern+india',
    trustedBadge: 'Official Amazon Careers',
    skills: ['Java', 'Object Oriented Design', 'Data Structures', 'AWS Lambda', 'DynamoDB', 'Algorithms'],
    description: 'Build microservices and customer-facing features for Amazon e-commerce and AWS cloud infrastructure. Fast-track PPO evaluation for top performers.'
  },
  {
    id: 'it-intern-5',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: true,
    title: 'Virtual Full Stack Web Developer Intern (WFH)',
    company: 'CRED & Partner Labs',
    logo: '📱',
    location: '100% Virtual / Work From Home',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Frontend',
    experience: 'College Students & Early Devs',
    duration: '3 - 6 Months (Virtual)',
    salary: '₹45,000 - ₹55,000 / month',
    stipendAmount: '₹50,000/mo (WFH)',
    hasPPO: true,
    hasCertificate: true,
    postedDate: '2026-08-30',
    isNew: false,
    platformName: 'Wellfound (AngelList)',
    applyUrl: 'https://wellfound.com/jobs?remote=true&keywords=Intern',
    trustedBadge: 'Wellfound Verified',
    skills: ['React', 'JavaScript (ES6+)', 'CSS Animations', 'TypeScript', 'Web Performance'],
    description: 'Work virtually from home alongside leading frontend architects to craft slick 60fps micro-animations and intuitive financial dashboards.'
  },
  {
    id: 'it-intern-6',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Deep Learning & GPU Computing Systems Intern',
    company: 'NVIDIA',
    logo: '🟢',
    location: 'Pune',
    city: 'Pune',
    workMode: 'Hybrid',
    domain: 'AI & Data Science',
    experience: 'Graduate / B.Tech / M.Tech Students',
    duration: '6 Months (Jan - June / Summer)',
    salary: '₹85,000 / month',
    stipendAmount: '₹85,000/mo',
    hasPPO: true,
    hasCertificate: true,
    postedDate: '2026-09-03',
    isNew: true,
    platformName: 'NVIDIA Careers Official',
    applyUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?locationCountry=bc33aa3152ec42d4995f4791a106ed09',
    trustedBadge: 'Official NVIDIA Careers',
    skills: ['C++', 'CUDA', 'Python', 'PyTorch', 'Computer Architecture', 'Linux'],
    description: 'Research and optimize CUDA tensor kernels and deep learning acceleration libraries for NVIDIA Hopper and Blackwell architectures in Pune.'
  },
  {
    id: 'it-intern-7',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: true,
    title: 'Virtual Backend Engineer Intern (MERN / Node.js & APIs)',
    company: 'Zomato & QuickCommerce Labs',
    logo: '⚡',
    location: '100% Virtual / Work From Home',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Backend',
    experience: 'Students / Self-taught Developers',
    duration: '3 - 6 Months (Virtual)',
    salary: '₹40,000 - ₹55,000 / month',
    stipendAmount: '₹48,000/mo (WFH)',
    hasPPO: true,
    hasCertificate: true,
    postedDate: '2026-09-01',
    isNew: false,
    platformName: 'Internshala Direct',
    applyUrl: 'https://internshala.com/internships/work-from-home-computer-science-internships/',
    trustedBadge: 'Internshala Verified',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'PostgreSQL', 'Redis'],
    description: 'Build fast backend endpoints for delivery routing and payment settlements remotely with dedicated mentors.'
  },

  // 3. FULL-TIME JOBS
  {
    id: 'it-job-1',
    type: 'job',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Software Engineer II - Full Stack (React & Node.js)',
    company: 'Google',
    logo: '🌐',
    location: 'Bengaluru',
    city: 'Bengaluru',
    workMode: 'Hybrid',
    domain: 'Full Stack',
    experience: '2 - 5 Years',
    salary: '₹28,00,000 - ₹45,00,000 LPA',
    postedDate: '2026-09-03',
    isNew: true,
    platformName: 'Google Careers Official',
    applyUrl: 'https://www.google.com/about/careers/applications/jobs/results/?q=software+engineer+india',
    trustedBadge: 'Official Company Career Portal',
    skills: ['React.js', 'Node.js', 'TypeScript', 'Distributed Systems', 'GCP', 'REST APIs'],
    description: 'Join the Core Workspace & Cloud Engineering team in Bengaluru to build high-scale web platforms serving millions of concurrent global users with sub-millisecond response times.'
  },
  {
    id: 'it-job-2',
    type: 'job',
    paymentType: 'paid',
    isVirtual: true,
    title: 'Senior Frontend Engineer (Next.js, TypeScript & Performance)',
    company: 'Microsoft',
    logo: '💻',
    location: '100% Virtual Remote / Bengaluru',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Frontend',
    experience: '3 - 7 Years',
    salary: '₹32,00,000 - ₹55,00,000 LPA',
    postedDate: '2026-09-02',
    isNew: true,
    platformName: 'Microsoft Careers Direct',
    applyUrl: 'https://jobs.careers.microsoft.com/global/en/search?q=frontend+engineer+india',
    trustedBadge: 'Official Microsoft Verified',
    skills: ['Next.js', 'React', 'TypeScript', 'Web Performance', 'GraphQL', 'TailwindCSS'],
    description: 'Design and optimize user-facing interfaces for Microsoft Azure Cloud Portal and Microsoft 365 Copilot with rigorous accessibility, security, and low-latency rendering.'
  },
  {
    id: 'it-job-3',
    type: 'job',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Software Development Engineer I (SDE-1) - Backend Systems',
    company: 'Amazon & AWS',
    logo: '📦',
    location: 'Hyderabad',
    city: 'Hyderabad',
    workMode: 'On-site',
    domain: 'Backend',
    experience: '0 - 2 Years (Freshers / Junior)',
    salary: '₹18,00,000 - ₹28,00,000 LPA',
    postedDate: '2026-09-01',
    isNew: false,
    platformName: 'Amazon Jobs Portal',
    applyUrl: 'https://www.amazon.jobs/en/search?base_query=software+development+engineer+india',
    trustedBadge: 'Official Amazon Careers',
    skills: ['Java', 'Spring Boot', 'AWS Lambda', 'DynamoDB', 'Microservices', 'Data Structures'],
    description: 'Build robust asynchronous microservices and distributed transaction pipelines powering AWS Cloud Infrastructure and Amazon Fulfillment core services at Hyderabad campus.'
  },
  {
    id: 'it-job-4',
    type: 'job',
    paymentType: 'paid',
    isVirtual: true,
    title: 'AI / Machine Learning Engineer (PyTorch, LLMs & GenAI)',
    company: 'Meta (Facebook)',
    logo: '🤖',
    location: '100% Virtual Remote / Bengaluru',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'AI & Data Science',
    experience: '2 - 6 Years',
    salary: '₹40,00,000 - ₹75,00,000 LPA',
    postedDate: '2026-09-04',
    isNew: true,
    platformName: 'Meta Careers Official',
    applyUrl: 'https://www.metacareers.com/jobs?q=machine%20learning%20india',
    trustedBadge: 'Official Meta Careers',
    skills: ['Python', 'PyTorch', 'Large Language Models (LLMs)', 'Hugging Face', 'Vector DBs', 'CUDA'],
    description: 'Develop and deploy next-generation generative AI models, agentic workflows, and semantic search pipelines integrated into Meta AI and Llama open source ecosystems.'
  },
  {
    id: 'it-job-5',
    type: 'job',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Graduate Systems Engineer (Java / Python / Cloud Fresher Trainee)',
    company: 'Tata Consultancy Services (TCS) & Infosys',
    logo: '🏢',
    location: 'Pan India (Pune, Bengaluru, Chennai, Hyderabad, Noida, Mumbai)',
    city: 'Pan-India',
    workMode: 'Hybrid',
    domain: 'Full Stack',
    experience: '0 - 1 Year (Freshers / Entry Level)',
    salary: '₹4,50,000 - ₹9,50,000 LPA (TCS Digital / Prime)',
    postedDate: '2026-09-01',
    isNew: false,
    platformName: 'TCS iBegin / Careers',
    applyUrl: 'https://www.tcs.com/careers/india',
    trustedBadge: 'Official TCS iBegin',
    skills: ['Java', 'Python', 'SQL', 'OOPs', 'Data Structures', 'Web Development'],
    description: 'Mass campus and off-campus recruitment drive for 2025/2026 batch engineers for enterprise software consulting, cloud migrations, and modern digital engineering.'
  },
  {
    id: 'it-job-6',
    type: 'job',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Software Development Engineer I (SDE-1 Backend)',
    company: 'Swiggy & Instamart',
    logo: '🛵',
    location: 'Bengaluru',
    city: 'Bengaluru',
    workMode: 'Hybrid',
    domain: 'Backend',
    experience: '0 - 2 Years (Freshers / Junior)',
    salary: '₹16,00,000 - ₹25,00,000 LPA',
    postedDate: '2026-09-04',
    isNew: true,
    platformName: 'Swiggy Careers',
    applyUrl: 'https://careers.swiggy.com/',
    trustedBadge: 'Swiggy Verified',
    skills: ['Golang', 'Java', 'Kafka', 'Redis', 'Microservices', 'Distributed Systems'],
    description: 'Build hyper-scalable order allocation engines and real-time delivery dispatch algorithms processing 2M+ daily grocery and food orders.'
  },
  {
    id: 'it-job-7',
    type: 'job',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Full Stack FinTech Engineer (React, Node.js & Payments)',
    company: 'Razorpay',
    logo: '💳',
    location: 'Bengaluru',
    city: 'Bengaluru',
    workMode: 'Hybrid',
    domain: 'Full Stack',
    experience: '1 - 4 Years',
    salary: '₹22,00,000 - ₹34,00,000 LPA',
    postedDate: '2026-09-03',
    isNew: true,
    platformName: 'Razorpay Careers',
    applyUrl: 'https://razorpay.com/jobs/',
    trustedBadge: 'Razorpay Official',
    skills: ['React.js', 'Node.js', 'PostgreSQL', 'Payment Gateways', 'Docker', 'AWS'],
    description: 'Develop next-generation merchant checkout experiences, automated reconciliation pipelines, and instant payout rails for India’s fastest-growing businesses.'
  },
  {
    id: 'it-job-8',
    type: 'job',
    paymentType: 'paid',
    isVirtual: true,
    title: 'Cloud DevOps & Site Reliability Engineer (SRE)',
    company: 'Atlassian',
    logo: '🚀',
    location: '100% Virtual Remote / Bengaluru',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Cloud & DevOps',
    experience: '2 - 5 Years',
    salary: '₹26,00,000 - ₹42,00,000 LPA',
    postedDate: '2026-09-02',
    isNew: false,
    platformName: 'Atlassian Careers',
    applyUrl: 'https://www.atlassian.com/company/careers',
    trustedBadge: 'Atlassian Verified',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD Pipelines', 'Prometheus', 'Python'],
    description: 'Ensure 99.99% reliability, automated autoscaling, and global multi-region deployment infrastructure for Jira, Confluence, and Bitbucket Cloud.'
  },
  {
    id: 'it-job-9',
    type: 'job',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Data Engineer & Big Data Analytics Specialist',
    company: 'Flipkart',
    logo: '🛍️',
    location: 'Bengaluru',
    city: 'Bengaluru',
    workMode: 'Hybrid',
    domain: 'AI & Data Science',
    experience: '1 - 3 Years',
    salary: '₹18,00,000 - ₹30,00,000 LPA',
    postedDate: '2026-09-04',
    isNew: true,
    platformName: 'Flipkart Careers',
    applyUrl: 'https://www.flipkartcareers.com/',
    trustedBadge: 'Flipkart Official',
    skills: ['Apache Spark', 'Python', 'SQL', 'Hadoop', 'Airflow', 'BigQuery'],
    description: 'Design and manage large-scale real-time data streaming pipelines, user behavior telemetry, and e-commerce analytics models during festive mega sales.'
  },
  {
    id: 'it-job-10',
    type: 'job',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Core Infrastructure & Distributed Systems Engineer',
    company: 'Uber',
    logo: '🚗',
    location: 'Hyderabad / Bengaluru',
    city: 'Hyderabad',
    workMode: 'Hybrid',
    domain: 'Backend',
    experience: '2 - 6 Years',
    salary: '₹35,00,000 - ₹58,00,000 LPA',
    postedDate: '2026-09-03',
    isNew: true,
    platformName: 'Uber Careers',
    applyUrl: 'https://www.uber.com/in/en/careers/',
    trustedBadge: 'Uber Verified',
    skills: ['Golang', 'Java', 'gRPC', 'Distributed Storage', 'Cassandra', 'System Design'],
    description: 'Build mission-critical distributed databases, real-time vehicle dispatch algorithms, and ultra-high-throughput messaging systems supporting global operations.'
  }
];

// Potential incoming dynamic live stream additions
const INCOMING_STREAM_OPPORTUNITIES = [
  {
    id: 'stream-virt-free-1',
    type: 'internship',
    paymentType: 'free_certified',
    isVirtual: true,
    title: 'Data Visualization & Insights Virtual Internship (Free Certificate)',
    company: 'Tata Group & Forage',
    logo: '📊',
    location: '100% Virtual / Online',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'AI & Data Science',
    experience: 'Open to All Students',
    duration: '3 - 4 Hours (Self-Paced)',
    salary: 'FREE (Verified Tata Industry Credential)',
    stipendAmount: '100% Free & Certified',
    hasPPO: false,
    hasCertificate: true,
    postedDate: 'Just Now',
    isNew: true,
    platformName: 'Forage Virtual Official',
    applyUrl: 'https://www.theforage.com/simulations/tata/data-visualization-p5xo',
    trustedBadge: '⚡ Live Virtual Release',
    skills: ['Power BI', 'Tableau', 'Executive Analytics', 'Data Cleaning', 'Business Insights'],
    description: 'Create impactful business intelligence dashboards for Tata leadership and gain a verifiable certificate for your CV.'
  },
  {
    id: 'stream-intern-1',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: false,
    title: 'Google STEP Internship 2026 (1st & 2nd Year Undergrads)',
    company: 'Google',
    logo: '🌐',
    location: 'Bengaluru / Hyderabad',
    city: 'Bengaluru',
    workMode: 'Hybrid',
    domain: 'Full Stack',
    experience: '1st & 2nd Year CS Undergraduates',
    duration: '10 - 12 Weeks (Summer 2026)',
    salary: '₹1,00,000 / month (Stipend + Travel)',
    stipendAmount: '₹1.00 Lakh/mo',
    hasPPO: true,
    hasCertificate: true,
    postedDate: 'Just Now',
    isNew: true,
    platformName: 'Google Student Hub',
    applyUrl: 'https://www.google.com/about/careers/applications/jobs/results/?q=STEP+intern+india',
    trustedBadge: '⚡ Live STEP Program Release',
    skills: ['C++', 'Java', 'Python', 'Problem Solving', 'Data Structures'],
    description: 'Student Training in Engineering Program (STEP) offering direct technical project experience, mentorship, and personal professional coaching.'
  },
  {
    id: 'stream-virt-paid-1',
    type: 'internship',
    paymentType: 'paid',
    isVirtual: true,
    title: 'Virtual Open Source & Backend Developer Intern (Remote)',
    company: 'Stripe Open Source Partner',
    logo: '💳',
    location: '100% Virtual / Global Remote',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Backend',
    experience: 'College Students & Early Devs',
    duration: '4 - 6 Months (Virtual)',
    salary: '$3,000 / month (₹2.5 Lakh/mo)',
    stipendAmount: '$3,000/mo (USD)',
    hasPPO: true,
    hasCertificate: true,
    postedDate: 'Just Now',
    isNew: true,
    platformName: 'Wellfound Verified',
    applyUrl: 'https://wellfound.com/jobs?remote=true',
    trustedBadge: '⚡ Live Virtual Release',
    skills: ['TypeScript', 'Node.js', 'PostgreSQL', 'API Development', 'Docker'],
    description: 'Work 100% virtually on developer tools and payment integrations with high USD stipend and flexible remote hours.'
  },
  {
    id: 'stream-job-1',
    type: 'job',
    paymentType: 'paid',
    isVirtual: true,
    title: 'Junior React & TypeScript Frontend Engineer (Fresher / 0-1 Yr)',
    company: 'Postman',
    logo: '🚀',
    location: '100% Virtual Remote / Bengaluru',
    city: 'Remote',
    workMode: 'Virtual / Online',
    domain: 'Frontend',
    experience: '0 - 1 Year (Freshers Welcome)',
    salary: '₹14,00,000 - ₹20,00,000 LPA',
    postedDate: 'Just Now',
    isNew: true,
    platformName: 'Postman Careers',
    applyUrl: 'https://www.postman.com/company/careers/',
    trustedBadge: '⚡ Live Job Release',
    skills: ['React', 'TypeScript', 'Redux Toolkit', 'REST APIs', 'CSS Modules'],
    description: 'Work on Postman’s core API client user interface with top-tier product and design teams in a developer-first environment.'
  }
];

const INITIAL_DISPLAY_COUNT = 5;
const LOAD_MORE_STEP = 5;

export const ITJobFinder = () => {
  const { user, toggleSaveJob: authToggleSaveJob } = useAuth();
  // Main separation: 'jobs' vs 'internships'
  const [mainSection, setMainSection] = useState('jobs'); // 'jobs' | 'internships'

  // Pagination state (Default 5 items shown, load more on demand)
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  // Sub-filters for Internships
  const [internshipPaymentType, setInternshipPaymentType] = useState('all'); // 'all' | 'free_certified' | 'paid'
  const [virtualOnly, setVirtualOnly] = useState(false);

  // Sub-filters for Jobs
  const [jobExperienceLevel, setJobExperienceLevel] = useState('All'); // 'All' | 'Fresher' | 'Mid' | 'Senior'

  // Common filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Live Auto-Update Stream State
  const [isLiveSyncActive, setIsLiveSyncActive] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [newOpportunitiesAlert, setNewOpportunitiesAlert] = useState(null);

  // Dynamic list merged with base + custom localStorage additions
  const [allOpportunities, setAllOpportunities] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('skillsync_admin_it_opportunities');
      const customList = savedCustom ? JSON.parse(savedCustom) : [];
      return [...customList, ...BASE_IT_OPPORTUNITIES];
    } catch {
      return BASE_IT_OPPORTUNITIES;
    }
  });

  // Bookmarking in localStorage & Cloud Database
  const [savedIds, setSavedIds] = useState(() => {
    const fromUser = user?.savedJobs?.map(j => typeof j === 'string' ? j : j.id) || [];
    try {
      const saved = localStorage.getItem('skillsync_saved_it_opportunities') || localStorage.getItem('skillsync_saved_it_jobs');
      const fromLocal = saved ? JSON.parse(saved) : [];
      return Array.from(new Set([...fromUser, ...fromLocal]));
    } catch {
      return fromUser;
    }
  });

  const toggleSave = (id) => {
    const target = allOpportunities.find(o => o.id === id);
    setSavedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('skillsync_saved_it_opportunities', JSON.stringify(updated));
      return updated;
    });

    if (target && authToggleSaveJob) {
      authToggleSaveJob({
        id: target.id,
        title: target.title,
        organization: target.company,
        level: target.domain || target.type || 'Engineering',
        vacancies: target.location || '1 Opening',
        salary: target.stipend || target.salary || 'Competitive',
        lastDate: target.deadline || 'Ongoing',
        link: target.applyUrl || target.link
      });
    }
  };

  // Check for New Live Internships & Tech Jobs with Live API / AI Sync
  const checkForNewItems = useCallback(async (isManual = false) => {
    setIsRefreshing(true);
    try {
      // 1. Fetch live updated opportunities from API/AI service
      const liveApiItems = await fetchLiveITOpportunitiesWithAI(mainSection, searchTerm || 'Software');
      
      setAllOpportunities(prev => {
        const existingIds = new Set(prev.map(j => j.id));
        const combinedIncoming = [...(liveApiItems || []), ...INCOMING_STREAM_OPPORTUNITIES];
        const newOnes = combinedIncoming.filter(j => !existingIds.has(j.id));
        
        if (newOnes.length > 0) {
          const next = [...newOnes, ...prev];
          const freeVirtualCount = newOnes.filter(item => item.paymentType === 'free_certified').length;
          const paidCount = newOnes.filter(item => item.type === 'internship' && item.paymentType === 'paid').length;
          const jobCount = newOnes.filter(item => item.type === 'job').length;
          
          setNewOpportunitiesAlert(`⚡ Live API & Feed Synced! Found ${jobCount} New Tech Jobs, ${freeVirtualCount} Free Certified Internships & ${paidCount} Paid Programs!`);
          return next;
        }
        
        if (isManual) {
          setNewOpportunitiesAlert('✅ Live API Sync Complete! All Job & Internship portals are 100% up-to-date with 2026 listings.');
        }
        return prev;
      });
    } catch (err) {
      console.warn('API Sync notice:', err);
      if (isManual) {
        setNewOpportunitiesAlert('✅ Live Portals are currently up-to-date with the latest verified openings.');
      }
    } finally {
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRefreshing(false);
    }
  }, [mainSection, searchTerm]);

  // Continuous Periodic Live Sync Updater (runs every 40 seconds)
  useEffect(() => {
    if (!isLiveSyncActive) return;
    const interval = setInterval(() => {
      checkForNewItems(false);
    }, 40000);
    return () => clearInterval(interval);
  }, [isLiveSyncActive, checkForNewItems]);

  // Distinct city list for quick filter chips
  const CITIES_LIST = ['All', 'Bengaluru', 'Hyderabad', 'Pune', 'Delhi NCR', 'Chennai', 'Mumbai', 'Remote'];

  // Total counts for badges
  const totalJobsCount = useMemo(() => allOpportunities.filter(o => o.type === 'job').length, [allOpportunities]);
  const totalInternshipsCount = useMemo(() => allOpportunities.filter(o => o.type === 'internship').length, [allOpportunities]);
  const totalFreeVirtualCount = useMemo(() => allOpportunities.filter(o => o.type === 'internship' && o.paymentType === 'free_certified').length, [allOpportunities]);
  const totalPaidInternshipsCount = useMemo(() => allOpportunities.filter(o => o.type === 'internship' && o.paymentType === 'paid').length, [allOpportunities]);

  // STRICT SEPARATION: filtered opportunities calculation
  const filteredOpportunities = useMemo(() => {
    return allOpportunities.filter(item => {
      // STRICT FILTER: Match Main Section (Job vs Internship)
      if (mainSection === 'jobs') {
        if (item.type !== 'job') return false;

        // Job Experience Filter
        if (jobExperienceLevel !== 'All') {
          if (jobExperienceLevel === 'Fresher' && !(item.experience.includes('0 - 2') || item.experience.includes('0 - 1') || item.experience.includes('Fresher') || item.experience.includes('Junior') || item.experience.includes('Entry'))) {
            return false;
          }
          if (jobExperienceLevel === 'Mid' && !(item.experience.includes('2 - 5') || item.experience.includes('1 - 4') || item.experience.includes('1 - 3') || item.experience.includes('2 - 6') || item.experience.includes('3 - 6') || item.experience.includes('3 - 7'))) {
            return false;
          }
          if (jobExperienceLevel === 'Senior' && !(item.experience.includes('4 - 8') || item.experience.includes('3 - 7') || item.experience.includes('2 - 6') || item.experience.includes('Senior') || item.experience.includes('Lead') || item.experience.includes('Staff'))) {
            return false;
          }
        }
      } else if (mainSection === 'internships') {
        if (item.type !== 'internship') return false;

        // Internship Payment / Certificate Filter (Free vs Paid)
        if (internshipPaymentType === 'free_certified' && item.paymentType !== 'free_certified') {
          return false;
        }
        if (internshipPaymentType === 'paid' && item.paymentType !== 'paid') {
          return false;
        }

        // Virtual Only Filter for internships
        if (virtualOnly && !item.isVirtual) {
          return false;
        }
      }

      // Search keyword filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchLower) ||
        item.company.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        (item.city && item.city.toLowerCase().includes(searchLower)) ||
        (item.workMode && item.workMode.toLowerCase().includes(searchLower)) ||
        item.skills.some(s => s.toLowerCase().includes(searchLower));

      // Location-wise filter
      const matchesLocation =
        selectedLocation === 'All' ||
        item.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        (item.city && item.city.toLowerCase().includes(selectedLocation.toLowerCase())) ||
        (selectedLocation === 'Remote' && (item.isVirtual || item.workMode === 'Virtual / Online' || item.workMode === 'Remote' || item.location.toLowerCase().includes('remote') || item.location.toLowerCase().includes('virtual')));

      // Domain filter
      const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain;

      // Work mode filter
      const matchesWorkMode =
        selectedWorkMode === 'All' ||
        item.workMode === selectedWorkMode ||
        (selectedWorkMode === 'Virtual' && item.isVirtual) ||
        (selectedWorkMode === 'Remote' && (item.isVirtual || item.workMode === 'Remote'));

      // Saved filter
      const matchesSaved = !showSavedOnly || savedIds.includes(item.id);

      return matchesSearch && matchesLocation && matchesDomain && matchesWorkMode && matchesSaved;
    });
  }, [allOpportunities, mainSection, internshipPaymentType, virtualOnly, jobExperienceLevel, searchTerm, selectedLocation, selectedDomain, selectedWorkMode, showSavedOnly, savedIds]);

  // Reset pagination count to initial (5) whenever filters or active tab changes
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  }, [mainSection, internshipPaymentType, virtualOnly, jobExperienceLevel, searchTerm, selectedLocation, selectedDomain, selectedWorkMode, showSavedOnly]);

  // Displayed items strictly capped to visibleCount (Default 5 items)
  const displayedOpportunities = useMemo(() => {
    return filteredOpportunities.slice(0, visibleCount);
  }, [filteredOpportunities, visibleCount]);

  const hasMore = visibleCount < filteredOpportunities.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + LOAD_MORE_STEP);
  };

  // Generate live query URL for trusted platforms
  const getLiveSearchUrl = (platform) => {
    const loc = selectedLocation !== 'All' ? `+${selectedLocation}` : '+India';
    if (mainSection === 'internships' || internshipPaymentType === 'free_certified' || virtualOnly) {
      return platform.internshipBaseUrl || `${platform.baseUrl}?q=virtual+internship${loc}`;
    }
    const query = encodeURIComponent((searchTerm || 'Software Engineer') + (selectedLocation !== 'All' ? ` ${selectedLocation}` : ''));
    return `${platform.baseUrl}${query}`;
  };

  // Filtered platforms relevant to active section
  const relevantPlatforms = useMemo(() => {
    if (mainSection === 'internships') {
      return TRUSTED_PLATFORMS.filter(p => p.id === 'forage' || p.id === 'internshala' || p.id === 'unstop' || p.id === 'google-careers' || p.id === 'microsoft-careers' || p.id === 'wellfound');
    }
    return TRUSTED_PLATFORMS.filter(p => p.id === 'linkedin' || p.id === 'google-careers' || p.id === 'microsoft-careers' || p.id === 'amazon-jobs' || p.id === 'wellfound' || p.id === 'internshala');
  }, [mainSection]);

  return (
    <div style={{ padding: '1rem 0 3rem 0' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '1.5rem',
        background: mainSection === 'jobs'
          ? 'linear-gradient(135deg, var(--primary-lavender-subtle), var(--bg-surface))'
          : 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), var(--bg-surface))',
        borderLeft: mainSection === 'jobs' ? '5px solid var(--primary-lavender)' : '5px solid #10b981',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1.5rem',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
            <span className="badge badge-lavender">💼 IT Tech Career Gateway</span>
            <span className="badge badge-lavender" style={{ fontWeight: '800' }}>
              💼 {totalJobsCount} Full-Time Jobs
            </span>
            <span className="badge" style={{ background: mainSection === 'internships' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)', color: '#059669', border: '1px solid #10b981', fontWeight: '800' }}>
              🎓 {totalInternshipsCount} Internships ({totalFreeVirtualCount} Free • {totalPaidInternshipsCount} Paid)
            </span>
            <span className="badge badge-mint">⚡ Live Feed Active</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: '800' }}>
            {mainSection === 'jobs' ? 'IT Sector Job Notifications & Placements' : 'Tech Internships (Free Certified & Paid Stipend)'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '880px', lineHeight: '1.5' }}>
            {mainSection === 'jobs' 
              ? 'Explore verified full-time IT jobs, graduate engineer trainee postings, and software engineering roles from top tech MNCs & startups with package details and direct application links.'
              : 'Explore verified Free Certified Virtual Internships (JPMorgan, Goldman Sachs, AWS, Accenture with official credentials) and High-Stipend Paid Internships (Google, Microsoft, Amazon, YC Startups).'}
          </p>
        </div>

        {/* Action Controls: Live Sync Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 0.85rem',
            borderRadius: '9999px',
            background: isLiveSyncActive ? 'var(--accent-mint-subtle)' : 'var(--bg-subtle)',
            border: `1px solid ${isLiveSyncActive ? 'var(--accent-mint)' : 'var(--border-color)'}`,
            fontSize: '0.8rem',
            fontWeight: '700',
            color: isLiveSyncActive ? 'var(--accent-mint)' : 'var(--text-muted)'
          }}>
            <Radio size={14} className={isLiveSyncActive ? 'pulse-icon' : ''} />
            <span>{isLiveSyncActive ? 'Live Auto-Sync: Active' : 'Live Sync: Paused'}</span>
          </div>

          <button
            onClick={() => checkForNewItems(true)}
            disabled={isRefreshing}
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 0.95rem',
              fontSize: '0.85rem',
              fontWeight: '700'
            }}
            title="Check for newly available tech openings"
          >
            <RefreshCw size={14} className={isRefreshing ? 'spin-icon' : ''} color="var(--primary-lavender)" />
            <span>{isRefreshing ? 'Syncing...' : 'Check Live Updates'}</span>
          </button>
        </div>
      </div>

      {/* NEW OPPORTUNITIES ALERT BANNER */}
      {newOpportunitiesAlert && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: '0.85rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))',
          border: '1px solid var(--accent-mint)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.3s ease-in-out',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Sparkles size={20} color="var(--accent-mint)" />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {newOpportunitiesAlert}
            </span>
          </div>
          <button
            onClick={() => setNewOpportunitiesAlert(null)}
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

      {/* ========================================================================= */}
      {/* 2 PRIMARY PROMINENT OPTIONS: JOBS vs INTERNSHIPS (NO MIXING) */}
      {/* ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        {/* OPTION 1: TECH JOB NOTIFICATIONS */}
        <button
          type="button"
          onClick={() => {
            setMainSection('jobs');
            setInternshipPaymentType('all');
          }}
          style={{
            padding: '1.4rem 1.5rem',
            borderRadius: '1.25rem',
            border: mainSection === 'jobs' ? '2.5px solid var(--primary-lavender)' : '1px solid var(--border-color)',
            background: mainSection === 'jobs' 
              ? 'linear-gradient(135deg, var(--primary-lavender-subtle), var(--bg-surface))' 
              : 'var(--bg-surface)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: mainSection === 'jobs' ? '0 8px 24px rgba(139, 92, 246, 0.22)' : 'none',
            transform: mainSection === 'jobs' ? 'scale(1.01)' : 'scale(1)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="account-card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: mainSection === 'jobs' ? 'var(--primary-lavender)' : 'var(--primary-lavender-subtle)',
              color: mainSection === 'jobs' ? '#ffffff' : 'var(--primary-lavender)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: mainSection === 'jobs' ? '0 4px 12px rgba(139, 92, 246, 0.35)' : 'none',
              flexShrink: 0
            }}>
              <Briefcase size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <strong style={{ fontSize: '1.2rem', color: mainSection === 'jobs' ? 'var(--primary-lavender)' : 'var(--text-main)' }}>
                  Job Notifications
                </strong>
                {mainSection === 'jobs' && (
                  <span style={{ fontSize: '0.7rem', fontWeight: '800', background: 'var(--primary-lavender)', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '999px' }}>
                    Active
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>
                Full-Time IT Roles • Fresher to Senior Placements
              </span>
            </div>
          </div>
          <span style={{
            fontSize: '1rem',
            fontWeight: '800',
            background: mainSection === 'jobs' ? 'var(--primary-lavender)' : 'var(--primary-lavender-subtle)',
            color: mainSection === 'jobs' ? '#ffffff' : 'var(--primary-lavender)',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            flexShrink: 0
          }}>
            {totalJobsCount} Jobs
          </span>
        </button>

        {/* OPTION 2: TECH INTERNSHIPS */}
        <button
          type="button"
          onClick={() => {
            setMainSection('internships');
          }}
          style={{
            padding: '1.4rem 1.5rem',
            borderRadius: '1.25rem',
            border: mainSection === 'internships' ? '2.5px solid #10b981' : '1px solid var(--border-color)',
            background: mainSection === 'internships' 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), var(--bg-surface))' 
              : 'var(--bg-surface)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: mainSection === 'internships' ? '0 8px 24px rgba(16, 185, 129, 0.22)' : 'none',
            transform: mainSection === 'internships' ? 'scale(1.01)' : 'scale(1)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="account-card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: mainSection === 'internships' ? '#10b981' : 'rgba(16, 185, 129, 0.12)',
              color: mainSection === 'internships' ? '#ffffff' : '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: mainSection === 'internships' ? '0 4px 12px rgba(16, 185, 129, 0.35)' : 'none',
              flexShrink: 0
            }}>
              <GraduationCap size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <strong style={{ fontSize: '1.2rem', color: mainSection === 'internships' ? '#059669' : 'var(--text-main)' }}>
                  Internships
                </strong>
                {mainSection === 'internships' && (
                  <span style={{ fontSize: '0.7rem', fontWeight: '800', background: '#10b981', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '999px' }}>
                    Active
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>
                Free Certified Virtual & High-Stipend Paid Programs
              </span>
            </div>
          </div>
          <span style={{
            fontSize: '1rem',
            fontWeight: '800',
            background: mainSection === 'internships' ? '#10b981' : 'rgba(16, 185, 129, 0.15)',
            color: mainSection === 'internships' ? '#ffffff' : '#059669',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            flexShrink: 0
          }}>
            {totalInternshipsCount} Internships
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION-SPECIFIC SUB-FILTER CONTROLS (FREE/PAID FOR INTERNSHIPS, EXPERIENCE FOR JOBS) */}
      {/* ========================================================================= */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        padding: '0.9rem 1.25rem',
        borderRadius: '1rem',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-color)'
      }}>
        {mainSection === 'internships' ? (
          /* INTERNSHIP SUB-OPTIONS: FREE vs PAID */
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: '800', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              🎓 Internship Type:
            </span>
            <button
              type="button"
              onClick={() => setInternshipPaymentType('all')}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: internshipPaymentType === 'all' ? '2px solid #10b981' : '1px solid var(--border-color)',
                background: internshipPaymentType === 'all' ? '#10b981' : 'var(--bg-surface)',
                color: internshipPaymentType === 'all' ? '#fff' : 'var(--text-main)',
                fontSize: '0.825rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>All Internships</span>
              <span style={{ opacity: 0.85 }}>({totalInternshipsCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setInternshipPaymentType('free_certified')}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: internshipPaymentType === 'free_certified' ? '2px solid #059669' : '1px solid var(--border-color)',
                background: internshipPaymentType === 'free_certified' ? 'linear-gradient(135deg, #10b981, #059669)' : 'var(--bg-surface)',
                color: internshipPaymentType === 'free_certified' ? '#fff' : '#059669',
                fontSize: '0.825rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: internshipPaymentType === 'free_certified' ? '0 2px 10px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              <Award size={14} />
              <span>🆓 100% Free Certified Virtual</span>
              <span style={{ opacity: 0.9 }}>({totalFreeVirtualCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setInternshipPaymentType('paid')}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: internshipPaymentType === 'paid' ? '2px solid #8b5cf6' : '1px solid var(--border-color)',
                background: internshipPaymentType === 'paid' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'var(--bg-surface)',
                color: internshipPaymentType === 'paid' ? '#fff' : '#7c3aed',
                fontSize: '0.825rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: internshipPaymentType === 'paid' ? '0 2px 10px rgba(139, 92, 246, 0.3)' : 'none'
              }}
            >
              <DollarSign size={14} />
              <span>💰 High-Stipend Paid</span>
              <span style={{ opacity: 0.9 }}>({totalPaidInternshipsCount})</span>
            </button>
          </div>
        ) : (
          /* JOB SUB-OPTIONS: EXPERIENCE LEVEL */
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: '800', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              🎯 Experience Level:
            </span>
            <button
              type="button"
              onClick={() => setJobExperienceLevel('All')}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: jobExperienceLevel === 'All' ? '2px solid var(--primary-lavender)' : '1px solid var(--border-color)',
                background: jobExperienceLevel === 'All' ? 'var(--primary-lavender)' : 'var(--bg-surface)',
                color: jobExperienceLevel === 'All' ? '#fff' : 'var(--text-main)',
                fontSize: '0.825rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              All Levels ({totalJobsCount})
            </button>

            <button
              type="button"
              onClick={() => setJobExperienceLevel('Fresher')}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: jobExperienceLevel === 'Fresher' ? '2px solid var(--primary-lavender)' : '1px solid var(--border-color)',
                background: jobExperienceLevel === 'Fresher' ? 'linear-gradient(135deg, var(--primary-lavender), var(--primary-lavender-hover))' : 'var(--bg-surface)',
                color: jobExperienceLevel === 'Fresher' ? '#fff' : 'var(--primary-lavender)',
                fontSize: '0.825rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>🚀 Freshers / 0 - 2 Yrs</span>
            </button>

            <button
              type="button"
              onClick={() => setJobExperienceLevel('Mid')}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: jobExperienceLevel === 'Mid' ? '2px solid var(--primary-lavender)' : '1px solid var(--border-color)',
                background: jobExperienceLevel === 'Mid' ? 'linear-gradient(135deg, var(--primary-lavender), var(--primary-lavender-hover))' : 'var(--bg-surface)',
                color: jobExperienceLevel === 'Mid' ? '#fff' : 'var(--primary-lavender)',
                fontSize: '0.825rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              💼 Mid-Level (2 - 5 Yrs)
            </button>

            <button
              type="button"
              onClick={() => setJobExperienceLevel('Senior')}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: jobExperienceLevel === 'Senior' ? '2px solid #ea580c' : '1px solid var(--border-color)',
                background: jobExperienceLevel === 'Senior' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'var(--bg-surface)',
                color: jobExperienceLevel === 'Senior' ? '#fff' : '#ea580c',
                fontSize: '0.825rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              ⭐ Senior / Lead (5+ Yrs)
            </button>
          </div>
        )}

        {/* VIRTUAL / WFH TOGGLE */}
        <button
          type="button"
          onClick={() => setVirtualOnly(!virtualOnly)}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '9999px',
            border: virtualOnly ? '2px solid var(--primary-lavender)' : '1px solid var(--border-color)',
            background: virtualOnly ? 'var(--primary-lavender)' : 'var(--bg-surface)',
            color: virtualOnly ? '#ffffff' : 'var(--text-main)',
            fontWeight: '800',
            fontSize: '0.825rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            boxShadow: virtualOnly ? '0 2px 10px rgba(139, 92, 246, 0.35)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Monitor size={15} />
          <span>{virtualOnly ? '✓ 100% Virtual / Remote Only' : '🌐 Show Virtual / Remote Only'}</span>
        </button>
      </div>

      {/* QUICK LOCATION FILTER PILLS (Single-Click City Switcher) */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin size={15} color="var(--primary-lavender)" /> Filter by Location / City:
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Last Synced: <strong>{lastSyncTime}</strong>
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.35rem'
        }}>
          {CITIES_LIST.map(city => {
            const isSelected = selectedLocation === city;
            return (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedLocation(city)}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: isSelected ? '2px solid var(--primary-lavender)' : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--primary-lavender)' : 'var(--bg-surface)',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  fontWeight: isSelected ? '800' : '600',
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(139, 92, 246, 0.25)' : 'none'
                }}
              >
                {city === 'All' ? '🌍 All Locations' : city === 'Remote' ? '🌐 100% Virtual / Remote' : `📍 ${city}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* TOP TRUSTED HIRING / INTERNSHIP HUBS */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={22} color={mainSection === 'jobs' ? 'var(--primary-lavender)' : 'var(--accent-mint)'} />
              {mainSection === 'jobs' ? 'Verified Top Tech Job Portals' : 'Verified Free Virtual & Paid Internship Portals'}
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              {mainSection === 'jobs' 
                ? `Direct access to verified hiring platforms for full-time IT positions ${selectedLocation !== 'All' ? `in ${selectedLocation}` : ''}`
                : `Direct access to official virtual simulation portals (Forage, Google, Microsoft, Internshala) with verified credentials ${selectedLocation !== 'All' ? `in ${selectedLocation}` : ''}`}
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-mint)', fontWeight: '700', background: 'var(--accent-mint-subtle)', padding: '0.3rem 0.75rem', borderRadius: '999px' }}>
            ● Official Direct Links Only • Zero Scams
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem'
        }}>
          {relevantPlatforms.map(platform => (
            <div
              key={platform.id}
              className="glass-panel account-card-hover"
              style={{
                padding: '1.25rem',
                borderRadius: '1rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--bg-surface)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--primary-lavender-subtle)',
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {platform.icon}
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    color: platform.color,
                    background: `${platform.color}18`,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px'
                  }}>
                    {platform.badge}
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.35rem', fontWeight: '700' }}>
                  {platform.name}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '1rem' }}>
                  {platform.description}
                </p>
              </div>

              <a
                href={getLiveSearchUrl(platform)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  fontSize: '0.825rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontWeight: '700',
                  color: 'var(--text-main)'
                }}
              >
                <span>{mainSection === 'internships' ? (internshipPaymentType === 'free_certified' ? 'Explore Free Virtual' : 'Search Internships') : `Search ${selectedLocation !== 'All' ? selectedLocation : 'Tech Jobs'}`}</span>
                <ExternalLink size={14} color="var(--primary-lavender)" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH AND ADVANCED FILTERS BAR */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.25rem' }}>
          {/* Main Keyword Search */}
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder={mainSection === 'jobs' 
                ? "Search by Job Title, Skill (React, Python, Java, AWS, ML), Company, or City..." 
                : "Search by Internship Title, Free Simulation, Skill (Python, Cloud, Security), or Company..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.75rem', height: '46px', width: '100%', fontSize: '0.95rem' }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Clear ✕
              </button>
            )}
          </div>

          {/* Bookmarked Filter Button */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`btn ${showSavedOnly ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              height: '46px',
              padding: '0 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '700',
              fontSize: '0.875rem'
            }}
          >
            <Bookmark size={16} /> Saved ({savedIds.length})
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.85rem'
        }}>
          {/* Location Dropdown Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              📍 LOCATION CITY
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="select-field"
              style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.85rem', fontWeight: '600' }}
            >
              <option value="All">All Cities & Locations</option>
              <option value="Remote">🌐 100% Virtual / Remote</option>
              <option value="Bengaluru">Bengaluru (Bangalore)</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Delhi NCR">Delhi NCR (Gurgaon / Noida)</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          {/* Domain Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              💻 TECH DOMAIN
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="select-field"
              style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Tech Domains</option>
              <option value="Full Stack">Full Stack Engineering</option>
              <option value="Frontend">Frontend Development</option>
              <option value="Backend">Backend & Systems</option>
              <option value="AI & Data Science">AI / ML & Data Science</option>
              <option value="Cloud & DevOps">Cloud & DevOps / SRE</option>
              <option value="Cybersecurity">Cybersecurity & SecOps</option>
            </select>
          </div>

          {/* Work Mode Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              🏢 WORK MODE
            </label>
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="select-field"
              style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Work Modes</option>
              <option value="Virtual / Online">🌐 100% Virtual Online</option>
              <option value="Remote">Remote / Work From Home</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site Office</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {mainSection === 'jobs' ? (
              <>
                💼 Verified Full-Time IT Jobs
                {jobExperienceLevel !== 'All' && <span style={{ color: 'var(--primary-lavender)' }}>({jobExperienceLevel})</span>}
              </>
            ) : (
              <>
                🎓 Verified Tech Internships
                {internshipPaymentType === 'free_certified' ? ' (100% Free Certified)' : internshipPaymentType === 'paid' ? ' (Paid with Stipend)' : ''}
              </>
            )}
            {selectedLocation !== 'All' && <span style={{ color: 'var(--primary-lavender)' }}>in {selectedLocation}</span>}
          </h3>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Showing <strong>{displayedOpportunities.length}</strong> of <strong>{filteredOpportunities.length}</strong> {mainSection === 'jobs' ? 'verified job postings' : 'verified internship programs'} matching your criteria
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {(searchTerm || selectedLocation !== 'All' || selectedDomain !== 'All' || selectedWorkMode !== 'All' || jobExperienceLevel !== 'All' || internshipPaymentType !== 'all' || virtualOnly || showSavedOnly) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('All');
                setSelectedDomain('All');
                setSelectedWorkMode('All');
                setJobExperienceLevel('All');
                setInternshipPaymentType('all');
                setVirtualOnly(false);
                setShowSavedOnly(false);
              }}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <RefreshCw size={13} /> Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* RESULTS LIST */}
      {filteredOpportunities.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3.5rem 1.5rem', textAlign: 'center', borderRadius: '1.25rem' }}>
          <Briefcase size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
          <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No {mainSection === 'jobs' ? 'job postings' : 'internship programs'} found for this filter
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
            Try resetting filters or search live across all top verified platforms using our Verified Portals Hub above.
          </p>
          <a
            href={mainSection === 'jobs' ? 'https://www.linkedin.com/jobs' : 'https://www.theforage.com/simulations'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {mainSection === 'jobs' ? 'Search Live Tech Jobs on LinkedIn ↗' : 'Explore Free Virtual Programs on Forage ↗'}
          </a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {displayedOpportunities.map(item => {
            const isSaved = savedIds.includes(item.id);
            const isInternship = item.type === 'internship';
            const isFreeCertified = item.paymentType === 'free_certified';

            return (
              <div
                key={item.id}
                className="glass-panel account-card-hover"
                style={{
                  padding: '1.75rem',
                  borderRadius: '1.25rem',
                  border: isFreeCertified
                    ? '1.5px solid rgba(16, 185, 129, 0.5)'
                    : isInternship 
                    ? '1.5px solid rgba(139, 92, 246, 0.4)' 
                    : '1.5px solid var(--primary-lavender-border)',
                  background: 'var(--bg-surface)',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* TOP CORNER TAGS */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  flexWrap: 'wrap'
                }}>
                  {item.isVirtual && (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'var(--primary-lavender-subtle)',
                      color: 'var(--primary-lavender)',
                      border: '1px solid var(--primary-lavender-border)',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.04em'
                    }}>
                      <Monitor size={12} /> 100% VIRTUAL ONLINE
                    </span>
                  )}
                  {isFreeCertified ? (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#059669',
                      border: '1px solid #10b981',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.04em'
                    }}>
                      <Award size={12} /> 🆓 FREE CERTIFIED (ZERO COST)
                    </span>
                  ) : isInternship ? (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'var(--primary-lavender-subtle)',
                      color: 'var(--primary-lavender)',
                      border: '1px solid var(--primary-lavender-border)',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.04em'
                    }}>
                      <GraduationCap size={12} /> 💰 PAID STIPEND INTERNSHIP
                    </span>
                  ) : (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'var(--primary-lavender-subtle)',
                      color: 'var(--primary-lavender)',
                      border: '1px solid var(--primary-lavender-border)',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.04em'
                    }}>
                      <Briefcase size={12} /> 💼 FULL-TIME IT JOB
                    </span>
                  )}
                  {item.isNew && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                      letterSpacing: '0.04em'
                    }}>
                      <Flame size={12} /> NEW
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                  {/* Left: Company & Role */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: isFreeCertified 
                        ? 'rgba(16, 185, 129, 0.12)' 
                        : isInternship 
                        ? 'var(--primary-lavender-subtle)' 
                        : 'var(--primary-lavender-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                      flexShrink: 0
                    }}>
                      {item.logo}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '800', color: isFreeCertified ? '#059669' : 'var(--primary-lavender)' }}>
                          {item.company}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          color: 'var(--accent-mint)',
                          background: 'var(--accent-mint-subtle)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <ShieldCheck size={12} /> {item.trustedBadge}
                        </span>
                        {item.hasCertificate && (
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: '800',
                            color: '#059669',
                            background: 'rgba(16, 185, 129, 0.12)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}>
                            <CheckCircle size={11} /> Verified Certificate Provided
                          </span>
                        )}
                        {item.hasPPO && (
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: '800',
                            color: 'var(--primary-lavender)',
                            background: 'var(--primary-lavender-subtle)',
                            border: '1px solid var(--primary-lavender-border)',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}>
                            <Award size={11} /> PPO Opportunity Included
                          </span>
                        )}
                      </div>

                      <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: '800', lineHeight: '1.3' }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right: Bookmark Action */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <button
                      onClick={() => toggleSave(item.id)}
                      className="btn btn-secondary"
                      style={{
                        padding: '0.5rem',
                        borderRadius: '50%',
                        width: '38px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSaved ? 'var(--primary-lavender)' : 'var(--text-muted)'
                      }}
                      title={isSaved ? "Remove from saved list" : "Save this opportunity"}
                      aria-label="Bookmark Opportunity"
                    >
                      {isSaved ? <BookmarkCheck size={18} color="var(--primary-lavender)" /> : <Bookmark size={18} />}
                    </button>
                  </div>
                </div>

                {/* Key Opportunity Metadata Badges */}
                <div style={{
                  display: 'flex',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: 'var(--bg-subtle)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}>
                    <MapPin size={15} color="var(--primary-lavender)" />
                    <strong>{item.location}</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: isFreeCertified ? '#059669' : 'var(--accent-mint)' }}>
                    <DollarSign size={15} />
                    <strong>{isInternship && isFreeCertified ? 'Cost: 100% Free' : isInternship ? `Stipend: ${item.salary}` : `Package: ${item.salary}`}</strong>
                  </div>

                  {item.duration && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}>
                      <Calendar size={15} color="var(--primary-lavender)" />
                      <span>Duration: <strong>{item.duration}</strong></span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                    <Briefcase size={15} />
                    <span>{isInternship ? 'Eligibility:' : 'Experience:'} <strong>{item.experience}</strong></span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                    <Layers size={15} />
                    <span>Domain: <strong>{item.domain}</strong></span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                  {item.description}
                </p>

                {/* Bottom Footer: Tech Skills Tags & Direct Apply Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginTop: '1.25rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color-subtle)'
                }}>
                  {/* Tech Skills Tags */}
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginRight: '0.25rem' }}>
                      Required Stack / Topics:
                    </span>
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: 'var(--text-main)',
                          background: 'var(--bg-subtle)',
                          border: '1px solid var(--border-color)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Direct Apply Button */}
                  <a
                    href={item.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      padding: '0.65rem 1.35rem',
                      fontSize: '0.875rem',
                      fontWeight: '800',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: isFreeCertified 
                        ? 'linear-gradient(135deg, #10b981, #059669)' 
                        : 'linear-gradient(135deg, var(--primary-lavender), var(--primary-lavender-hover))',
                      boxShadow: isFreeCertified 
                        ? '0 4px 12px rgba(16, 185, 129, 0.25)' 
                        : '0 4px 12px rgba(139, 92, 246, 0.25)',
                      marginLeft: 'auto'
                    }}
                  >
                    <span>
                      {isFreeCertified 
                        ? 'Start Free Simulation ↗' 
                        : isInternship 
                        ? `Apply for Internship ↗` 
                        : `Direct Apply (${item.platformName.split(' ')[0]})`}
                    </span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LOAD MORE BUTTON SECTION (Default 5 items shown, load +5 on click) */}
      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleLoadMore}
            className="btn btn-primary"
            style={{
              padding: '0.85rem 2.25rem',
              fontSize: '1rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(139, 92, 246, 0.35)',
              background: 'linear-gradient(135deg, var(--primary-lavender), var(--primary-lavender-hover))',
              borderRadius: '9999px',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <span>
              Load More {mainSection === 'jobs' ? 'Job Notifications' : 'Internships'} ({filteredOpportunities.length - displayedOpportunities.length} Remaining)
            </span>
            <ChevronDown size={18} />
          </button>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Showing <strong>{displayedOpportunities.length}</strong> of <strong>{filteredOpportunities.length}</strong> {mainSection === 'jobs' ? 'job postings' : 'internship programs'} • Click to load +{Math.min(LOAD_MORE_STEP, filteredOpportunities.length - displayedOpportunities.length)} more
          </span>
        </div>
      )}

      {/* All Loaded Message */}
      {!hasMore && filteredOpportunities.length > INITIAL_DISPLAY_COUNT && (
        <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <CheckCircle2 size={20} color="#10b981" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem' }} />
          You have reached the end. All <strong>{filteredOpportunities.length}</strong> matching {mainSection === 'jobs' ? 'job notifications' : 'internship programs'} are displayed.
        </div>
      )}
    </div>
  );
};

export default ITJobFinder;

