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
    fullName: "Alex Rivera",
    role: "candidate",
    phone: "+1 (555) 019-2834",
    bio: "Full Stack Engineer passionate about UI aesthetics and robust database architectures. Building modular platforms.",
    githubUrl: "https://github.com/alexrivera",
    linkedinUrl: "https://linkedin.com/in/alexrivera",
    portfolioWebsite: "https://alexrivera.vercel.app",
    skills: ["React", "CSS Variables", "JavaScript", "HTML", "Next.js", "TailwindCSS"],
    skillLevels: { "React": "Advanced", "CSS Variables": "Advanced", "JavaScript": "Medium", "HTML": "Advanced", "Next.js": "Basic", "TailwindCSS": "Basic" },
    profileCompleted: true,
    xp_points: 4800,
    level: 4,
    talent_score: 95,
    portfolio_score: 98,
    challenge_score: 92,
    assessment_score: 95,
    preferredRole: "Frontend Developer",
    certificates: [
      { id: 1, title: "Frontend Frameworks Certificate", score: 95, date: "2026-07-01" }
    ]
  },
  {
    id: 1002,
    email: "sarah@build2hire.com",
    fullName: "Sarah Chen",
    role: "candidate",
    phone: "+1 (555) 019-5566",
    bio: "Backend developer specializing in NodeJS, API designs, and scalable cloud architectures.",
    githubUrl: "https://github.com/sarahchen",
    linkedinUrl: "https://linkedin.com/in/sarahchen",
    portfolioWebsite: "https://sarahchen.dev",
    skills: ["React", "JavaScript", "PHP", "MySQL", "Node.js"],
    skillLevels: { "React": "Basic", "JavaScript": "Advanced", "PHP": "Medium", "MySQL": "Medium", "Node.js": "Medium" },
    profileCompleted: true,
    xp_points: 4200,
    level: 4,
    talent_score: 92,
    portfolio_score: 94,
    challenge_score: 90,
    assessment_score: 93,
    preferredRole: "Backend Engineer",
    certificates: [
      { id: 2, title: "Backend Systems Certificate", score: 93, date: "2026-07-02" }
    ]
  },
  {
    id: 1003,
    email: "marcus@build2hire.com",
    fullName: "Marcus Aurelius",
    role: "candidate",
    phone: "+1 (555) 019-7788",
    bio: "Systems architect. Stoic programmer. Focusing on low-level databases and index optimizations.",
    githubUrl: "https://github.com/marcus",
    linkedinUrl: "https://linkedin.com/in/marcus",
    portfolioWebsite: "https://marcus.dev",
    skills: ["HTML", "CSS Variables", "MySQL", "Database"],
    skillLevels: { "HTML": "Medium", "CSS Variables": "Basic", "MySQL": "Medium", "Database": "Medium" },
    profileCompleted: true,
    xp_points: 3800,
    level: 3,
    talent_score: 88,
    portfolio_score: 87,
    challenge_score: 89,
    assessment_score: 90,
    preferredRole: "Database Administrator",
    certificates: []
  },
  {
    id: 1005,
    email: "david@build2hire.com",
    fullName: "David Kim",
    role: "candidate",
    phone: "+1 (555) 019-9999",
    bio: "Creative Video Editor with a knack for pacing, rhythm, and color grading. Telling stories through visual media.",
    githubUrl: "",
    linkedinUrl: "https://linkedin.com/in/davidkim",
    portfolioWebsite: "https://davidkim.media",
    skills: ["Premiere Pro", "After Effects", "Color Grading"],
    skillLevels: { "Premiere Pro": "Advanced", "After Effects": "Advanced", "Color Grading": "Medium" },
    profileCompleted: true,
    xp_points: 2100,
    level: 2,
    talent_score: 85,
    portfolio_score: 88,
    challenge_score: 83,
    assessment_score: 85,
    preferredRole: "Video Editor",
    certificates: []
  },
  {
    id: 1006,
    email: "emily@build2hire.com",
    fullName: "Emily Rodriguez",
    role: "candidate",
    phone: "+1 (555) 019-1122",
    bio: "Full Stack Engineer obsessed with performance. I build things that scale gracefully from day one.",
    githubUrl: "https://github.com/emilyrod",
    linkedinUrl: "https://linkedin.com/in/emilyrod",
    portfolioWebsite: "https://emily.dev",
    skills: ["React", "Node.js", "PostgreSQL", "Next.js"],
    skillLevels: { "React": "Advanced", "Node.js": "Advanced", "PostgreSQL": "Medium", "Next.js": "Medium" },
    profileCompleted: true,
    xp_points: 5200,
    level: 4,
    talent_score: 97,
    portfolio_score: 96,
    challenge_score: 98,
    assessment_score: 97,
    preferredRole: "Full Stack Engineer",
    certificates: [
      { id: 3, title: "Full Stack Excellence", score: 98, date: "2026-07-05" }
    ]
  },
  {
    id: 1004,
    email: "recruiter@innovatetech.com",
    fullName: "Jane Recruiter",
    role: "recruiter",
    companyName: "InnovateTech",
    jobTitle: "Hiring Manager"
  }
];

const DEFAULT_SUBMISSIONS = [
  { id: 2001, candidate_id: 1001, candidate_name: "Alex Rivera", challenge_id: 1, challenge_title: "Custom Video Editor Dashboard UI", talent_score: 95, current_level: "Elite Talent", status: "pending", description: "Created an in-browser timeline drop zone with canvas timeline rendering and responsive grid views.", github_url: "https://github.com/alexrivera/timeline", submission_url: "https://timeline-demo.vercel.app" },
  { id: 2002, candidate_id: 1002, candidate_name: "Sarah Chen", challenge_id: 2, challenge_title: "Video Editor Specs Assessment", talent_score: 92, current_level: "Elite Talent", status: "pending", description: "Edited the 2-minute promotional clip with clean overlays and high compression format.", github_url: "", submission_url: "https://vimeo.com/sarahvid" }
];

const DEFAULT_APPLICATIONS = [
  { id: 3001, candidate_id: 1001, candidate_name: "Alex Rivera", challenge_id: 1, challenge_title: "Custom Video Editor Dashboard UI", talent_score: 95, status: "applied" },
  { id: 3002, candidate_id: 1002, candidate_name: "Sarah Chen", challenge_id: 2, challenge_title: "Video Editor Specs Assessment", talent_score: 92, status: "shortlisted" }
];

const DEFAULT_INTERVIEWS = [
  { id: 4001, candidate_id: 1003, candidate_name: "Marcus Aurelius", challenge_title: "Custom Video Editor Dashboard UI", scheduled_at: "2026-07-10T15:00:00", location_url: "https://meet.google.com/xyz-abc-def", notes: "Review timeline grid coding details." }
];

// Seed and fetch Mock DB
function dbGet() {
  function tryParse(dataStr) {
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

  let db = localStorage.getItem('build2hire_db');
  let parsed = tryParse(db);

  if (!parsed) {
    // Attempt recovery from backup
    let backup = localStorage.getItem('build2hire_db_backup');
    parsed = tryParse(backup);
    if (parsed) {
      console.warn("Recovered database from backup.");
    }
  }
  
  if (!parsed) {
    parsed = {};
  }
  
  let updated = false;
  if (!parsed.users || parsed.users.length === 0) {
    parsed.users = DEFAULT_USERS;
    updated = true;
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
  } catch (e) {
    console.error("Failed to save database:", e);
  }
}

// User helper: Fetch from database by matching session details
function getUser() {
  try {
    const session = sessionStorage.getItem('user');
    if (!session) return null;
    const sessionUser = JSON.parse(session);
    const db = dbGet();
    const latestUser = db.users.find(u => u.email.toLowerCase() === sessionUser.email.toLowerCase());
    
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
  
  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'recruiter') window.location.href = "recruiter-dashboard.html";
    else window.location.href = "portfolio.html";
    return null;
  }
  
  renderHeader();
  const path = window.location.pathname.split('/').pop() || "index.html";
  if (typeof renderSidebar === 'function') {
    // If the page has a sidebar container, render it
    const sidebar = document.getElementById('sidebar-container');
    if (sidebar) renderSidebar(path);
  }
  
  const db = dbGet();
  let candidate = db.users.find(u => String(u.id) === String(user.id));
  if (!candidate) candidate = user;
  
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
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
  
  const mBtn = document.getElementById('m-theme-toggle');
  if (mBtn) mBtn.textContent = saved === 'dark' ? '☀️ Light' : '🌙 Dark';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
  
  const mBtn = document.getElementById('m-theme-toggle');
  if (mBtn) mBtn.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
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
    ? (user.role === 'recruiter' ? 'recruiter-dashboard.html' : 'portfolio.html')
    : 'login.html';

  const userControls = user
    ? `<a href="${dashboardPage}" class="btn btn-secondary" style="padding:0.5rem 1rem;font-size:0.85rem;">👤 ${user.fullName || 'Dashboard'}</a>
       <button onclick="handleLogout()" class="btn" style="padding:0.5rem 1rem;font-size:0.85rem;border:1px solid var(--danger);color:var(--danger);background:transparent;">Logout</button>`
    : `<a href="login.html" class="nav-link" style="font-size:0.95rem;">Sign In</a>
       <a href="register.html" class="btn btn-primary" style="padding:0.5rem 1.25rem;font-size:0.9rem;">Get Started</a>`;

  nav.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <a href="index.html" style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); text-decoration: none; letter-spacing: -0.02em;">
        Build2<span style="color: var(--primary);">Hire</span>
      </a>
    </div>
    
    <!-- DESKTOP NAV -->
    <nav class="desktop-nav" style="display:flex;align-items:center;gap:1.5rem;">
      <ul class="nav-links">
        <li><a href="index.html" class="nav-link">Home</a></li>
        
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
      </ul>
      <div style="display:flex;align-items:center;gap:1rem;">
        <button id="theme-toggle" class="theme-toggle" onclick="toggleTheme()">☀️</button>
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
        <li><a href="index.html" onclick="toggleMobileMenu()">🏠 Home</a></li>
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
        ${user ? `<li><a href="${dashboardPage}" onclick="toggleMobileMenu()">👤 Dashboard (${user.role})</a></li>` : ''}
        <li style="border-top:1px solid var(--border-color); padding-top:1.5rem; display:flex; flex-direction:column; gap:1rem;">
          <button id="m-theme-toggle" class="btn btn-secondary" onclick="toggleTheme()" style="width:100%;">☀️ Light</button>
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

// Render Sidebar (App Shell)
function renderSidebar(activePage) {
  const sidebar = document.getElementById('main-sidebar');
  if (!sidebar) return;

  const user = getUser();
  if (!user) return; // Only render if logged in

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
              🏠 <span>Dashboard</span>
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
  const publicPages = ['index.html', 'login.html', 'register.html', ''];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Don't redirect if already on a public page
  if (publicPages.includes(currentPage)) return;

  // Detect a browser refresh using PerformanceNavigationTiming (modern) or legacy API
  let isRefresh = false;

  try {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      isRefresh = navEntries[0].type === 'reload';
    } else {
      // Fallback for older browsers
      isRefresh = performance.navigation && performance.navigation.type === 1;
    }
  } catch (e) {
    isRefresh = false;
  }

  if (isRefresh) {
    // Clear session on refresh — user must log in again
    sessionStorage.removeItem('user');
    window.location.replace('login.html');
  }
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
initRefreshRedirect();

// Kick off auto-logout on every page load
document.addEventListener('DOMContentLoaded', initAutoLogout);


// Self-Healing DB Trigger: Wipes empty or corrupted database cache to force re-seeding
try {
  const rawDb = localStorage.getItem('build2hire_db');
  if (rawDb) {
    const testParse = JSON.parse(rawDb);
    if (!testParse || !testParse.challenges || testParse.challenges.length === 0 || !testParse.users || testParse.users.length === 0 || !testParse.jobs || testParse.jobs.length === 0 || !testParse.users[0].preferredRole) {
      localStorage.removeItem('build2hire_db');
      console.warn("Corrupted/empty database cache detected and auto-wiped.");
    }
  }
} catch (e) {
  localStorage.removeItem('build2hire_db');
}

