
    const auth = withAuth(['candidate']);
    if (auth) {
      const { user, db, candidate } = auth;

      // Refresh XP Progress layout inside the sidebar
      function refreshSidebarStats() {
        document.getElementById('level-name').textContent = candidate.current_level || "Beginner Builder";
        document.getElementById('level-num').textContent = candidate.level || 1;
        document.getElementById('xp-current').textContent = candidate.xp_points || 0;

        let maxLvlXp = 1000;
        let minLvlXp = 0;
        if (candidate.level === 2) { minLvlXp = 1000; maxLvlXp = 2500; }
        else if (candidate.level === 3) { minLvlXp = 2500; maxLvlXp = 4000; }
        else if (candidate.level === 4) { minLvlXp = 4000; maxLvlXp = 6000; }

        const pct = Math.min(100, Math.max(5, ((candidate.xp_points - minLvlXp) / (maxLvlXp - minLvlXp)) * 100));
        setTimeout(() => {
          const fillEl = document.getElementById('xp-bar-fill');
          if (fillEl) fillEl.style.width = `${pct}%`;
        }, 100);
      }
      
      refreshSidebarStats();

      const candidateRole = candidate.preferredRole || "";
      
      // Floating AI matching notification toast launcher
      function triggerAINotification(role, jobCount) {
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: var(--bg-secondary);
          border: 1px solid var(--primary);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          z-index: 1000;
          animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          max-width: 380px;
        `;
        toast.innerHTML = `
          <div style="font-size: 1.8rem;">🤖</div>
          <div>
            <strong style="color: var(--primary); font-size: 0.9rem; display: block;">AI Engine Match!</strong>
            <span style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.3; display: block; margin-top: 0.15rem;">
              We found <strong>${jobCount}</strong> opportunities matching your role as <strong>${role}</strong>.
            </span>
          </div>
          <button onclick="this.parentElement.remove()" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-weight:bold; margin-left: auto; padding: 0.25rem;">✕</button>
        `;
        document.body.appendChild(toast);
        
        if (!document.getElementById('toast-animation-style')) {
          const style = document.createElement('style');
          style.id = 'toast-animation-style';
          style.textContent = `
            @keyframes slideInRight {
              from { transform: translateX(120%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `;
          document.head.appendChild(style);
        }

        setTimeout(() => {
          if (toast.parentElement) {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
          }
        }, 6000);
      }

      // Check profile onboarding status
      if (!candidate.profileCompleted || !candidateRole) {
        document.getElementById('locked-portal-state').style.display = "block";
        document.getElementById('portal-top-banner').style.display = "none";
        document.getElementById('ai-recom-banner').style.display = "none";
        document.getElementById('jobs-grid').style.display = "none";
        document.getElementById('ai-bonus-recom-section').style.display = "none";
      } else {
        document.getElementById('locked-portal-state').style.display = "none";
        document.getElementById('portal-top-banner').style.display = "flex";
        document.getElementById('ai-recom-banner').style.display = "flex";
        document.getElementById('jobs-grid').style.display = "grid";
        document.getElementById('ai-bonus-recom-section').style.display = "block";
        document.getElementById('user-matched-role').textContent = candidateRole;
        // Populate live job count
        const totalMatched = (db.jobs || []).filter(j => j.category.toLowerCase() === candidateRole.toLowerCase()).length;
        const aiCount = document.getElementById('ai-job-count');
        if (aiCount) aiCount.textContent = totalMatched;
      }

      // Load all jobs instead of strictly filtering
      let allJobs = db.jobs || [];
      let currentJobType = "Full-time";

      // RENDER JOBS
      function createJobCard(job, canApply) {
        const hasApplied = db.applications.some(app => app.candidate_id === candidate.id && app.job_id === job.id);
        const div = document.createElement('div');
        div.className = "card";
        div.style.cssText = "display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; gap: 1.25rem;";
        
        const skillsBadges = job.skills.map(s => `<span class="badge badge-secondary" style="font-size: 0.75rem;">${s}</span>`).join(" ");

        div.innerHTML = `
          <div>
            <div class="flex-between" style="align-items: flex-start;">
              <div>
                <span style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem;">${job.logo}</span>
                <h3 style="font-size: 1.2rem; font-family: var(--font-sans); font-weight: 700; margin-bottom: 0.25rem;">${job.title}</h3>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">by <strong>${job.company}</strong></span>
              </div>
              <div style="text-align: right; display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-end;">
                <span class="badge badge-primary">${job.location}</span>
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--success);">${job.salary}</span>
              </div>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 1rem; line-height: 1.5;">
              ${job.description}
            </p>
          </div>

          <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; display: flex; flex-direction: column; gap: 0.85rem;">
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
              ${skillsBadges}
            </div>
            ${canApply ? `
              <button onclick="window.openApplyModal(${job.id})" class="btn ${hasApplied ? 'btn-secondary' : 'btn-primary'}" style="width: 100%; justify-content: center; font-size: 0.85rem;" ${hasApplied ? 'disabled' : ''}>
                ${hasApplied ? 'Applied ✅' : 'Apply Now 🚀'}
              </button>
            ` : `<a href="recommendations.html" class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem;">Upgrade Skills to Apply</a>`}
          </div>
        `;
        return div;
      }

      function renderJobs(list) {
        const grid = document.getElementById('jobs-grid');
        grid.innerHTML = "";

        if (list.length === 0) {
          grid.innerHTML = `<div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);"><p>No jobs found for this category right now.</p></div>`;
        } else {
          list.forEach(job => {
            const card = createJobCard(job, true);
            grid.appendChild(card);
          });
        }

        // Hide the AI bonus section since we are now showing all jobs in the main grid
        if (document.getElementById('ai-bonus-recom-section')) {
          document.getElementById('ai-bonus-recom-section').style.display = "none";
        }
      }

      // FILTER JOBS
      window.filterJobs = function() {
        const search = document.getElementById('job-search').value.toLowerCase().trim();
        
        // Filter strictly by the current active category (matching candidate role) and the selected type (Job vs Freelance)
        let filtered = allJobs.filter(job => job.type === currentJobType);

        if (search) {
          filtered = filtered.filter(job => 
            job.title.toLowerCase().includes(search) || 
            job.company.toLowerCase().includes(search) || 
            job.skills.some(s => s.toLowerCase().includes(search))
          );
        }
        renderJobs(filtered);
      }

      // APPLICATION MODAL ACTIONS
      let selectedJobId = null;

      window.openApplyModal = function(jobId) {
        const job = allJobs.find(j => j.id === jobId);
        if (!job) return;

        selectedJobId = jobId;
        document.getElementById('modal-job-title').textContent = job.title;
        document.getElementById('modal-job-company').textContent = job.company;
        document.getElementById('apply-modal').style.display = "flex";
      }

      window.closeApplyModal = function() {
        document.getElementById('apply-modal').style.display = "none";
        document.getElementById('apply-form').reset();
        selectedJobId = null;
      }

      document.getElementById('apply-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!selectedJobId) return;

        const job = allJobs.find(j => j.id === selectedJobId);
        if (!job) return;

        const coverLetter = document.getElementById('coverLetter').value;
        const githubUrl = document.getElementById('githubUrl').value;
        const demoUrl = document.getElementById('demoUrl').value;

        // Add application to Mock DB applications array
        const dbState = dbGet();
        const newApp = {
          id: Date.now(),
          candidate_id: candidate.id,
          candidate_name: candidate.fullName,
          job_id: selectedJobId,
          challenge_title: `${job.title} (${job.company})`, // recruiter dashboard compatibility
          talent_score: candidate.talent_score || 50,
          status: "applied",
          cover_letter: coverLetter,
          github_url: githubUrl,
          demo_url: demoUrl
        };

        dbState.applications.unshift(newApp);

        // Create a submission record so recruiters can review this custom application
        const newSub = {
          id: Date.now(),
          candidate_id: candidate.id,
          candidate_name: candidate.fullName,
          challenge_id: selectedJobId,
          challenge_title: `${job.title} (${job.company})`,
          talent_score: candidate.talent_score || 50,
          current_level: candidate.current_level || 'Beginner Builder',
          status: "pending",
          description: coverLetter,
          github_url: githubUrl,
          submission_url: demoUrl
        };
        
        dbState.submissions.unshift(newSub);
        dbSave(dbState);

        closeApplyModal();

        // Refresh list to show disabled "Applied ✅" state
        const refreshedDb = dbGet();
        db.applications = refreshedDb.applications; // Sync active applications collection
        allJobs = (refreshedDb.jobs || []).filter(job => job.category.toLowerCase() === candidateRole.toLowerCase());
        window.filterJobs();

        // Trigger alerts and celebration
        showAlert('alert-container', `Your application for ${job.title} at ${job.company} was submitted! Recruiter alerted.`, 'success');
        
        // Trigger Confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      });
      // Load initial jobs
      window.filterJobs();
      if (candidate.profileCompleted && candidateRole) {
        const initialMatchCount = (db.jobs || []).filter(j => j.category.toLowerCase() === candidateRole.toLowerCase() && j.type === 'Full-time').length;
        triggerAINotification(candidateRole, initialMatchCount);
      }
    }
  