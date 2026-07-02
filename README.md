# Build2Hire — Static HTML, CSS, and JS Showcase Platform

This repository contains the converted plain HTML/CSS/JS frontend of Build2Hire, optimised for high-performance static hosting on Vercel or locally within XAMPP.

## 📁 Repository Structure

- `index.html` — Homepage with Hero banners and features layout.
- `login.html` & `register.html` — Mock authentication portal.
- `marketplace.html` — Coding tasks/challenges with search filters and solution submissions.
- `leaderboard.html` — Verified talent ranks & score breakdown standings.
- `portfolio.html` — Interactive developer profile with dynamic projects creation and skill tagging.
- `recruiter-dashboard.html` — Shortlist candidate pipeline and Google Meet interview scheduler.
- `recommendations.html` — Engine mapping skills to jobs and roadmaps.
- `styles.css` — Global custom Indigo/Violet/Emerald styling tokens.
- `shared.js` — Shared navigation headers, dark theme manager, and user sessions.
- `categories/` — Category header covers.

## 🚀 How to Host

### Local Hosting (XAMPP / Live Server):
- Place this directory inside `/Applications/XAMPP/xamppfiles/htdocs/`.
- Open your browser and navigate to `http://localhost/Code/`.

### Hosting on Vercel:
- Deploy directly to Vercel via GitHub or using the CLI command inside this folder:
  ```bash
  vercel
  ```
- Rewriting clean URLs is enabled through `vercel.json`.
