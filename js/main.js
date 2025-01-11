document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");

    if (!progressBar) {
        console.warn("Progress bar element not found.");
        return;
    }

    const updateProgressBar = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }
    };

    window.addEventListener("scroll", () => {
        window.requestAnimationFrame(updateProgressBar);
    });
});
