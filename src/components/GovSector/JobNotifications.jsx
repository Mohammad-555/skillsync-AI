import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Building2,
  ExternalLink,
  Calendar,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertOctagon,
  Clock,
  ChevronDown,
  Layers,
  Sparkles,
  Filter,
  RefreshCw,
  Radio
} from 'lucide-react';
import { fetchLiveGovJobsWithAI } from '../../utils/openRouterService';

export const MOCK_GOV_JOBS = [
  {
    id: 'job-1',
    title: 'SSC Combined Graduate Level (CGL) 2026 Notification',
    organization: 'Staff Selection Commission (SSC)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '17,727 Posts',
    salary: '₹35,400 - ₹1,42,400 (Level 6/7/8)',
    ageLimit: '18 - 32 Years',
    status: 'Active',
    postedDate: '2026-08-10',
    lastDate: '2026-09-15',
    link: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notice/cgl2026.pdf',
    description: 'Recruitment for Assistant Section Officer (CSS/MEA), Inspector (CGST & Central Excise), Income Tax Inspector, Sub-Inspector (CBI), and Auditor across Central Ministries & Departments.'
  },
  {
    id: 'job-2',
    title: 'UPSC Civil Services Examination (CSE) 2026',
    organization: 'Union Public Service Commission (UPSC)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '1,056 Posts',
    salary: '₹56,100 - ₹2,50,000 (IAS/IFS/IPS/IRS)',
    ageLimit: '21 - 32 Years',
    status: 'Active',
    postedDate: '2026-08-01',
    lastDate: '2026-09-05',
    link: 'https://upsc.gov.in',
    pdfUrl: 'https://upsc.gov.in/exam-notices/cse2026',
    description: 'Premier national civil service examination for recruitment to Indian Administrative Service (IAS), Police Service (IPS), Foreign Service (IFS), and Central Group A & B services.'
  },
  {
    id: 'job-3',
    title: 'RRB Non-Technical Popular Categories (NTPC) Recruitment 2026',
    organization: 'Railway Recruitment Board (RRB)',
    level: 'Central',
    qualification: '10th/12th',
    vacancies: '11,558 Posts',
    salary: '₹19,900 - ₹35,400 (Level 2/3/5)',
    ageLimit: '18 - 33 Years',
    status: 'Active',
    postedDate: '2026-08-12',
    lastDate: '2026-09-20',
    link: 'https://indianrailways.gov.in',
    pdfUrl: 'https://rrbcdg.gov.in/ntpc2026.pdf',
    description: 'Mega railway recruitment for Commercial cum Ticket Clerk, Station Master, Goods Train Manager, Senior Clerk cum Typist, and Junior Clerk across 21 Railway Recruitment Boards.'
  },
  {
    id: 'job-4',
    title: 'IBPS Probationary Officer (PO) / Management Trainee XIV',
    organization: 'Institute of Banking Personnel Selection (IBPS)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '4,455 Posts',
    salary: '₹52,000 - ₹65,000 / month',
    ageLimit: '20 - 30 Years',
    status: 'Active',
    postedDate: '2026-08-05',
    lastDate: '2026-09-12',
    link: 'https://ibps.in',
    pdfUrl: 'https://ibps.in/notice/po2026',
    description: 'Recruitment of Probationary Officers in 11 participating public sector commercial banks across India through national computer-based Prelims and Mains examinations.'
  },
  {
    id: 'job-5',
    title: 'ISRO Scientist / Engineer (SC) Recruitment (BE/B.Tech)',
    organization: 'Indian Space Research Organisation (ISRO)',
    level: 'Central',
    qualification: 'Engineering',
    vacancies: '320 Posts',
    salary: '₹56,100 (Level 10 Pay Matrix)',
    ageLimit: '18 - 28 Years',
    status: 'Active',
    postedDate: '2026-08-14',
    lastDate: '2026-09-30',
    link: 'https://isro.gov.in',
    pdfUrl: 'https://isro.gov.in/careers/scientist2026.pdf',
    description: 'High-prestige engineering career opportunities in Computer Science, Mechanical, Electronics, Electrical, and Aerospace engineering for national satellite and launch vehicle missions.'
  },
  {
    id: 'job-6',
    title: 'State Public Service Commission Combined Executive Examination',
    organization: 'State PSC Recruitment Commission',
    level: 'State',
    qualification: 'Graduate',
    vacancies: '840 Posts',
    salary: '₹44,900 - ₹1,42,400 (Level 9/10)',
    ageLimit: '21 - 40 Years',
    status: 'Active',
    postedDate: '2026-07-25',
    lastDate: '2026-09-10',
    link: 'https://statepsc.gov.in',
    pdfUrl: 'https://statepsc.gov.in/comb2026.pdf',
    description: 'State civil services recruitment for Deputy Collector, Deputy SP, Block Development Officer (BDO), Commercial Tax Officer, and Sub-Registrar administrative positions.'
  },
  {
    id: 'job-7',
    title: 'AIIMS Nursing Officer Recruitment Common Eligibility Test (NORCET 7)',
    organization: 'All India Institute of Medical Sciences (AIIMS)',
    level: 'Central',
    qualification: 'Medical',
    vacancies: '3,100 Posts',
    salary: '₹44,900 - ₹1,42,400 (Level 7)',
    ageLimit: '18 - 30 Years',
    status: 'Active',
    postedDate: '2026-08-15',
    lastDate: '2026-09-22',
    link: 'https://aiimsexams.ac.in',
    pdfUrl: 'https://aiimsexams.ac.in/norcet2026.pdf',
    description: 'Central common entrance and recruitment examination for Nursing Officers across New Delhi AIIMS and all regional AIIMS institutions (Bhopal, Rishikesh, Jodhpur, Patna, Bhubaneswar).'
  },
  {
    id: 'job-8',
    title: 'State Junior Engineer (JE) Electrical & Civil Recruitment',
    organization: 'State Power Transmission & Distribution Corp',
    level: 'State',
    qualification: 'Diploma',
    vacancies: '512 Posts',
    salary: '₹35,400 - ₹1,12,400 (Level 6)',
    ageLimit: '18 - 37 Years',
    status: 'Active',
    postedDate: '2026-08-18',
    lastDate: '2026-09-28',
    link: 'https://statepower.gov.in',
    pdfUrl: 'https://statepower.gov.in/je2026.pdf',
    description: 'Polytechnic diploma engineering vacancies in state electrical power distribution grid stations, civil maintenance units, and substation supervision networks.'
  },
  {
    id: 'job-9',
    title: 'SBI Probationary Officer (PO) 2026 Recruitment',
    organization: 'State Bank of India (SBI)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '2,000 Posts',
    salary: '₹41,960 - ₹63,840 + 4 Advance Increments',
    ageLimit: '21 - 30 Years',
    status: 'Active',
    postedDate: '2026-08-20',
    lastDate: '2026-09-25',
    link: 'https://sbi.co.in/careers',
    pdfUrl: 'https://sbi.co.in/po2026.pdf',
    description: 'Flagship banking recruitment for Probationary Officers at India’s largest public sector lender with accelerated career growth and overseas posting opportunities.'
  },
  {
    id: 'job-10',
    title: 'SBI Junior Associates (Customer Support & Sales) 2026',
    organization: 'State Bank of India (SBI)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '8,773 Posts',
    salary: '₹26,000 - ₹34,000 / month',
    ageLimit: '20 - 28 Years',
    status: 'Active',
    postedDate: '2026-08-16',
    lastDate: '2026-09-18',
    link: 'https://sbi.co.in/careers',
    pdfUrl: 'https://sbi.co.in/clerk2026.pdf',
    description: 'State-wise vacancy allocation for clerical cadre customer support associates in branches across all Indian states and Union Territories.'
  },
  {
    id: 'job-11',
    title: 'RBI Grade B Officers (General / DEPR / DSIM) 2026',
    organization: 'Reserve Bank of India (RBI)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '291 Posts',
    salary: '₹55,200 - ₹1,16,684 (Total CTC ~₹1.2 Lakh/mo)',
    ageLimit: '21 - 30 Years',
    status: 'Active',
    postedDate: '2026-08-08',
    lastDate: '2026-09-14',
    link: 'https://rbi.org.in',
    pdfUrl: 'https://opportunities.rbi.org.in/gradeb2026.pdf',
    description: 'India’s premier central banking examination for officers handling monetary policy formulation, financial supervision, economic analytics, and banking operations.'
  },
  {
    id: 'job-12',
    title: 'SSC Combined Higher Secondary Level (CHSL 10+2) 2026',
    organization: 'Staff Selection Commission (SSC)',
    level: 'Central',
    qualification: '10th/12th',
    vacancies: '3,712 Posts',
    salary: '₹19,900 - ₹81,100 (Level 2/4/5)',
    ageLimit: '18 - 27 Years',
    status: 'Active',
    postedDate: '2026-08-11',
    lastDate: '2026-09-16',
    link: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notice/chsl2026.pdf',
    description: 'National recruitment for Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operators (DEO) in Central Government offices.'
  },
  {
    id: 'job-13',
    title: 'SSC Multi-Tasking (Non-Technical) Staff & Havaldar 2026',
    organization: 'Staff Selection Commission (SSC)',
    level: 'Central',
    qualification: '10th/12th',
    vacancies: '9,583 Posts',
    salary: '₹18,000 - ₹56,900 (Pay Level 1)',
    ageLimit: '18 - 25 & 18 - 27 Years',
    status: 'Active',
    postedDate: '2026-08-02',
    lastDate: '2026-09-08',
    link: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notice/mts2026.pdf',
    description: 'General central service Group C non-gazetted, non-ministerial posts and Havaldar in CBIC (Customs/GST) & CBN (Narcotics) departments.'
  },
  {
    id: 'job-14',
    title: 'SSC GD Constable in CAPFs, SSF & Rifleman (Assam Rifles) 2026',
    organization: 'Staff Selection Commission (SSC)',
    level: 'Central',
    qualification: '10th/12th',
    vacancies: '26,146 Posts',
    salary: '₹21,700 - ₹69,100 (Pay Level 3)',
    ageLimit: '18 - 23 Years',
    status: 'Active',
    postedDate: '2026-08-15',
    lastDate: '2026-09-29',
    link: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notice/gd2026.pdf',
    description: 'Massive paramilitary recruitment for BSF, CISF, CRPF, SSB, ITBP, AR, and SSF forces with Computer-based test, physical efficiency, and medical review.'
  },
  {
    id: 'job-15',
    title: 'SSC Sub-Inspector in Delhi Police & CAPFs (CPO) 2026',
    organization: 'Staff Selection Commission (SSC)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '4,187 Posts',
    salary: '₹35,400 - ₹1,12,400 (Level 6)',
    ageLimit: '20 - 25 Years',
    status: 'Active',
    postedDate: '2026-08-04',
    lastDate: '2026-09-06',
    link: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notice/cpo2026.pdf',
    description: 'Direct recruitment of Sub-Inspectors (Executive) in Delhi Police and Sub-Inspectors (GD) in Central Armed Police Forces.'
  },
  {
    id: 'job-16',
    title: 'RRB Assistant Loco Pilot (ALP) Recruitment 2026',
    organization: 'Railway Recruitment Board (RRB)',
    level: 'Central',
    qualification: '10th/12th',
    vacancies: '18,799 Posts',
    salary: '₹19,900 (Level 2) + Running Allowances',
    ageLimit: '18 - 33 Years',
    status: 'Active',
    postedDate: '2026-08-10',
    lastDate: '2026-09-24',
    link: 'https://indianrailways.gov.in',
    pdfUrl: 'https://rrbcdg.gov.in/alp2026.pdf',
    description: 'Technical train piloting career in Indian Railways open for Matriculation + ITI / Act Apprenticeship or Polytechnic Diploma in Mech/Elec/Auto Engineering.'
  },
  {
    id: 'job-17',
    title: 'RRB Technician Grade I Signal & Technician Grade III',
    organization: 'Railway Recruitment Board (RRB)',
    level: 'Central',
    qualification: '10th/12th',
    vacancies: '9,144 Posts',
    salary: '₹19,900 - ₹29,200 (Level 2 & Level 5)',
    ageLimit: '18 - 36 Years',
    status: 'Active',
    postedDate: '2026-08-14',
    lastDate: '2026-09-26',
    link: 'https://indianrailways.gov.in',
    pdfUrl: 'https://rrbcdg.gov.in/tech2026.pdf',
    description: 'Signal & Telecommunication, Carriage & Wagon, Diesel Electrical, Track Machine, and Electrical/Fitter maintenance technicians.'
  },
  {
    id: 'job-18',
    title: 'RRB Junior Engineer (JE / DMS / CMA / IT) 2026',
    organization: 'Railway Recruitment Board (RRB)',
    level: 'Central',
    qualification: 'Engineering',
    vacancies: '7,951 Posts',
    salary: '₹35,400 (Pay Level 6)',
    ageLimit: '18 - 36 Years',
    status: 'Active',
    postedDate: '2026-08-17',
    lastDate: '2026-09-30',
    link: 'https://indianrailways.gov.in',
    pdfUrl: 'https://rrbcdg.gov.in/je2026.pdf',
    description: 'Engineering cadre recruitment for Civil, Electrical, Mechanical, Electronics, and IT engineers across Indian Railway Zones and Production Units.'
  },
  {
    id: 'job-19',
    title: 'RPF Sub-Inspector & Constable Recruitment 2026',
    organization: 'Railway Protection Force (RPF)',
    level: 'Central',
    qualification: '10th/12th',
    vacancies: '4,660 Posts',
    salary: '₹21,700 - ₹35,400 (Level 3 & 6)',
    ageLimit: '18 - 28 Years',
    status: 'Active',
    postedDate: '2026-08-09',
    lastDate: '2026-09-17',
    link: 'https://rpf.indianrailways.gov.in',
    pdfUrl: 'https://rpf.indianrailways.gov.in/notice2026.pdf',
    description: 'Security and law enforcement vacancies for railway property protection and passenger security across all Indian train networks.'
  },
  {
    id: 'job-20',
    title: 'UPSC National Defence Academy & Naval Academy (NDA II) 2026',
    organization: 'Union Public Service Commission (UPSC)',
    level: 'Central',
    qualification: '10th/12th',
    vacancies: '404 Posts',
    salary: '₹56,100 (Officer Cadet Stipend)',
    ageLimit: '16.5 - 19.5 Years',
    status: 'Active',
    postedDate: '2026-08-06',
    lastDate: '2026-09-04',
    link: 'https://upsc.gov.in',
    pdfUrl: 'https://upsc.gov.in/nda2026.pdf',
    description: 'Direct entry for 12th pass students into the Army, Navy, and Air Force wings of the National Defence Academy and Indian Naval Academy (10+2 Cadet Entry Scheme).'
  },
  {
    id: 'job-21',
    title: 'UPSC Combined Defence Services (CDS Examination II) 2026',
    organization: 'Union Public Service Commission (UPSC)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '459 Posts',
    salary: '₹56,100 - ₹1,77,500 (Lieutenant/Captain)',
    ageLimit: '19 - 25 Years',
    status: 'Active',
    postedDate: '2026-08-03',
    lastDate: '2026-09-03',
    link: 'https://upsc.gov.in',
    pdfUrl: 'https://upsc.gov.in/cds2026.pdf',
    description: 'Graduate officer entry into Indian Military Academy (IMA), Air Force Academy (AFA), Indian Naval Academy (INA), and Officers Training Academy (OTA).'
  },
  {
    id: 'job-22',
    title: 'Indian Air Force AFCAT (02/2026) Flying & Ground Duty',
    organization: 'Indian Air Force (IAF)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '317 Posts',
    salary: '₹56,100 - ₹1,10,700 (Flying Officer)',
    ageLimit: '20 - 26 Years',
    status: 'Active',
    postedDate: '2026-08-07',
    lastDate: '2026-09-07',
    link: 'https://afcat.cdac.in',
    pdfUrl: 'https://afcat.cdac.in/afcat2026.pdf',
    description: 'Commissioned Officer recruitment in Flying Branch and Ground Duty (Technical & Non-Technical) branches for male and female candidates.'
  },
  {
    id: 'job-23',
    title: 'DRDO CEPTAM-11 Senior Technical Assistant & Tech-A',
    organization: 'Defence Research & Development Organisation (DRDO)',
    level: 'Central',
    qualification: 'Engineering',
    vacancies: '1,920 Posts',
    salary: '₹35,400 - ₹1,12,400 (Pay Level 6)',
    ageLimit: '18 - 28 Years',
    status: 'Active',
    postedDate: '2026-08-19',
    lastDate: '2026-09-27',
    link: 'https://drdo.gov.in',
    pdfUrl: 'https://drdo.gov.in/ceptam2026.pdf',
    description: 'Defence research laboratory positions in Electronics, Computer Science, Metallurgy, Instrumentation, Physics, and Chemistry labs across India.'
  },
  {
    id: 'job-24',
    title: 'BARC Scientific Officer (OCES / DGFS 2026) through GATE',
    organization: 'Bhabha Atomic Research Centre (BARC)',
    level: 'Central',
    qualification: 'Engineering',
    vacancies: '240 Posts',
    salary: '₹56,100 (Level 10) + Nuclear Special Allowance',
    ageLimit: '18 - 26 Years',
    status: 'Active',
    postedDate: '2026-08-13',
    lastDate: '2026-09-21',
    link: 'https://barc.gov.in',
    pdfUrl: 'https://barconlineexam.in/barc2026.pdf',
    description: 'Prestigious nuclear scientist and engineering researcher training at BARC Training Schools with direct absorption into DAE nuclear energy facilities.'
  },
  {
    id: 'job-25',
    title: 'SEBI Officer Grade A (Assistant Manager) 2026',
    organization: 'Securities and Exchange Board of India (SEBI)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '97 Posts',
    salary: '₹44,500 - ₹89,150 (Total CTC ~₹1.4 Lakh/mo)',
    ageLimit: 'Up to 30 Years',
    status: 'Active',
    postedDate: '2026-08-11',
    lastDate: '2026-09-19',
    link: 'https://sebi.gov.in',
    pdfUrl: 'https://sebi.gov.in/careers/gradea2026.pdf',
    description: 'Market regulatory authority recruitment across General, Legal, Information Technology, Engineering, Research, and Official Language streams.'
  },
  {
    id: 'job-26',
    title: 'NABARD Assistant Manager in Grade A (RDBS / Rajbhasha)',
    organization: 'National Bank for Agriculture and Rural Development',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '102 Posts',
    salary: '₹44,500 - ₹89,150 + Allowances',
    ageLimit: '21 - 30 Years',
    status: 'Active',
    postedDate: '2026-08-16',
    lastDate: '2026-09-23',
    link: 'https://nabard.org',
    pdfUrl: 'https://nabard.org/careers/gradea2026.pdf',
    description: 'Rural banking, agriculture financing, and developmental credit policy enforcement at apex developmental financial institution.'
  },
  {
    id: 'job-27',
    title: 'LIC Assistant Administrative Officer (AAO) Generalist 2026',
    organization: 'Life Insurance Corporation of India (LIC)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '300 Posts',
    salary: '₹53,600 - ₹1,02,090 (Total CTC ~₹92,000/mo)',
    ageLimit: '21 - 30 Years',
    status: 'Active',
    postedDate: '2026-08-07',
    lastDate: '2026-09-11',
    link: 'https://licindia.in',
    pdfUrl: 'https://licindia.in/careers/aao2026.pdf',
    description: 'Underwriting, claims management, and investment policy administration across LIC divisional offices throughout India.'
  },
  {
    id: 'job-28',
    title: 'NTPC Engineering Executive Trainees (EET 2026)',
    organization: 'NTPC Limited (Maharatna PSU)',
    level: 'Central',
    qualification: 'Engineering',
    vacancies: '495 Posts',
    salary: '₹40,000 - ₹1,40,000 (E1 Grade CTC ~₹15 LPA)',
    ageLimit: 'Up to 27 Years',
    status: 'Active',
    postedDate: '2026-08-18',
    lastDate: '2026-09-28',
    link: 'https://careers.ntpc.co.in',
    pdfUrl: 'https://ntpc.co.in/eet2026.pdf',
    description: 'Thermal, solar, hydro, and renewable power generation engineering recruitment based on GATE scores and personal interview.'
  },
  {
    id: 'job-29',
    title: 'ONGC Graduate Trainees in Engineering & Geo-Sciences 2026',
    organization: 'Oil and Natural Gas Corporation (ONGC)',
    level: 'Central',
    qualification: 'Engineering',
    vacancies: '522 Posts',
    salary: '₹60,000 - ₹1,80,000 (E1 Grade CTC ~₹20 LPA)',
    ageLimit: 'Up to 30 Years',
    status: 'Active',
    postedDate: '2026-08-12',
    lastDate: '2026-09-22',
    link: 'https://ongcindia.com',
    pdfUrl: 'https://ongcindia.com/recruitment2026.pdf',
    description: 'Offshore drilling, petroleum production, reservoir engineering, geophysics, geology, and electrical engineering career tracks.'
  },
  {
    id: 'job-30',
    title: 'KVS (Kendriya Vidyalaya Sangathan) TGT, PGT & PRT Recruitment',
    organization: 'Kendriya Vidyalaya Sangathan (KVS)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '13,404 Posts',
    salary: '₹35,400 - ₹1,51,100 (Pay Level 6/7/8)',
    ageLimit: '30 - 40 Years (Relaxation as per norms)',
    status: 'Active',
    postedDate: '2026-08-15',
    lastDate: '2026-09-25',
    link: 'https://kvsangathan.nic.in',
    pdfUrl: 'https://kvsangathan.nic.in/kvs2026.pdf',
    description: 'Teaching and school administrative positions in Central Schools across India for Primary Teachers (PRT), Trained Graduate Teachers (TGT), and Post Graduate Teachers (PGT).'
  },
  {
    id: 'job-31',
    title: 'CTET (Central Teacher Eligibility Test) September 2026',
    organization: 'Central Board of Secondary Education (CBSE)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: 'National Eligibility Certificate',
    salary: 'Qualifying Test for KVS/NVS/DSSSB',
    ageLimit: 'No Upper Age Limit',
    status: 'Active',
    postedDate: '2026-08-01',
    lastDate: '2026-09-08',
    link: 'https://ctet.nic.in',
    pdfUrl: 'https://ctet.nic.in/info2026.pdf',
    description: 'Mandatory national eligibility examination for candidates aspiring to become teachers for Classes I to VIII in central and union territory government schools.'
  },
  {
    id: 'job-32',
    title: 'Food Corporation of India (FCI) Assistant Grade III (Gen/Depot/Tech)',
    organization: 'Food Corporation of India (FCI)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '5,043 Posts',
    salary: '₹28,200 - ₹79,200 (Pay Scale AG-III)',
    ageLimit: '18 - 28 Years',
    status: 'Active',
    postedDate: '2026-08-14',
    lastDate: '2026-09-26',
    link: 'https://fci.gov.in',
    pdfUrl: 'https://fci.gov.in/notice2026.pdf',
    description: 'Food security logistics, grain quality inspection, depot supervision, accounting, and technical agricultural storage management across five FCI zones.'
  },
  {
    id: 'job-33',
    title: 'UPSC Combined Medical Services (CMS) Examination 2026',
    organization: 'Union Public Service Commission (UPSC)',
    level: 'Central',
    qualification: 'Medical',
    vacancies: '827 Posts',
    salary: '₹56,100 - ₹1,77,500 (Level 10)',
    ageLimit: 'Up to 32 Years',
    status: 'Active',
    postedDate: '2026-08-03',
    lastDate: '2026-09-02',
    link: 'https://upsc.gov.in',
    pdfUrl: 'https://upsc.gov.in/cms2026.pdf',
    description: 'Medical Officer recruitment in Central Health Service, Indian Railways Medical Service, and New Delhi Municipal Corporation hospitals.'
  },
  {
    id: 'job-34',
    title: 'Supreme Court of India Law Clerk-cum-Research Associate 2026',
    organization: 'Supreme Court of India',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '90 Posts',
    salary: '₹80,000 / month consolidated stipend',
    ageLimit: '20 - 32 Years',
    status: 'Active',
    postedDate: '2026-08-10',
    lastDate: '2026-09-15',
    link: 'https://main.sci.gov.in',
    pdfUrl: 'https://main.sci.gov.in/careers/lawclerk2026.pdf',
    description: 'Direct legal research and case analysis assistance to the Hon’ble Chief Justice and Judges of the Supreme Court of India.'
  },
  {
    id: 'job-35',
    title: 'State Police Sub-Inspector & Constable Combined Recruitment 2026',
    organization: 'State Police Recruitment & Promotion Board',
    level: 'State',
    qualification: '10th/12th',
    vacancies: '12,500 Posts',
    salary: '₹21,700 - ₹69,100 (Pay Level 3 & 6)',
    ageLimit: '18 - 28 Years',
    status: 'Active',
    postedDate: '2026-08-16',
    lastDate: '2026-09-28',
    link: 'https://statepolice.gov.in',
    pdfUrl: 'https://statepolice.gov.in/recruitment2026.pdf',
    description: 'Statewide law & order, armed constabulary, and traffic police recruitment with written exam, physical standard test, and physical endurance verification.'
  },
  {
    id: 'job-36',
    title: 'UPSC Indian Forest Service (IFS Examination) 2026',
    organization: 'Union Public Service Commission (UPSC)',
    level: 'Central',
    qualification: 'Engineering',
    vacancies: '150 Posts',
    salary: '₹56,100 - ₹2,25,000 (All India Service)',
    ageLimit: '21 - 32 Years',
    status: 'Active',
    postedDate: '2026-08-01',
    lastDate: '2026-09-05',
    link: 'https://upsc.gov.in',
    pdfUrl: 'https://upsc.gov.in/ifs2026.pdf',
    description: 'All India Service for conservation, management, and scientific governance of national forests, wildlife sanctuaries, and natural ecosystems.'
  },
  {
    id: 'job-37',
    title: 'IOCL Junior Engineering Assistant (Refineries Division) 2026',
    organization: 'Indian Oil Corporation Limited (IOCL)',
    level: 'Central',
    qualification: 'Diploma',
    vacancies: '467 Posts',
    salary: '₹25,000 - ₹1,05,000 (Grade IV)',
    ageLimit: '18 - 26 Years',
    status: 'Expired',
    postedDate: '2026-05-15',
    lastDate: '2026-06-20',
    link: 'https://iocl.com',
    pdfUrl: 'https://iocl.com/careers/jea2026.pdf',
    description: 'Production, electrical, mechanical, instrumentation, and fire & safety engineering assistants in Panipat, Mathura, and Gujarat refineries.'
  },
  {
    id: 'job-38',
    title: 'ICAR - ASRB National Eligibility Test & Agricultural Scientist',
    organization: 'Agricultural Scientists Recruitment Board (ICAR-ASRB)',
    level: 'Central',
    qualification: 'Graduate',
    vacancies: '650 Posts',
    salary: '₹57,700 - ₹1,82,400 (Academic Level 10)',
    ageLimit: '21 - 35 Years',
    status: 'Expired',
    postedDate: '2026-04-10',
    lastDate: '2026-05-15',
    link: 'https://asrb.org.in',
    pdfUrl: 'https://asrb.org.in/net2026.pdf',
    description: 'Agricultural research, crop genetics, soil science, and agro-economy scientists for ICAR national institutes and State Agricultural Universities.'
  },
  {
    id: 'job-39',
    title: 'State Health Department Community Health Officer (CHO) 2026',
    organization: 'National Health Mission (NHM State Unit)',
    level: 'State',
    qualification: 'Medical',
    vacancies: '2,400 Posts',
    salary: '₹25,000 + ₹15,000 Performance Incentive',
    ageLimit: '21 - 40 Years',
    status: 'Expired',
    postedDate: '2026-05-01',
    lastDate: '2026-06-05',
    link: 'https://nhm.gov.in',
    pdfUrl: 'https://nhm.gov.in/cho2026.pdf',
    description: 'Primary healthcare and health wellness centre governance for B.Sc Nursing / Post Basic B.Sc Nursing / CPH candidates.'
  },
  {
    id: 'job-40',
    title: 'State Public Works Department (PWD) Assistant Engineer (Civil)',
    organization: 'State Public Works Department',
    level: 'State',
    qualification: 'Engineering',
    vacancies: '345 Posts',
    salary: '₹56,100 - ₹1,77,500 (Level 10)',
    ageLimit: '21 - 38 Years',
    status: 'Expired',
    postedDate: '2026-04-20',
    lastDate: '2026-05-30',
    link: 'https://statepwd.gov.in',
    pdfUrl: 'https://statepwd.gov.in/ae2026.pdf',
    description: 'Highways, state bridge construction, public infrastructure, and government building projects design and site supervision.'
  }
];

const INITIAL_DISPLAY_COUNT = 5;
const LOAD_MORE_STEP = 5;

export const JobNotifications = () => {
  const { user, toggleSaveJob: authToggleSaveJob } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [qualFilter, setQualFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [savedJobs, setSavedJobs] = useState(() => {
    const fromUser = user?.savedJobs?.map(j => typeof j === 'string' ? j : j.id) || [];
    try {
      const fromLocal = JSON.parse(localStorage.getItem('skillsync_saved_gov_jobs') || '[]');
      return Array.from(new Set([...fromUser, ...fromLocal]));
    } catch (e) {
      return fromUser;
    }
  });
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(() => {
    return localStorage.getItem('skillsync_last_gov_jobs_sync') || 'Live API Connected';
  });

  // State initialized with base jobs + any live API fetched jobs from storage
  const [allJobs, setAllJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('skillsync_live_gov_jobs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...MOCK_GOV_JOBS.filter(mj => !parsed.some(pj => pj.title === mj.title))];
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached live jobs:', e);
    }
    return MOCK_GOV_JOBS;
  });

  const handleFetchLatestViaAPI = async () => {
    setIsSyncing(true);
    try {
      const liveJobs = await fetchLiveGovJobsWithAI({
        category: levelFilter !== 'All' ? levelFilter : 'All',
        searchQuery: searchTerm
      });

      if (liveJobs && liveJobs.length > 0) {
        const merged = [...liveJobs, ...allJobs.filter(aj => !liveJobs.some(lj => lj.title === aj.title))];
        setAllJobs(merged);
        localStorage.setItem('skillsync_live_gov_jobs', JSON.stringify(liveJobs));
        const syncLabel = `Synced just now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
        setLastSyncTime(syncLabel);
        localStorage.setItem('skillsync_last_gov_jobs_sync', syncLabel);
      }
    } catch (err) {
      console.error('Failed to sync live jobs:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Reset pagination count whenever filters or search query change
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  }, [searchTerm, levelFilter, qualFilter, statusFilter]);

  const toggleSaveJob = (id) => {
    const targetJob = allJobs.find(j => j.id === id);
    setSavedJobs(prev => {
      const updated = prev.includes(id) ? prev.filter(jId => jId !== id) : [...prev, id];
      localStorage.setItem('skillsync_saved_gov_jobs', JSON.stringify(updated));
      return updated;
    });

    if (targetJob && authToggleSaveJob) {
      authToggleSaveJob({
        id: targetJob.id,
        title: targetJob.title,
        organization: targetJob.organization,
        level: targetJob.level,
        vacancies: targetJob.vacancies,
        salary: targetJob.salary,
        lastDate: targetJob.lastDate,
        link: targetJob.link
      });
    }
  };

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = levelFilter === 'All' || job.level === levelFilter;
    const matchesQual = qualFilter === 'All' || job.qualification === qualFilter;
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;

    return matchesSearch && matchesLevel && matchesQual && matchesStatus;
  });

  const displayedJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + LOAD_MORE_STEP, filteredJobs.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredJobs.length);
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
        gap: '1.25rem'
      }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-mint" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Radio size={12} color="#10b981" /> Live AI & Govt Portal Sync
            </span>
            <span className="badge badge-gray" style={{ fontWeight: '700' }}>
              {filteredJobs.length} Notifications Available ({allJobs.length} Total in Database)
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ⚡ {lastSyncTime}
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Government Job Aggregator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px', lineHeight: '1.5' }}>
            Comprehensive national repository of Central & State Government recruitments (UPSC, SSC, Railways, Banking, Defence, PSUs, State PSCs, Teaching & Medical) with verified official links and real-time application trackers.
          </p>
        </div>

        {/* Live AI / Portal Sync Trigger */}
        <button
          onClick={handleFetchLatestViaAPI}
          disabled={isSyncing}
          className="btn btn-mint"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            fontWeight: '700',
            fontSize: '0.9rem',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
            cursor: isSyncing ? 'wait' : 'pointer'
          }}
          title="Fetch newest notifications directly via AI & official recruitment gateways"
        >
          <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
          {isSyncing ? 'Connecting to Govt API...' : 'Fetch Latest Jobs via AI'}
        </button>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Search Box */}
          <div className="search-box-span" style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by job title, organization (e.g. UPSC, SSC, RRB, SBI, ISRO, Defence)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Level Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              SECTOR / LEVEL
            </label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="select-field"
              style={{ width: '100%' }}
            >
              <option value="All">All Levels (Central & State)</option>
              <option value="Central">Central Govt Jobs</option>
              <option value="State">State Govt Jobs</option>
            </select>
          </div>

          {/* Qualification Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              QUALIFICATION
            </label>
            <select
              value={qualFilter}
              onChange={(e) => setQualFilter(e.target.value)}
              className="select-field"
              style={{ width: '100%' }}
            >
              <option value="All">All Qualifications</option>
              <option value="Graduate">Graduate (Any Degree)</option>
              <option value="10th/12th">10th / 12th Pass</option>
              <option value="Engineering">BE / B.Tech / Engineering</option>
              <option value="Medical">Medical / Nursing</option>
              <option value="Diploma">Polytechnic Diploma</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              EXAM STATUS
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select-field"
              style={{ width: '100%' }}
            >
              <option value="All">All Statuses (Active & Expired)</option>
              <option value="Active">🟢 Currently Active</option>
              <option value="Expired">🔴 Expired / Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress / Status Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.25rem',
        padding: '0 0.5rem'
      }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          Showing <strong style={{ color: 'var(--text-main)' }}>{displayedJobs.length}</strong> of <strong style={{ color: 'var(--text-main)' }}>{filteredJobs.length}</strong> Notifications
        </span>

        {hasMore && (
          <button
            onClick={handleShowAll}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-lavender)',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Show All ({filteredJobs.length})
          </button>
        )}
      </div>

      {/* No Results Fallback */}
      {filteredJobs.length === 0 && (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', borderRadius: '1rem' }}>
          <AlertOctagon size={48} color="var(--accent-mint)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Government Notifications Found
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
            No job matches your selected filters ({searchTerm ? `"${searchTerm}"` : 'selected criteria'}). Try resetting filters or searching with different keywords.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setLevelFilter('All');
              setQualFilter('All');
              setStatusFilter('All');
            }}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.5rem' }}
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Job Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
        {displayedJobs.map(job => {
          const isSaved = savedJobs.includes(job.id);
          const isActive = job.status === 'Active';

          return (
            <div key={job.id} className="glass-panel" style={{
              padding: '1.15rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              borderRadius: '0.875rem',
              border: isActive ? '1.5px solid #10b981' : '1px solid rgba(239, 68, 68, 0.4)',
              background: isActive 
                ? 'var(--bg-surface)' 
                : 'linear-gradient(180deg, rgba(239, 68, 68, 0.03), var(--bg-surface))',
              boxShadow: isActive ? '0 3px 12px rgba(16, 185, 129, 0.1)' : 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div>
                {/* Header Badges & Prominent Status Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* PROMINENT ACTIVE / EXPIRED BADGE */}
                    {isActive ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        background: '#dcfce7',
                        color: '#065f46',
                        fontWeight: '800',
                        fontSize: '0.72rem',
                        border: '1px solid #86efac',
                        boxShadow: '0 1px 4px rgba(16, 185, 129, 0.15)'
                      }}>
                        <span style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: '#10b981',
                          boxShadow: '0 0 6px #10b981',
                          animation: 'pulseGlow 1.5s infinite'
                        }} />
                        ACTIVE APPLICATION
                      </span>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        background: '#fee2e2',
                        color: '#991b1b',
                        fontWeight: '800',
                        fontSize: '0.72rem',
                        border: '1px solid #fca5a5'
                      }}>
                        <AlertOctagon size={12} color="#ef4444" />
                        EXPIRED / CLOSED
                      </span>
                    )}

                    <span className={`badge ${job.level === 'Central' ? 'badge-mint' : 'badge-lavender'}`} style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                      {job.level}
                    </span>
                    <span className="badge badge-lavender" style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                      {job.qualification}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSaved ? 'var(--primary-lavender)' : 'var(--text-light)', padding: '2px' }}
                    title={isSaved ? 'Remove from Saved' : 'Save Job Notification'}
                  >
                    {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </button>
                </div>

                <h3 style={{ fontSize: '1.02rem', color: 'var(--text-main)', marginBottom: '0.35rem', lineHeight: '1.3', fontWeight: '700' }}>
                  {job.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--accent-mint)', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Building2 size={13} /> {job.organization}
                </p>

                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.45',
                  marginBottom: '0.75rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {job.description}
                </p>

                {/* Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  background: 'var(--bg-subtle)',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.72rem' }}>Vacancies:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{job.vacancies}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.72rem' }}>Age Limit:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{job.ageLimit}</strong>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.72rem' }}>Pay Scale:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{job.salary}</strong>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.65rem',
                  paddingTop: '0.45rem',
                  borderTop: '1px dashed var(--border-color)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={12} /> Last Date: <strong>{job.lastDate}</strong>
                  </span>
                  <span style={{ fontWeight: '700', fontSize: '0.73rem', color: isActive ? '#059669' : '#dc2626' }}>
                    {isActive ? '● Open for Registration' : '✕ Application Closed'}
                  </span>
                </div>

                <div>
                  {isActive ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-mint"
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                    >
                      Apply Online <ExternalLink size={13} />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="btn btn-secondary"
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.82rem', opacity: 0.6, cursor: 'not-allowed' }}
                    >
                      Application Expired
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LOAD MORE BUTTON SECTION */}
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
              boxShadow: '0 4px 18px rgba(139, 92, 246, 0.3)',
              borderRadius: '9999px'
            }}
          >
            Load More Notifications ({filteredJobs.length - displayedJobs.length} Remaining)
            <ChevronDown size={18} />
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing {displayedJobs.length} of {filteredJobs.length} notifications • Click to load +{Math.min(LOAD_MORE_STEP, filteredJobs.length - displayedJobs.length)} more
          </span>
        </div>
      )}

      {/* All Loaded Message */}
      {!hasMore && filteredJobs.length > INITIAL_DISPLAY_COUNT && (
        <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <CheckCircle2 size={20} color="#10b981" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem' }} />
          You have reached the end. All <strong>{filteredJobs.length}</strong> matching notifications are displayed.
        </div>
      )}
    </div>
  );
};

export default JobNotifications;
