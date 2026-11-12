/**
 * Zemen Technologies Git & Workflows Portal Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTrackFilters();
  initSearch();
  initCopyButtons();
});

/* Theme Handling */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('zemen-theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateThemeIcon('light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('zemen-theme', 'light');
        updateThemeIcon('light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('zemen-theme', 'dark');
        updateThemeIcon('dark');
      }
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

/* Track Filtering */
function initTrackFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.track-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Search Functionality */
function initSearch() {
  const searchInput = document.getElementById('track-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.track-card');

    cards.forEach(card => {
      const title = card.querySelector('.track-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.track-description')?.textContent.toLowerCase() || '';
      const topics = card.querySelector('.track-topics')?.textContent.toLowerCase() || '';

      if (title.includes(query) || desc.includes(query) || topics.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* Copy to Clipboard */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const codeTarget = btn.getAttribute('data-clipboard-target');
      let text = '';
      if (codeTarget) {
        text = document.querySelector(codeTarget)?.textContent || '';
      } else {
        const parent = btn.closest('.code-box') || btn.closest('pre');
        text = parent?.querySelector('code')?.textContent || parent?.textContent || '';
      }

      text = text.trim();
      navigator.clipboard.writeText(text).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check" style="color: #10B981;"></i>';
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 1800);
      });
    });
  });
}
