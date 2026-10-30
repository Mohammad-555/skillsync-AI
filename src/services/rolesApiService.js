import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Comprehensive Industry IT Roles Catalog
 * Fully structured with required tech stacks, recommended nice-to-haves, and actionable roadmaps.
 */
export const COMPREHENSIVE_IT_ROLES = [
  {
    id: 'fullstack',
    name: 'Senior Full Stack Software Engineer',
    category: 'Web & Full Stack',
    domain: 'Full Stack',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'GraphQL', 'AWS', 'System Design'],
    niceToHave: ['Redis', 'Kubernetes', 'CI/CD Pipelines', 'Microservices'],
    roadmap: [
      'Master TypeScript & Advanced React Hooks State Patterns',
      'Build scalable RESTful & GraphQL APIs with Express/Fastify',
      'Containerize applications with Docker & Orchestrate via AWS ECS',
      'Study High Availability System Architecture & Caching Strategies'
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend Engineer & UI Architect',
    category: 'Web & Full Stack',
    domain: 'Frontend',
    requiredSkills: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux / Zustand', 'HTML5/CSS3', 'Web Performance'],
    niceToHave: ['Vue.js', 'GraphQL', 'Jest', 'Webpack / Vite'],
    roadmap: [
      'Master Component Lifecycle, Custom Hooks & State Management',
      'Build Server-Side Rendered & SEO Optimized Web Apps with Next.js',
      'Profile Core Web Vitals (LCP, FID, CLS) and optimize rendering pipelines',
      'Construct accessible, responsive design systems with Tailwind CSS'
    ]
  },
  {
    id: 'backend',
    name: 'Backend & Distributed Systems Engineer',
    category: 'Web & Full Stack',
    domain: 'Backend',
    requiredSkills: ['Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'System Design'],
    niceToHave: ['Go', 'gRPC', 'Kubernetes', 'Elasticsearch'],
    roadmap: [
      'Architect robust Microservices with Spring Boot or Node.js/Go',
      'Implement asynchronous event streaming pipelines with Apache Kafka',
      'Optimize complex SQL queries, connection pooling & distributed locks with Redis',
      'Design fault-tolerant APIs adhering to 12-factor application standards'
    ]
  },
  {
    id: 'aiml',
    name: 'AI & Machine Learning Engineer',
    category: 'AI & Data Science',
    domain: 'Artificial Intelligence',
    requiredSkills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs & RAG', 'LangChain', 'Vector Databases', 'Pandas', 'MLOps'],
    niceToHave: ['CUDA', 'Hugging Face', 'FastAPI', 'ONNX'],
    roadmap: [
      'Deepen Neural Network Foundations (CNNs, Transformers, Attention)',
      'Implement Retrieval-Augmented Generation (RAG) with Pinecone/Qdrant',
      'Optimize LLM Fine-Tuning (LoRA, QLoRA) on Custom Datasets',
      'Deploy Production Models with FastAPI & Triton Inference Server'
    ]
  },
  {
    id: 'genai',
    name: 'Generative AI & LLM Solutions Engineer',
    category: 'AI & Data Science',
    domain: 'Artificial Intelligence',
    requiredSkills: ['Python', 'LLMs & RAG', 'LangChain', 'Vector Databases', 'Prompt Engineering', 'OpenAI API', 'Hugging Face', 'FastAPI'],
    niceToHave: ['PyTorch', 'Fine-Tuning', 'LlamaIndex', 'vLLM'],
    roadmap: [
      'Develop multi-agent cognitive systems with LangChain and LangGraph',
      'Set up enterprise semantic search with vector indexing & hybrid search',
      'Implement context caching, prompt guardrails & token evaluation metrics',
      'Host and serve open-source LLMs (Llama 3, Mistral) with low-latency vLLM'
    ]
  },
  {
    id: 'dataeng',
    name: 'Principal Data Engineer',
    category: 'AI & Data Science',
    domain: 'Data Platform',
    requiredSkills: ['SQL', 'Python', 'Apache Spark', 'Apache Airflow', 'Snowflake / BigQuery', 'Kafka', 'Data Modeling'],
    niceToHave: ['dbt', 'Databricks', 'Delta Lake', 'PySpark'],
    roadmap: [
      'Master Dimensional Data Modeling & Star Schema Architectures',
      'Build Real-Time Streaming Pipelines with Apache Kafka & Spark',
      'Orchestrate Enterprise ETL/ELT Workflows using Apache Airflow & dbt',
      'Optimize BigQuery & Snowflake Storage Partitioning and cost governance'
    ]
  },
  {
    id: 'datascientist',
    name: 'Senior Data Scientist & Analytics Lead',
    category: 'AI & Data Science',
    domain: 'Data Science',
    requiredSkills: ['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Statistical Testing', 'Tableau / PowerBI', 'Machine Learning', 'Data Visualization'],
    niceToHave: ['R', 'A/B Testing', 'BigQuery', 'Deep Learning'],
    roadmap: [
      'Design rigorous A/B experimentation frameworks and hypothesis tests',
      'Train supervised/unsupervised machine learning models on high-volume datasets',
      'Automate executive KPI dashboards with Tableau and SQL data pipelines',
      'Translate exploratory statistical insights into high-impact product roadmaps'
    ]
  },
  {
    id: 'devops',
    name: 'Cloud & DevOps Solutions Architect',
    category: 'Cloud & DevOps',
    domain: 'Infrastructure',
    requiredSkills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD Pipelines', 'Linux Kernel', 'Bash/Python', 'Prometheus'],
    niceToHave: ['GCP', 'Ansible', 'Istio Service Mesh', 'Helm'],
    roadmap: [
      'Attain AWS Certified Solutions Architect Professional',
      'Master Kubernetes Cluster Administration & Helm Deployments',
      'Implement Infrastructure as Code (IaC) with Modular Terraform',
      'Set up Zero-Trust Security & Distributed Tracing with OpenTelemetry'
    ]
  },
  {
    id: 'sre',
    name: 'Site Reliability Engineer (SRE)',
    category: 'Cloud & DevOps',
    domain: 'Infrastructure',
    requiredSkills: ['Linux Kernel', 'Kubernetes', 'Prometheus', 'Grafana', 'Go / Python', 'Docker', 'CI/CD Pipelines', 'Incident Management'],
    niceToHave: ['Terraform', 'ELK Stack', 'Chaos Engineering', 'SLO/SLI Definition'],
    roadmap: [
      'Formalize SLOs, SLIs, and Error Budgets across production microservices',
      'Automate real-time metric anomaly detection using Prometheus and Grafana alerts',
      'Conduct simulated chaos engineering drills to stress-test high availability',
      'Write self-healing infrastructure automation scripts in Go or Python'
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Analyst & SOC Specialist',
    category: 'Cybersecurity',
    domain: 'Security',
    requiredSkills: ['Network Security', 'Linux Kernel', 'SIEM Tools', 'Penetration Testing', 'Python / Bash', 'Cryptography', 'OWASP Top 10', 'Wireshark'],
    niceToHave: ['Splunk', 'Burp Suite', 'Metasploit', 'CISSP / CEH'],
    roadmap: [
      'Master packet-level network inspection and vulnerability scanning tools',
      'Configure Security Information and Event Management (SIEM) threat detection rules',
      'Conduct static and dynamic web app security penetration tests (OWASP Top 10)',
      'Establish automated incident triage workflows and vulnerability patch management'
    ]
  },
  {
    id: 'mobile_flutter',
    name: 'Cross-Platform Mobile Engineer (Flutter / React Native)',
    category: 'Mobile Apps',
    domain: 'Mobile',
    requiredSkills: ['Flutter / Dart', 'React Native', 'TypeScript', 'RESTful APIs', 'Mobile UI/UX', 'State Management', 'Firebase', 'App Store / Play Store Deploy'],
    niceToHave: ['Kotlin', 'Swift', 'Offline Sync', 'GraphQL'],
    roadmap: [
      'Master reactive state management with Bloc / Provider or Redux / Zustand',
      'Integrate push notifications, background sync, and offline SQLite caching',
      'Build native bridges with Android Java/Kotlin and iOS Objective-C/Swift',
      'Automate CI/CD mobile builds and automated releases via Fastlane'
    ]
  },
  {
    id: 'android',
    name: 'Senior Android App Engineer (Kotlin)',
    category: 'Mobile Apps',
    domain: 'Mobile',
    requiredSkills: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Coroutines & Flow', 'Room Database', 'Dagger / Hilt', 'Clean Architecture', 'REST APIs'],
    niceToHave: ['Ktor', 'Firebase', 'Unit Testing', 'CI/CD'],
    roadmap: [
      'Build modern declarative Android UIs utilizing Jetpack Compose',
      'Orchestrate asynchronous reactive streams using Kotlin Coroutines and Flows',
      'Implement modular MVVM Clean Architecture backed by Hilt Dependency Injection',
      'Optimize APK size, baseline profiles, and frame rendering performance'
    ]
  },
  {
    id: 'ios',
    name: 'iOS Developer & Swift Specialist',
    category: 'Mobile Apps',
    domain: 'Mobile',
    requiredSkills: ['Swift', 'SwiftUI', 'UIKit', 'Combine', 'CoreData / SwiftData', 'Xcode', 'RESTful APIs', 'App Store Submission'],
    niceToHave: ['Async/Await', 'Metal', 'CocoaPods / SPM', 'Unit Testing'],
    roadmap: [
      'Develop reactive Apple ecosystem interfaces with SwiftUI and Combine',
      'Architect robust local persistence with SwiftData and background sync',
      'Profile memory leaks and time profiling using Instruments in Xcode',
      'Implement in-app purchases, push services, and TestFlight beta distributions'
    ]
  },
  {
    id: 'qa_sdet',
    name: 'QA Automation & SDET Engineer',
    category: 'Quality & Testing',
    domain: 'Testing',
    requiredSkills: ['Selenium', 'Cypress / Playwright', 'Python / Java', 'API Testing (Postman)', 'CI/CD Pipelines', 'TestNG / PyTest', 'SQL', 'Docker'],
    niceToHave: ['JMeter', 'Appium', 'Performance Testing', 'BDD / Cucumber'],
    roadmap: [
      'Architect end-to-end web automation frameworks using Playwright or Cypress',
      'Automate REST API regression suites and integrate directly into CI/CD pipelines',
      'Conduct load and stress testing on backend microservices with Apache JMeter',
      'Standardize behavior-driven development (BDD) specs with Cucumber and Jira'
    ]
  },
  {
    id: 'blockchain',
    name: 'Blockchain & Web3 Smart Contract Engineer',
    category: 'Web3 & Emerging',
    domain: 'Blockchain',
    requiredSkills: ['Solidity', 'Ethereum', 'Web3.js / Ethers.js', 'Hardhat / Foundry', 'Smart Contract Security', 'TypeScript', 'Cryptography', 'IPFS'],
    niceToHave: ['Rust', 'Solana', 'DeFi Protocols', 'Zero-Knowledge Proofs'],
    roadmap: [
      'Write gas-optimized EVM smart contracts conforming to ERC standards',
      'Conduct automated static analysis & audit audits using Slither and Echidna',
      'Connect decentralized dApps to browser wallets using Ethers.js and Wagmi',
      'Explore Layer-2 rollups, account abstraction, and zero-knowledge rollups'
    ]
  },
  {
    id: 'embedded',
    name: 'Embedded Systems & IoT Firmware Engineer',
    category: 'Systems & Hardware',
    domain: 'Embedded',
    requiredSkills: ['C / C++', 'Microcontrollers (ARM, ESP32)', 'RTOS (FreeRTOS)', 'Embedded Linux', 'I2C / SPI / UART', 'Git', 'Hardware Debugging (JTAG)', 'Python'],
    niceToHave: ['Rust for Embedded', 'BLE / Zigbee', 'PCB Design', 'MQTT'],
    roadmap: [
      'Write bare-metal drivers and low-power routines for ARM Cortex-M microcontrollers',
      'Design multi-threaded real-time firmware architectures using FreeRTOS',
      'Implement secure IoT telemetry communication using MQTT over TLS',
      'Debug bus protocols and timing margins using logic analyzers and oscilloscopes'
    ]
  }
];

/**
 * API Fetcher for IT Roles
 * Queries Supabase `target_roles` table if available, otherwise seamlessly returns the comprehensive catalog.
 * Supports keyword filtering, category filtering, and sorting.
 */
export const fetchITRolesFromAPI = async ({ search = '', category = 'All' } = {}) => {
  try {
    // 1. If Supabase is configured and a custom table exists, query it
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('target_roles').select('*');
        if (category && category !== 'All') {
          query = query.eq('category', category);
        }
        if (search && search.trim()) {
          query = query.ilike('name', `%${search.trim()}%`);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return { data, source: 'supabase', error: null };
        }
      } catch (err) {
        // Fallback gracefully to catalog
      }
    }

    // 2. Built-in API Service layer (with artificial realistic API latency simulation)
    await new Promise((resolve) => setTimeout(resolve, 80));

    let filtered = [...COMPREHENSIVE_IT_ROLES];

    if (category && category !== 'All') {
      filtered = filtered.filter(role => 
        role.category.toLowerCase() === category.toLowerCase() ||
        role.domain.toLowerCase() === category.toLowerCase()
      );
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(q) ||
        role.category.toLowerCase().includes(q) ||
        role.domain.toLowerCase().includes(q) ||
        role.requiredSkills.some(skill => skill.toLowerCase().includes(q))
      );
    }

    return {
      data: filtered,
      total: COMPREHENSIVE_IT_ROLES.length,
      filteredCount: filtered.length,
      source: 'live-catalog-api',
      error: null
    };
  } catch (error) {
    console.error('Error fetching target IT roles:', error);
    return {
      data: COMPREHENSIVE_IT_ROLES,
      total: COMPREHENSIVE_IT_ROLES.length,
      filteredCount: COMPREHENSIVE_IT_ROLES.length,
      source: 'offline-fallback',
      error
    };
  }
};

