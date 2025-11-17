// js/ui/progress.js
// Single source of truth for the scroll progress bar UI
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.__progressBarInitialized) return; // guard against double init

  window.__progressBarInitialized = true;

  document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    const updateProgressBar = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
      }
    };

    // Initial update and on scroll
    updateProgressBar();
    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateProgressBar);
    });
  });
})();
