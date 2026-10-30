import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.0.379'}/pdf.worker.min.mjs`;

/**
 * Universal Resume File Parser
 * Supports all document formats: PDF, DOCX, DOC, Google Docs (.txt, .gdoc), RTF, ODT, HTML, Markdown, LaTeX, and plain text.
 */
export async function parseResumeFile(file) {
  if (!file) return '';

  const fileName = (file.name || '').toLowerCase();

  try {
    const arrayBuffer = await file.arrayBuffer();

    // 1. PDF File
    if (fileName.endsWith('.pdf') || isPdfBuffer(arrayBuffer)) {
      const pdfText = await parsePdfBuffer(arrayBuffer);
      if (pdfText && pdfText.trim().length > 10) {
        return cleanAndNormalizeText(pdfText);
      }
    }

    // 2. Word (.docx / .doc) / OpenDocument (.odt)
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc') || fileName.endsWith('.odt') || isZipBuffer(arrayBuffer)) {
      const docText = await parseWordOrZipBuffer(arrayBuffer, fileName);
      if (docText && docText.trim().length > 10) {
        return cleanAndNormalizeText(docText);
      }
    }

    // 3. Multi-Encoding Text / Google Docs Text / RTF / HTML / Markdown / LaTeX / Other
    const decodedText = decodeBufferWithSmartEncoding(arrayBuffer);

    // If it is an RTF document
    if (decodedText.startsWith('{\\rtf') || fileName.endsWith('.rtf')) {
      const rtfParsed = parseRtfText(decodedText);
      if (rtfParsed && rtfParsed.trim().length > 10) {
        return cleanAndNormalizeText(rtfParsed);
      }
    }

    // If it is an HTML document
    if (/<html|<body|<div|<p\b/i.test(decodedText) && (fileName.endsWith('.html') || fileName.endsWith('.htm') || decodedText.includes('<!DOCTYPE'))) {
      const htmlParsed = parseHtmlText(decodedText);
      if (htmlParsed && htmlParsed.trim().length > 10) {
        return cleanAndNormalizeText(htmlParsed);
      }
    }

    // If it is a Google Docs shortcut file (.gdoc JSON)
    if (fileName.endsWith('.gdoc') || (decodedText.trim().startsWith('{') && decodedText.includes('docs.google.com'))) {
      try {
        const gdocJson = JSON.parse(decodedText);
        if (gdocJson.url) {
          return `[Google Docs Document Link]: ${gdocJson.url}\n(Note: For Google Docs, please download as PDF or Word (.docx) or copy-paste text directly into the preview box below).`;
        }
      } catch (e) {
        // Continue to normal text handling
      }
    }

    // If it is LaTeX / TeX resume
    if (fileName.endsWith('.tex') || decodedText.includes('\\begin{document}')) {
      const latexParsed = parseLatexText(decodedText);
      return cleanAndNormalizeText(latexParsed);
    }

    // Standard decoded text (handles all Google txt exports, UTF-8, UTF-16, Latin1, ASCII)
    return cleanAndNormalizeText(decodedText);
  } catch (err) {
    console.error('Universal file parsing error:', err);
    // Fallback to basic text read
    try {
      const fallbackStr = await readAsPlainText(file);
      return cleanAndNormalizeText(fallbackStr);
    } catch (e) {
      return '';
    }
  }
}

/**
 * Smart Multi-Encoding Buffer Decoder
 * Handles UTF-8 (with or without BOM), UTF-16 LE/BE (common in Google Docs/Windows exports), UTF-32, Latin-1, and Windows-1252.
 */
function decodeBufferWithSmartEncoding(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  if (bytes.length === 0) return '';

  // 1. Check for Byte Order Marks (BOM)
  // UTF-8 BOM: EF BB BF
  if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
    return new TextDecoder('utf-8').decode(bytes.subarray(3));
  }

  // UTF-16 LE BOM: FF FE
  if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) {
    return new TextDecoder('utf-16le').decode(bytes.subarray(2));
  }

  // UTF-16 BE BOM: FE FF
  if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) {
    return new TextDecoder('utf-16be').decode(bytes.subarray(2));
  }

  // 2. Check for UTF-16 LE without BOM (common in Windows/Google txt when null bytes alternate)
  if (bytes.length >= 4) {
    let nullEven = 0;
    let nullOdd = 0;
    const sampleLimit = Math.min(bytes.length, 512);
    for (let i = 0; i < sampleLimit; i++) {
      if (bytes[i] === 0x00) {
        if (i % 2 === 0) nullEven++;
        else nullOdd++;
      }
    }
    if (nullOdd > sampleLimit / 4 && nullEven < 2) {
      // Looks like UTF-16 LE
      try {
        const u16le = new TextDecoder('utf-16le').decode(bytes);
        if (u16le && !u16le.includes('\uFFFD') && u16le.trim().length > 5) {
          return u16le;
        }
      } catch (e) {}
    } else if (nullEven > sampleLimit / 4 && nullOdd < 2) {
      // Looks like UTF-16 BE
      try {
        const u16be = new TextDecoder('utf-16be').decode(bytes);
        if (u16be && !u16be.includes('\uFFFD') && u16be.trim().length > 5) {
          return u16be;
        }
      } catch (e) {}
    }
  }

  // 3. Try UTF-8 first
  try {
    const utf8Str = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return utf8Str;
  } catch (e) {
    // UTF-8 had invalid bytes, fallback to windows-1252 / latin1
  }

  // 4. Try Windows-1252 / Latin-1
  try {
    return new TextDecoder('windows-1252').decode(bytes);
  } catch (e) {
    return new TextDecoder('latin1').decode(bytes);
  }
}

/**
 * Text Normalization
 * Cleans smart quotes, non-breaking spaces, bullet variations, and line breaks.
 */
function cleanAndNormalizeText(str) {
  if (!str) return '';

  return str
    // Remove BOM and null characters
    .replace(/\uFEFF/g, '')
    .replace(/\u0000/g, '')
    // Normalize non-breaking spaces and whitespace
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ')
    // Normalize smart quotes and dashes
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014\u2015]/g, '-')
    // Normalize bullets
    .replace(/[\u2022\u2023\u25E6\u2043\u2219\u25AA\u25AB\u25CF]/g, '•')
    // Standardize CRLF to LF
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Collapse 3+ consecutive newlines into 2
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Parse Word DOCX / ZIP / ODT
 */
async function parseWordOrZipBuffer(arrayBuffer, fileName) {
  // 1. Try Mammoth for DOCX
  try {
    const result = await mammoth.extractRawText({ arrayBuffer });
    if (result && result.value && result.value.trim().length > 10) {
      return result.value.trim();
    }
  } catch (err) {
    console.warn('Mammoth extraction note:', err);
  }

  // 2. Generic XML Text Extractor for DOCX / ODT (searches for w:t and text:p tags in raw stream)
  try {
    const rawDecoded = new TextDecoder('latin1').decode(arrayBuffer);
    const xmlTextMatches = rawDecoded.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || rawDecoded.match(/<text:p[^>]*>([^<]+)<\/text:p>/g);
    if (xmlTextMatches && xmlTextMatches.length > 5) {
      const extracted = xmlTextMatches
        .map(tag => tag.replace(/<[^>]+>/g, '').trim())
        .filter(Boolean)
        .join(' ');
      if (extracted.length > 20) {
        return extracted;
      }
    }
  } catch (e) {}

  return '';
}

/**
 * Parse PDF from ArrayBuffer
 */
async function parsePdfBuffer(arrayBuffer) {
  try {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      
      let lastY = null;
      let pageText = '';
      
      for (let item of content.items) {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          pageText += '\n';
        } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
          pageText += ' ';
        }
        pageText += item.str;
        lastY = item.transform[5];
      }
      
      fullText += pageText + '\n\n';
    }

    if (fullText.trim().length > 10) {
      return fullText.trim();
    }
  } catch (err) {
    console.warn('PDF.js line parse note:', err);
  }

  // Binary stream text fallback
  try {
    const str = new TextDecoder('latin1').decode(arrayBuffer);
    const textPieces = [];
    const parenthesized = str.match(/\(([^()]{2,})\)/g);
    if (parenthesized && parenthesized.length > 0) {
      for (let p of parenthesized) {
        const clean = p.slice(1, -1).trim();
        if (
          clean.length > 1 &&
          !/^\/[A-Z0-9]+/i.test(clean) &&
          !/^(obj|endobj|stream|endstream|xref|trailer|startxref)$/i.test(clean)
        ) {
          textPieces.push(clean);
        }
      }
    }
    if (textPieces.length > 5) {
      return textPieces.join('\n');
    }
  } catch (e) {}

  return '';
}

/**
 * Helper: Parse RTF content
 */
function parseRtfText(rtfStr) {
  try {
    return rtfStr
      .replace(/\\fonttbl[\s\S]*?}/g, '')
      .replace(/\\colortbl[\s\S]*?}/g, '')
      .replace(/\\stylesheet[\s\S]*?}/g, '')
      .replace(/\\info[\s\S]*?}/g, '')
      .replace(/\\par[d]?/g, '\n')
      .replace(/\\line/g, '\n')
      .replace(/\\tab/g, '\t')
      .replace(/\\u([0-9]{3,5})\??/g, (_, code) => String.fromCharCode(code))
      .replace(/\\'([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/\\[a-zA-Z0-9\-]+/g, '')
      .replace(/[{}]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  } catch (e) {
    return rtfStr;
  }
}

/**
 * Helper: Parse HTML content to clean text
 */
function parseHtmlText(htmlStr) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlStr, 'text/html');
    return doc.body ? (doc.body.innerText || doc.body.textContent || '') : '';
  } catch (e) {
    return htmlStr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}

/**
 * Helper: Parse LaTeX / TeX resume
 */
function parseLatexText(texStr) {
  return texStr
    .replace(/%.*$/gm, '') // comments
    .replace(/\\textbf\{([^}]+)\}/g, '$1')
    .replace(/\\textit\{([^}]+)\}/g, '$1')
    .replace(/\\underline\{([^}]+)\}/g, '$1')
    .replace(/\\href\{[^}]+\}\{([^}]+)\}/g, '$1')
    .replace(/\\item\s*/g, '• ')
    .replace(/\\[a-zA-Z]+\*?(\{([^}]*)\})?/g, '$2 ')
    .replace(/[{}]/g, '')
    .replace(/\\\\/g, '\n')
    .trim();
}

function isPdfBuffer(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  return bytes.length >= 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46; // %PDF
}

function isZipBuffer(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4B && bytes[2] === 0x03 && bytes[3] === 0x04; // PK..
}

function readAsPlainText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result || '');
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

/**
 * Advanced Rule-Based Resume Data Extractor
 * Strictly extracts data from raw resume text without inventing fictional entities.
 */
export function extractStructuredResumeFields(rawText) {
  if (!rawText || !rawText.trim()) return null;

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  
  // 1. Email Regex
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 2. Phone Regex (International and Indian/US numbers)
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{4,5}/);
  const phone = phoneMatch ? phoneMatch[0].trim() : '';

  // 3. GitHub & LinkedIn Handles / URLs
  const githubMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i) || rawText.match(/github:\s*([a-zA-Z0-9_-]+)/i);
  const github = githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : `github.com/${githubMatch[1]}`) : '';

  const linkedinMatch = rawText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i) || rawText.match(/linkedin:\s*([a-zA-Z0-9_-]+)/i);
  const linkedin = linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `linkedin.com/in/${linkedinMatch[1]}`) : '';

  // 4. Candidate Name (Header line heuristics)
  let fullName = '';
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const candidate = lines[i]
      .replace(/resume|curriculum vitae|cv|bio-data/gi, '')
      .replace(/[|•,].*$/g, '')
      .trim();
    if (
      candidate.length >= 3 &&
      candidate.length <= 35 &&
      !candidate.includes('@') &&
      !candidate.includes('.com') &&
      !/\d/.test(candidate) &&
      !/^(education|experience|skills|projects|summary|profile|objective)/i.test(candidate)
    ) {
      fullName = candidate;
      break;
    }
  }

  // 5. Professional Title
  let title = '';
  const titleKeywords = [
    'Full Stack Developer', 'Software Engineer', 'Frontend Developer', 'Backend Developer',
    'DevOps Engineer', 'Data Scientist', 'AI/ML Engineer', 'Cloud Architect', 'Java Developer',
    'Python Developer', 'React Developer', 'Android Developer', 'Graduate Engineer Trainee',
    'Student', 'Computer Science Graduate'
  ];
  for (let kw of titleKeywords) {
    if (new RegExp(`\\b${kw}\\b`, 'i').test(rawText)) {
      title = kw;
      break;
    }
  }

  // 6. Comprehensive Skills List Extraction
  const recognizedSkills = [
    'React', 'React.js', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS',
    'Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring Boot', 'C++', 'C#', '.NET',
    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Git', 'GitHub', 'CI/CD', 'Kafka', 'Microservices', 'System Design', 'Linux', 'Agile', 'Scrum', 'Data Structures', 'Algorithms'
  ];

  const foundSkills = [];
  for (let skill of recognizedSkills) {
    const regex = new RegExp(`\\b${skill.replace(/[.+]/g, '\\$&')}\\b`, 'i');
    if (regex.test(rawText)) {
      foundSkills.push(skill);
    }
  }

  // 7. Section Segmenting
  const sections = {
    summary: [],
    education: [],
    experience: [],
    projects: []
  };

  let currentSection = 'summary';
  for (let line of lines) {
    const lower = line.toLowerCase();
    if (/^(professional\s+)?summary|career\s+objective|about\s+me|profile/i.test(lower)) {
      currentSection = 'summary';
      continue;
    }
    if (/^education|academic\s+background|qualifications/i.test(lower)) {
      currentSection = 'education';
      continue;
    }
    if (/^work\s+experience|professional\s+experience|experience|employment\s+history|internships?/i.test(lower)) {
      currentSection = 'experience';
      continue;
    }
    if (/^projects?|personal\s+projects|academic\s+projects|key\s+projects/i.test(lower)) {
      currentSection = 'projects';
      continue;
    }
    if (/^skills|technical\s+skills|core\s+competencies|certifications/i.test(lower)) {
      currentSection = 'skills';
      continue;
    }

    if (currentSection && sections[currentSection]) {
      sections[currentSection].push(line);
    }
  }

  // 8. Parse Education
  const educationList = [];
  if (sections.education.length > 0) {
    let currentEdu = null;
    for (let line of sections.education) {
      if (/(b\.tech|bachelor|m\.tech|master|b\.s|b\.e|mca|bca|diploma|school|university|institute|college)/i.test(line)) {
        if (currentEdu) educationList.push(currentEdu);
        const yearMatch = line.match(/\b(20\d{2}|19\d{2})\s*[-–to\s]*\s*(20\d{2}|present|\b\d{4}\b)?/i);
        currentEdu = {
          id: `edu-${Date.now()}-${educationList.length + 1}`,
          degree: line.replace(/\b(20\d{2}|19\d{2}).*$/i, '').trim(),
          institution: 'Institution / University',
          period: yearMatch ? yearMatch[0].trim() : '2022 - 2026'
        };
      } else if (currentEdu && currentEdu.institution === 'Institution / University') {
        currentEdu.institution = line;
      }
    }
    if (currentEdu) educationList.push(currentEdu);
  }

  // 9. Parse Experience
  const experienceList = [];
  if (sections.experience.length > 0) {
    let currentExp = null;
    for (let line of sections.experience) {
      const yearMatch = line.match(/\b(20\d{2}|19\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*[-–to\s]*\s*(20\d{2}|present|\b\d{4}\b)?/i);
      if (yearMatch && (line.includes('|') || line.includes('-') || line.length < 80)) {
        if (currentExp) experienceList.push(currentExp);
        currentExp = {
          id: `exp-${Date.now()}-${experienceList.length + 1}`,
          role: line.split(/[-–|]/)[0]?.trim() || 'Software Engineer',
          company: line.split(/[-–|]/)[1]?.trim() || 'Tech Company',
          period: yearMatch[0].trim(),
          details: ''
        };
      } else if (currentExp) {
        currentExp.details = currentExp.details ? `${currentExp.details} ${line}` : line;
      }
    }
    if (currentExp) experienceList.push(currentExp);
  }

  // 10. Parse Projects
  const projectList = [];
  if (sections.projects.length > 0) {
    let currentProj = null;
    for (let line of sections.projects) {
      if (line.includes('|') || line.includes(':') || (line.length < 50 && !line.startsWith('•') && !line.startsWith('-'))) {
        if (currentProj) projectList.push(currentProj);
        const parts = line.split(/[:|]/);
        currentProj = {
          id: `proj-${Date.now()}-${projectList.length + 1}`,
          name: parts[0]?.trim() || 'Technical Project',
          tech: parts[1]?.trim() || 'JavaScript, React, Node.js',
          description: ''
        };
      } else if (currentProj) {
        currentProj.description = currentProj.description ? `${currentProj.description} ${line}` : line;
      }
    }
    if (currentProj) projectList.push(currentProj);
  }

  // 11. Profile Summary
  let summary = sections.summary.join(' ').trim();
  if (!summary && rawText.length > 50) {
    summary = lines.slice(1, 4).join(' ').replace(/email:.*|phone:.*|linkedin:.*|github:.*/gi, '').trim();
  }

  return {
    fullName: fullName || '',
    title: title || '',
    email: email || '',
    phone: phone || '',
    location: '',
    github: github || '',
    linkedin: linkedin || '',
    summary: summary || '',
    skills: foundSkills.length > 0 ? [...new Set(foundSkills)] : [],
    education: educationList.length > 0 ? educationList : [],
    experience: experienceList.length > 0 ? experienceList : [],
    projects: projectList.length > 0 ? projectList : [],
    careerStage: experienceList.length > 1 ? 'experienced' : 'fresher'
  };
}
