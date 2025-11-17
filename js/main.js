// /js/main.js
// Deprecated: progress bar logic is centralized in js/ui/progress.js
// Keep as a no-op shim to avoid breaking pages still including main.js
(function () {
    if (typeof window === 'undefined') return;
    if (window.__progressBarInitialized) return;
    // If ui/progress.js was not loaded, initialize minimally here for compatibility
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
        updateProgressBar();
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateProgressBar);
        });
    });
})();
