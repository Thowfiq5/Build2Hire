// shared.js - Shared Header, Theme Toggle, Auth, and Unified Mock DB Controller

// ==========================================
// 💾 MOCK DATABASE CONTROLLER (LocalStorage)
// ==========================================

const DEFAULT_JOBS = [
  { id: 1, title: "Senior Frontend Engineer", company: "Vercel Inc", logo: "⚡", category: "Frontend Developer", location: "Remote (US/EU)", salary: "$130k - $160k", skills: ["React", "Next.js", "TailwindCSS"], description: "Join the team building the frontend cloud. Work on core framework features, design systems, and state-of-the-art web performance optimizations.", type: "Full-time" },
  { id: 2, title: "Backend Systems Developer", company: "Airbnb", logo: "🏡", category: "Backend Engineer", location: "Hybrid (San Francisco)", salary: "$140k - $180k", skills: ["Node.js", "MySQL", "Redis"], description: "Scale backend APIs serving millions of global guests. Implement robust distributed systems, caching layers, and secure payment integrations.", type: "Full-time" },
  { id: 3, title: "Database Architect", company: "MongoDB Inc", logo: "🍃", category: "Database Administrator", location: "Remote (Global)", salary: "$150k - $190k", skills: ["MongoDB", "Redis", "System Design"], description: "Design next-generation cloud database scaling strategies. Optimize query performance, write high-concurrency schema specs, and mentor engineers.", type: "Full-time" },
  { id: 4, title: "Full Stack Engineer", company: "Stripe", logo: "💳", category: "Full Stack Engineer", location: "Remote (APAC)", salary: "$120k - $155k", skills: ["React", "Node.js", "PostgreSQL"], description: "Build elegant dashboards and merchant interfaces. Coordinate payment flows, security parameters, and developer documentation schemas.", type: "Full-time" },
  { id: 5, title: "Lead Creative Video Editor", company: "Netflix", logo: "🎥", category: "Video Editor", location: "Hybrid (Los Angeles)", salary: "$110k - $140k", skills: ["Premiere Pro", "After Effects", "Color Grading"], description: "Edit engaging teaser campaigns and cinematic trailers. Work closely with advertising and marketing teams to assemble promotional clips.", type: "Full-time" },
  { id: 6, title: "Promo Campaign Video Editor", company: "YouTube", logo: "📺", category: "Video Editor", location: "Remote (Global)", salary: "$90k - $115k", skills: ["Final Cut Pro", "Audio Design", "H.264 Encoding"], description: "Produce and polish daily YouTube advertisements, optimize exports for web platforms, and coordinate audio track overlays.", type: "Full-time" },
  
  // Freelance Gigs
  { id: 101, title: "Interactive React Chart Component", company: "Vercel Inc", logo: "⚡", category: "Frontend Developer", location: "Contract (1 Week)", salary: "$2,500 Flat", skills: ["React", "D3.js", "SVG"], description: "Develop an interactive, responsive radar chart component matching high-fidelity Tailwind layouts. Clean code and testing specs required.", type: "Freelance" },
  { id: 102, title: "Fast Redis Query Cache setup", company: "Airbnb", logo: "🏡", category: "Backend Engineer", location: "Contract (3 Days)", salary: "$1,800 Flat", skills: ["Redis", "Node.js", "API Caching"], description: "Setup Redis memory cache pipelines to throttle heavy database listing counts. Intercept router endpoints to serve cache responses.", type: "Freelance" },
  { id: 103, title: "Database Indexing optimization", company: "MongoDB Inc", logo: "🍃", category: "Database Administrator", location: "Contract (5 Days)", salary: "$3,000 Flat", skills: ["MongoDB", "Query Indexing", "Aggregations"], description: "Audit aggregation pipelines, define compound indexes, and scale shard keys for our core activity collection.", type: "Freelance" },
  { id: 104, title: "Short Marketing Video assembly", company: "InnovateTech", logo: "🏢", category: "Video Editor", location: "Contract (2 Days)", salary: "$1,200 Flat", skills: ["Premiere Pro", "Promo Editing", "Transitions"], description: "Assemble and edit a 2-minute promotional clip featuring transitions, background music, overlays, and clean compressed exports.", type: "Freelance" },
  { id: 105, title: "Social Media Reel Editor", company: "CreativeHub", logo: "🎨", category: "Video Editor", location: "Contract (Flexible)", salary: "$600 / Reel", skills: ["TikTok Ads", "Captions", "Audio Design"], description: "Edit 15-30 second engaging vertical shorts with fast cuts, subtitles, sound design overlays, and animated emojis.", type: "Freelance" }
];

const DEFAULT_CHALLENGES = [
  { id: 1, title: "Custom Video Editor Dashboard UI", difficulty: "hard", category: "Frontend", max_xp: 250, company_name: "Vercel Inc", company_logo: "🔺", description: "Develop a slick dashboard layout for a cloud-based video editor. Implement file drop areas, timelines, track controls, and video player placeholder. Fully mobile responsive.", requirements: "- React + CSS Variables\n- Smooth dragging timeline mock\n- Clean responsive layout" },
  { id: 2, title: "Video Editor Specs Assessment", difficulty: "medium", category: "Creative", max_xp: 100, company_name: "InnovateTech", company_logo: "🏢", description: "Edit a 2 minute promotional video for our cloud products. Include transitions, audio tracks, and compress it using H.264.", requirements: "- Edit a 2 minute promotional video\n- Include sound assets\n- Export to MP4 1080p" },
  { id: 3, title: "MongoDB Database Schema Design", difficulty: "easy", category: "Database", max_xp: 80, company_name: "DataCorp", company_logo: "💾", description: "Design a high-performance database schema pattern for a e-commerce site supporting 10k concurrent users. Outline indexing guidelines.", requirements: "- Detailed JSON schema layout\n- List of indexes proposed\n- Queries breakdown document" }
];

const DEFAULT_USERS = [
  {
    id: 1001,
    email: "candidate@build2hire.com",
    fullName: "Candidate User",
    role: "candidate",
    phone: "+1 (555) 019-2834",
    bio: "Passionate engineer eager to show my skills to recruiters. Click edit to set my details.",
    githubUrl: "",
    linkedinUrl: "",
    portfolioWebsite: "",
    skills: [],
    skillLevels: {},
    profileCompleted: false,
    xp_points: 0,
    level: 1,
    talent_score: 0,
    portfolio_score: 0,
    challenge_score: 0,
    assessment_score: 0,
    preferredRole: "",
    education: "Bachelor of Engineering in Computer Science",
    certificates: [],
    projects: [],
    enrolled_courses: []
  },
  {
    id: 1004,
    email: "recruiter@innovatetech.com",
    fullName: "Jane Recruiter",
    role: "recruiter",
    companyName: "InnovateTech",
    jobTitle: "Hiring Manager"
  },
  {
    id: 1002,
    email: "admin@build2hire.com",
    fullName: "Admin User",
    role: "admin",
    xp_points: 9999,
    talent_score: 100
  }
];

const DEFAULT_SUBMISSIONS = [];
const DEFAULT_APPLICATIONS = [];
const DEFAULT_INTERVIEWS = [];
const DEFAULT_COMPANY_REGISTRATIONS = [];

// Seed and fetch Mock DB
function dbParse(dataStr) {
  if (!dataStr) return null;
  try {
    return JSON.parse(decodeURIComponent(atob(dataStr)));
  } catch (e1) {
    try {
      return JSON.parse(dataStr);
    } catch (e2) {
      return null;
    }
  }
}

function dbGet() {
  let db = localStorage.getItem('build2hire_db');
  let parsed = dbParse(db);

  if (!parsed) {
    // Attempt recovery from backup
    let backup = localStorage.getItem('build2hire_db_backup');
    parsed = dbParse(backup);
    if (parsed) {
      console.warn("Recovered database from backup.");
    }
  }
  
  if (!parsed) {
    parsed = {};
  }
  
  let updated = false;
  
  const hasAlex = parsed.users && parsed.users.some(u => u.fullName === "Alex Rivera");
  if (hasAlex) {
    parsed.users = DEFAULT_USERS;
    parsed.submissions = DEFAULT_SUBMISSIONS;
    parsed.applications = DEFAULT_APPLICATIONS;
    parsed.interviews = DEFAULT_INTERVIEWS;
    parsed.company_registrations = DEFAULT_COMPANY_REGISTRATIONS;
    updated = true;
  }

  if (!parsed.users || parsed.users.length === 0) {
    parsed.users = DEFAULT_USERS;
    updated = true;
  } else {
    DEFAULT_USERS.forEach(defU => {
      const exists = parsed.users.some(u => u.email.toLowerCase() === defU.email.toLowerCase());
      if (!exists) {
        parsed.users.push(defU);
        updated = true;
      }
    });
  }
  if (!parsed.challenges || parsed.challenges.length === 0) {
    parsed.challenges = DEFAULT_CHALLENGES;
    updated = true;
  }
  if (!parsed.jobs || parsed.jobs.length === 0) {
    parsed.jobs = DEFAULT_JOBS;
    updated = true;
  }
  if (!parsed.submissions) {
    parsed.submissions = DEFAULT_SUBMISSIONS;
    updated = true;
  }
  if (!parsed.applications) {
    parsed.applications = DEFAULT_APPLICATIONS;
    updated = true;
  }
  if (!parsed.interviews) {
    parsed.interviews = DEFAULT_INTERVIEWS;
    updated = true;
  }
  if (!parsed.company_registrations || parsed.company_registrations.length === 0) {
    parsed.company_registrations = DEFAULT_COMPANY_REGISTRATIONS;
    updated = true;
  }
  if (!parsed.conversations || parsed.conversations.length === 0) {
    parsed.conversations = [
      {
        id: "c1",
        clientId: 1004,
        clientName: "Jane Recruiter",
        companyName: "InnovateTech",
        clientPhone: "+1 (555) 012-9843",
        candidateId: 1001,
        candidateName: "Candidate User",
        messages: [
          { senderId: 1004, senderName: "Jane Recruiter", text: "Hello! I saw your portfolio and assessments on Build2Hire. Your projects look very impressive.", timestamp: Date.now() - 3600000 * 3 },
          { senderId: 1001, senderName: "Candidate User", text: "Thank you, Jane! I appreciate you looking at my work. I have worked on React dashboards and database indexing optimizations.", timestamp: Date.now() - 3600000 * 2.5 },
          { senderId: 1004, senderName: "Jane Recruiter", text: "Awesome. I'd love to chat about a freelance micro-gig we have for an Interactive Video Editor UI. Could we schedule a live call to go over the scope?", timestamp: Date.now() - 3600000 * 2 }
        ],
        lastUpdated: Date.now() - 3600000 * 2
      }
    ];
    updated = true;
  }
  if (!parsed.meetings) {
    parsed.meetings = [];
    updated = true;
  }
  if (!parsed.contracts || parsed.contracts.length === 0) {
    parsed.contracts = [
      {
        id: "cnt1",
        candidateId: 1001,
        jobId: 104,
        title: "Short Marketing Video assembly",
        company: "InnovateTech",
        salary: "$1,200 Flat",
        amount: 1200,
        status: "active",
        dateStarted: "2026-06-10",
        dateCompleted: null,
        milestones: [
          { id: 1, title: "Storyboard and Footage Selection", description: "Select raw footage and align storyboard.", weight: 30, status: "completed", deliverable: "Draft storyboard document shared." },
          { id: 2, title: "First Cut and Transitions", description: "Apply transitions, color correction, and audio track.", weight: 40, status: "in-progress", deliverable: "" },
          { id: 3, title: "Final Rendering & H.264 Export", description: "Deliver final high-res MP4 video.", weight: 30, status: "pending", deliverable: "" }
        ]
      },
      {
        id: "cnt2",
        candidateId: 1001,
        jobId: 105,
        title: "Social Media Reel Editor",
        company: "CreativeHub",
        salary: "$600 / Reel",
        amount: 600,
        status: "completed",
        dateStarted: "2026-05-15",
        dateCompleted: "2026-05-20",
        milestones: [
          { id: 1, title: "Audio Sync and Cut", description: "Sync audio overlays and clip selection.", weight: 50, status: "completed", deliverable: "Reel_Draft_v1.mp4" },
          { id: 2, title: "Subtitles and Emojis", description: "Add auto-captions and animated emojis.", weight: 50, status: "completed", deliverable: "Reel_Final_Vercel.mp4" }
        ]
      },
      {
        id: "cnt3",
        candidateId: 1001,
        jobId: 101,
        title: "Interactive React Chart Component",
        company: "Vercel Inc",
        salary: "$2,500 Flat",
        amount: 2500,
        status: "completed",
        dateStarted: "2026-04-01",
        dateCompleted: "2026-04-07",
        milestones: [
          { id: 1, title: "Chart Setup", description: "Setup D3.js and SVG wrappers in React.", weight: 40, status: "completed", deliverable: "GitHub Repository setup complete." },
          { id: 2, title: "Interactive Tooltips", description: "Add responsive tooltips and hover triggers.", weight: 60, status: "completed", deliverable: "Tooltip styling complete." }
        ]
      }
    ];
    updated = true;
  }

  // Schema migration for candidate level information
  if (parsed.users) {
    parsed.users.forEach(u => {
      if (u.role === 'candidate') {
        if (u.profileCompleted === undefined) {
          u.profileCompleted = true; // existing seeded users are complete
          updated = true;
        }
        if (!u.skillLevels) {
          u.skillLevels = {};
          (u.skills || []).forEach(sk => {
            // Seed defaults for known skills, otherwise Basic
            if (sk === "React" && String(u.id) === '1001') u.skillLevels[sk] = "Advanced";
            else if (sk === "CSS Variables" && String(u.id) === '1001') u.skillLevels[sk] = "Advanced";
            else if (sk === "JavaScript" && String(u.id) === '1001') u.skillLevels[sk] = "Medium";
            else if (sk === "HTML" && String(u.id) === '1001') u.skillLevels[sk] = "Advanced";
            else if (sk === "JavaScript" && String(u.id) === '1002') u.skillLevels[sk] = "Advanced";
            else u.skillLevels[sk] = "Basic";
          });
          updated = true;
        }
        if (!u.course_progress) {
          u.course_progress = {
            frontend: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
            backend: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
            database: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
            creative: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
            devops: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
            system: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
            security: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
            mobile: { level: "basic", basic_score: null, medium_score: null, advanced_score: null }
          };
          updated = true;
        } else {
          if (!u.course_progress.devops) {
            u.course_progress.devops = { level: "basic", basic_score: null, medium_score: null, advanced_score: null };
            updated = true;
          }
          if (!u.course_progress.system) {
            u.course_progress.system = { level: "basic", basic_score: null, medium_score: null, advanced_score: null };
            updated = true;
          }
          if (!u.course_progress.security) {
            u.course_progress.security = { level: "basic", basic_score: null, medium_score: null, advanced_score: null };
            updated = true;
          }
          if (!u.course_progress.mobile) {
            u.course_progress.mobile = { level: "basic", basic_score: null, medium_score: null, advanced_score: null };
            updated = true;
          }
        }
      }
    });
  }

  // Schema migration for company registration statistics
  if (parsed.company_registrations) {
    parsed.company_registrations.forEach(r => {
      if (r.client_visits === undefined) {
        r.client_visits = Math.floor(Math.random() * 15) + 3;
        r.client_logs = [
          { clientName: "Google Inc.", action: "Viewed Website", timestamp: Date.now() - 3600000 * 2 },
          { clientName: "Stripe", action: "Sent Inquiry: Custom Developer Integration", timestamp: Date.now() - 3600000 * 1 }
        ];
        updated = true;
      }
    });
  }

  // Schema migration for custom contracts properties
  if (parsed.contracts) {
    parsed.contracts.forEach(c => {
      if (c.durationMonths === undefined) {
        c.durationMonths = c.id === 'cnt1' ? 3 : 1;
        c.paymentSplitType = "installments";
        c.autoPayLinked = c.id === 'cnt3';
        c.weeklyProgress = c.weeklyProgress || [];
        c.invoices = c.invoices || [];
        if (c.id === 'cnt3' && c.invoices.length === 0) {
          c.invoices.push({ invoiceNo: "INV-9821", amount: 2500, paidDate: "2026-04-07" });
        }
        updated = true;
      }
    });
  }

  if (updated || !db) {
    dbSave(parsed);
  }
  return parsed;
}

function dbSave(data) {
  try {
    const jsonStr = JSON.stringify(data);
    const encodedStr = btoa(encodeURIComponent(jsonStr));
    
    // Check storage limits (~4.5MB warning limit)
    const byteSize = new Blob([encodedStr]).size;
    if (byteSize > 4718592) {
      if (typeof showAlert === 'function') {
        showAlert('alert-container', 'Warning: Local database is approaching the 5MB limit. Please clear old data.', 'error');
      } else {
        console.warn("Warning: Local database is approaching 5MB limit.");
      }
    }
    
    localStorage.setItem('build2hire_db', encodedStr);
    localStorage.setItem('build2hire_db_backup', encodedStr);

    if (window.parent && window.parent !== window) {
      window.parent.postMessage('db_updated', '*');
    }
  } catch (e) {
    console.error("Failed to save database:", e);
  }
}

// ==========================================
// 🏢 COMPANY REGISTRATION & SOCIAL MEDIA CONTROLLER
// ==========================================

function submitCompanyRegistration(payload) {
  const db = dbGet();
  
  payload.id = Date.now();
  payload.status = "pending";
  payload.submitted_at = Date.now();
  
  db.company_registrations.unshift(payload);
  
  const user = db.users.find(u => String(u.id) === String(payload.candidate_id));
  if (user) {
    user.companyRegistrationStatus = "pending";
    user.companyRegistrationId = payload.id;
  }
  
  dbSave(db);
  
  const currentUser = getUser();
  if (currentUser && String(currentUser.id) === String(payload.candidate_id)) {
    currentUser.companyRegistrationStatus = "pending";
    currentUser.companyRegistrationId = payload.id;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
  
  return payload;
}

function approveCompanyRegistration(id) {
  const db = dbGet();
  const reg = db.company_registrations.find(r => String(r.id) === String(id));
  if (!reg) return false;
  
  reg.status = "approved";
  reg.approved_at = Date.now();
  reg.github = reg.github || "";
  reg.linkedin = reg.linkedin || "";
  reg.website = reg.website || "";
  reg.last_social_update = Date.now();
  
  const user = db.users.find(u => String(u.id) === String(reg.candidate_id));
  if (user) {
    user.companyRegistrationStatus = "approved";
    user.companyName = reg.business_name;
    user.companyRegistrationStatusChanged = true;
  }
  
  dbSave(db);
  
  const currentUser = getUser();
  if (currentUser && String(currentUser.id) === String(reg.candidate_id)) {
    currentUser.companyRegistrationStatus = "approved";
    currentUser.companyName = reg.business_name;
    currentUser.companyRegistrationStatusChanged = true;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
  
  return true;
}

function rejectCompanyRegistration(id) {
  const db = dbGet();
  const reg = db.company_registrations.find(r => String(r.id) === String(id));
  if (!reg) return false;
  
  reg.status = "rejected";
  
  const user = db.users.find(u => String(u.id) === String(reg.candidate_id));
  if (user) {
    user.companyRegistrationStatus = "rejected";
    user.companyRegistrationStatusChanged = true;
  }
  
  dbSave(db);
  
  const currentUser = getUser();
  if (currentUser && String(currentUser.id) === String(reg.candidate_id)) {
    currentUser.companyRegistrationStatus = "rejected";
    currentUser.companyRegistrationStatusChanged = true;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
  
  return true;
}

function updateSocialMediaPages(candidateId, github, linkedin, website) {
  const db = dbGet();
  const reg = db.company_registrations.find(r => String(r.candidate_id) === String(candidateId) && r.status === "approved");
  if (!reg) return false;
  
  reg.github = github;
  reg.linkedin = linkedin;
  reg.website = website;
  reg.last_social_update = Date.now();
  
  const user = db.users.find(u => String(u.id) === String(candidateId));
  if (user) {
    user.githubUrl = github;
    user.linkedinUrl = linkedin;
    user.portfolioWebsite = website;
  }
  
  dbSave(db);
  
  const currentUser = getUser();
  if (currentUser && String(currentUser.id) === String(candidateId)) {
    currentUser.githubUrl = github;
    currentUser.linkedinUrl = linkedin;
    currentUser.portfolioWebsite = website;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
  
  return true;
}

function incrementCompanyVisits(candidateId, clientName, action) {
  const db = dbGet();
  
  // Update candidate directly
  const cand = db.users.find(u => String(u.id) === String(candidateId));
  if (cand) {
    if (cand.client_visits === undefined) cand.client_visits = 0;
    if (!cand.client_logs) cand.client_logs = [];
    cand.client_visits += 1;
    cand.client_logs.unshift({
      clientName: clientName || "Anonymous Visitor",
      action: action || "Viewed Portfolio",
      timestamp: Date.now()
    });
    if (cand.client_logs.length > 20) {
      cand.client_logs = cand.client_logs.slice(0, 20);
    }
  }

  // Also update registered company details if approved
  const reg = db.company_registrations.find(r => String(r.candidate_id) === String(candidateId) && r.status === "approved");
  if (reg) {
    if (reg.client_visits === undefined) reg.client_visits = 0;
    if (!reg.client_logs) reg.client_logs = [];
    reg.client_visits += 1;
    reg.client_logs.unshift({
      clientName: clientName || "Anonymous Visitor",
      action: action || "Viewed Website",
      timestamp: Date.now()
    });
    if (reg.client_logs.length > 20) {
      reg.client_logs = reg.client_logs.slice(0, 20);
    }
  }
  
  dbSave(db);
  
  // If the currently logged in user is this candidate, sync sessionStorage
  const currentUser = getUser();
  if (currentUser && String(currentUser.id) === String(candidateId) && cand) {
    currentUser.client_visits = cand.client_visits;
    currentUser.client_logs = cand.client_logs;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
  
  return true;
}

function completeCourseLevel(candidateId, courseKey, level, score, correctAnswersCount) {
  const db = dbGet();
  const candidate = db.users.find(u => String(u.id) === String(candidateId));
  if (!candidate) return false;
  
  if (!candidate.course_progress) {
    candidate.course_progress = {
      frontend: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
      backend: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
      database: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
      creative: { level: "basic", basic_score: null, medium_score: null, advanced_score: null }
    };
  }
  
  const prog = candidate.course_progress[courseKey];
  if (!prog) return false;
  
  if (level === 'basic') {
    prog.basic_score = score;
    prog.level = "medium";
  } else if (level === 'medium') {
    prog.medium_score = score;
    prog.level = "advanced";
  } else if (level === 'advanced') {
    prog.advanced_score = score;
    prog.level = "completed";
  }
  
  if (!candidate.certificates) {
    candidate.certificates = [];
  }
  
  const courseNames = {
    frontend: "Frontend Frameworks & UI",
    backend: "Backend & API Architectures",
    database: "Database Schema & Caching",
    creative: "Creative Media & Video Editing"
  };
  const courseTitle = courseNames[courseKey] || courseKey;
  
  const levelNames = {
    basic: "Basic Level",
    medium: "Medium Level",
    advanced: "Advanced Level"
  };
  const levelTitle = levelNames[level] || level;
  
  const certId = `${courseKey}_${level}_${Date.now()}`;
  const correctCount = correctAnswersCount !== undefined ? correctAnswersCount : Math.round((score / 100) * 5);
  const newCert = {
    id: certId,
    title: `${courseTitle} - ${levelTitle} Certificate`,
    course: courseTitle,
    level: levelTitle,
    score: score,
    correct_count: correctCount,
    total_count: 5,
    xp_gained: correctCount * 100,
    date: new Date().toISOString().split('T')[0],
    authority: "Build2Hire Verification Authority"
  };
  
  candidate.certificates = candidate.certificates.filter(c => !(c.course === courseTitle && c.level === levelTitle));
  candidate.certificates.push(newCert);
  
  if (!candidate.activity_log) candidate.activity_log = [];
  candidate.activity_log.push({
    type: "assessment_complete",
    details: `Completed "${courseTitle} (${levelTitle})" assessment with score: ${score}%`,
    timestamp: new Date().toISOString()
  });

  let xpAward = correctCount * 100;
  candidate.xp_points = (candidate.xp_points || 0) + xpAward;
  candidate.assessment_score = Math.round(
    ((candidate.assessment_score || 0) * 0.4) + (score * 0.6)
  );
  
  recalculateScores(candidate);
  dbSave(db);
  
  const currentUser = getUser();
  if (currentUser && String(currentUser.id) === String(candidateId)) {
    currentUser.course_progress = candidate.course_progress;
    currentUser.certificates = candidate.certificates;
    currentUser.xp_points = candidate.xp_points;
    currentUser.level = candidate.level;
    currentUser.current_level = candidate.current_level;
    currentUser.assessment_score = candidate.assessment_score;
    currentUser.talent_score = candidate.talent_score;
    currentUser.activity_log = candidate.activity_log;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
  
  return newCert;
}

function enrollInCourse(candidateId, courseId) {
  const db = dbGet();
  const candidate = db.users.find(u => String(u.id) === String(candidateId));
  if (!candidate) return false;
  
  if (!candidate.enrolled_courses) {
    candidate.enrolled_courses = [];
  }
  
  if (candidate.enrolled_courses.some(c => c.courseId === courseId)) return false;
  
  candidate.enrolled_courses.push({
    courseId: courseId,
    enrolledDate: new Date().toISOString().split('T')[0],
    progress: 15 // Seed with 15% progress on start
  });

  if (!candidate.activity_log) candidate.activity_log = [];
  candidate.activity_log.push({
    type: "course_enroll",
    details: `Enrolled in course: "${courseId}"`,
    timestamp: new Date().toISOString()
  });
  
  dbSave(db);
  
  // Sync to session storage if current user
  const currentUser = getUser();
  if (currentUser && String(currentUser.id) === String(candidateId)) {
    currentUser.enrolled_courses = candidate.enrolled_courses;
    currentUser.activity_log = candidate.activity_log;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
  return true;
}

function withdrawFromCourse(candidateId, courseId) {
  const db = dbGet();
  const candidate = db.users.find(u => String(u.id) === String(candidateId));
  if (!candidate) return false;
  
  if (!candidate.enrolled_courses) return false;
  
  candidate.enrolled_courses = candidate.enrolled_courses.filter(c => c.courseId !== courseId);
  dbSave(db);
  
  // Sync to session storage if current user
  const currentUser = getUser();
  if (currentUser && String(currentUser.id) === String(candidateId)) {
    currentUser.enrolled_courses = candidate.enrolled_courses;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }
  return true;
}

// User helper: Fetch from database by matching session details
function getUser() {
  try {
    const session = sessionStorage.getItem('user');
    if (!session) return null;
    let sessionUser = JSON.parse(session);
    
    // Automatically correct placeholder names (e.g. John Builder) from email prefix
    if (sessionUser.fullName === "John Builder" || sessionUser.fullName === "Jane Recruiter") {
      const emailPrefix = sessionUser.email.split('@')[0];
      const derivedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      sessionUser.fullName = derivedName;
      sessionStorage.setItem('user', JSON.stringify(sessionUser));
    }

    const db = dbGet();
    let latestUser = db.users.find(u => u.email.toLowerCase() === sessionUser.email.toLowerCase());
    
    if (latestUser) {
      if (latestUser.fullName === "John Builder" || latestUser.fullName === "Jane Recruiter") {
        const emailPrefix = latestUser.email.split('@')[0];
        const derivedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
        latestUser.fullName = derivedName;
        dbSave(db);
      }
      if (!latestUser.enrolled_courses) {
        latestUser.enrolled_courses = [];
        dbSave(db);
      }
    }
    
    if (!latestUser) {
      // Sync real API user into mock DB for gamification logic
      const newUser = { ...sessionUser };
      if (newUser.role === 'candidate') {
        newUser.xp_points = newUser.xp_points || 0;
        newUser.level = newUser.level || 1;
        newUser.talent_score = newUser.talent_score || 0;
        newUser.portfolio_score = newUser.portfolio_score || 0;
        newUser.challenge_score = newUser.challenge_score || 0;
        newUser.assessment_score = newUser.assessment_score || 0;
        newUser.projects = newUser.projects || [];
        newUser.skills = newUser.skills || [];
        newUser.skillLevels = newUser.skillLevels || {};
        newUser.enrolled_courses = [];
        newUser.course_progress = {
          frontend: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
          backend: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
          database: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
          creative: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
          devops: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
          system: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
          security: { level: "basic", basic_score: null, medium_score: null, advanced_score: null },
          mobile: { level: "basic", basic_score: null, medium_score: null, advanced_score: null }
        };
        newUser.profileCompleted = false;
      }
      db.users.push(newUser);
      dbSave(db);
      return newUser;
    }

    return latestUser;
  } catch { return null; }
}

// Authentication and DB Setup Middleware
function withAuth(allowedRoles = ['candidate', 'recruiter', 'admin']) {
  const user = getUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  
  // Always allow admin access to any page
  if (user.role !== 'admin' && !allowedRoles.includes(user.role)) {
    if (user.role === 'recruiter') window.location.href = "recruiter-dashboard.html";
    else window.location.href = "portfolio.html";
    return null;
  }
  
  if (window.self !== window.top) {
    const style = document.createElement('style');
    style.innerHTML = `
      header.navbar, aside.sidebar, #main-nav, #main-sidebar { display: none !important; }
      .dashboard-layout { display: block !important; margin: 0 !important; padding: 0 !important; }
      main.main-content { margin-left: 0 !important; padding: 1rem !important; }
    `;
    document.head.appendChild(style);
  } else {
    renderHeader();
    const path = window.location.pathname.split('/').pop() || "index.html";
    if (typeof renderSidebar === 'function') {
      const sidebar = document.getElementById('main-sidebar');
      if (sidebar) renderSidebar(path);
    }
  }
  
  const db = dbGet();
  let candidate = db.users.find(u => String(u.id) === String(user.id));
  if (!candidate) candidate = user;

  // Resolve candidate selection override for admin
  const urlParams = new URLSearchParams(window.location.search);
  const adminViewCandidateId = urlParams.get('candidateId');
  if (adminViewCandidateId && user.role === 'admin') {
    const foundCand = db.users.find(u => String(u.id) === String(adminViewCandidateId));
    if (foundCand) {
      candidate = foundCand;
    }
  }
  
  return { user, db, candidate };
}

// Global dynamic recalculations for XP / level / score
function recalculateScores(cand) {
  // Talent Score formula: 40% Portfolio + 40% Challenge + 20% Quiz
  const pScore = cand.portfolio_score || 0;
  const cScore = cand.challenge_score || 0;
  const qScore = cand.assessment_score || 0;
  cand.talent_score = Math.round((pScore * 0.40) + (cScore * 0.40) + (qScore * 0.20));

  // Determine Level from cumulative XP
  // Level 1: 0 - 1000 XP
  // Level 2: 1001 - 2500 XP
  // Level 3: 2501 - 4000 XP
  // Level 4: 4001+ XP
  const oldLevel = cand.level || 1;
  let newLevel = 1;
  if (cand.xp_points > 4000) newLevel = 4;
  else if (cand.xp_points > 2500) newLevel = 3;
  else if (cand.xp_points > 1000) newLevel = 2;

  cand.level = newLevel;

  let levelNames = ["Beginner Builder", "Skilled Builder", "Master Builder", "Elite Talent"];
  cand.current_level = levelNames[newLevel - 1] || "Beginner Builder";

  return oldLevel !== newLevel; // Returns true if level up occurred
}

// ==========================================
// 🎉 VISUAL CELEBRATIONS & ASYNC UTILS
// ==========================================

function loadConfetti() {
  if (window.confetti) return;
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  script.async = true;
  script.onload = () => {
    console.log("Confetti library loaded successfully.");
  };
  document.head.appendChild(script);
}

function triggerConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}

// ==========================================
// 🌙 THEME MANAGEMENT
// ==========================================

function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  // Defer slightly to ensure DOM is fully rendered
  setTimeout(() => { updateThemeUI(saved); }, 50);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeUI(theme);
}

function updateThemeUI(theme) {
  const btnLight = document.getElementById('theme-btn-light');
  const btnDark = document.getElementById('theme-btn-dark');
  if (btnLight && btnDark) {
    if (theme === 'light') {
      btnLight.style.backgroundColor = 'var(--primary)';
      btnLight.style.color = '#ffffff';
      btnLight.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
      btnDark.style.backgroundColor = 'transparent';
      btnDark.style.color = 'var(--text-secondary)';
      btnDark.style.boxShadow = 'none';
    } else {
      btnDark.style.backgroundColor = 'var(--primary)';
      btnDark.style.color = '#ffffff';
      btnDark.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
      btnLight.style.backgroundColor = 'transparent';
      btnLight.style.color = 'var(--text-secondary)';
      btnLight.style.boxShadow = 'none';
    }
  }

  const mBtnLight = document.getElementById('m-theme-btn-light');
  const mBtnDark = document.getElementById('m-theme-btn-dark');
  if (mBtnLight && mBtnDark) {
    if (theme === 'light') {
      mBtnLight.style.backgroundColor = 'var(--primary)';
      mBtnLight.style.color = '#ffffff';
      mBtnDark.style.backgroundColor = 'var(--bg-tertiary)';
      mBtnDark.style.color = 'var(--text-secondary)';
    } else {
      mBtnDark.style.backgroundColor = 'var(--primary)';
      mBtnDark.style.color = '#ffffff';
      mBtnLight.style.backgroundColor = 'var(--bg-tertiary)';
      mBtnLight.style.color = 'var(--text-secondary)';
    }
  }
}

// ==========================================
// 📱 MOBILE DRAWER CONTROLLER
// ==========================================

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-menu-drawer');
  const burgerBtn = document.getElementById('burger-menu-btn');
  if (drawer) {
    drawer.classList.toggle('active');
    const isActive = drawer.classList.contains('active');
    if (burgerBtn) burgerBtn.textContent = isActive ? '✕' : '☰';
  }
}

// ==========================================
// 🏁 HEADER RENDERING (Global Navigation)
// ==========================================

function renderHeader() {
  dbGet(); // Ensure database gets seeded on any page load
  loadConfetti(); // Asynchronously pull confetti library

  const user = getUser();
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const dashboardPage = user
    ? (user.role === 'admin' ? 'admin-dashboard.html' : (user.role === 'recruiter' ? 'recruiter-dashboard.html' : 'portfolio.html'))
    : 'login.html';

  const userControls = user
    ? `<a href="${dashboardPage}" class="btn btn-secondary" style="padding:0.5rem 1rem;font-size:0.85rem;">👤 ${user.fullName || 'Dashboard'}</a>
       <button onclick="handleLogout()" class="btn" style="padding:0.5rem 1rem;font-size:0.85rem;border:1px solid var(--danger);color:var(--danger);background:transparent;">Logout</button>`
    : `<a href="login.html" class="nav-link" style="font-size:0.95rem;">Sign In</a>
       <a href="register.html" class="btn btn-primary" style="padding:0.5rem 1.25rem;font-size:0.9rem;">Get Started</a>`;

  const homeLink = user ? dashboardPage : 'index.html';

  nav.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <a href="${homeLink}" onclick="window.handleLogoClick(event, '${homeLink}')" ondblclick="window.openAdminLoginModal()" title="Double click for Management Login" style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); text-decoration: none; letter-spacing: -0.02em;">
        Build2<span style="color: var(--primary);">Hire</span>
      </a>
    </div>
    
    <!-- DESKTOP NAV -->
    <nav class="desktop-nav" style="display:flex;align-items:center;gap:1.5rem;">
      <ul class="nav-links">
        <li><a href="${homeLink}" class="nav-link">Home</a></li>
        
        ${user && user.role === 'candidate' 
          ? (user.assessment_score > 0 
              ? '<li><a href="leaderboard.html" class="nav-link">🏆 Leaderboard</a></li>' 
              : '<li><a href="leaderboard.html" class="nav-link" style="color:var(--text-secondary);" title="Take an assessment to unlock">🔒 Leaderboard</a></li>')
          : '<li><a href="leaderboard.html" class="nav-link">Leaderboard</a></li>'
        }

        ${user && user.role === 'candidate' ? '<li><a href="jobs.html" class="nav-link">Job Portal</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="freelance.html" class="nav-link">🚀 Freelance Hub</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="recommendations.html" class="nav-link">📚 Learners</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="quiz.html" class="nav-link">⚡ Quizzes</a></li>' : ''}
        ${user && user.role === 'admin' ? '<li><a href="admin-dashboard.html" class="nav-link" style="color:var(--primary); font-weight:700;">⚙️ Admin Control</a></li>' : ''}
      </ul>
      <div style="display:flex;align-items:center;gap:1rem;">
        <div class="theme-switch" style="display: inline-flex; align-items: center; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 20px; padding: 2px; cursor: pointer; user-select: none;">
          <span id="theme-btn-light" onclick="setTheme('light')" style="padding: 0.25rem 0.5rem; border-radius: 15px; font-size: 0.95rem; line-height: 1; transition: all 0.2s;">☀️</span>
          <span id="theme-btn-dark" onclick="setTheme('dark')" style="padding: 0.25rem 0.5rem; border-radius: 15px; font-size: 0.95rem; line-height: 1; transition: all 0.2s;">🌙</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;">
          ${userControls}
        </div>
      </div>
    </nav>

    <!-- MOBILE BURGER BUTTON -->
    <button class="burger-menu-btn" id="burger-menu-btn" onclick="toggleMobileMenu()">☰</button>

    <!-- MOBILE DRAWER MENU -->
    <div class="mobile-menu-drawer" id="mobile-menu-drawer">
      <div style="padding: 1.5rem; border-bottom: 1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
        <strong style="font-family:var(--font-display); font-size:1.4rem; color:var(--primary);">Build2Hire</strong>
      </div>
      <ul style="list-style:none; padding: 1.5rem; display:flex; flex-direction:column; gap:1.5rem; font-size:1.1rem;">
        <li><a href="${homeLink}" onclick="toggleMobileMenu()">🏠 Home</a></li>
        ${user && user.role === 'candidate' 
          ? (user.assessment_score > 0 
              ? '<li><a href="leaderboard.html" onclick="toggleMobileMenu()">🏆 Leaderboard</a></li>' 
              : '<li><a href="leaderboard.html" onclick="toggleMobileMenu()" style="color:var(--text-secondary);">🔒 Leaderboard</a></li>')
          : '<li><a href="leaderboard.html" onclick="toggleMobileMenu()">🏆 Leaderboard</a></li>'
        }
        ${user && user.role === 'candidate' ? '<li><a href="jobs.html" onclick="toggleMobileMenu()">💼 Job Portal</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="freelance.html" onclick="toggleMobileMenu()">🚀 Freelance Hub</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="quiz.html" onclick="toggleMobileMenu()">⚡ Quizzes</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="recommendations.html" onclick="toggleMobileMenu()">📚 Learners</a></li>' : ''}
        ${user && user.role === 'admin' ? '<li><a href="admin-dashboard.html" onclick="toggleMobileMenu()">⚙️ Admin Dashboard</a></li>' : ''}
        ${user ? `<li><a href="${dashboardPage}" onclick="toggleMobileMenu()">👤 Dashboard (${user.role})</a></li>` : ''}
        <li style="border-top:1px solid var(--border-color); padding-top:1.5rem; display:flex; flex-direction:column; gap:1rem;">
          <div style="display: flex; gap: 0.5rem; width: 100%;">
            <button id="m-theme-btn-light" onclick="setTheme('light')" class="btn btn-secondary" style="flex: 1; padding: 0.5rem; font-size: 0.85rem; border: 1px solid var(--border-color);">☀️ Light</button>
            <button id="m-theme-btn-dark" onclick="setTheme('dark')" class="btn btn-secondary" style="flex: 1; padding: 0.5rem; font-size: 0.85rem; border: 1px solid var(--border-color);">🌙 Dark</button>
          </div>
          ${user 
            ? `<button onclick="handleLogout()" class="btn btn-danger" style="width:100%;">Logout</button>`
            : `<a href="login.html" class="btn btn-secondary" style="width:100%;">Sign In</a>
               <a href="register.html" class="btn btn-primary" style="width:100%;">Get Started</a>`
          }
        </li>
      </ul>
    </div>
  `;

  initTheme();
}

let logoClickTimeout = null;
window.handleLogoClick = function(event, homeLink) {
  event.preventDefault();
  if (logoClickTimeout) {
    clearTimeout(logoClickTimeout);
    logoClickTimeout = null;
    return; // It's a double click! Cancel standard navigation.
  }
  
  logoClickTimeout = setTimeout(() => {
    window.location.href = homeLink;
    logoClickTimeout = null;
  }, 250); // Delay slightly to await double click
};

window.openAdminLoginModal = function() {
  // Check if modal already exists, if not, create it
  let modal = document.getElementById('admin-secret-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'admin-secret-modal';
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter:blur(5px);";
    modal.innerHTML = `
      <div style="background:var(--bg-secondary); border:1px solid var(--border-color); padding:2rem; border-radius:12px; width:100%; max-width:400px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
        <h3 style="font-family:var(--font-display); color:var(--primary); font-size:1.4rem; margin-bottom:0.5rem; text-align:center;">🔑 Management Sign In</h3>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem; text-align:center;">Enter credential to access Build2Hire administration panel.</p>
        
        <div style="text-align:left; margin-bottom:1.25rem;">
          <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:0.5rem; color:var(--text-primary);">Management Password</label>
          <input type="password" id="admin-secret-pwd" style="width:100%; padding:0.6rem 0.75rem; border-radius:6px; background:var(--bg-tertiary); border:1px solid var(--border-color); color:var(--text-primary); font-size:0.9rem;" placeholder="Enter admin password">
        </div>
        
        <div style="display:flex; gap:0.75rem; justify-content:flex-end; margin-top:1.5rem;">
          <button onclick="document.getElementById('admin-secret-modal').remove()" class="btn btn-secondary" style="padding:0.5rem 1rem; border-radius:6px; font-size:0.85rem; cursor:pointer;">Cancel</button>
          <button onclick="window.submitSecretAdminLogin()" class="btn btn-primary" style="padding:0.5rem 1.25rem; border-radius:6px; font-size:0.85rem; font-weight:600; cursor:pointer;">Sign In</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add enter key support
    document.getElementById('admin-secret-pwd').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') window.submitSecretAdminLogin();
    });
  }
  document.getElementById('admin-secret-pwd').focus();
};

window.submitSecretAdminLogin = function() {
  const pwd = document.getElementById('admin-secret-pwd').value;
  if (pwd === 'admin123' || pwd === 'admin') {
    // Perform simulated admin login
    const email = "admin@build2hire.com";
    const db = dbGet();
    let adminUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!adminUser) {
      adminUser = {
        id: 1002,
        email: email,
        fullName: "Admin User",
        role: "admin",
        xp_points: 9999,
        talent_score: 100
      };
      db.users.push(adminUser);
      dbSave(db);
    }
    
    // Log session
    sessionStorage.setItem('user', JSON.stringify(adminUser));
    
    // Remove modal
    document.getElementById('admin-secret-modal').remove();
    
    alert("Welcome, Admin! Logging into Build2Hire Management System...");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Invalid management credentials! Access Denied.");
  }
};

// Render Sidebar (App Shell)
function renderSidebar(activePage) {
  const sidebar = document.getElementById('main-sidebar');
  if (!sidebar) return;

  const user = getUser();
  if (!user) return;

  if (user.role === 'admin') {
    const activeTab = new URLSearchParams(window.location.search).get('tab') || 'overview';
    const isDashboard = activePage === 'admin-dashboard.html';

    sidebar.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); padding-left: 1rem; margin-bottom: 0.5rem; letter-spacing: 0.1em;">
            Admin Workspace
          </p>
          <ul class="sidebar-menu">
            <li>
              <a href="admin-dashboard.html?tab=overview" class="sidebar-link ${isDashboard && activeTab === 'overview' ? 'active' : ''}">
                📊 <span>Overview</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=candidates" class="sidebar-link ${isDashboard && activeTab === 'candidates' ? 'active' : ''}">
                👥 <span>Manage Candidates</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=recruiters" class="sidebar-link ${isDashboard && activeTab === 'recruiters' ? 'active' : ''}">
                💼 <span>Manage Recruiters</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=companies" class="sidebar-link ${isDashboard && activeTab === 'companies' ? 'active' : ''}">
                🏢 <span>Manage Companies</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=jobs" class="sidebar-link ${isDashboard && activeTab === 'jobs' ? 'active' : ''}">
                📑 <span>Manage Jobs</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=applications" class="sidebar-link ${isDashboard && activeTab === 'applications' ? 'active' : ''}">
                📋 <span>Applications</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=interviews" class="sidebar-link ${isDashboard && activeTab === 'interviews' ? 'active' : ''}">
                🤝 <span>Interviews</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=assessments" class="sidebar-link ${isDashboard && activeTab === 'assessments' ? 'active' : ''}">
                🎯 <span>Assessments</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=gigs" class="sidebar-link ${isDashboard && activeTab === 'gigs' ? 'active' : ''}">
                ⚡ <span>Freelance Gigs</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=payments" class="sidebar-link ${isDashboard && activeTab === 'payments' ? 'active' : ''}">
                💳 <span>Payments</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=reports" class="sidebar-link ${isDashboard && activeTab === 'reports' ? 'active' : ''}">
                📈 <span>Reports & Analytics</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=notifications" class="sidebar-link ${isDashboard && activeTab === 'notifications' ? 'active' : ''}">
                🔔 <span>Notifications</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=settings" class="sidebar-link ${isDashboard && activeTab === 'settings' ? 'active' : ''}">
                ⚙️ <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=activity" class="sidebar-link ${isDashboard && activeTab === 'activity' ? 'active' : ''}">
                📜 <span>Activity Logs</span>
              </a>
            </li>
            <li style="margin-top:0.5rem; border-top:1px solid var(--border-color); padding-top:0.5rem;">
              <a href="leaderboard.html" class="sidebar-link ${activePage === 'leaderboard.html' ? 'active' : ''}">
                🏆 <span>Leaderboard</span>
              </a>
            </li>
          </ul>
        </div>

        <div style="padding: 0.75rem; background-color: var(--bg-tertiary); border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
          <p style="font-size: 0.7rem; font-weight: 600; color: var(--text-secondary);">System Role</p>
          <p id="user-role-badge" style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-top: 0.2rem;">System Administrator</p>
        </div>
      </div>
    `;
    return;
  }

  if (user.role === 'recruiter') {
    menuHTML = `
      <li>
        <a href="recruiter-dashboard.html" class="sidebar-link ${activePage === 'recruiter-dashboard.html' ? 'active' : ''}">
          💼 <span>Hiring Board</span>
        </a>
      </li>
      <li>
        <a href="agreement-builder.html" class="sidebar-link ${activePage === 'agreement-builder.html' ? 'active' : ''}">
          🤝 <span>Agreement Builder</span>
        </a>
      </li>
      <li>
        <a href="chat.html" class="sidebar-link ${activePage === 'chat.html' ? 'active' : ''}">
          💬 <span>Inbox & Meetings</span>
        </a>
      </li>
      <li>
        <a href="leaderboard.html" class="sidebar-link ${activePage === 'leaderboard.html' ? 'active' : ''}">
          🏆 <span>Leaderboard</span>
        </a>
      </li>
    `;

    sidebar.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); padding-left: 1rem; margin-bottom: 0.75rem; letter-spacing: 0.1em;">
            Workspace
          </p>
          <ul class="sidebar-menu">
            ${menuHTML}
          </ul>
        </div>

        <div style="padding: 1rem; background-color: var(--bg-tertiary); border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
          <p style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Logged in as</p>
          <p id="user-role-badge" style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: capitalize; margin-top: 0.25rem;">${user.role}</p>
        </div>
      </div>
    `;
    return;
  }

  sidebar.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <!-- HOME -->
      <div>
        <p style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); padding-left: 1rem; margin-bottom: 0.75rem; letter-spacing: 0.1em;">
          Home
        </p>
        <ul class="sidebar-menu">
          <li>
            <a href="portfolio.html" class="sidebar-link ${activePage === 'portfolio.html' ? 'active' : ''}">
              👤 <span>My Portfolio</span>
            </a>
          </li>
          <li>
            <a href="candidate-dashboard.html" class="sidebar-link ${activePage === 'candidate-dashboard.html' ? 'active' : ''}">
              📊 <span>Freelancer Analytics</span>
            </a>
          </li>
          <li>
            <a href="chat.html" class="sidebar-link ${activePage === 'chat.html' ? 'active' : ''}">
              💬 <span>Inbox & Meetings</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- OPPORTUNITIES -->
      <div>
        <p style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); padding-left: 1rem; margin-bottom: 0.75rem; letter-spacing: 0.1em;">
          Opportunities
        </p>
        <ul class="sidebar-menu">
          <li>
            <a href="jobs.html" class="sidebar-link ${activePage === 'jobs.html' ? 'active' : ''}">
              💼 <span>Full-Time Jobs</span>
            </a>
          </li>
          <li>
            <a href="freelance.html" class="sidebar-link ${activePage === 'freelance.html' ? 'active' : ''}">
              🚀 <span>Freelance Gigs</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- ACADEMY & SKILLS -->
      <div>
        <p style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); padding-left: 1rem; margin-bottom: 0.75rem; letter-spacing: 0.1em;">
          Academy
        </p>
        <ul class="sidebar-menu">
          <li>
            <a href="recommendations.html" class="sidebar-link ${activePage === 'recommendations.html' ? 'active' : ''}">
              📚 <span>Learning Roadmaps</span>
            </a>
          </li>
          <li>
            <a href="quiz.html" class="sidebar-link ${activePage === 'quiz.html' ? 'active' : ''}">
              ⚡ <span>Assessments</span>
            </a>
          </li>
          <li>
            <a href="leaderboard.html" class="sidebar-link ${activePage === 'leaderboard.html' ? 'active' : ''}">
              🏆 <span>Leaderboard</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- USER STATS -->
    <div style="padding: 1rem; background-color: var(--bg-tertiary); border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
      <p style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);">Logged in as</p>
      <p id="user-role-badge" style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: capitalize; margin-top: 0.25rem; margin-bottom: 0.75rem;">${user.role}</p>
      
      <div style="border-top: 1px solid var(--border-color); padding-top: 0.75rem; text-align: left;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600;">
          <span id="level-name" style="color: var(--text-primary);">Beginner Builder</span>
          <span style="color: var(--primary);">Lvl <span id="level-num">1</span></span>
        </div>
        <div class="xp-bar-container">
          <div id="xp-bar-fill" class="xp-bar-fill"></div>
        </div>
        <p style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem; text-align: right;"><span id="xp-current">0</span> XP</p>
      </div>
    </div>
  `;
}

// Logout
function handleLogout() {
  clearAutoLogoutTimers();
  sessionStorage.removeItem('user');
  window.location.href = 'login.html';
}

// Show alert message
function showAlert(containerId, message, type = 'error') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="alert alert-${type}">${type === 'success' ? '✅' : '⚠️'} ${message}</div>`;
}

// ==========================================
// ⏱️ AUTO-LOGOUT (Inactivity Timer)
// ==========================================

const AUTO_LOGOUT_MINUTES = 15;       // Log out after N minutes of inactivity
const AUTO_LOGOUT_WARNING_SECS = 30;  // Show warning N seconds before logout

let _autoLogoutTimer = null;
let _autoLogoutCountdownTimer = null;
let _autoLogoutToast = null;

function clearAutoLogoutTimers() {
  clearTimeout(_autoLogoutTimer);
  clearInterval(_autoLogoutCountdownTimer);
  if (_autoLogoutToast) {
    _autoLogoutToast.remove();
    _autoLogoutToast = null;
  }
}

function doAutoLogout() {
  clearAutoLogoutTimers();
  sessionStorage.removeItem('user');

  // Show a brief "Session expired" flash before redirect
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; z-index: 99999;
    background: linear-gradient(90deg, #ef4444, #f97316);
    color: white; text-align: center; padding: 0.85rem 1rem;
    font-size: 0.92rem; font-weight: 700; letter-spacing: 0.02em;
    box-shadow: 0 2px 12px rgba(239,68,68,0.4);
  `;
  flash.textContent = '🔒 Session expired due to inactivity. Redirecting to login…';
  document.body.appendChild(flash);

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1500);
}

function showAutoLogoutWarning() {
  if (_autoLogoutToast) return; // Already showing

  let secondsLeft = AUTO_LOGOUT_WARNING_SECS;

  _autoLogoutToast = document.createElement('div');
  _autoLogoutToast.id = 'auto-logout-toast';
  _autoLogoutToast.style.cssText = `
    position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
    z-index: 9999; background: var(--bg-secondary, #1e1e2e);
    border: 1px solid #f97316; border-radius: 12px;
    padding: 1.1rem 1.5rem; display: flex; align-items: center; gap: 1rem;
    box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.3);
    min-width: 320px; max-width: 94vw; animation: slideUp 0.35s ease;
    font-family: var(--font-body, Inter, sans-serif);
  `;

  _autoLogoutToast.innerHTML = `
    <span style="font-size:1.5rem; flex-shrink:0;">⏱️</span>
    <div style="flex:1; min-width:0;">
      <strong style="font-size:0.92rem; color:#f97316; display:block; margin-bottom:0.2rem;">
        Session expiring soon
      </strong>
      <span id="auto-logout-msg" style="font-size:0.8rem; color: #94a3b8;">
        You will be logged out in <strong id="auto-logout-countdown" style="color:#f97316;">${secondsLeft}s</strong> due to inactivity.
      </span>
    </div>
    <button
      id="auto-logout-stay-btn"
      onclick="resetAutoLogoutTimer()"
      style="
        flex-shrink:0; background: linear-gradient(135deg,#6366f1,#8b5cf6);
        color:white; border:none; border-radius:8px; padding:0.45rem 1rem;
        font-size:0.8rem; font-weight:700; cursor:pointer; white-space:nowrap;
      "
    >Stay Logged In</button>
  `;

  document.body.appendChild(_autoLogoutToast);

  // Tick countdown every second
  _autoLogoutCountdownTimer = setInterval(() => {
    secondsLeft--;
    const el = document.getElementById('auto-logout-countdown');
    if (el) el.textContent = `${secondsLeft}s`;

    if (secondsLeft <= 0) {
      clearInterval(_autoLogoutCountdownTimer);
      doAutoLogout();
    }
  }, 1000);
}

function resetAutoLogoutTimer() {
  clearAutoLogoutTimers();

  const warningDelay = (AUTO_LOGOUT_MINUTES * 60 - AUTO_LOGOUT_WARNING_SECS) * 1000;

  _autoLogoutTimer = setTimeout(() => {
    showAutoLogoutWarning();
  }, warningDelay);
}

function initAutoLogout() {
  // Skip on public pages
  const publicPages = ['index.html', 'login.html', 'register.html'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (publicPages.includes(currentPage)) return;

  // Only activate if a user is logged in
  const user = getUser();
  if (!user) return;

  // Listen for any user activity
  const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
  activityEvents.forEach(evt => {
    window.addEventListener(evt, resetAutoLogoutTimer, { passive: true });
  });

  // Start the timer immediately
  resetAutoLogoutTimer();
}

// ==========================================
// 🔄 REFRESH → HOME PAGE REDIRECT
// ==========================================

function initRefreshRedirect() {
  // Disabled: Keep user session logged in on page refresh/reload
  return;
}

// Helper to decode JWT tokens (used for Google Sign-In)
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Run refresh check immediately (before DOM is fully ready)
// initRefreshRedirect();

function downloadCertificateHelper(candidateName, courseTitle, scorePct) {
  const certId = `B2H-${Math.floor(100000 + Math.random() * 900000)}-${String(scorePct)}`;
  const dateString = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const printWindow = window.open('', '_blank', 'width=900,height=650');
  
  printWindow.document.write(`
    <html>
    <head>
      <title>Certificate of Completion - ${candidateName}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Montserrat:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Montserrat', sans-serif;
          background-color: #f1f5f9;
          color: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .cert-border-outer {
          width: 850px;
          height: 600px;
          padding: 24px;
          background-color: #ffffff;
          border: 16px solid #0f172a;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          box-sizing: border-box;
          background-image: radial-gradient(circle, #fbfbfb 0%, #f7f7f7 100%);
        }
        .cert-border-inner {
          width: 100%;
          height: 100%;
          border: 4px solid #b45309;
          padding: 2.5rem;
          box-sizing: border-box;
          position: relative;
          text-align: center;
        }
        .cert-header {
          margin-top: 0.5rem;
        }
        .cert-logo {
          font-weight: 800;
          font-size: 1.4rem;
          color: #0f172a;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .cert-logo span {
          color: #b45309;
        }
        .cert-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0.5rem 0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cert-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: #475569;
          margin-bottom: 1.5rem;
        }
        .cert-name {
          font-family: 'Alex Brush', cursive;
          font-size: 3.8rem;
          color: #b45309;
          margin: 0.5rem 0;
          font-weight: 400;
          line-height: 1;
        }
        .cert-divider {
          width: 250px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #b45309, transparent);
          margin: 0 auto 1.5rem auto;
        }
        .cert-description {
          font-size: 0.95rem;
          color: #334155;
          max-width: 580px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.6;
        }
        .cert-description strong {
          color: #0f172a;
        }
        .cert-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 1rem;
          padding: 0 1.5rem;
        }
        .signature-block {
          text-align: center;
          width: 200px;
        }
        .signature-line {
          border-top: 2px solid #94a3b8;
          margin-top: 0.5rem;
          padding-top: 0.25rem;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          font-weight: 700;
        }
        .signature-pic {
          font-family: 'Alex Brush', cursive;
          font-size: 1.8rem;
          color: #1e3a8a;
          margin-bottom: -0.25rem;
          user-select: none;
        }
        .badge-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .cert-badge {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, #f59e0b 0%, #b45309 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #ffffff;
          box-shadow: 0 4px 10px rgba(180, 83, 9, 0.3);
          color: white;
          font-size: 1.8rem;
          z-index: 2;
        }
        .ribbon-left, .ribbon-right {
          width: 15px;
          height: 50px;
          background-color: #b45309;
          position: absolute;
          top: 55px;
          z-index: 1;
        }
        .ribbon-left {
          transform: rotate(20deg);
          left: 20px;
        }
        .ribbon-right {
          transform: rotate(-20deg);
          right: 20px;
        }
        .verification-info {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.65rem;
          color: #94a3b8;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 600;
        }
        @media print {
          body {
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .cert-border-outer {
            box-shadow: none;
            border: 16px solid #0f172a !important;
            background-image: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="cert-border-outer">
        <div class="cert-border-inner">
          <div class="cert-header">
            <div class="cert-logo">Build<span>2</span>Hire</div>
            <div class="cert-title">Certificate of Completion</div>
            <div class="cert-subtitle">This verified credential is proudly presented to</div>
          </div>
          
          <div class="cert-name">${candidateName}</div>
          <div class="cert-divider"></div>
          
          <div class="cert-description">
            For successfully completing all advanced technical assessment modules for <br>
            <strong>${courseTitle}</strong> with a verified passing score of <strong>${scorePct}%</strong>.
          </div>
          
          <div class="cert-footer">
            <div class="signature-block">
              <div class="signature-pic">Build2Hire AI</div>
              <div class="signature-line">Authority</div>
            </div>
            
            <div class="badge-container">
              <div class="cert-badge">🏆</div>
              <div class="ribbon-left"></div>
              <div class="ribbon-right"></div>
            </div>
            
            <div class="signature-block">
              <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; color: #0f172a;">${dateString}</div>
              <div class="signature-line">Date Issued</div>
            </div>
          </div>
          
          <div class="verification-info">
            Verification ID: ${certId} &bull; Security Secured &bull; verify.build2hire.com
          </div>
        </div>
      </div>
      <script>
        window.onload = function() {
          window.print();
          setTimeout(() => { window.close(); }, 500);
        }
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// Kick off auto-logout on every page load
document.addEventListener('DOMContentLoaded', initAutoLogout);


// Self-Healing DB Trigger: Wipes empty or corrupted database cache to force re-seeding
try {
  const rawDb = localStorage.getItem('build2hire_db');
  if (rawDb) {
    const testParse = dbParse(rawDb);
    if (!testParse || !testParse.challenges || testParse.challenges.length === 0 || !testParse.users || testParse.users.length === 0 || !testParse.jobs || testParse.jobs.length === 0) {
      localStorage.removeItem('build2hire_db');
      console.warn("Corrupted/empty database cache detected and auto-wiped.");
    }
  }
} catch (e) {
  localStorage.removeItem('build2hire_db');
}

function logUserActivity(userId, activityType, details) {
  const db = dbGet();
  const user = db.users.find(u => String(u.id) === String(userId));
  if (user) {
    if (!user.activity_log) user.activity_log = [];
    user.activity_log.push({
      type: activityType,
      details: details,
      timestamp: new Date().toISOString()
    });
    dbSave(db);
    
    const curUser = getUser();
    if (curUser && String(curUser.id) === String(userId)) {
      curUser.activity_log = user.activity_log;
      sessionStorage.setItem('user', JSON.stringify(curUser));
    }
  }
}

// ==========================================
// 💬 CHAT & LIVE MEETINGS HELPERS
// ==========================================

function startConversation(clientId, clientName, companyName, clientPhone, candidateId, candidateName) {
  const db = dbGet();
  if (!db.conversations) db.conversations = [];
  
  let conv = db.conversations.find(c => String(c.clientId) === String(clientId) && String(c.candidateId) === String(candidateId));
  if (!conv) {
    conv = {
      id: "c_" + Date.now(),
      clientId: clientId,
      clientName: clientName,
      companyName: companyName || "Build2Hire Client",
      clientPhone: clientPhone || "+1 (555) 019-2834",
      candidateId: candidateId,
      candidateName: candidateName,
      messages: [],
      lastUpdated: Date.now()
    };
    db.conversations.push(conv);
    dbSave(db);
  }
  return conv;
}

function sendMessage(convId, senderId, text) {
  const db = dbGet();
  const conv = db.conversations.find(c => String(c.id) === String(convId));
  if (!conv) return null;
  
  const sender = db.users.find(u => String(u.id) === String(senderId));
  const senderName = sender ? sender.fullName : (String(senderId) === String(conv.clientId) ? conv.clientName : conv.candidateName);
  
  const newMsg = {
    senderId: senderId,
    senderName: senderName,
    text: text,
    timestamp: Date.now()
  };
  
  conv.messages.push(newMsg);
  conv.lastUpdated = Date.now();
  dbSave(db);
  
  return newMsg;
}

function createMeeting(convId, schedulerId, topic, date, time) {
  const db = dbGet();
  const conv = db.conversations.find(c => String(c.id) === String(convId));
  if (!conv) return null;
  
  const newMeet = {
    id: "meet_" + Date.now(),
    convId: convId,
    schedulerId: schedulerId,
    topic: topic,
    scheduledDate: date,
    scheduledTime: time,
    status: "scheduled", // scheduled, active, completed
    duration: null,
    recordingUrl: null,
    transcript: null,
    clientId: conv.clientId,
    clientName: conv.clientName,
    candidateId: conv.candidateId,
    candidateName: conv.candidateName
  };
  
  if (!db.meetings) db.meetings = [];
  db.meetings.push(newMeet);
  dbSave(db);
  
  // Append a notification message in the chat
  sendMessage(convId, 1000, `🤝 Live Meeting Scheduled! Topic: "${topic}" on ${date} at ${time}. [Join Room](meeting-room.html?id=${newMeet.id})`);
  
  return newMeet;
}

function saveMeetingRecording(meetingId, duration, recordingUrl, transcript) {
  const db = dbGet();
  if (!db.meetings) db.meetings = [];
  
  const meet = db.meetings.find(m => String(m.id) === String(meetingId));
  if (!meet) return false;
  
  meet.status = "completed";
  meet.duration = duration;
  meet.recordingUrl = recordingUrl || "mock_recording_" + meetingId + ".mp4";
  meet.transcript = transcript || ["Hello, testing meeting recording."];
  meet.completedAt = Date.now();
  
  dbSave(db);
  
  // Send recording link in chat
  sendMessage(meet.convId, 1000, `🎥 Live Meeting Ended. Recording is ready! Duration: ${duration}. [Play Recording](meeting-room.html?id=${meetingId}&play=true)`);
  
  return true;
}

function generateJobReport(candidateId, period = "monthly") {
  const db = dbGet();
  const contracts = db.contracts ? db.contracts.filter(c => String(c.candidateId) === String(candidateId)) : [];
  
  // Grouping by date
  let completedCount = 0;
  let activeCount = 0;
  let totalEarnings = 0;
  let details = [];
  
  contracts.forEach(c => {
    let completedMilestones = c.milestones.filter(m => m.status === 'completed').length;
    let totalMilestones = c.milestones.length;
    let completionPct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
    
    if (c.status === "completed") {
      completedCount++;
      totalEarnings += c.amount || 0;
    } else {
      activeCount++;
      // Partial earnings from completed milestones
      c.milestones.forEach(m => {
        if (m.status === 'completed') {
          totalEarnings += Math.round((c.amount || 0) * (m.weight / 100));
        }
      });
    }
    
    details.push({
      title: c.title,
      company: c.company,
      status: c.status,
      milestonesCompleted: `${completedMilestones}/${totalMilestones}`,
      completionPct: completionPct,
      amount: c.amount,
      dateStarted: c.dateStarted,
      dateCompleted: c.dateCompleted || "In Progress"
    });
  });
  
  return {
    completedCount,
    activeCount,
    totalEarnings,
    details
  };
}

function linkBankAccount(contractId, cardNo, bankName) {
  const db = dbGet();
  const contract = db.contracts.find(c => String(c.id) === String(contractId));
  if (!contract) return false;
  
  contract.autoPayLinked = true;
  const maskedCard = "🔒 Card ending in *" + cardNo.substring(cardNo.length - 4);
  contract.bankDetails = {
    bankName: bankName || "Build2Hire Partner Bank",
    cardNumber: maskedCard,
    linkedAt: Date.now()
  };
  
  dbSave(db);
  return contract;
}

function submitWeeklyUpdate(contractId, progressText, completionDelta) {
  const db = dbGet();
  const contract = db.contracts.find(c => String(c.id) === String(contractId));
  if (!contract) return false;
  
  if (!contract.weeklyProgress) contract.weeklyProgress = [];
  
  const weekNum = contract.weeklyProgress.length + 1;
  const newUpdate = {
    week: weekNum,
    text: progressText,
    timestamp: Date.now(),
    completionPct: completionDelta
  };
  
  contract.weeklyProgress.push(newUpdate);
  dbSave(db);
  return newUpdate;
}

function triggerMonthlyAutoDeduction(contractId, monthIndex) {
  const db = dbGet();
  const contract = db.contracts.find(c => String(c.id) === String(contractId));
  if (!contract || !contract.autoPayLinked) return false;
  
  // Find conversation
  if (!db.conversations) db.conversations = [];
  const conv = db.conversations.find(c => String(c.candidateId) === String(contract.candidateId));
  const convId = conv ? conv.id : "c1";
  
  // Calculate installment amount
  const duration = contract.durationMonths || 1;
  const instAmount = Math.round((contract.amount || 1000) / duration);
  
  // Deduct cash (Simulated)
  const invoiceNo = "INV-" + Math.floor(100000 + Math.random() * 900000);
  const newInvoice = {
    invoiceNo: invoiceNo,
    amount: instAmount,
    paidDate: new Date().toISOString().split('T')[0],
    monthLabel: `Installment Month ${monthIndex}`
  };
  
  if (!contract.invoices) contract.invoices = [];
  contract.invoices.push(newInvoice);
  
  // Mark milestone associated with this installment if pending
  // Map monthIndex to milestone index
  const milestoneIdx = monthIndex - 1;
  if (contract.milestones && contract.milestones[milestoneIdx]) {
    contract.milestones[milestoneIdx].status = "approved"; // Auto-released
    const nextMil = contract.milestones[milestoneIdx + 1];
    if (nextMil) nextMil.status = "in-progress";
  }
  
  // Add XP points to candidate
  const candidateUser = db.users.find(u => String(u.id) === String(contract.candidateId));
  if (candidateUser) {
    candidateUser.xp_points = (candidateUser.xp_points || 0) + 200;
    recalculateScores(candidateUser);
  }
  
  dbSave(db);
  
  // Log message and send system message
  const alertMsg = `💰 Autopay executed! ${newInvoice.monthLabel} payment of $${instAmount} has been released automatically via linked bank account. Invoice: #${invoiceNo}`;
  sendMessage(convId, 1000, alertMsg);
  
  // Log activity
  logUserActivity(contract.candidateId, "payment_received", `Received autopay installment of $${instAmount} from ${contract.company}`);
  
  return newInvoice;
}

function generateInvoice(contractId, amount) {
  const db = dbGet();
  const contract = db.contracts.find(c => String(c.id) === String(contractId));
  if (!contract) return null;
  
  const invoiceNo = "INV-" + Math.floor(100000 + Math.random() * 900000);
  const newInvoice = {
    invoiceNo: invoiceNo,
    amount: amount,
    paidDate: new Date().toISOString().split('T')[0]
  };
  
  if (!contract.invoices) contract.invoices = [];
  contract.invoices.push(newInvoice);
  dbSave(db);
  
  return newInvoice;
}

function closeContract(contractId) {
  const db = dbGet();
  const contract = db.contracts.find(c => String(c.id) === String(contractId));
  if (!contract) return false;
  
  contract.status = "completed";
  contract.dateCompleted = new Date().toISOString().split('T')[0];
  
  // Send final closure notification
  if (!db.conversations) db.conversations = [];
  const conv = db.conversations.find(c => String(c.candidateId) === String(contract.candidateId));
  const convId = conv ? conv.id : "c1";
  
  sendMessage(convId, 1000, `🤝 Contract Closed! Project "${contract.title}" has been successfully completed. Final printable service agreement and closing statement are now shared in both dashboards. Thank you for building on Build2Hire!`);
  
  dbSave(db);
  return true;
}

// ==========================================
// 🛡️ ADMIN MANAGEMENT CONTROLLER METHODS
// ==========================================

function adminLogActivity(action, details, targetUser) {
  const db = dbGet();
  if (!db.activity_logs) db.activity_logs = [];
  
  const logEntry = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    action: action,
    details: details,
    target: targetUser || "System",
    timestamp: new Date().toISOString()
  };
  
  db.activity_logs.unshift(logEntry);
  if (db.activity_logs.length > 200) db.activity_logs = db.activity_logs.slice(0, 200);
  dbSave(db);
  return logEntry;
}

function adminGetActivityLogs() {
  const db = dbGet();
  if (!db.activity_logs) {
    db.activity_logs = [
      { id: 1, action: "User Registration", details: "Candidate User registered", target: "candidate@build2hire.com", timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 2, action: "Recruiter Registration", details: "Jane Recruiter joined InnovateTech", target: "recruiter@innovatetech.com", timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString() },
      { id: 3, action: "Job Post", details: "Posted job: Senior Frontend Engineer", target: "Vercel Inc", timestamp: new Date(Date.now() - 86400000).toISOString() }
    ];
    dbSave(db);
  }
  return db.activity_logs;
}

function adminAddUser(userData) {
  const db = dbGet();
  const newUser = {
    id: Date.now(),
    email: userData.email,
    fullName: userData.fullName,
    role: userData.role || 'candidate',
    status: userData.status || 'active',
    joinedDate: new Date().toISOString().split('T')[0],
    ...userData
  };
  
  if (newUser.role === 'candidate') {
    newUser.xp_points = Number(userData.xp_points || 0);
    newUser.talent_score = Number(userData.talent_score || 0);
    newUser.bio = userData.bio || "Registered candidate";
  } else if (newUser.role === 'recruiter') {
    newUser.companyName = userData.companyName || "Independent";
    newUser.jobTitle = userData.jobTitle || "Hiring Manager";
  }
  
  db.users.push(newUser);
  dbSave(db);
  adminLogActivity("User Created", `Created ${newUser.role}: ${newUser.fullName} (${newUser.email})`, newUser.email);
  return newUser;
}

function adminUpdateUser(userId, updatedData) {
  const db = dbGet();
  const user = db.users.find(u => String(u.id) === String(userId));
  if (!user) return false;
  
  Object.assign(user, updatedData);
  if (user.role === 'candidate') {
    recalculateScores(user);
  }
  dbSave(db);
  adminLogActivity("User Updated", `Updated user: ${user.fullName}`, user.email);
  return user;
}

function adminDeleteUser(userId) {
  const db = dbGet();
  const idx = db.users.findIndex(u => String(u.id) === String(userId));
  if (idx === -1) return false;
  
  const deleted = db.users.splice(idx, 1)[0];
  dbSave(db);
  adminLogActivity("User Deleted", `Deleted user: ${deleted.fullName} (${deleted.email})`, deleted.email);
  return true;
}

function adminToggleBlockUser(userId) {
  const db = dbGet();
  const user = db.users.find(u => String(u.id) === String(userId));
  if (!user) return false;
  
  user.status = user.status === 'blocked' ? 'active' : 'blocked';
  dbSave(db);
  adminLogActivity("User Status Changed", `${user.status === 'blocked' ? 'Blocked' : 'Unblocked'} user: ${user.fullName}`, user.email);
  return user;
}

function adminAddJob(jobData) {
  const db = dbGet();
  const newJob = {
    id: Date.now(),
    title: jobData.title,
    company: jobData.company,
    logo: jobData.logo || "💼",
    category: jobData.category || "Engineering",
    location: jobData.location || "Remote",
    salary: jobData.salary || "$100k - $130k",
    skills: Array.isArray(jobData.skills) ? jobData.skills : (jobData.skills || "").split(',').map(s => s.trim()).filter(Boolean),
    description: jobData.description || "",
    type: jobData.type || "Full-time",
    status: "active",
    postedDate: new Date().toISOString().split('T')[0]
  };
  
  db.jobs.unshift(newJob);
  dbSave(db);
  adminLogActivity("Job Created", `Created job: ${newJob.title} at ${newJob.company}`, newJob.company);
  return newJob;
}

function adminUpdateJob(jobId, jobData) {
  const db = dbGet();
  const job = db.jobs.find(j => String(j.id) === String(jobId));
  if (!job) return false;
  
  Object.assign(job, jobData);
  dbSave(db);
  adminLogActivity("Job Updated", `Updated job: ${job.title}`, job.company);
  return job;
}

function adminDeleteJob(jobId) {
  const db = dbGet();
  const idx = db.jobs.findIndex(j => String(j.id) === String(jobId));
  if (idx === -1) return false;
  
  const deleted = db.jobs.splice(idx, 1)[0];
  dbSave(db);
  adminLogActivity("Job Deleted", `Deleted job: ${deleted.title}`, deleted.company);
  return true;
}

function adminUpdateApplicationStatus(appId, status) {
  const db = dbGet();
  const app = db.applications.find(a => String(a.id) === String(appId));
  if (!app) return false;
  
  app.status = status;
  dbSave(db);
  adminLogActivity("Application Status Updated", `Updated application #${appId} to ${status}`, app.candidateName || "Candidate");
  return app;
}

function adminDeleteApplication(appId) {
  const db = dbGet();
  const idx = db.applications.findIndex(a => String(a.id) === String(appId));
  if (idx === -1) return false;
  
  const deleted = db.applications.splice(idx, 1)[0];
  dbSave(db);
  adminLogActivity("Application Deleted", `Deleted application #${appId}`, deleted.candidateName || "Candidate");
  return true;
}

function adminScheduleInterview(interviewData) {
  const db = dbGet();
  const newInterview = {
    id: Date.now(),
    candidateId: interviewData.candidateId,
    candidateName: interviewData.candidateName,
    company: interviewData.company || "Build2Hire Admin",
    meetDate: interviewData.meetDate,
    meetLink: interviewData.meetLink,
    notes: interviewData.notes || "",
    status: "Scheduled"
  };
  
  if (!db.interviews) db.interviews = [];
  db.interviews.unshift(newInterview);
  dbSave(db);
  adminLogActivity("Interview Scheduled", `Scheduled interview for ${newInterview.candidateName}`, newInterview.candidateName);
  return newInterview;
}

function adminDeleteInterview(interviewId) {
  const db = dbGet();
  if (!db.interviews) return false;
  const idx = db.interviews.findIndex(i => String(i.id) === String(interviewId));
  if (idx === -1) return false;
  
  const deleted = db.interviews.splice(idx, 1)[0];
  dbSave(db);
  adminLogActivity("Interview Deleted", `Deleted interview for ${deleted.candidateName}`, deleted.candidateName);
  return true;
}

function adminAddAssessment(assessmentData) {
  const db = dbGet();
  const newAssessment = {
    id: Date.now(),
    title: assessmentData.title,
    difficulty: assessmentData.difficulty || "medium",
    category: assessmentData.category || "Frontend",
    max_xp: Number(assessmentData.max_xp || 100),
    company_name: assessmentData.company_name || "Build2Hire Platform",
    company_logo: assessmentData.company_logo || "⚡",
    description: assessmentData.description || "",
    requirements: assessmentData.requirements || ""
  };
  
  if (!db.challenges) db.challenges = [];
  db.challenges.unshift(newAssessment);
  dbSave(db);
  adminLogActivity("Assessment Created", `Created assessment: ${newAssessment.title}`, newAssessment.category);
  return newAssessment;
}

function adminDeleteAssessment(assessmentId) {
  const db = dbGet();
  if (!db.challenges) return false;
  const idx = db.challenges.findIndex(c => String(c.id) === String(assessmentId));
  if (idx === -1) return false;
  
  const deleted = db.challenges.splice(idx, 1)[0];
  dbSave(db);
  adminLogActivity("Assessment Deleted", `Deleted assessment: ${deleted.title}`, deleted.category);
  return true;
}

function adminSendBroadcast(target, messageText) {
  const db = dbGet();
  if (!db.notifications) db.notifications = [];
  
  const notification = {
    id: Date.now(),
    target: target,
    message: messageText,
    timestamp: new Date().toISOString(),
    sentBy: "System Admin"
  };
  
  db.notifications.unshift(notification);
  dbSave(db);
  adminLogActivity("Broadcast Notification Sent", `Sent notification to ${target}: ${messageText.substring(0, 40)}...`, target);
  return notification;
}

// ==========================================
// 🎨 CANDIDATE WEBSITE CMS EDITOR CONTROLLER
// ==========================================

function adminGetCandidateFullCMSData(candidateId) {
  const db = dbGet();
  let cand = db.users.find(u => String(u.id) === String(candidateId) && u.role === 'candidate');
  if (!cand) {
    cand = db.users.find(u => u.role === 'candidate');
  }
  if (!cand) return null;

  // Initialize CMS section visibility & defaults if missing
  if (!cand.enabledSections) {
    cand.enabledSections = {
      dashboard: true,
      hero: true,
      profile: true,
      skills: true,
      portfolio: true,
      resume: true,
      education: true,
      experience: true,
      certifications: true,
      roadmap: true,
      assessments: true,
      applications: true,
      inbox: true,
      settings: true
    };
  }

  cand.heroHeadline = cand.heroHeadline || "Building high-performance web apps & scalable systems";
  cand.heroSubheadline = cand.heroSubheadline || "Passionate Software Engineer specializing in Full-Stack Web Development & Micro-Frontend Architectures";
  cand.avatarUrl = cand.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
  cand.location = cand.location || "San Francisco, CA (Remote)";
  cand.preferredRole = cand.preferredRole || "Full Stack Engineer";
  cand.resumeSummary = cand.resumeSummary || "Full-stack engineer with 4+ years of hands-on experience developing modern web applications.";

  if (!cand.experience || cand.experience.length === 0) {
    cand.experience = [
      { id: 1, role: "Senior Software Engineer", company: "Vercel Inc", duration: "2024 - Present", location: "Remote", description: "Led frontend architecture refactoring using React, CSS Variables, and modular design systems." },
      { id: 2, role: "Full Stack Developer", company: "DevStudio Inc", duration: "2022 - 2024", location: "Hybrid", description: "Built scalable Node.js microservices and RESTful API gateways serving 500k+ daily users." }
    ];
  }

  if (!cand.educationEntries || cand.educationEntries.length === 0) {
    cand.educationEntries = [
      { id: 1, degree: "Bachelor of Engineering in Computer Science", school: "University of Technology", year: "2018 - 2022", grade: "3.9 GPA" }
    ];
  }

  if (!cand.versionHistory) cand.versionHistory = [];

  return cand;
}

function adminSaveCandidateDraft(candidateId, draftData) {
  const db = dbGet();
  const cand = db.users.find(u => String(u.id) === String(candidateId));
  if (!cand) return false;

  cand.draftData = draftData;
  cand.lastDraftSavedAt = new Date().toISOString();
  dbSave(db);
  adminLogActivity("CMS Draft Saved", `Saved CMS draft for candidate: ${cand.fullName}`, cand.email);
  return cand;
}

function adminPublishCandidateWebsite(candidateId, publishedData) {
  const db = dbGet();
  const cand = db.users.find(u => String(u.id) === String(candidateId));
  if (!cand) return false;

  if (publishedData) {
    Object.assign(cand, publishedData);
  }

  cand.draftData = null; // Clear draft state on publish
  cand.lastPublishedAt = new Date().toISOString();

  // Record version snapshot
  if (!cand.versionHistory) cand.versionHistory = [];
  const versionSnapshot = {
    versionId: "v" + Date.now(),
    timestamp: new Date().toISOString(),
    snapshot: JSON.parse(JSON.stringify(cand))
  };
  cand.versionHistory.unshift(versionSnapshot);
  if (cand.versionHistory.length > 20) cand.versionHistory = cand.versionHistory.slice(0, 20);

  if (cand.role === 'candidate') {
    recalculateScores(cand);
  }

  dbSave(db);
  adminLogActivity("Candidate Website Published", `Published live site updates for candidate: ${cand.fullName}`, cand.email);
  return cand;
}

function adminGetCandidateVersions(candidateId) {
  const cand = adminGetCandidateFullCMSData(candidateId);
  return cand ? (cand.versionHistory || []) : [];
}

function adminRestoreCandidateVersion(candidateId, versionId) {
  const db = dbGet();
  const cand = db.users.find(u => String(u.id) === String(candidateId));
  if (!cand || !cand.versionHistory) return false;

  const ver = cand.versionHistory.find(v => v.versionId === versionId);
  if (!ver) return false;

  Object.assign(cand, JSON.parse(JSON.stringify(ver.snapshot)));
  dbSave(db);
  adminLogActivity("Version Restored", `Restored candidate site snapshot #${versionId} for ${cand.fullName}`, cand.email);
  return cand;
}

// ==========================================
// 🏢 RECRUITER WEBSITE CMS EDITOR CONTROLLER
// ==========================================

function adminGetRecruiterFullCMSData(recruiterId) {
  const db = dbGet();
  let rec = db.users.find(u => String(u.id) === String(recruiterId) && u.role === 'recruiter');
  if (!rec) {
    rec = db.users.find(u => u.role === 'recruiter');
  }
  if (!rec) return null;

  // Initialize Recruiter CMS section visibility & defaults if missing
  if (!rec.enabledRecruiterSections) {
    rec.enabledRecruiterSections = {
      info: true,
      dashboard: true,
      company_profile: true,
      company_branding: true,
      recruiter_profile: true,
      posted_jobs: true,
      job_details: true,
      applications: true,
      pipeline_candidates: true,
      shortlist_pipeline: true,
      interviews: true,
      manage_jobs: true,
      milestone_gigs: true,
      p2p_gigs: true,
      company_regs: true,
      analytics: true,
      leaderboard: true,
      notifications: true,
      inbox: true,
      meetings: true,
      settings: true,
      activity: true
    };
  }

  rec.companyName = rec.companyName || "InnovateTech";
  rec.companyIndustry = rec.companyIndustry || "Enterprise Tech / Software";
  rec.companyDesc = rec.companyDesc || "Leading hiring hub building cloud software solutions and empowering top tech talent.";
  rec.companyWebsite = rec.companyWebsite || "https://innovatetech.com";
  rec.companyEmail = rec.companyEmail || "recruitment@innovatetech.com";
  rec.companyPhone = rec.companyPhone || "+1 (555) 012-9843";
  rec.companyLocation = rec.companyLocation || "San Francisco, CA (Hybrid)";
  rec.companyLogo = rec.companyLogo || "🏢";
  rec.companyCover = rec.companyCover || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";

  rec.fullName = rec.fullName || "Jane Recruiter";
  rec.jobTitle = rec.jobTitle || "Hiring Manager & Coordinator";
  rec.photoUrl = rec.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80";
  rec.bio = rec.bio || "Tech recruiter connecting Master Builders and Senior Engineers with hyper-growth tech companies.";
  rec.phone = rec.phone || "+1 (555) 901-2345";

  if (!rec.recruiterVersionHistory) rec.recruiterVersionHistory = [];

  return rec;
}

function adminSaveRecruiterDraft(recruiterId, draftData) {
  const db = dbGet();
  const rec = db.users.find(u => String(u.id) === String(recruiterId));
  if (!rec) return false;

  rec.recruiterDraftData = draftData;
  rec.lastRecruiterDraftSavedAt = new Date().toISOString();
  dbSave(db);
  adminLogActivity("Recruiter CMS Draft Saved", `Saved recruiter portal draft for ${rec.fullName} (${rec.companyName})`, rec.email);
  return rec;
}

function adminPublishRecruiterWebsite(recruiterId, publishedData) {
  const db = dbGet();
  const rec = db.users.find(u => String(u.id) === String(recruiterId));
  if (!rec) return false;

  if (publishedData) {
    Object.assign(rec, publishedData);
  }

  rec.recruiterDraftData = null;
  rec.lastRecruiterPublishedAt = new Date().toISOString();

  if (!rec.recruiterVersionHistory) rec.recruiterVersionHistory = [];
  const versionSnapshot = {
    versionId: "rv" + Date.now(),
    timestamp: new Date().toISOString(),
    snapshot: JSON.parse(JSON.stringify(rec))
  };
  rec.recruiterVersionHistory.unshift(versionSnapshot);
  if (rec.recruiterVersionHistory.length > 20) rec.recruiterVersionHistory = rec.recruiterVersionHistory.slice(0, 20);

  dbSave(db);
  adminLogActivity("Recruiter Portal Published", `Published live recruiter portal updates for ${rec.fullName} (${rec.companyName})`, rec.email);
  return rec;
}

function adminGetRecruiterVersions(recruiterId) {
  const rec = adminGetRecruiterFullCMSData(recruiterId);
  return rec ? (rec.recruiterVersionHistory || []) : [];
}

function adminRestoreRecruiterVersion(recruiterId, versionId) {
  const db = dbGet();
  const rec = db.users.find(u => String(u.id) === String(recruiterId));
  if (!rec || !rec.recruiterVersionHistory) return false;

  const ver = rec.recruiterVersionHistory.find(v => v.versionId === versionId);
  if (!ver) return false;

  Object.assign(rec, JSON.parse(JSON.stringify(ver.snapshot)));
  dbSave(db);
  adminLogActivity("Recruiter Version Restored", `Restored recruiter portal snapshot #${versionId} for ${rec.fullName}`, rec.email);
  return rec;
}
