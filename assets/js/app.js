/**
 * Zemen Technologies Git & Workflows Portal Application Logic
 * Clean, fast, and lightweight DOM controller.
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
    if (toggleBtn) toggleBtn.textContent = 'Light';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (toggleBtn) toggleBtn.textContent = 'Dark';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('zemen-theme', 'light');
        toggleBtn.textContent = 'Dark';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('zemen-theme', 'dark');
        toggleBtn.textContent = 'Light';
      }
    });
  }
}

/* Track Filtering */
function initTrackFilters() {
  const pills = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.track-row');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      rows.forEach(row => {
        const category = row.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
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
    const rows = document.querySelectorAll('.track-row');

    rows.forEach(row => {
      const title = row.querySelector('.track-name')?.textContent.toLowerCase() || '';
      const desc = row.querySelector('.track-synopsis')?.textContent.toLowerCase() || '';
      const tags = row.querySelector('.tag-cluster')?.textContent.toLowerCase() || '';

      if (title.includes(query) || desc.includes(query) || tags.includes(query)) {
        row.style.display = 'grid';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

/* Copy to Clipboard */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn-action, .copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.code-cell-wrapper') || btn.closest('.code-box') || btn.parentElement;
      const text = parent?.querySelector('code')?.textContent || '';

      if (text) {
        navigator.clipboard.writeText(text.trim()).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied';
          btn.style.color = '#A51C30';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
          }, 1500);
        });
      }
    });
  });
}
