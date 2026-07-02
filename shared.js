// shared.js - Shared Header, Theme Toggle, Auth utilities

// Theme Management
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

// Auth: get user from localStorage
function getUser() {
  try {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  } catch { return null; }
}

// Render the header (call on every page after DOM ready)
function renderHeader() {
  const user = getUser();
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const dashLink = user
    ? `<a href="${user.role === 'recruiter' ? 'recruiter-dashboard.html' : 'candidate.html'}" class="btn btn-secondary" style="padding:0.5rem 1rem;font-size:0.85rem;">👤 ${user.fullName || 'Dashboard'}</a>
       <button onclick="handleLogout()" class="btn" style="padding:0.5rem 1rem;font-size:0.85rem;border:1px solid var(--danger);color:var(--danger);">Logout</button>`
    : `<a href="login.html" class="nav-link" style="font-size:0.95rem;">Sign In</a>
       <a href="register.html" class="btn btn-primary" style="padding:0.5rem 1.25rem;font-size:0.9rem;">Get Started</a>`;

  nav.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <a href="index.html" style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,var(--primary),var(--secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-family:var(--font-display);">Build2Hire</span>
      </a>
    </div>
    <nav style="display:flex;align-items:center;gap:1.5rem;">
      <ul class="nav-links">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="leaderboard.html" class="nav-link">Leaderboard</a></li>
        <li><a href="marketplace.html" class="nav-link">Marketplace</a></li>
      </ul>
      <div style="display:flex;align-items:center;gap:1rem;">
        <button id="theme-toggle" class="theme-toggle" onclick="toggleTheme()">☀️</button>
        <div style="display:flex;align-items:center;gap:0.75rem;">
          ${dashLink}
        </div>
      </div>
    </nav>
  `;

  initTheme();
}

// Logout
function handleLogout() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

// Show alert message
function showAlert(containerId, message, type = 'error') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="alert alert-${type}">${type === 'success' ? '✅' : '⚠️'} ${message}</div>`;
}
