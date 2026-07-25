// shared.js - Shared Header, Theme Toggle, Auth, and Unified Mock DB Controller

// Auto reset cache if URL contains ?reset=1 or if b2h_v9_migrated is missing
(function checkAutoReset() {
  try {
    const params = new URLSearchParams(window.location.search);
    const needMigrate = localStorage.getItem('b2h_v9_migrated') !== 'true';
    if (params.get('reset') === '1' || needMigrate) {
      localStorage.removeItem('build2hire_db');
      localStorage.removeItem('build2hire_db_backup');
      sessionStorage.clear();
      localStorage.setItem('b2h_v9_migrated', 'true');
      if (params.get('reset') === '1') {
        const cleanUrl = window.location.pathname;
        window.location.href = cleanUrl;
      }
    }
  } catch (e) {}
})();

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
    fullName: "Test 1",
    role: "candidate",
    phone: "+1 (555) 019-2834",
    bio: "Passionate engineer eager to show my skills to recruiters. Click edit to set my details.",
    githubUrl: "https://github.com/candidate",
    linkedinUrl: "https://linkedin.com/in/candidate",
    portfolioWebsite: "https://candidate.dev",
    skills: ["JavaScript", "HTML", "CSS Variables", "React", "Node.js", "MySQL", "Express"],
    skillLevels: { "JavaScript": "Medium", "HTML": "Advanced", "CSS Variables": "Medium", "React": "Basic", "Node.js": "Basic", "MySQL": "Basic", "Express": "Basic" },
    profileCompleted: true,
    xp_points: 350,
    level: 1,
    current_level: "Beginner Builder",
    talent_score: 82,
    portfolio_score: 75,
    challenge_score: 80,
    assessment_score: 90,
    preferredRole: "Frontend Developer",
    education: "Bachelor of Engineering in Computer Science",
    certificates: [],
    projects: [
      { id: 1, name: "E-Commerce App", desc: "Fullstack store built with React and Node.js", link: "#" }
    ],
    enrolled_courses: [
      { courseId: "course_react_state", progress: 60, enrolledAt: "2026-07-20T10:00:00.000Z" }
    ]
  },
  {
    id: 1004,
    email: "recruiter@innovatetech.com",
    fullName: "Sarah Connor (Hiring Manager)",
    role: "recruiter",
    companyName: "InnovateTech",
    jobTitle: "Senior Hiring Manager"
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

  if (parsed.users) {
    const origCount = parsed.users.length;
    parsed.users = parsed.users.filter(u => !u.email.toLowerCase().includes('thaieba') && !u.email.toLowerCase().includes('test1@gmail'));
    if (parsed.users.length !== origCount) updated = true;

    parsed.users.forEach(u => {
      if (u.role === 'candidate' && (u.fullName === "Candidate User" || u.fullName === "John Builder" || u.fullName === "Thaieba Ismail")) {
        u.fullName = "Test 1";
        updated = true;
      } else if (u.role === 'recruiter' && (u.fullName === "Candidate User" || u.fullName === "Thaieba Ismail" || u.fullName === "Jane Recruiter")) {
        u.fullName = "Sarah Connor (Hiring Manager)";
        updated = true;
      }

      if (u.certificates && Array.isArray(u.certificates)) {
        u.certificates.forEach((c, idx) => {
          const certTitle = c.title || c.course || c.name || c.course_title || "Verified Platform Certificate";
          const certSerial = c.serial_no || c.serialNo || c.id || c.serial || `B2H-CERT-MRYYZMKT${idx + 1}`;
          const certScore = c.score || c.grade || 95;
          const certDate = c.date || c.issuedAt || c.issued_date || "Jul 24, 2026";

          if (c.title !== certTitle || c.serial_no !== certSerial) updated = true;

          c.title = certTitle;
          c.name = certTitle;
          c.course = certTitle;
          c.serial_no = certSerial;
          c.serialNo = certSerial;
          c.score = certScore;
          c.date = certDate;
        });
      }
    });
  }

  ['applications', 'interviews', 'contracts', 'conversations', 'admin_notifications', 'candidate_notifications', 'recruiter_notifications', 'broadcasts', 'notifications', 'logs', 'activity_logs'].forEach(key => {
    if (parsed[key]) {
      parsed[key].forEach(item => {
        if (item.candidate_name && /thaieba|john builder|candidate user/i.test(item.candidate_name)) {
          item.candidate_name = "Test 1";
          updated = true;
        }
        if (item.candidateName && /thaieba|john builder|candidate user/i.test(item.candidateName)) {
          item.candidateName = "Test 1";
          updated = true;
        }
        if (item.email && /thaieba|test1@gmail/i.test(item.email)) {
          item.email = "candidate@build2hire.com";
          updated = true;
        }
        if (item.candidateEmail && /thaieba|test1@gmail/i.test(item.candidateEmail)) {
          item.candidateEmail = "candidate@build2hire.com";
          updated = true;
        }
        if (item.message && /thaieba/i.test(item.message)) {
          item.message = item.message.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
          updated = true;
        }
        if (item.title && /thaieba/i.test(item.title)) {
          item.title = item.title.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
          updated = true;
        }
        if (item.details && /thaieba/i.test(item.details)) {
          item.details = item.details.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
          updated = true;
        }
        if (item.target && /thaieba/i.test(item.target)) {
          item.target = item.target.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
          updated = true;
        }
      });
    }
  });

  if (parsed.interviews) {
    parsed.interviews.forEach(item => {
      const origCand = item.candidate_name;
      item.candidate_name = item.candidate_name || item.candidateName || item.candidate || "Test 1";
      item.candidateName = item.candidate_name;
      if (/thaieba|john builder|candidate user/i.test(item.candidate_name)) {
        item.candidate_name = "Test 1";
        item.candidateName = "Test 1";
      }

      item.challenge_title = item.challenge_title || item.topic || item.title || item.challengeTitle || "Round 1 Technical Evaluation";
      item.topic = item.challenge_title;

      item.scheduled_at = item.scheduled_at || item.meetDate || item.date || new Date().toISOString();
      item.meetDate = item.scheduled_at;

      item.location_url = item.location_url || item.meetLink || item.link || "https://meet.jit.si/build2hire-escrow-session";
      item.meetLink = item.location_url;
    });
  }

  if (!parsed.users || parsed.users.length === 0) {
    parsed.users = DEFAULT_USERS;
    updated = true;
  } else {
    DEFAULT_USERS.forEach(defU => {
      const existingUser = parsed.users.find(u => u.email.toLowerCase() === defU.email.toLowerCase());
      if (!existingUser) {
        parsed.users.push(defU);
        updated = true;
      } else if (defU.role === 'candidate') {
        if (!existingUser.skills || existingUser.skills.length === 0) {
          existingUser.skills = defU.skills;
          existingUser.skillLevels = defU.skillLevels;
          updated = true;
        }
        if (!existingUser.enrolled_courses || existingUser.enrolled_courses.length === 0) {
          existingUser.enrolled_courses = defU.enrolled_courses;
          updated = true;
        }
        if (!existingUser.xp_points) {
          existingUser.xp_points = defU.xp_points || 350;
          existingUser.level = defU.level || 1;
          existingUser.current_level = defU.current_level || "Beginner Builder";
          updated = true;
        }
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
  
  const prog = candidate.course_progress[courseKey] || { level: "basic" };
  candidate.course_progress[courseKey] = prog;
  
  const normLevel = (level || 'basic').toLowerCase();
  if (normLevel === 'basic' || normLevel === 'beginner') {
    prog.basic_score = Math.max(prog.basic_score || 0, score);
    if (prog.level === "basic") prog.level = "medium";
  } else if (normLevel === 'medium' || normLevel === 'mid') {
    prog.medium_score = Math.max(prog.medium_score || 0, score);
    if (prog.level === "medium" || prog.level === "basic") prog.level = "advanced";
  } else if (normLevel === 'advanced') {
    prog.advanced_score = Math.max(prog.advanced_score || 0, score);
    prog.level = "completed";
  }
  
  if (!candidate.certificates) {
    candidate.certificates = [];
  }
  
  const courseNames = {
    frontend: "Frontend Frameworks & UI Architecture",
    backend: "Backend & API Architectures",
    database: "Database Schema & Caching",
    creative: "Creative Media & Video Editing"
  };
  const courseTitle = courseNames[courseKey] || courseKey;
  
  const levelNames = {
    basic: "Beginner Level",
    beginner: "Beginner Level",
    medium: "Mid Level (Intermediate)",
    mid: "Mid Level (Intermediate)",
    advanced: "Advanced Expert Level"
  };
  const levelTitle = levelNames[normLevel] || normLevel;

  // Tiered XP caps: Beginner (100 max), Mid (250 max), Advanced (500 max)
  const tierCaps = {
    basic: 100,
    beginner: 100,
    medium: 250,
    mid: 250,
    advanced: 500
  };
  const maxTierXp = tierCaps[normLevel] || 100;

  const correctCount = correctAnswersCount !== undefined ? correctAnswersCount : Math.round((score / 100) * 5);
  const xpAward = Math.round((correctCount / 5) * maxTierXp);

  // Check if candidate ALREADY completed & passed this level assessment (Strict 1-Time Rule)
  const existingCert = candidate.certificates.find(c => {
    const cKey = (c.course_key || c.category || c.course || '').toLowerCase();
    const lKey = (c.level_key || c.level || '').toLowerCase();
    return (cKey.includes(courseKey.toLowerCase()) || cKey.includes(courseTitle.toLowerCase())) &&
           (lKey.includes(normLevel) || lKey.includes(levelTitle.toLowerCase()));
  });

  if (existingCert) {
    // Already passed! Update score only if higher, but DO NOT add duplicate XP
    if (score > existingCert.score) {
      existingCert.score = score;
      existingCert.correct_count = correctCount;
      dbSave(db);
    }
    return existingCert;
  }

  // First-time completion: issue certificate & award XP
  const certPrefix = normLevel.slice(0, 3).toUpperCase();
  const serialNo = `B2H-${certPrefix}-${Math.floor(100000 + Math.random() * 900000)}`;

  const newCert = {
    id: `${courseKey}_${normLevel}_${Date.now()}`,
    serial_no: serialNo,
    title: `${courseTitle} - ${levelTitle} Certificate`,
    course: courseTitle,
    course_key: courseKey,
    level: levelTitle,
    level_key: normLevel,
    score: score,
    correct_count: correctCount,
    total_count: 5,
    xp_gained: xpAward,
    max_xp: maxTierXp,
    date: new Date().toISOString().split('T')[0],
    authority: "Build2Hire Academic Verification Board"
  };
  
  candidate.certificates.push(newCert);
  
  if (!candidate.activity_log) candidate.activity_log = [];
  candidate.activity_log.push({
    type: "assessment_complete",
    details: `Passed "${courseTitle} (${levelTitle})" assessment with score: ${score}% (+${xpAward} XP)`,
    timestamp: new Date().toISOString()
  });

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

function enrollInCourse(candidateId, courseId, selectedLanguage = 'english') {
  const db = dbGet();
  const candidate = db.users.find(u => String(u.id) === String(candidateId));
  if (!candidate) return false;
  
  if (!candidate.enrolled_courses) {
    candidate.enrolled_courses = [];
  }
  
  let existing = candidate.enrolled_courses.find(c => c.courseId === courseId);
  if (existing) {
    if (existing.isCompleted || existing.progress === 100) {
      alert("🎓 You have already completed this course and earned your certificate! Re-enrollment or retaking completed courses is disabled.");
      return false;
    }
    existing.selectedLanguage = selectedLanguage;
  } else {
    candidate.enrolled_courses.push({
      courseId: courseId,
      enrolledDate: new Date().toISOString().split('T')[0],
      selectedLanguage: selectedLanguage,
      progress: 20,
      isCompleted: false
    });
  }

  if (!candidate.activity_log) candidate.activity_log = [];
  candidate.activity_log.push({
    type: "course_enroll",
    details: `Enrolled in course: "${courseId}" (${selectedLanguage.toUpperCase()})`,
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
    let session = sessionStorage.getItem('user');
    if (!session) {
      const db = dbGet();
      const defaultUser = (db.users && db.users.find(u => u.role === 'candidate')) || DEFAULT_USERS[0];
      sessionStorage.setItem('user', JSON.stringify(defaultUser));
      session = JSON.stringify(defaultUser);
    }
    let sessionUser = JSON.parse(session);
    
    // Automatically correct placeholder names (role-based)
    if (sessionUser && sessionUser.email && (sessionUser.email.toLowerCase().includes('thaieba') || sessionUser.email.toLowerCase().includes('test1@gmail'))) {
      sessionUser.email = "candidate@build2hire.com";
      sessionStorage.setItem('user', JSON.stringify(sessionUser));
    }

    // Automatically correct placeholder names (role-based)
    if (sessionUser.role === 'recruiter' && (sessionUser.fullName === "Thaieba Ismail" || sessionUser.fullName === "Candidate User" || sessionUser.fullName === "Jane Recruiter")) {
      sessionUser.fullName = "Sarah Connor (Hiring Manager)";
      sessionStorage.setItem('user', JSON.stringify(sessionUser));
    } else if (sessionUser.role === 'candidate' && (sessionUser.fullName === "Candidate User" || sessionUser.fullName === "John Builder" || sessionUser.fullName === "Thaieba Ismail")) {
      sessionUser.fullName = "Test 1";
      sessionStorage.setItem('user', JSON.stringify(sessionUser));
    }

    const db = dbGet();
    let latestUser = db.users.find(u => u.email.toLowerCase() === sessionUser.email.toLowerCase());
    
    if (latestUser) {
      if (latestUser.role === 'recruiter' && (latestUser.fullName === "Thaieba Ismail" || latestUser.fullName === "Candidate User" || latestUser.fullName === "Jane Recruiter")) {
        latestUser.fullName = "Sarah Connor (Hiring Manager)";
        dbSave(db);
      } else if (latestUser.role === 'candidate' && (latestUser.fullName === "Candidate User" || latestUser.fullName === "John Builder" || latestUser.fullName === "Thaieba Ismail")) {
        latestUser.fullName = "Test 1";
        dbSave(db);
      }
      if (!latestUser.skills || latestUser.skills.length === 0) {
        latestUser.skills = ["JavaScript", "HTML", "CSS Variables", "React", "Node.js", "MySQL", "Express"];
        latestUser.skillLevels = { "JavaScript": "Medium", "HTML": "Advanced", "CSS Variables": "Medium", "React": "Basic", "Node.js": "Basic", "MySQL": "Basic", "Express": "Basic" };
        dbSave(db);
      }
      if (!latestUser.enrolled_courses || latestUser.enrolled_courses.length === 0) {
        latestUser.enrolled_courses = [{ courseId: "fe-101", progress: 60, enrolledAt: "2026-07-20T10:00:00.000Z" }];
        dbSave(db);
      }
      sessionStorage.setItem('user', JSON.stringify(latestUser));
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
    if (typeof window.initSeamlessNavigation === 'function') {
      window.initSeamlessNavigation();
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

  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const currentPath = (window.location.pathname.split('/').pop() || "").toLowerCase();
  if (currentPath === 'login.html' || currentPath === 'login' || currentPath === 'register.html' || currentPath === 'register' || currentPath === 'reset.html' || currentPath === 'reset') {
    nav.style.display = 'flex';
    nav.style.justifyContent = 'space-between';
    nav.style.alignItems = 'center';
    nav.style.padding = '0.75rem 2rem';
    nav.style.borderBottom = '1px solid var(--border-color)';
    nav.style.backgroundColor = 'var(--bg-secondary)';
    
    const isLogin = currentPath.includes('login');
    
    nav.innerHTML = `
      <div style="display:flex;align-items:center;gap:1rem;">
        <a href="index.html" onclick="window.handleLogoClick(event, 'index.html')" ondblclick="window.openAdminLoginModal()" title="Build2Hire" style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--text-primary); text-decoration: none; letter-spacing: -0.02em;">
          Build2<span style="color: var(--primary);">Hire</span>
        </a>
        <div class="theme-switch" style="display:inline-flex; align-items:center; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 20px; padding: 2px; cursor: pointer; user-select: none;">
          <span id="theme-btn-light" onclick="setTheme('light')" style="padding: 0.25rem 0.5rem; border-radius: 15px; font-size: 0.95rem; line-height: 1; transition: all 0.2s;">☀️</span>
          <span id="theme-btn-dark" onclick="setTheme('dark')" style="padding: 0.25rem 0.5rem; border-radius: 15px; font-size: 0.95rem; line-height: 1; transition: all 0.2s;">🌙</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;">
        <a href="index.html" class="nav-link" style="font-size:0.9rem; font-weight: 600;">🏠 Home</a>
        ${isLogin 
          ? `<a href="register.html" class="btn btn-primary" style="padding:0.45rem 1.1rem;font-size:0.85rem;">Create Account</a>` 
          : `<a href="login.html" class="btn btn-secondary" style="padding:0.45rem 1.1rem;font-size:0.85rem;">Sign In</a>`}
      </div>
    `;
    initTheme();
    return;
  }

  const user = getUser();

  const dashboardPage = user
    ? (user.role === 'admin' ? 'admin-dashboard.html' : (user.role === 'recruiter' ? 'recruiter-dashboard.html' : 'portfolio.html'))
    : 'login.html';

  const userControls = user
    ? `<a href="${dashboardPage}" class="btn btn-secondary" style="padding:0.5rem 1rem;font-size:0.85rem;">👤 ${user.fullName || 'Dashboard'}</a>
       <button onclick="handleLogout()" class="btn" style="padding:0.5rem 1rem;font-size:0.85rem;border:1px solid var(--danger);color:var(--danger);background:transparent;">Logout</button>`
    : `<a href="login.html" class="nav-link" style="font-size:0.95rem;">Sign In</a>
       <a href="register.html" class="btn btn-primary" style="padding:0.5rem 1.25rem;font-size:0.9rem;">Get Started</a>`;

  const homeLink = user ? dashboardPage : 'index.html';

  nav.style.display = 'flex';
  nav.innerHTML = `
    <div style="display:flex;align-items:center;margin-right:2rem;">
      <a href="${homeLink}" onclick="window.handleLogoClick(event, '${homeLink}')" ondblclick="window.openAdminLoginModal()" title="Build2Hire" style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--text-primary); text-decoration: none; letter-spacing: -0.02em;">
        Build2<span style="color: var(--primary);">Hire</span>
      </a>
    </div>
    
    <!-- DESKTOP NAV -->
    <nav class="desktop-nav" style="display:flex;align-items:center;gap:1.5rem;">
      <ul class="nav-links">
        <li><a href="${homeLink}" class="nav-link">Home</a></li>
        
        ${user && user.role !== 'candidate' ? '<li><a href="leaderboard.html" class="nav-link">🏆 Leaderboard</a></li>' : ''}

        ${user && user.role === 'candidate' ? '<li><a href="jobs.html" class="nav-link">Job Portal</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="freelance.html" class="nav-link">🚀 Freelance Hub</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="recommendations.html" class="nav-link">📚 Learners</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="certificates.html" class="nav-link">📜 Certificates</a></li>' : ''}
        ${user && user.role === 'admin' ? '<li><a href="admin-dashboard.html" class="nav-link" style="color:var(--primary); font-weight:700;">⚙️ Admin Control</a></li>' : ''}
      </ul>
      <div style="display:flex;align-items:center;gap:1rem;">
        ${user && user.role === 'candidate' ? `
          <div id="cand-notif-wrapper" style="position: relative; display: inline-block;">
            <button id="cand-notif-bell-btn" onclick="window.toggleCandidateNotificationDropdown(event)" class="theme-toggle" style="position: relative; cursor: pointer; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); font-size: 1.15rem; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" title="View Candidate Notifications">
              🔔
              <span id="cand-notif-badge" style="position: absolute; top: -3px; right: -3px; background: #ef4444; color: white; font-size: 0.65rem; font-weight: 800; padding: 2px 5px; border-radius: 10px; min-width: 16px; text-align: center; display: none;">0</span>
            </button>

            <!-- CANDIDATE NOTIFICATION DROPDOWN MENU -->
            <div id="cand-notif-dropdown" style="display: none; position: absolute; right: 0; top: 48px; width: 360px; max-height: 480px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); z-index: 999999; overflow: hidden; flex-direction: column;">
              <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background: var(--bg-tertiary);">
                <div>
                  <strong style="font-size: 0.92rem; color: var(--text-primary); font-family: var(--font-display);">🔔 Candidate Notifications</strong>
                  <span id="cand-notif-unread-text" style="font-size: 0.72rem; color: var(--primary); display: block; font-weight: 600;">0 unread</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <button onclick="window.markAllCandidateNotificationsRead()" class="btn-xs btn-secondary" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;">Mark All Read</button>
                  <button onclick="window.toggleCandidateNotificationDropdown(event)" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 1.1rem; padding: 0.1rem 0.35rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;" title="Close Menu">✕</button>
                </div>
              </div>

              <!-- NOTIFICATION ITEMS CONTAINER -->
              <div id="cand-notif-list" style="overflow-y: auto; max-height: 340px; display: flex; flex-direction: column;">
                <!-- Populated dynamically -->
              </div>

              <div style="padding: 0.6rem 1rem; border-top: 1px solid var(--border-color); text-align: center; background: var(--bg-tertiary);">
                <button onclick="window.clearAllCandidateNotifications()" style="font-size: 0.75rem; color: var(--danger); background: none; border: none; cursor: pointer; font-weight: 600;">🗑️ Clear All Notifications</button>
              </div>
            </div>
          </div>
        ` : ''}

        ${user && user.role === 'recruiter' ? `
          <div id="rec-notif-wrapper" style="position: relative; display: inline-block;">
            <button id="rec-notif-bell-btn" onclick="window.toggleRecruiterNotificationDropdown(event)" class="theme-toggle" style="position: relative; cursor: pointer; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); font-size: 1.15rem; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" title="View Recruiter Notifications">
              🔔
              <span id="rec-notif-badge" style="position: absolute; top: -3px; right: -3px; background: #a855f7; color: white; font-size: 0.65rem; font-weight: 800; padding: 2px 5px; border-radius: 10px; min-width: 16px; text-align: center; display: none;">0</span>
            </button>

            <!-- RECRUITER NOTIFICATION DROPDOWN MENU -->
            <div id="rec-notif-dropdown" style="display: none; position: absolute; right: 0; top: 48px; width: 360px; max-height: 480px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); z-index: 999999; overflow: hidden; flex-direction: column;">
              <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background: var(--bg-tertiary);">
                <div>
                  <strong style="font-size: 0.92rem; color: var(--text-primary); font-family: var(--font-display);">🔔 Employer & Recruiter Alerts</strong>
                  <span id="rec-notif-unread-text" style="font-size: 0.72rem; color: #a855f7; display: block; font-weight: 600;">0 unread</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <button onclick="window.markAllRecruiterNotificationsRead()" class="btn-xs btn-secondary" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;">Mark All Read</button>
                  <button onclick="window.toggleRecruiterNotificationDropdown(event)" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 1.1rem; padding: 0.1rem 0.35rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;" title="Close Menu">✕</button>
                </div>
              </div>

              <!-- NOTIFICATION ITEMS CONTAINER -->
              <div id="rec-notif-list" style="overflow-y: auto; max-height: 340px; display: flex; flex-direction: column;">
                <!-- Populated dynamically -->
              </div>

              <div style="padding: 0.6rem 1rem; border-top: 1px solid var(--border-color); text-align: center; background: var(--bg-tertiary);">
                <button onclick="window.clearAllRecruiterNotifications()" style="font-size: 0.75rem; color: var(--danger); background: none; border: none; cursor: pointer; font-weight: 600;">🗑️ Clear All Notifications</button>
              </div>
            </div>
          </div>
        ` : ''}

        ${user && user.role === 'admin' ? `
          <div id="admin-notif-wrapper" style="position: relative; display: inline-block;">
            <button id="admin-notif-bell-btn" onclick="window.toggleAdminNotificationDropdown(event)" class="theme-toggle" style="position: relative; cursor: pointer; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); font-size: 1.15rem; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" title="View Admin Command Center Notifications">
              🔔
              <span id="admin-notif-badge" style="position: absolute; top: -3px; right: -3px; background: var(--primary); color: white; font-size: 0.65rem; font-weight: 800; padding: 2px 5px; border-radius: 10px; min-width: 16px; text-align: center; display: none;">0</span>
            </button>

            <!-- ADMIN NOTIFICATION DROPDOWN MENU -->
            <div id="admin-notif-dropdown" style="display: none; position: absolute; right: 0; top: 48px; width: 380px; max-height: 490px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); z-index: 999999; overflow: hidden; flex-direction: column;">
              <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--bg-tertiary);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                  <div>
                    <strong style="font-size: 0.92rem; color: var(--text-primary); font-family: var(--font-display);">⚙️ System Command Center Alerts</strong>
                    <span id="admin-notif-unread-text" style="font-size: 0.72rem; color: var(--primary); display: block; font-weight: 600;">0 unread</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="window.markAllAdminNotificationsRead()" class="btn-xs btn-secondary" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;">Mark All Read</button>
                    <button onclick="window.toggleAdminNotificationDropdown(event)" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 1.1rem; padding: 0.1rem 0.35rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;" title="Close Menu">✕</button>
                  </div>
                </div>
                <!-- AUDIENCE FILTER TABS -->
                <div id="admin-notif-filter-bar" style="display: flex; gap: 0.3rem; align-items: center; padding-top: 0.2rem;"></div>
              </div>

              <!-- NOTIFICATION ITEMS CONTAINER -->
              <div id="admin-notif-list" style="overflow-y: auto; max-height: 320px; display: flex; flex-direction: column;">
                <!-- Populated dynamically -->
              </div>

              <div style="padding: 0.6rem 1rem; border-top: 1px solid var(--border-color); text-align: center; background: var(--bg-tertiary);">
                <button onclick="window.clearAllAdminNotifications()" style="font-size: 0.75rem; color: var(--danger); background: none; border: none; cursor: pointer; font-weight: 600;">🗑️ Clear All Notifications</button>
              </div>
            </div>
          </div>
        ` : ''}

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
        ${user && user.role !== 'candidate' ? '<li><a href="leaderboard.html" onclick="toggleMobileMenu()">🏆 Leaderboard</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="jobs.html" onclick="toggleMobileMenu()">💼 Job Portal</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="freelance.html" onclick="toggleMobileMenu()">🚀 Freelance Hub</a></li>' : ''}
        ${user && user.role === 'candidate' ? '<li><a href="certificates.html" onclick="toggleMobileMenu()">📜 Certificates</a></li>' : ''}
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
  if (user && user.role === 'candidate') {
    setTimeout(window.renderCandidateNotificationCenter, 50);
  } else if (user && user.role === 'recruiter') {
    setTimeout(window.renderRecruiterNotificationCenter, 50);
  } else if (user && user.role === 'admin') {
    setTimeout(window.renderAdminNotificationCenter, 50);
  }
}

// ==========================================
// ⚙️ ADMIN COMMAND CENTER NOTIFICATIONS
// ==========================================

// ==========================================
// ⚙️ ADMIN COMMAND CENTER NOTIFICATIONS (UNIFIED AUDIENCE CENTER)
// ==========================================

let currentAdminNotifAudienceFilter = 'all';

window.setAdminNotifFilter = function(filter, e) {
  if (e) e.stopPropagation();
  currentAdminNotifAudienceFilter = filter;
  window.renderAdminNotificationCenter();
};

window.getAdminNotifications = function(filterAudience = 'all') {
  const db = dbGet();
  
  if (!db.admin_notifications || db.admin_notifications.length === 0) {
    db.admin_notifications = [
      {
        id: "anotif-301",
        title: "👨‍💻 New Candidate Registered",
        message: "Test 1 completed Candidate registration and verified email profile.",
        category: "candidate_reg",
        audience: "Candidate",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 10
      },
      {
        id: "anotif-302",
        title: "🏢 New Recruiter Registered",
        message: "Sarah Connor registered employer account for InnovateTech Inc.",
        category: "recruiter_reg",
        audience: "Recruiter",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 45
      },
      {
        id: "anotif-303",
        title: "📋 New Job Application Submitted",
        message: "Application submitted for 'Senior Frontend Engineer' opening at Vercel.",
        category: "application",
        audience: "Candidate",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 110
      },
      {
        id: "anotif-304",
        title: "📅 Interview Scheduled",
        message: "Recruiter Sarah Connor scheduled an interview with candidate Test 1.",
        category: "interview",
        audience: "Recruiter",
        read: true,
        timestamp: Date.now() - 1000 * 60 * 240
      },
      {
        id: "anotif-305",
        title: "📜 Course Completed & Certificate Issued",
        message: "Learner earned Certificate B2H-CERT-1001 with 90% score on Frontend Architecture.",
        category: "certificate",
        audience: "Candidate",
        read: true,
        timestamp: Date.now() - 1000 * 60 * 500
      },
      {
        id: "anotif-306",
        title: "⚡ System Alert & Escrow Audit",
        message: "Escrow payment transaction #TX-9001 cleared for $150 platform revenue.",
        category: "system",
        audience: "Admin",
        read: true,
        timestamp: Date.now() - 1000 * 60 * 60 * 24
      }
    ];
    dbSave(db);
  }

  // Aggregate Admin, Candidate, and Recruiter notifications
  let allNotifs = [];

  (db.admin_notifications || []).forEach(n => {
    allNotifs.push({ ...n, audience: n.audience || 'Admin' });
  });

  (db.candidate_notifications || []).forEach(n => {
    allNotifs.push({ ...n, audience: 'Candidate' });
  });

  (db.recruiter_notifications || []).forEach(n => {
    allNotifs.push({ ...n, audience: 'Recruiter' });
  });

  // Sort descending by timestamp
  allNotifs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  allNotifs.forEach(n => {
    if (n.message && /thaieba/i.test(n.message)) {
      n.message = n.message.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
    }
    if (n.title && /thaieba/i.test(n.title)) {
      n.title = n.title.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
    }
  });

  if (filterAudience === 'candidate') {
    return allNotifs.filter(n => n.audience === 'Candidate');
  } else if (filterAudience === 'recruiter') {
    return allNotifs.filter(n => n.audience === 'Recruiter');
  } else if (filterAudience === 'admin') {
    return allNotifs.filter(n => n.audience === 'Admin');
  }

  return allNotifs;
};

window.renderAdminNotificationCenter = function() {
  const notifs = window.getAdminNotifications(currentAdminNotifAudienceFilter);
  const totalUnreadCount = window.getAdminNotifications('all').filter(n => !n.read).length;

  const badge = document.getElementById('admin-notif-badge');
  const unreadText = document.getElementById('admin-notif-unread-text');
  const listElem = document.getElementById('admin-notif-list');
  const filterBar = document.getElementById('admin-notif-filter-bar');

  if (badge) {
    if (totalUnreadCount > 0) {
      badge.textContent = totalUnreadCount;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  if (unreadText) {
    unreadText.textContent = `${totalUnreadCount} unread alert${totalUnreadCount !== 1 ? 's' : ''} across all platform roles`;
  }

  if (filterBar) {
    filterBar.innerHTML = `
      <button onclick="window.setAdminNotifFilter('all', event)" style="font-size:0.68rem; padding:0.2rem 0.55rem; border-radius:12px; border:none; cursor:pointer; background:${currentAdminNotifAudienceFilter === 'all' ? 'var(--primary)' : 'var(--bg-secondary)'}; color:${currentAdminNotifAudienceFilter === 'all' ? '#fff' : 'var(--text-secondary)'}; font-weight:600;">🌐 All</button>
      <button onclick="window.setAdminNotifFilter('candidate', event)" style="font-size:0.68rem; padding:0.2rem 0.55rem; border-radius:12px; border:none; cursor:pointer; background:${currentAdminNotifAudienceFilter === 'candidate' ? '#10b981' : 'var(--bg-secondary)'}; color:${currentAdminNotifAudienceFilter === 'candidate' ? '#fff' : 'var(--text-secondary)'}; font-weight:600;">👨‍💻 Candidate</button>
      <button onclick="window.setAdminNotifFilter('recruiter', event)" style="font-size:0.68rem; padding:0.2rem 0.55rem; border-radius:12px; border:none; cursor:pointer; background:${currentAdminNotifAudienceFilter === 'recruiter' ? '#a855f7' : 'var(--bg-secondary)'}; color:${currentAdminNotifAudienceFilter === 'recruiter' ? '#fff' : 'var(--text-secondary)'}; font-weight:600;">🏢 Recruiter</button>
      <button onclick="window.setAdminNotifFilter('admin', event)" style="font-size:0.68rem; padding:0.2rem 0.55rem; border-radius:12px; border:none; cursor:pointer; background:${currentAdminNotifAudienceFilter === 'admin' ? '#3b82f6' : 'var(--bg-secondary)'}; color:${currentAdminNotifAudienceFilter === 'admin' ? '#fff' : 'var(--text-secondary)'}; font-weight:600;">⚙️ Admin</button>
    `;
  }

  if (listElem) {
    if (notifs.length === 0) {
      listElem.innerHTML = `<div style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">🔔 No notifications found for '${currentAdminNotifAudienceFilter}' role.</div>`;
    } else {
      listElem.innerHTML = notifs.map(n => {
        const timeAgo = window.formatTimeAgo(n.timestamp);
        const audienceBadge = n.audience === 'Candidate'
          ? '<span class="admin-badge badge-active" style="font-size:0.62rem; padding:1px 5px;">👨‍💻 Candidate</span>'
          : (n.audience === 'Recruiter'
            ? '<span class="admin-badge" style="font-size:0.62rem; padding:1px 5px; background:rgba(168,85,247,0.15); color:#a855f7; border:1px solid rgba(168,85,247,0.3);">🏢 Recruiter</span>'
            : '<span class="admin-badge badge-approved" style="font-size:0.62rem; padding:1px 5px;">⚙️ Admin</span>');

        return `
          <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-color); background: ${n.read ? 'transparent' : 'rgba(99,102,241,0.08)'}; display: flex; gap: 0.75rem; align-items: flex-start; transition: background 0.15s; position: relative;">
            <div style="font-size: 1.1rem; flex-shrink: 0; margin-top: 2px;">
              ${n.audience === 'Candidate' ? '👨‍💻' : (n.audience === 'Recruiter' ? '🏢' : '⚙️')}
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
                  <strong style="font-size: 0.82rem; color: var(--text-primary);">${n.title}</strong>
                  ${audienceBadge}
                </div>
                <button onclick="window.dismissAdminNotification('${n.id}', event)" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 0.8rem; padding: 0 4px;" title="Dismiss">✕</button>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0 0 0.3rem 0; line-height: 1.35;">${n.message}</p>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${timeAgo} ${!n.read ? '• <strong style="color:var(--primary);">Unread</strong>' : ''}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }
};

window.toggleAdminNotificationDropdown = function(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('admin-notif-dropdown');
  if (!dropdown) return;
  const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
  dropdown.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) window.renderAdminNotificationCenter();
};

window.markAllAdminNotificationsRead = function() {
  const db = dbGet();
  ['admin_notifications', 'candidate_notifications', 'recruiter_notifications'].forEach(key => {
    if (db[key]) db[key].forEach(n => n.read = true);
  });
  dbSave(db);
  window.renderAdminNotificationCenter();
};

window.clearAllAdminNotifications = function() {
  const db = dbGet();
  db.admin_notifications = [];
  db.candidate_notifications = [];
  db.recruiter_notifications = [];
  dbSave(db);
  window.renderAdminNotificationCenter();
};

window.dismissAdminNotification = function(notifId, e) {
  if (e) e.stopPropagation();
  const db = dbGet();
  ['admin_notifications', 'candidate_notifications', 'recruiter_notifications'].forEach(key => {
    if (db[key]) db[key] = db[key].filter(n => String(n.id) !== String(notifId));
  });
  dbSave(db);
  window.renderAdminNotificationCenter();
};

window.addAdminNotification = function(title, message, category = 'system', audience = 'Admin') {
  const db = dbGet();
  db.admin_notifications = db.admin_notifications || [];

  const newNotif = {
    id: `anotif-${Date.now()}`,
    title: title,
    message: message,
    category: category,
    audience: audience,
    read: false,
    timestamp: Date.now()
  };

  db.admin_notifications.unshift(newNotif);
  dbSave(db);

  if (typeof playNotificationSound === 'function') playNotificationSound();
  if (typeof showToastNotification === 'function') showToastNotification(title, message, category);
  window.renderAdminNotificationCenter();
};

// ==========================================
// 🔔 RECRUITER NOTIFICATION CENTER CONTROLLERS
// ==========================================

window.getRecruiterNotifications = function() {
  const user = getUser();
  if (!user) return [];
  const db = dbGet();
  
  if (!db.recruiter_notifications || db.recruiter_notifications.length === 0) {
    db.recruiter_notifications = [
      {
        id: "rnotif-201",
        userId: user.id || 1004,
        title: "📋 New Candidate Application Received",
        message: "Test 1 applied for your 'Short Marketing Video assembly' requisition at InnovateTech.",
        category: "applications",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 15
      },
      {
        id: "rnotif-202",
        userId: user.id || 1004,
        title: "⚡ Escrow Milestone Delivered",
        message: "Freelancer delivered Milestone #1 ('Storyboard and Footage Selection') for $1,200 project.",
        category: "escrow",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 120
      },
      {
        id: "rnotif-203",
        userId: user.id || 1004,
        title: "✅ Employer Profile Verified",
        message: "Your recruiter profile and company InnovateTech have been verified by Admin Command Center.",
        category: "verification",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 300
      },
      {
        id: "rnotif-204",
        userId: user.id || 1004,
        title: "📅 Interview Confirmed",
        message: "Candidate accepted interview meeting scheduled for July 26, 2026 at 10:00 AM.",
        category: "interviews",
        read: true,
        timestamp: Date.now() - 1000 * 60 * 60 * 18
      },
      {
        id: "rnotif-205",
        userId: user.id || 1004,
        title: "🤖 AI Talent Recommendation",
        message: "Build2Hire AI identified 3 Diamond-tier Candidates matching your Frontend Engineer vacancy.",
        category: "ai",
        read: true,
        timestamp: Date.now() - 1000 * 60 * 60 * 36
      }
    ];
    dbSave(db);
  }

  return db.recruiter_notifications.filter(n => String(n.userId) === String(user.id) || !n.userId);
};

window.renderRecruiterNotificationCenter = function() {
  const notifs = window.getRecruiterNotifications();
  const unreadCount = notifs.filter(n => !n.read).length;

  const badge = document.getElementById('rec-notif-badge');
  const unreadText = document.getElementById('rec-notif-unread-text');
  const listElem = document.getElementById('rec-notif-list');

  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  if (unreadText) {
    unreadText.textContent = `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`;
  }

  if (listElem) {
    if (notifs.length === 0) {
      listElem.innerHTML = `<div style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">🔔 No notifications at this time.</div>`;
    } else {
      listElem.innerHTML = notifs.map(n => {
        const timeAgo = window.formatTimeAgo(n.timestamp);
        return `
          <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-color); background: ${n.read ? 'transparent' : 'rgba(168,85,247,0.08)'}; display: flex; gap: 0.75rem; align-items: flex-start; transition: background 0.15s; position: relative;">
            <div style="font-size: 1.1rem; flex-shrink: 0; margin-top: 2px;">
              ${n.category === 'applications' ? '📋' : (n.category === 'escrow' ? '⚡' : (n.category === 'verification' ? '✅' : (n.category === 'interviews' ? '📅' : '🤖')))}
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                <strong style="font-size: 0.82rem; color: var(--text-primary);">${n.title}</strong>
                <button onclick="window.dismissRecruiterNotification('${n.id}', event)" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 0.8rem; padding: 0 4px;" title="Dismiss">✕</button>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0 0 0.3rem 0; line-height: 1.35;">${n.message}</p>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${timeAgo} ${!n.read ? '• <strong style="color:#a855f7;">Unread</strong>' : ''}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }
};

window.toggleRecruiterNotificationDropdown = function(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('rec-notif-dropdown');
  if (!dropdown) return;
  const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
  dropdown.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) window.renderRecruiterNotificationCenter();
};

window.markAllRecruiterNotificationsRead = function() {
  const db = dbGet();
  const user = getUser();
  if (!user || !db.recruiter_notifications) return;

  db.recruiter_notifications.forEach(n => {
    if (String(n.userId) === String(user.id) || !n.userId) {
      n.read = true;
    }
  });

  dbSave(db);
  window.renderRecruiterNotificationCenter();
};

window.clearAllRecruiterNotifications = function() {
  const db = dbGet();
  const user = getUser();
  if (!user || !db.recruiter_notifications) return;

  db.recruiter_notifications = db.recruiter_notifications.filter(n => String(n.userId) !== String(user.id));
  dbSave(db);
  window.renderRecruiterNotificationCenter();
};

window.dismissRecruiterNotification = function(notifId, e) {
  if (e) e.stopPropagation();
  const db = dbGet();
  if (!db.recruiter_notifications) return;

  db.recruiter_notifications = db.recruiter_notifications.filter(n => String(n.id) !== String(notifId));
  dbSave(db);
  window.renderRecruiterNotificationCenter();
};

window.addRecruiterNotification = function(title, message, category = 'system') {
  const user = getUser();
  if (!user) return;
  const db = dbGet();
  db.recruiter_notifications = db.recruiter_notifications || [];

  const newNotif = {
    id: `rnotif-${Date.now()}`,
    userId: user.id,
    title: title,
    message: message,
    category: category,
    read: false,
    timestamp: Date.now()
  };

  db.recruiter_notifications.unshift(newNotif);
  dbSave(db);

  if (typeof playNotificationSound === 'function') playNotificationSound();
  if (typeof showToastNotification === 'function') showToastNotification(title, message, category);
  window.renderRecruiterNotificationCenter();
};

// ==========================================
// 🔔 CANDIDATE NOTIFICATION CENTER CONTROLLERS
// ==========================================

window.getCandidateNotifications = function() {
  const user = getUser();
  if (!user) return [];
  const db = dbGet();
  
  if (!db.candidate_notifications || db.candidate_notifications.length === 0) {
    db.candidate_notifications = [
      {
        id: "cnotif-101",
        userId: user.id || 1001,
        title: "🎉 Application Stage Update",
        message: "Your application for 'Senior Frontend Engineer' at Vercel Inc has been moved to Interview Stage!",
        category: "applications",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 25
      },
      {
        id: "cnotif-102",
        userId: user.id || 1001,
        title: "📜 Verified Certificate Earned",
        message: "Congratulations! You completed Frontend Architecture and earned Certificate B2H-CERT-1001 with 90% score.",
        category: "certificates",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 180
      },
      {
        id: "cnotif-103",
        userId: user.id || 1001,
        title: "📅 Interview Scheduled",
        message: "Interview scheduled with Sarah Connor (InnovateTech) for July 26, 2026 at 10:00 AM.",
        category: "interviews",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 360
      },
      {
        id: "cnotif-104",
        userId: user.id || 1001,
        title: "⚡ XP Level Up!",
        message: "You reached Level 2 Skilled Builder with 1,250 cumulative XP Points!",
        category: "system",
        read: true,
        timestamp: Date.now() - 1000 * 60 * 60 * 24
      },
      {
        id: "cnotif-105",
        userId: user.id || 1001,
        title: "🔔 Admin Broadcast Announcement",
        message: "Welcome to Build2Hire Enterprise Command Center. System maintenance completed successfully.",
        category: "broadcast",
        read: true,
        timestamp: Date.now() - 1000 * 60 * 60 * 48
      }
    ];
    dbSave(db);
  }

  return db.candidate_notifications.filter(n => String(n.userId) === String(user.id) || !n.userId);
};

window.renderCandidateNotificationCenter = function() {
  const notifs = window.getCandidateNotifications();
  const unreadCount = notifs.filter(n => !n.read).length;

  const badge = document.getElementById('cand-notif-badge');
  const unreadText = document.getElementById('cand-notif-unread-text');
  const listElem = document.getElementById('cand-notif-list');

  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  if (unreadText) {
    unreadText.textContent = `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`;
  }

  if (listElem) {
    if (notifs.length === 0) {
      listElem.innerHTML = `<div style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">🔔 No notifications at this time.</div>`;
    } else {
      listElem.innerHTML = notifs.map(n => {
        const timeAgo = window.formatTimeAgo(n.timestamp);
        return `
          <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-color); background: ${n.read ? 'transparent' : 'rgba(99,102,241,0.06)'}; display: flex; gap: 0.75rem; align-items: flex-start; transition: background 0.15s; position: relative;">
            <div style="font-size: 1.1rem; flex-shrink: 0; margin-top: 2px;">
              ${n.category === 'applications' ? '📋' : (n.category === 'certificates' ? '📜' : (n.category === 'interviews' ? '📅' : (n.category === 'system' ? '⚡' : '🔔')))}
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                <strong style="font-size: 0.82rem; color: var(--text-primary);">${n.title}</strong>
                <button onclick="window.dismissCandidateNotification('${n.id}', event)" style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 0.8rem; padding: 0 4px;" title="Dismiss">✕</button>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0 0 0.3rem 0; line-height: 1.35;">${n.message}</p>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${timeAgo} ${!n.read ? '• <strong style="color:var(--primary);">Unread</strong>' : ''}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }
};

window.toggleCandidateNotificationDropdown = function(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('cand-notif-dropdown');
  if (!dropdown) return;
  const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
  dropdown.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) window.renderCandidateNotificationCenter();
};

window.markAllCandidateNotificationsRead = function() {
  const db = dbGet();
  const user = getUser();
  if (!user || !db.candidate_notifications) return;

  db.candidate_notifications.forEach(n => {
    if (String(n.userId) === String(user.id) || !n.userId) {
      n.read = true;
    }
  });

  dbSave(db);
  window.renderCandidateNotificationCenter();
};

window.clearAllCandidateNotifications = function() {
  const db = dbGet();
  const user = getUser();
  if (!user || !db.candidate_notifications) return;

  db.candidate_notifications = db.candidate_notifications.filter(n => String(n.userId) !== String(user.id));
  dbSave(db);
  window.renderCandidateNotificationCenter();
};

window.dismissCandidateNotification = function(notifId, e) {
  if (e) e.stopPropagation();
  const db = dbGet();
  if (!db.candidate_notifications) return;

  db.candidate_notifications = db.candidate_notifications.filter(n => String(n.id) !== String(notifId));
  dbSave(db);
  window.renderCandidateNotificationCenter();
};

window.addCandidateNotification = function(title, message, category = 'system') {
  const user = getUser();
  if (!user) return;
  const db = dbGet();
  db.candidate_notifications = db.candidate_notifications || [];

  const newNotif = {
    id: `cnotif-${Date.now()}`,
    userId: user.id,
    title: title,
    message: message,
    category: category,
    read: false,
    timestamp: Date.now()
  };

  db.candidate_notifications.unshift(newNotif);
  dbSave(db);

  if (typeof playNotificationSound === 'function') playNotificationSound();
  if (typeof showToastNotification === 'function') showToastNotification(title, message, category);
  window.renderCandidateNotificationCenter();
};

window.formatTimeAgo = function(timestamp) {
  if (!timestamp) return 'Recently';
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// Close notification dropdown when clicking outside
document.addEventListener('click', function(e) {
  const wrapper = document.getElementById('cand-notif-wrapper');
  const dropdown = document.getElementById('cand-notif-dropdown');
  if (wrapper && dropdown && !wrapper.contains(e.target)) {
    dropdown.style.display = 'none';
  }

  const recWrapper = document.getElementById('rec-notif-wrapper');
  const recDropdown = document.getElementById('rec-notif-dropdown');
  if (recWrapper && recDropdown && !recWrapper.contains(e.target)) {
    recDropdown.style.display = 'none';
  }
});

let logoClickTimeout = null;
window.handleLogoClick = function(event, homeLink) {
  event.preventDefault();
  if (logoClickTimeout) {
    clearTimeout(logoClickTimeout);
    logoClickTimeout = null;
    return; // It's a double click! Cancel standard navigation.
  }
  
  logoClickTimeout = setTimeout(() => {
    // If target link is admin dashboard, always prompt for password
    if (homeLink.includes('admin-dashboard.html')) {
      window.openAdminLoginModal();
    } else {
      window.location.href = homeLink;
    }
    logoClickTimeout = null;
  }, 250); // Delay slightly to await double click
};

window.togglePasswordVisibility = function(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = '🙈';
    btn.setAttribute('title', 'Hide Password');
  } else {
    input.type = 'password';
    btn.innerHTML = '👁️';
    btn.setAttribute('title', 'Show Password');
  }
};

window.openAdminLoginModal = function() {
  // Always clear previous session authentication so password MUST be entered every time
  sessionStorage.removeItem('admin_authenticated');

  let modal = document.getElementById('admin-secret-modal');
  if (modal) {
    modal.remove();
  }

  modal = document.createElement('div');
  modal.id = 'admin-secret-modal';
  modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; z-index:999999; backdrop-filter:blur(5px);";
  modal.innerHTML = `
    <div style="background:var(--bg-secondary); border:1px solid var(--border-color); padding:2rem; border-radius:12px; width:100%; max-width:400px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
      <h3 style="font-family:var(--font-display); color:var(--primary); font-size:1.4rem; margin-bottom:0.5rem; text-align:center;">🔑 Management Sign In</h3>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.5rem; text-align:center;">Enter management password to access Build2Hire administration panel.</p>
      
      <div style="text-align:left; margin-bottom:1.25rem;">
        <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:0.5rem; color:var(--text-primary);">Management Password</label>
        <div style="position: relative; width: 100%;">
          <input type="password" id="admin-secret-pwd" style="width:100%; padding:0.6rem 2.75rem 0.6rem 0.75rem; border-radius:6px; background:var(--bg-tertiary); border:1px solid var(--border-color); color:var(--text-primary); font-size:0.9rem;" placeholder="Enter admin password" autocomplete="off">
          <button type="button" onclick="togglePasswordVisibility('admin-secret-pwd', this)" style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 0.2rem; outline: none; z-index: 10;" title="Show Password">👁️</button>
        </div>
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

  setTimeout(() => {
    const input = document.getElementById('admin-secret-pwd');
    if (input) {
      input.value = '';
      input.focus();
    }
  }, 100);
};

window.submitSecretAdminLogin = function() {
  const input = document.getElementById('admin-secret-pwd');
  const pwd = (input ? input.value : '').trim();
  if (pwd === 'admin123' || pwd === 'admin' || pwd === 'password123') {
    sessionStorage.setItem('admin_authenticated', 'true');
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
    const modal = document.getElementById('admin-secret-modal');
    if (modal) modal.remove();
    
    alert("🔐 Admin Authentication Verified! Redirecting to Build2Hire Management System...");
    window.location.href = "admin-dashboard.html?tab=overview";
  } else {
    alert("❌ Invalid Admin Management Password! Access Denied.");
  }
};

// Render Sidebar (App Shell)
function renderSidebar(activePage) {
  const sidebar = document.getElementById('main-sidebar');
  if (!sidebar) return;

  const user = getUser();
  if (!user) return;

  let pageFile = (activePage || "").split('?')[0];
  if (pageFile && !pageFile.includes('.')) pageFile += '.html';
  if (!pageFile) pageFile = 'index.html';
  activePage = pageFile;

  if (user.role === 'admin') {
    const activeTab = new URLSearchParams(window.location.search).get('tab') || 'overview';
    const isDashboard = activePage === 'admin-dashboard.html';

    sidebar.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <p style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; color: var(--primary); padding-left: 0.85rem; margin-bottom: 0.5rem; letter-spacing: 0.1em;">
            🏢 Enterprise ATS & HRMS
          </p>
          <ul class="sidebar-menu" style="display: flex; flex-direction: column; gap: 0.15rem;">
            <li>
              <a href="admin-dashboard.html?tab=overview" onclick="if(window.switchTab){event.preventDefault();switchTab('overview');}" class="sidebar-link ${isDashboard && (activeTab === 'overview' || activeTab === 'dashboard') ? 'active' : ''}">
                📊 <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=candidates" onclick="if(window.switchTab){event.preventDefault();switchTab('candidates');}" class="sidebar-link ${isDashboard && activeTab === 'candidates' ? 'active' : ''}">
                👨‍💻 <span>Candidate Management</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=recruiters" onclick="if(window.switchTab){event.preventDefault();switchTab('recruiters');}" class="sidebar-link ${isDashboard && activeTab === 'recruiters' ? 'active' : ''}">
                🏢 <span>Recruiter Management</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=companies" onclick="if(window.switchTab){event.preventDefault();switchTab('companies');}" class="sidebar-link ${isDashboard && activeTab === 'companies' ? 'active' : ''}">
                🏛️ <span>Company Management</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=jobs" onclick="if(window.switchTab){event.preventDefault();switchTab('jobs');}" class="sidebar-link ${isDashboard && activeTab === 'jobs' ? 'active' : ''}">
                💼 <span>Job Management</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=gigs" onclick="if(window.switchTab){event.preventDefault();switchTab('gigs');}" class="sidebar-link ${isDashboard && activeTab === 'gigs' ? 'active' : ''}">
                ⚡ <span>Freelance Projects</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=applications" onclick="if(window.switchTab){event.preventDefault();switchTab('applications');}" class="sidebar-link ${isDashboard && activeTab === 'applications' ? 'active' : ''}">
                📋 <span>Application Management</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=interviews" onclick="if(window.switchTab){event.preventDefault();switchTab('interviews');}" class="sidebar-link ${isDashboard && activeTab === 'interviews' ? 'active' : ''}">
                📅 <span>Interview Management</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=academy" onclick="if(window.switchTab){event.preventDefault();switchTab('academy');}" class="sidebar-link ${isDashboard && activeTab === 'academy' ? 'active' : ''}">
                📚 <span>Skill Academy</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=quizzes" onclick="if(window.switchTab){event.preventDefault();switchTab('quizzes');}" class="sidebar-link ${isDashboard && activeTab === 'quizzes' ? 'active' : ''}">
                📜 <span>Quiz & Certificates</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=recommendations" onclick="if(window.switchTab){event.preventDefault();switchTab('recommendations');}" class="sidebar-link ${isDashboard && activeTab === 'recommendations' ? 'active' : ''}">
                🤖 <span>AI Recommendations</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=notifications" onclick="if(window.switchTab){event.preventDefault();switchTab('notifications');}" class="sidebar-link ${isDashboard && activeTab === 'notifications' ? 'active' : ''}">
                🔔 <span>Notifications</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=reports" onclick="if(window.switchTab){event.preventDefault();switchTab('reports');}" class="sidebar-link ${isDashboard && activeTab === 'reports' ? 'active' : ''}">
                📈 <span>Reports & Analytics</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=activity" onclick="if(window.switchTab){event.preventDefault();switchTab('activity');}" class="sidebar-link ${isDashboard && activeTab === 'activity' ? 'active' : ''}">
                📜 <span>Audit Logs</span>
              </a>
            </li>
            <li>
              <a href="admin-dashboard.html?tab=settings" onclick="if(window.switchTab){event.preventDefault();switchTab('settings');}" class="sidebar-link ${isDashboard && activeTab === 'settings' ? 'active' : ''}">
                ⚙️ <span>System Settings</span>
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
              📝 <span>Skill Quizzes</span>
            </a>
          </li>
          <li>
            <a href="certificates.html" class="sidebar-link ${activePage === 'certificates.html' ? 'active' : ''}">
              📜 <span>My Certificates</span>
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
  document.body.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
  document.body.style.opacity = '0';
  document.body.style.transform = 'scale(0.99)';
  setTimeout(() => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    window.location.replace('login.html');
  }, 120);
}

// ==========================================
// 🔔 TOP-RIGHT FLOATING TOAST NOTIFICATION ENGINE
// ==========================================

// Dynamically inject CSS animations for Toast Notifications
(function injectToastStyles() {
  if (document.getElementById('b2h-toast-styles')) return;
  const style = document.createElement('style');
  style.id = 'b2h-toast-styles';
  style.textContent = `
    @keyframes toastSlideInRight {
      0% { opacity: 0; transform: translateX(120%) scale(0.9); }
      100% { opacity: 1; transform: translateX(0) scale(1); }
    }

    @keyframes toastFadeOutRight {
      0% { opacity: 1; transform: translateX(0) scale(1); }
      100% { opacity: 0; transform: translateX(120%) scale(0.9); }
    }

    @keyframes toastProgress {
      0% { width: 100%; }
      100% { width: 0%; }
    }
  `;
  document.head.appendChild(style);
})();

function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch (err) {
    // Audio play blocked by browser autoplay policy until user gesture
  }
}

function showToastNotification(message, type = 'info', title = null) {
  playNotificationChime();

  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      pointer-events: none;
      max-width: 400px;
      width: calc(100vw - 2.5rem);
    `;
    document.body.appendChild(container);
  }

  const toastId = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
  const toast = document.createElement('div');
  toast.id = toastId;

  let icon = '🔔';
  let borderColor = '#3b82f6';
  let badgeBg = 'rgba(59, 130, 246, 0.15)';
  
  if (type === 'success' || type === 'approved') {
    icon = '✅';
    borderColor = '#10b981';
    badgeBg = 'rgba(16, 185, 129, 0.15)';
  } else if (type === 'error' || type === 'danger') {
    icon = '⚠️';
    borderColor = '#ef4444';
    badgeBg = 'rgba(239, 68, 68, 0.15)';
  } else if (type === 'warning') {
    icon = '⚡';
    borderColor = '#f59e0b';
    badgeBg = 'rgba(245, 158, 11, 0.15)';
  } else if (type === 'cert' || type === 'academy') {
    icon = '📜';
    borderColor = '#a855f7';
    badgeBg = 'rgba(168, 85, 247, 0.15)';
  }

  toast.style.cssText = `
    pointer-events: auto;
    background: var(--bg-secondary, #1e1e2e);
    color: var(--text-primary, #f8fafc);
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.15));
    border-left: 4px solid ${borderColor};
    border-radius: 10px;
    padding: 0.85rem 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;
    animation: toastSlideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    backdrop-filter: blur(8px);
  `;

  const headerTitle = title || (type === 'success' ? 'System Action Success' : (type === 'error' ? 'System Alert' : 'System Notification'));

  toast.innerHTML = `
    <div style="font-size: 1.1rem; flex-shrink: 0; background: ${badgeBg}; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
      ${icon}
    </div>
    <div style="flex: 1; min-width: 0; padding-right: 0.5rem;">
      <strong style="font-size: 0.85rem; display: block; color: var(--text-primary); margin-bottom: 0.15rem; font-weight: 700;">
        ${headerTitle}
      </strong>
      <p style="font-size: 0.8rem; color: var(--text-secondary, #94a3b8); margin: 0; line-height: 1.4; word-break: break-word;">
        ${message}
      </p>
    </div>
    <button onclick="dismissToast('${toastId}')" style="background: transparent; border: none; color: var(--text-muted, #64748b); font-size: 1.1rem; cursor: pointer; padding: 0.1rem 0.3rem; border-radius: 4px; line-height: 1; flex-shrink: 0; transition: color 0.2s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-muted)'" title="Dismiss">
      ✕
    </button>
    <div style="position: absolute; bottom: 0; left: 0; height: 3px; background: ${borderColor}; width: 100%; animation: toastProgress 60s linear forwards;"></div>
  `;

  container.appendChild(toast);

  // Auto-hide after 60 seconds (1 minute)
  const timer = setTimeout(() => {
    dismissToast(toastId);
  }, 60000);

  toast.dataset.timerId = timer;
}

function dismissToast(toastId) {
  const toast = document.getElementById(toastId);
  if (!toast) return;

  if (toast.dataset.timerId) {
    clearTimeout(Number(toast.dataset.timerId));
  }

  toast.style.animation = 'toastFadeOutRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards';
  setTimeout(() => {
    toast.remove();
  }, 350);
}

// Show alert message (Routes to Top-Right Toast Notification)
function showAlert(containerId, message, type = 'error') {
  showToastNotification(message, type);
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '';
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
    document.body.style.transition = 'opacity 0.15s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      window.location.replace('login.html');
    }, 120);
  }, 1200);
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
      { id: 1, action: "User Registration", details: "Test 1 registered", target: "candidate@build2hire.com", timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 2, action: "Recruiter Registration", details: "Sarah Connor joined InnovateTech", target: "recruiter@innovatetech.com", timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString() },
      { id: 3, action: "Job Post", details: "Posted job: Senior Frontend Engineer", target: "Vercel Inc", timestamp: new Date(Date.now() - 86400000).toISOString() }
    ];
    dbSave(db);
  }

  // Ensure all audit log entries sanitize legacy names
  db.activity_logs.forEach(log => {
    if (log.details && /thaieba/i.test(log.details)) {
      log.details = log.details.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
    }
    if (log.target && /thaieba/i.test(log.target)) {
      log.target = log.target.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
    }
    if (log.action && /thaieba/i.test(log.action)) {
      log.action = log.action.replace(/thaieba\s*ismail/gi, 'Test 1').replace(/thaieba/gi, 'Test 1');
    }
  });

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
  adminLogActivity("User Hard Deleted", `Permanently deleted user: ${deleted.fullName} (${deleted.email})`, deleted.email);
  return true;
}

function adminSoftDeleteUser(userId) {
  const db = dbGet();
  const user = db.users.find(u => String(u.id) === String(userId));
  if (!user) return false;
  
  user.soft_deleted = true;
  user.status = 'archived';
  dbSave(db);
  adminLogActivity("User Soft Deleted", `Archived user: ${user.fullName} (${user.email})`, user.email);
  return user;
}

function adminRestoreUser(userId) {
  const db = dbGet();
  const user = db.users.find(u => String(u.id) === String(userId));
  if (!user) return false;
  
  user.soft_deleted = false;
  user.status = 'active';
  dbSave(db);
  adminLogActivity("User Restored", `Restored user: ${user.fullName} (${user.email})`, user.email);
  return user;
}

function adminToggleVerifyUser(userId) {
  const db = dbGet();
  const user = db.users.find(u => String(u.id) === String(userId));
  if (!user) return false;
  
  user.isVerified = !user.isVerified;
  dbSave(db);
  adminLogActivity("User Verification Changed", `${user.isVerified ? 'Verified' : 'Unverified'} user: ${user.fullName}`, user.email);
  return user;
}

function adminResetUserPassword(userId, newPassword) {
  const db = dbGet();
  const user = db.users.find(u => String(u.id) === String(userId));
  if (!user) return false;
  
  user.password = newPassword || "Reset@1234";
  dbSave(db);
  adminLogActivity("Password Reset", `Reset password for user: ${user.fullName}`, user.email);
  return user;
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

function adminSaveCompany(companyData) {
  const db = dbGet();
  if (!db.company_registrations) db.company_registrations = [];
  
  if (companyData.id) {
    const comp = db.company_registrations.find(c => String(c.id) === String(companyData.id));
    if (comp) {
      Object.assign(comp, companyData);
      dbSave(db);
      adminLogActivity("Company Updated", `Updated company: ${comp.business_name}`, comp.business_name);
      return comp;
    }
  }
  
  const newComp = {
    id: Date.now(),
    business_name: companyData.business_name,
    logo: companyData.logo || "🏛️",
    industry: companyData.industry || "Technology",
    location: companyData.location || "San Francisco, CA",
    website: companyData.website || "https://company.com",
    description: companyData.description || "",
    status: companyData.status || "active",
    isVerified: companyData.isVerified || false,
    submitted_at: Date.now()
  };
  db.company_registrations.unshift(newComp);
  dbSave(db);
  adminLogActivity("Company Created", `Created company: ${newComp.business_name}`, newComp.business_name);
  return newComp;
}

function adminApproveCompany(compRef) {
  const db = dbGet();
  const comp = db.company_registrations.find(c => String(c.id) === String(compRef));
  if (!comp) return false;
  comp.status = 'active';
  comp.isVerified = true;
  dbSave(db);
  adminLogActivity("Company Approved", `Approved company partner: ${comp.business_name}`, comp.business_name);
  return comp;
}

function adminRejectCompany(compRef, reason) {
  const db = dbGet();
  const comp = db.company_registrations.find(c => String(c.id) === String(compRef));
  if (!comp) return false;
  comp.status = 'rejected';
  comp.rejectionReason = reason || "Incomplete documentation";
  dbSave(db);
  adminLogActivity("Company Rejected", `Rejected company: ${comp.business_name}`, comp.business_name);
  return comp;
}

function adminToggleVerifyCompany(compRef) {
  const db = dbGet();
  const comp = db.company_registrations.find(c => String(c.id) === String(compRef));
  if (!comp) return false;
  comp.isVerified = !comp.isVerified;
  dbSave(db);
  adminLogActivity("Company Verification Changed", `${comp.isVerified ? 'Verified' : 'Unverified'} company: ${comp.business_name}`, comp.business_name);
  return comp;
}

function adminArchiveCompany(compRef) {
  const db = dbGet();
  const comp = db.company_registrations.find(c => String(c.id) === String(compRef));
  if (!comp) return false;
  comp.archived = true;
  comp.status = 'archived';
  dbSave(db);
  adminLogActivity("Company Archived", `Archived company: ${comp.business_name}`, comp.business_name);
  return comp;
}

function adminRestoreCompany(compRef) {
  const db = dbGet();
  const comp = db.company_registrations.find(c => String(c.id) === String(compRef));
  if (!comp) return false;
  comp.archived = false;
  comp.status = 'active';
  dbSave(db);
  adminLogActivity("Company Restored", `Restored company: ${comp.business_name}`, comp.business_name);
  return comp;
}

function adminDeleteCompany(compRef) {
  const db = dbGet();
  const idx = db.company_registrations.findIndex(c => String(c.id) === String(compRef));
  if (idx === -1) return false;
  const deleted = db.company_registrations.splice(idx, 1)[0];
  dbSave(db);
  adminLogActivity("Company Deleted", `Permanently deleted company: ${deleted.business_name}`, deleted.business_name);
  return true;
}

function adminCloseJob(jobId) {
  return adminUpdateJob(jobId, { status: 'closed' });
}

function adminReopenJob(jobId) {
  return adminUpdateJob(jobId, { status: 'active' });
}

function adminArchiveJob(jobId) {
  return adminUpdateJob(jobId, { archived: true, status: 'archived' });
}

function adminRestoreJob(jobId) {
  return adminUpdateJob(jobId, { archived: false, status: 'active' });
}

function adminSaveGig(gigData) {
  const db = dbGet();
  if (!db.contracts) db.contracts = [];
  
  if (gigData.id) {
    const gig = db.contracts.find(g => String(g.id) === String(gigData.id));
    if (gig) {
      Object.assign(gig, gigData);
      dbSave(db);
      adminLogActivity("Freelance Project Updated", `Updated gig: ${gig.title}`, gig.company || "Platform");
      return gig;
    }
  }
  
  const newGig = {
    id: `contract_${Date.now()}`,
    title: gigData.title,
    company: gigData.company || "Build2Hire Partner",
    amount: gigData.amount || 1500,
    status: gigData.status || "Approved",
    milestone: gigData.milestone || "Phase 1 - Kickoff",
    date: new Date().toISOString().split('T')[0]
  };
  db.contracts.unshift(newGig);
  dbSave(db);
  adminLogActivity("Freelance Project Created", `Created gig: ${newGig.title}`, newGig.company);
  return newGig;
}

function adminApproveGig(gigId) {
  const db = dbGet();
  const gig = db.contracts.find(g => String(g.id) === String(gigId));
  if (!gig) return false;
  gig.status = 'Approved';
  dbSave(db);
  adminLogActivity("Freelance Project Approved", `Approved gig: ${gig.title}`, gig.company || "Platform");
  return gig;
}

function adminArchiveGig(gigId) {
  const db = dbGet();
  const gig = db.contracts.find(g => String(g.id) === String(gigId));
  if (!gig) return false;
  gig.archived = true;
  gig.status = 'Archived';
  dbSave(db);
  adminLogActivity("Freelance Project Archived", `Archived gig: ${gig.title}`, gig.company || "Platform");
  return gig;
}

function adminRestoreGig(gigId) {
  const db = dbGet();
  const gig = db.contracts.find(g => String(g.id) === String(gigId));
  if (!gig) return false;
  gig.archived = false;
  gig.status = 'Approved';
  dbSave(db);
  adminLogActivity("Freelance Project Restored", `Restored gig: ${gig.title}`, gig.company || "Platform");
  return gig;
}

function adminDeleteGig(gigId) {
  const db = dbGet();
  const idx = db.contracts.findIndex(g => String(g.id) === String(gigId));
  if (idx === -1) return false;
  const deleted = db.contracts.splice(idx, 1)[0];
  dbSave(db);
  adminLogActivity("Freelance Project Deleted", `Deleted gig: ${deleted.title}`, deleted.company || "Platform");
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

function adminCancelInterview(interviewId) {
  const db = dbGet();
  const interview = (db.interviews || []).find(i => String(i.id) === String(interviewId));
  if (!interview) return false;
  interview.status = 'Cancelled';
  dbSave(db);
  adminLogActivity("Interview Cancelled", `Cancelled interview for ${interview.candidateName}`, interview.candidateName);
  return interview;
}

function adminSendInterviewNotification(interviewId) {
  const db = dbGet();
  const interview = (db.interviews || []).find(i => String(i.id) === String(interviewId));
  if (!interview) return false;
  
  if (!db.broadcasts) db.broadcasts = [];
  db.broadcasts.unshift({
    id: `notif_${Date.now()}`,
    target: `Candidate #${interview.candidateId || interview.candidateName}`,
    message: `📅 Interview Reminder: Your meeting with ${interview.company || 'Employer'} is scheduled for ${new Date(interview.meetDate).toLocaleString()}. Video link: ${interview.meetLink}`,
    date: new Date().toISOString().split('T')[0],
    sentBy: "Build2Hire Admin Board"
  });
  dbSave(db);
  adminLogActivity("Interview Notification Sent", `Sent notification for interview #${interviewId} to ${interview.candidateName}`, interview.candidateName);
  return true;
}

function adminSaveCourseCategory(catData) {
  const db = dbGet();
  if (!db.academy_custom_courses) db.academy_custom_courses = {};
  db.academy_custom_courses[catData.id] = {
    id: catData.id,
    title: catData.title,
    isPublished: catData.isPublished !== false
  };
  dbSave(db);
  adminLogActivity("Academy Course Saved", `Saved course category: ${catData.title}`, catData.title);
  return true;
}

function adminDeleteCourseCategory(catId) {
  const db = dbGet();
  if (db.academy_custom_courses && db.academy_custom_courses[catId]) {
    delete db.academy_custom_courses[catId];
    dbSave(db);
    adminLogActivity("Academy Course Deleted", `Deleted course category #${catId}`, catId);
    return true;
  }
  return false;
}

function adminTogglePublishCourse(catId) {
  const db = dbGet();
  if (!db.academy_course_pub_states) db.academy_course_pub_states = {};
  db.academy_course_pub_states[catId] = !(db.academy_course_pub_states[catId] === true);
  const state = db.academy_course_pub_states[catId];
  dbSave(db);
  adminLogActivity("Academy Course Publish Toggled", `Course #${catId} is now ${state ? 'Published' : 'Unpublished'}`, catId);
  return state;
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

function adminResetCandidateAttempts(candidateId) {
  const db = dbGet();
  const cand = db.users.find(u => String(u.id) === String(candidateId));
  if (!cand) return false;
  cand.quiz_attempts = {};
  dbSave(db);
  adminLogActivity("Quiz Retakes Reset", `Reset retake attempt limit for candidate #${candidateId}`, cand.fullName || cand.email);
  return cand;
}

function adminGenerateCertificate(certData) {
  const db = dbGet();
  const cand = db.users.find(u => String(u.id) === String(certData.candidateId));
  if (!cand) return false;

  if (!cand.certificates) cand.certificates = [];
  const newCert = {
    serial_no: certData.serial_no || `B2H-CERT-${Date.now().toString(36).toUpperCase()}`,
    title: certData.title || "Certified Senior Software Architect",
    date: certData.date || new Date().toLocaleDateString(),
    score: Number(certData.score || 95)
  };

  cand.certificates.unshift(newCert);
  dbSave(db);
  adminLogActivity("Certificate Generated", `Generated cert "${newCert.title}" for ${cand.fullName || cand.email}`, newCert.serial_no);
  return newCert;
}

function adminRevokeCertificate(candidateId, serialNo) {
  const db = dbGet();
  let cand = null;
  
  if (candidateId) {
    cand = db.users.find(u => String(u.id) === String(candidateId));
  }
  
  // Fallback search across all candidates for matching certificate
  if (!cand || !cand.certificates) {
    cand = db.users.find(u => u.certificates && u.certificates.some(c => String(c.serial_no) === String(serialNo) || String(c.serialNo) === String(serialNo) || String(c.id) === String(serialNo)));
  }

  if (!cand || !cand.certificates) return false;

  const idx = cand.certificates.findIndex(c => String(c.serial_no) === String(serialNo) || String(c.serialNo) === String(serialNo) || String(c.id) === String(serialNo));
  if (idx === -1) return false;

  const revoked = cand.certificates.splice(idx, 1)[0];
  dbSave(db);
  adminLogActivity("Certificate Revoked", `Revoked certificate #${serialNo} from ${cand.fullName || cand.email}`, serialNo);
  return revoked;
}

function adminSaveAIRules(rules) {
  const db = dbGet();
  db.ai_recommendation_rules = {
    skillWeight: Number(rules.skillWeight || 40),
    xpWeight: Number(rules.xpWeight || 30),
    scoreWeight: Number(rules.scoreWeight || 30),
    autoRecommend: rules.autoRecommend !== false
  };
  dbSave(db);
  adminLogActivity("AI Matching Rules Updated", `Updated AI weights: Skill ${rules.skillWeight}%, XP ${rules.xpWeight}%, Score ${rules.scoreWeight}%`, "AI Engine");
  return db.ai_recommendation_rules;
}

function adminSendDirectNotif(userId, message) {
  const db = dbGet();
  const user = db.users.find(u => String(u.id) === String(userId));
  if (!user) return false;

  if (!db.broadcasts) db.broadcasts = [];
  db.broadcasts.unshift({
    id: `notif_${Date.now()}`,
    target: `${user.fullName || user.email} (ID #${user.id})`,
    message: message,
    date: new Date().toISOString().split('T')[0],
    sentBy: "Build2Hire Admin Board"
  });
  dbSave(db);
  adminLogActivity("Direct Notification Sent", `Sent message to ${user.fullName || user.email}`, user.email);
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

function adminRestoreDBFromJSON(jsonString) {
  try {
    const parsedData = JSON.parse(jsonString);
    if (!parsedData.users || !Array.isArray(parsedData.users)) {
      throw new Error("Invalid database JSON structure. Missing users array.");
    }
    localStorage.setItem('build2hire_db_backup', localStorage.getItem('build2hire_db') || '');
    localStorage.setItem('build2hire_db', JSON.stringify(parsedData));
    adminLogActivity("Database Restored", "Restored system database from JSON backup file", "System Backup");
    return true;
  } catch (err) {
    console.error("Database Restore Error:", err);
    return false;
  }
}

function adminSavePlatformSettings(settings) {
  const db = dbGet();
  db.platform_settings = {
    platformName: settings.platformName || "Build2Hire Platform",
    domain: settings.domain || "build2hire.com",
    supportEmail: settings.supportEmail || "support@build2hire.com",
    maintenanceMode: settings.maintenanceMode === 'enabled'
  };
  dbSave(db);
  adminLogActivity("Platform Settings Saved", `Updated settings: ${settings.platformName}`, "System Governance");
  return db.platform_settings;
}

function adminSaveRolePermissions(permissions) {
  const db = dbGet();
  db.role_permissions = permissions;
  dbSave(db);
  adminLogActivity("Role Permissions Updated", "Updated Candidate, Recruiter, and Admin role privileges", "Security Control");
  return db.role_permissions;
}

function adminSaveEmailTemplates(templates) {
  const db = dbGet();
  db.email_templates = templates;
  dbSave(db);
  adminLogActivity("Email Templates Updated", "Saved Candidate Welcome, Interview Schedule, and Status templates", "Email Dispatcher");
  return db.email_templates;
}

function adminSaveSecuritySettings(sec) {
  const db = dbGet();
  db.security_settings = {
    sessionTimeout: Number(sec.sessionTimeout || 30),
    require2FA: sec.require2FA === true,
    passwordPolicy: sec.passwordPolicy || "Strong (Min 8 chars, numbers, symbols)"
  };
  dbSave(db);
  adminLogActivity("Security Policies Updated", `Session Timeout ${sec.sessionTimeout}m | 2FA ${sec.require2FA ? 'Enabled' : 'Disabled'}`, "Security Control");
  return db.security_settings;
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

// Global Course Video Database (Multi-level & Multi-language)
const COURSE_VIDEO_DATA = {
  frontend: {
    title: "Frontend Frameworks & UI Architecture",
    category: "frontend",
    levels: {
      beginner: {
        title: "Beginner: HTML5 & CSS Layout Fundamentals",
        desc: "Learn core HTML tags, CSS Flexbox, Grid, CSS Variables, and responsive design basics.",
        videos: {
          english: { title: "HTML & CSS Full Beginner Course (English)", embedId: "a_iQb1lnAEQ", source: "YouTube" },
          tamil: { title: "HTML & CSS Complete Tutorial (Tamil)", embedId: "FYErehuSuuw", source: "YouTube" },
          hindi: { title: "HTML & CSS One Shot Course (Hindi)", embedId: "hlGoQC332VM", source: "YouTube" }
        },
        topics: ["HTML5 Semantic Tags", "CSS Flexbox & Grid", "CSS Custom Variables", "Responsive Web Design"]
      },
      mid: {
        title: "Mid-Level: Modern JavaScript DOM & React Hooks",
        desc: "Master ES6+ JavaScript, DOM events, state management, components, and React hooks.",
        videos: {
          english: { title: "React JS Full Course 2024 (English)", embedId: "SqcY0GlETPk", source: "YouTube" },
          tamil: { title: "React JS Full Course (Tamil)", embedId: "01bEb7R-F4s", source: "YouTube" },
          hindi: { title: "React JS Complete Course (Hindi)", embedId: "tiLWCNFzThE", source: "YouTube" }
        },
        topics: ["ES6 Array Methods", "React useState & useEffect", "Component Lifecycle", "REST Data Fetching"]
      },
      advanced: {
        title: "Advanced: Next.js SSR, Performance & State Architecture",
        desc: "Master Next.js App Router, Server Components, SSG/SSR, and performance optimization.",
        videos: {
          english: { title: "Next.js 14 Full Stack Course (English)", embedId: "aEFkWxUNAVc", source: "YouTube" },
          tamil: { title: "Next.js Full Course (Tamil)", embedId: "7dSJubxFWv0", source: "YouTube" },
          hindi: { title: "Next.js Full Course (Hindi)", embedId: "1I6Ta_cL7p8", source: "YouTube" }
        },
        topics: ["Server Side Rendering (SSR)", "Next.js App Router", "State Hydration & Memoization", "SEO & Web Vitals"]
      }
    }
  },
  backend: {
    title: "Backend Engineering & API Architectures",
    category: "backend",
    levels: {
      beginner: {
        title: "Beginner: Node.js & HTTP Basics",
        desc: "Understand HTTP methods, request headers, event loops, and basic Node.js servers.",
        videos: {
          english: { title: "Node.js Basics for Beginners (English)", embedId: "Oe421EPjeBE", source: "YouTube" },
          tamil: { title: "Node.js Tutorial for Beginners (Tamil)", embedId: "vZY5Ap5Bsp8", source: "YouTube" },
          hindi: { title: "Node.js Complete Course (Hindi)", embedId: "BLl32FvcdVM", source: "YouTube" }
        },
        topics: ["Node.js Runtime", "HTTP Requests & Responses", "File System API", "Package Management"]
      },
      mid: {
        title: "Mid-Level: Express REST APIs & Authentication",
        desc: "Build Express middleware, RESTful API endpoints, JWT authentication, and error handling.",
        videos: {
          english: { title: "Express.js REST API Masterclass (English)", embedId: "l8WPWK9mS5M", source: "YouTube" },
          tamil: { title: "Express.js API Tutorial (Tamil)", embedId: "SdyzXQoQO18", source: "YouTube" },
          hindi: { title: "Express.js REST API Course (Hindi)", embedId: "BLl32FvcdVM", source: "YouTube" }
        },
        topics: ["Express Router", "Middleware Chain", "JWT Auth Tokens", "Input Validation"]
      },
      advanced: {
        title: "Advanced: Microservices, Redis Caching & System Scaling",
        desc: "Implement Redis query caches, Docker containers, load balancers, and rate limiting.",
        videos: {
          english: { title: "System Design & Redis Caching (English)", embedId: "Hbt56gFj998", source: "YouTube" },
          tamil: { title: "Microservices Architecture (Tamil)", embedId: "vZY5Ap5Bsp8", source: "YouTube" },
          hindi: { title: "System Design & Microservices (Hindi)", embedId: "rr9cI4u1_88", source: "YouTube" }
        },
        topics: ["Redis In-Memory Caching", "Docker Containerization", "Rate Limiting & Security", "Event-Driven Architecture"]
      }
    }
  },
  database: {
    title: "Database Schema & Query Optimization",
    category: "database",
    levels: {
      beginner: {
        title: "Beginner: Relational Databases & Basic SQL",
        desc: "Learn tables, primary keys, foreign keys, SELECT, INSERT, UPDATE, and DELETE statements.",
        videos: {
          english: { title: "SQL Tutorial for Beginners (English)", embedId: "HXV3zeQKqGY", source: "YouTube" },
          tamil: { title: "SQL Full Course in Tamil", embedId: "QvTo1_-n0UE", source: "YouTube" },
          hindi: { title: "SQL One Shot Tutorial (Hindi)", embedId: "hlGoQC332VM", source: "YouTube" }
        },
        topics: ["Tables & Data Types", "Primary & Foreign Keys", "CRUD Operations", "WHERE Filters"]
      },
      mid: {
        title: "Mid-Level: SQL Joins, Indexing & Normalization",
        desc: "Master table joins, B-Tree indexes, database normalization, and query performance tuning.",
        videos: {
          english: { title: "SQL Joins & Index Tuning (English)", embedId: "7S_tz1z_5bA", source: "YouTube" },
          tamil: { title: "SQL Joins & Indexing (Tamil)", embedId: "tcjcjHX9wcA", source: "YouTube" },
          hindi: { title: "Database Indexing & Joins (Hindi)", embedId: "hlGoQC332VM", source: "YouTube" }
        },
        topics: ["INNER, LEFT & RIGHT Joins", "Composite Indexing", "Database Normalization (3NF)", "Query Execution Plans"]
      },
      advanced: {
        title: "Advanced: NoSQL MongoDB Aggregations & Sharding",
        desc: "Build MongoDB aggregation pipelines, document schemas, replication sets, and caching strategies.",
        videos: {
          english: { title: "MongoDB Aggregations & Schemas (English)", embedId: "c2M-rlkkT5o", source: "YouTube" },
          tamil: { title: "MongoDB Full Course (Tamil)", embedId: "oY-0v7w-Ac8", source: "YouTube" },
          hindi: { title: "MongoDB Complete Tutorial (Hindi)", embedId: "hlGoQC332VM", source: "YouTube" }
        },
        topics: ["Document Schema Design", "Aggregation Pipelines ($match, $group)", "Sharding & Replication", "Cache Invalidation"]
      }
    }
  },
  creative: {
    title: "Creative Media & Video Editing",
    category: "creative",
    levels: {
      beginner: {
        title: "Beginner: Video Editing Basics & Timeline Cutting",
        desc: "Master timeline clip cutting, transitions, aspect ratios, and basic audio overlays.",
        videos: {
          english: { title: "Premiere Pro Full Course (English)", embedId: "xDq3ij-oHJA", source: "YouTube" },
          tamil: { title: "Video Editing Full Course (Tamil)", embedId: "CWRmhiwYGxg", source: "YouTube" },
          hindi: { title: "Premiere Pro Full Course (Hindi)", embedId: "D-dDSwuSUvQ", source: "YouTube" }
        },
        topics: ["Timeline Mechanics", "Clip Cutting & Trimming", "Basic Transitions", "Audio Alignment"]
      },
      mid: {
        title: "Mid-Level: Color Grading & Audio Mixing",
        desc: "Learn Lumetri color wheels, LUT presets, J-cuts/L-cuts, ambient audio design, and subtitle overlays.",
        videos: {
          english: { title: "Premiere Pro Color Grading (English)", embedId: "1wZym4fQGig", source: "YouTube" },
          tamil: { title: "Premiere Pro Color Grading (Tamil)", embedId: "s9GAf2u2LXI", source: "YouTube" },
          hindi: { title: "Color Grading Masterclass (Hindi)", embedId: "GoODO9xWV38", source: "YouTube" }
        },
        topics: ["Color Wheel Balances", "LUT Grading Curves", "J-Cut & L-Cut Transitions", "Sound FX & Noise Reduction"]
      },
      advanced: {
        title: "Advanced: High-Efficiency Codecs & Motion Graphics",
        desc: "Export 1080p/4K web videos using H.264/HEVC codecs, variable bitrates (VBR), and motion graphics.",
        videos: {
          english: { title: "After Effects & Motion Graphics (English)", embedId: "PWvPbGWVRrU", source: "YouTube" },
          tamil: { title: "After Effects Motion Graphics (Tamil)", embedId: "FmLbOOPKIe0", source: "YouTube" },
          hindi: { title: "After Effects Full Course (Hindi)", embedId: "Xv8JBXPgeI8", source: "YouTube" }
        },
        topics: ["Web Codecs (H.264 vs HEVC)", "Variable Bit Rate (VBR)", "Hardware Acceleration", "Promo Render Specs"]
      }
    }
  },
  devops: {
    title: "Cloud & DevOps Security",
    category: "devops",
    levels: {
      beginner: {
        title: "Beginner: Docker & Containerization Basics",
        desc: "Learn Docker fundamentals, writing Dockerfiles, image layers, and running containers.",
        videos: {
          english: { title: "Docker Tutorial for Beginners (English)", embedId: "pTFZFxd4hOI", source: "YouTube" },
          tamil: { title: "Docker Full Course (Tamil)", embedId: "99wj94_uyG4", source: "YouTube" },
          hindi: { title: "Docker One Shot Tutorial (Hindi)", embedId: "rr9cI4u1_88", source: "YouTube" }
        },
        topics: ["Container Architecture", "Dockerfile Instructions", "Docker Run & Port Mapping", "Container Logs & Shells"]
      },
      mid: {
        title: "Mid-Level: AWS Deployments & CI/CD Pipelines",
        desc: "Automate build deployments with GitHub Actions, EC2 servers, and automated pipelines.",
        videos: {
          english: { title: "AWS & DevOps CI/CD Course (English)", embedId: "pTFZFxd4hOI", source: "YouTube" },
          tamil: { title: "AWS Cloud & DevOps (Tamil)", embedId: "99wj94_uyG4", source: "YouTube" },
          hindi: { title: "DevOps & GitHub Actions (Hindi)", embedId: "7fjOw8ApZ1I", source: "YouTube" }
        },
        topics: ["GitHub Actions Workflows", "AWS EC2 Deployment", "Nginx Reverse Proxy", "SSL & Domain Setup"]
      },
      advanced: {
        title: "Advanced: Cloud Security & Infrastructure as Code",
        desc: "Master Terraform, Kubernetes orchestration, IAM policies, and cloud security hardening.",
        videos: {
          english: { title: "Kubernetes & Cloud Security (English)", embedId: "X48VuDVv0do", source: "YouTube" },
          tamil: { title: "Kubernetes Tutorial (Tamil)", embedId: "99wj94_uyG4", source: "YouTube" },
          hindi: { title: "Kubernetes & Terraform (Hindi)", embedId: "7fjOw8ApZ1I", source: "YouTube" }
        },
        topics: ["Kubernetes Clusters", "Terraform IaC", "AWS IAM Security Guards", "Zero Trust Architecture"]
      }
    }
  },
  system: {
    title: "System Design & Scaling Architecture",
    category: "system",
    levels: {
      beginner: {
        title: "Beginner: Scalability Basics & Load Balancing",
        desc: "Learn horizontal vs vertical scaling, load balancer algorithms, and stateless server design.",
        videos: {
          english: { title: "System Design Basics (English)", embedId: "xpDnVSmNFX0", source: "YouTube" },
          tamil: { title: "System Design Basics in Tamil (Karthik's Show)", embedId: "kvEAN1wgwJY", source: "YouTube" },
          hindi: { title: "System Design Roadmap & HLD Basics (Apna College)", embedId: "CuQmQpvw04I", source: "YouTube" }
        },
        topics: ["Horizontal vs Vertical Scaling", "Nginx & HAProxy Balancing", "Stateless Architecture", "CDN Distribution"]
      },
      mid: {
        title: "Mid-Level: Caching Strategies & Database Sharding",
        desc: "Master Redis caching patterns (Cache-Aside, Write-Through), database partitioning, and indexes.",
        videos: {
          english: { title: "Database Sharding & Caching (English)", embedId: "m8Icp_Cid5o", source: "YouTube" },
          tamil: { title: "HLD & LLD Caching Strategies in Tamil", embedId: "R0xO1-ytchY", source: "YouTube" },
          hindi: { title: "Caching & Database Sharding in Hindi", embedId: "SGQVY7bi2mY", source: "YouTube" }
        },
        topics: ["Redis Cache Patterns", "Consistent Hashing", "Database Read Replicas", "Database Sharding"]
      },
      advanced: {
        title: "Advanced: Message Queues & Distributed Systems",
        desc: "Design event-driven architectures using RabbitMQ/Kafka, rate limiting, and CAP theorem trade-offs.",
        videos: {
          english: { title: "Distributed Systems & Kafka (English)", embedId: "xpDnVSmNFX0", source: "YouTube" },
          tamil: { title: "Distributed Systems & Microservices in Tamil", embedId: "Kboih3tCkbI", source: "YouTube" },
          hindi: { title: "Distributed Systems & CAP Theorem in Hindi", embedId: "5XmZK5fls5w", source: "YouTube" }
        },
        topics: ["Kafka & RabbitMQ Messaging", "CAP Theorem", "Token Bucket Rate Limiting", "High Availability Clusters"]
      }
    }
  },
  security: {
    title: "Cybersecurity & Ethical Hacking",
    category: "security",
    levels: {
      beginner: {
        title: "Beginner: Web Vulnerabilities & OWASP Top 10",
        desc: "Learn core web security concepts, XSS sanitization, SQL injection prevention, and CSRF protection.",
        videos: {
          english: { title: "Cybersecurity & Web Defense (English)", embedId: "3Kq1MIfTWCE", source: "YouTube" },
          tamil: { title: "Ethical Hacking Course (Tamil)", embedId: "vh3WW3d0yxg", source: "YouTube" },
          hindi: { title: "Cyber Security Full Course (Hindi)", embedId: "mXjZQX3UzOs", source: "YouTube" }
        },
        topics: ["OWASP Top 10 Overview", "SQL Injection Guards", "Cross-Site Scripting (XSS)", "CSRF Tokens"]
      },
      mid: {
        title: "Mid-Level: Password Hashing & OAuth2 Authentication",
        desc: "Implement bcrypt/argon2 hashing, JWT signature verification, CORS headers, and OAuth2 login flows.",
        videos: {
          english: { title: "OAuth2 & JWT Security Masterclass (English)", embedId: "3Kq1MIfTWCE", source: "YouTube" },
          tamil: { title: "JWT & Web Security (Tamil)", embedId: "vgGgpCC0VsQ", source: "YouTube" },
          hindi: { title: "Authentication Security (Hindi)", embedId: "mXjZQX3UzOs", source: "YouTube" }
        },
        topics: ["Bcrypt Password Hashing", "JWT Signing Keys", "CORS Configuration", "OAuth2 & OIDC Flows"]
      },
      advanced: {
        title: "Advanced: Penetration Testing & Cryptography",
        desc: "Master network packet analysis (Wireshark), public/private key crypto, and security hardening.",
        videos: {
          english: { title: "Ethical Hacking & PenTesting (English)", embedId: "3Kq1MIfTWCE", source: "YouTube" },
          tamil: { title: "Penetration Testing (Tamil)", embedId: "vh3WW3d0yxg", source: "YouTube" },
          hindi: { title: "Ethical Hacking Full Course (Hindi)", embedId: "mXjZQX3UzOs", source: "YouTube" }
        },
        topics: ["Wireshark Packet Analysis", "RSA & AES Encryption", "Penetration Testing", "Security Headers Hardening"]
      }
    }
  },
  mobile: {
    title: "Mobile App Development",
    category: "mobile",
    levels: {
      beginner: {
        title: "Beginner: React Native & Mobile Layouts",
        desc: "Learn React Native CLI, Flexbox mobile layouts, navigation stacks, and basic components.",
        videos: {
          english: { title: "React Native Course for Beginners (English)", embedId: "0-S5a0eXPoc", source: "YouTube" },
          tamil: { title: "React Native Tutorial in Tamil (JVL code)", embedId: "UVZ5LGhiBkY", source: "YouTube" },
          hindi: { title: "React Native Crash Course in Hindi (Geeky Shows)", embedId: "9TFT9-gJvg0", source: "YouTube" }
        },
        topics: ["React Native Components", "Flexbox Mobile Layouts", "React Navigation Stack", "Device State"]
      },
      mid: {
        title: "Mid-Level: Flutter & State Management",
        desc: "Build cross-platform iOS & Android apps with Flutter, Dart language, and Provider/Bloc state management.",
        videos: {
          english: { title: "Flutter Full Course 2024 (English)", embedId: "VPvVD8t02U8", source: "YouTube" },
          tamil: { title: "Flutter Tutorial for Beginners in Tamil (JVL code)", embedId: "Vp4uaNbtNCg", source: "YouTube" },
          hindi: { title: "Flutter Complete Course in Hindi (WsCube Tech)", embedId: "1bQwDO88Gyw", source: "YouTube" }
        },
        topics: ["Dart Language Syntax", "Flutter Widget Tree", "State Management (Bloc/Provider)", "Native Camera/GPS APIs"]
      },
      advanced: {
        title: "Advanced: Native iOS/Android Bridges & App Store Publishing",
        desc: "Deploy production builds to Apple App Store & Google Play Console, native Swift/Kotlin bridges, and push notifications.",
        videos: {
          english: { title: "App Store Publishing & Native Bridges (English)", embedId: "0-S5a0eXPoc", source: "YouTube" },
          tamil: { title: "App Store & Play Store Deployment in Tamil", embedId: "UVZ5LGhiBkY", source: "YouTube" },
          hindi: { title: "App Store & Play Store Deployment in Hindi", embedId: "9TFT9-gJvg0", source: "YouTube" }
        },
        topics: ["Native Android/iOS Bridge", "CodePush Over-The-Air Updates", "App Store Connect & Play Console", "Push Notification Architecture"]
      }
    }
  },
  typescript: {
    title: "TypeScript Enterprise Applications",
    category: "typescript",
    levels: {
      beginner: {
        title: "Beginner: TypeScript Basics & Type Annotations",
        desc: "Learn primitive types, interfaces, type aliases, union types, and TypeScript compiler setup.",
        videos: {
          english: { title: "TypeScript Tutorial for Beginners (English)", embedId: "d56mG7DezGs", source: "YouTube" },
          tamil: { title: "TypeScript Basics Tutorial (Tamil)", embedId: "70KEMxrG8e4", source: "YouTube" },
          hindi: { title: "TypeScript Tutorial in Hindi (Thapa Technical)", embedId: "Xciunyug99U", source: "YouTube" }
        },
        topics: ["Type Annotations & Inferences", "Interfaces vs Type Aliases", "Union & Intersection Types", "tsconfig.json Configuration"]
      },
      mid: {
        title: "Mid-Level: Generics & Type Manipulation",
        desc: "Master TypeScript generics, utility types (Partial, Pick, Omit), enums, and class modifiers.",
        videos: {
          english: { title: "TypeScript Generics, Utility Types & Classes (English)", embedId: "BCg4U1FzODs", source: "YouTube" },
          tamil: { title: "TypeScript Generics, Enums & Classes (Tamil)", embedId: "70KEMxrG8e4", source: "YouTube" },
          hindi: { title: "TypeScript Course in 1 Shot (Chai aur Code)", embedId: "kvP6hDXWy88", source: "YouTube" }
        },
        topics: [
          "TypeScript Generics",
          "Utility Types (Partial, Pick, Omit)",
          "Enums",
          "Classes & Access Modifiers"
        ]
      },
      advanced: {
        title: "Advanced: Conditional Types & Enterprise Architecture",
        desc: "Build type-safe fullstack apps with conditional types, mapped types, type guards, and AST transformations.",
        videos: {
          english: { title: "Enterprise TypeScript Architecture (English)", embedId: "gieEQFIfgYc", source: "YouTube" },
          tamil: { title: "TypeScript Enterprise Design (Tamil)", embedId: "lK0X4K9ZFus", source: "YouTube" },
          hindi: { title: "Enterprise TypeScript Masterclass (Hindi)", embedId: "kvP6hDXWy88", source: "YouTube" }
        },
        topics: ["Conditional & Mapped Types", "Custom Type Guards", "Template Literal Types", "Monorepo Type Safety"]
      }
    }
  }
};

function getYouTubeVideoId(str) {
  if (!str) return 'G3e-cpL7ofc';
  str = String(str).trim();
  if (str.includes('v=')) {
    const match = str.match(/v=([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  }
  if (str.includes('youtu.be/')) {
    const match = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  }
  if (str.includes('embed/')) {
    const match = str.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
  }
  const match = str.match(/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  return str;
}

function getCourseVideoDatabase() {
  // Clear all old legacy cache keys from localStorage
  ['build2hire_course_videos', 'build2hire_course_videos_v2', 'build2hire_course_videos_v3', 'build2hire_course_videos_v4', 'build2hire_course_videos_v5', 'build2hire_course_videos_v6', 'build2hire_course_videos_v7', 'build2hire_course_videos_v8', 'build2hire_course_videos_v9', 'build2hire_course_videos_v10', 'build2hire_course_videos_v11', 'build2hire_course_videos_v12', 'build2hire_course_videos_v13', 'build2hire_course_videos_v14', 'build2hire_course_videos_v15', 'build2hire_course_videos_v16', 'build2hire_course_videos_v17', 'build2hire_course_videos_v18', 'build2hire_course_videos_v19'].forEach(k => {
    try { localStorage.removeItem(k); } catch(e) {}
  });

  const customDataStr = localStorage.getItem('build2hire_course_videos_v20');
  if (customDataStr) {
    try {
      return JSON.parse(customDataStr);
    } catch(e) {}
  }
  return COURSE_VIDEO_DATA;
}

// ==========================================
// 🚀 SEAMLESS WORKSPACE NAVIGATION ENGINE (SPA TRANSITION)
// ==========================================
let isSeamlessNavInitialized = false;

window.initSeamlessNavigation = function() {
  if (isSeamlessNavInitialized) return;
  isSeamlessNavInitialized = true;

  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link || !link.href) return;
    
    if (link.target === '_blank' || link.getAttribute('download') !== null) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    
    const targetUrl = link.getAttribute('href');
    if (!targetUrl || targetUrl.startsWith('#') || targetUrl.startsWith('javascript:')) return;
    
    const currentPath = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
    const targetPath = targetUrl.split('?')[0].split('/').pop();
    
    // Pages eligible for instant smooth SPA content transition
    const workspacePages = [
      'recruiter-dashboard.html',
      'agreement-builder.html',
      'chat.html',
      'leaderboard.html',
      'candidate-dashboard.html',
      'portfolio.html',
      'jobs.html',
      'freelance.html'
    ];
    
    if (workspacePages.includes(targetPath) && document.querySelector('main.main-content')) {
      if (targetPath === currentPath) return; // Same page
      e.preventDefault();
      window.navigateSeamlessly(targetUrl);
    }
  });

  window.addEventListener('popstate', function() {
    window.navigateSeamlessly(window.location.href, true);
  });
};

window.navigateSeamlessly = function(targetUrl, isPopState = false) {
  const mainContent = document.querySelector('main.main-content');
  if (!mainContent) {
    window.location.href = targetUrl;
    return;
  }

  // Smooth fade-out transition for main content container
  mainContent.style.transition = 'opacity 0.12s ease, transform 0.12s ease';
  mainContent.style.opacity = '0.35';
  mainContent.style.transform = 'translateY(4px)';

  fetch(targetUrl)
    .then(res => res.text())
    .then(htmlText => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const newMain = doc.querySelector('main.main-content');

      if (!newMain) {
        window.location.href = targetUrl;
        return;
      }

      if (!isPopState) {
        history.pushState(null, doc.title || document.title, targetUrl);
      }
      document.title = doc.title || document.title;

      const targetPath = targetUrl.split('?')[0].split('/').pop();
      
      // Update sidebar active link highlight instantly
      const sidebarLinks = document.querySelectorAll('#main-sidebar .sidebar-link');
      sidebarLinks.forEach(l => {
        const href = l.getAttribute('href');
        if (href && href.split('?')[0].split('/').pop() === targetPath) {
          l.classList.add('active');
        } else {
          l.classList.remove('active');
        }
      });

      // Update navbar active link highlight
      const navLinks = document.querySelectorAll('#main-nav .nav-link');
      navLinks.forEach(l => {
        const href = l.getAttribute('href');
        if (href && href.split('?')[0].split('/').pop() === targetPath) {
          l.classList.add('active');
        } else {
          l.classList.remove('active');
        }
      });

      // Swap main content seamlessly
      mainContent.innerHTML = newMain.innerHTML;

      // Extract and swap/inject page modals (.modal-overlay)
      const docModals = doc.querySelectorAll('.modal-overlay');
      docModals.forEach(m => {
        if (m.id) {
          const existing = document.getElementById(m.id);
          if (existing) {
            existing.parentNode.replaceChild(m.cloneNode(true), existing);
          } else {
            document.body.appendChild(m.cloneNode(true));
          }
        }
      });

      // Extract and inject inline page styles
      const styles = doc.querySelectorAll('style');
      styles.forEach(st => {
        const newStyle = document.createElement('style');
        newStyle.textContent = st.textContent;
        document.head.appendChild(newStyle);
      });

      // Extract and execute inline page scripts
      const scripts = doc.querySelectorAll('script');
      scripts.forEach(s => {
        if (s.src && s.src.includes('shared.js')) return;
        const newScript = document.createElement('script');
        if (s.src) {
          newScript.src = s.src;
        } else {
          // Convert top-level const/let auth declarations to var to prevent SyntaxError on SPA navigation
          let scriptBody = s.textContent.replace(/^\s*(const|let)\s+(auth|dbState|user|candidate)\s*=/gm, 'var $2 =');
          newScript.textContent = scriptBody;
        }
        document.body.appendChild(newScript);
      });

      // Re-trigger page initialization hooks if defined
      setTimeout(() => {
        if (typeof window.initializeBuilder === 'function' && targetPath === 'agreement-builder.html') {
          window.initializeBuilder();
        }
        if (typeof window.initializeInbox === 'function' && targetPath === 'chat.html') {
          window.initializeInbox();
        }
        if (typeof window.updateStats === 'function' && targetPath === 'recruiter-dashboard.html') {
          window.updateStats();
        }
        if (typeof window.switchTab === 'function' && targetPath === 'recruiter-dashboard.html') {
          window.switchTab('discover');
        }
      }, 30);

      // Smooth fade-in transition
      setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
      }, 50);
    })
    .catch(err => {
      console.error('Seamless navigation fallback:', err);
      window.location.href = targetUrl;
    });
};

function saveCourseVideoDatabase(data) {
  localStorage.setItem('build2hire_course_videos_v20', JSON.stringify(data));
}
