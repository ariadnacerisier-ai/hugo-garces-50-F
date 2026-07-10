(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".scroll-progress");
    const revealElements =
      document.querySelectorAll(".reveal, .stagger");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.14 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    const updateScroll = () => {
      if (!progressBar) return;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        maxScroll > 0
          ? window.scrollY / maxScroll
          : 0;

      progressBar.style.width =
        `${Math.min(progress * 100, 100)}%`;
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
  });
})();
