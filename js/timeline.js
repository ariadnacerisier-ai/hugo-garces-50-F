(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#timeline");
    if (!section) return;

    const items = Array.from(section.querySelectorAll(".timeline-item"));
    const progressBar = section.querySelector(".timeline-progress");
    const car = section.querySelector(".timeline-car");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          items.forEach((item) => item.classList.remove("active"));
          entry.target.classList.add("active");

          const index = items.indexOf(entry.target);
          const progress = ((index + 1) / items.length) * 100;

          if (progressBar) progressBar.style.height = `${progress}%`;
          if (car) car.style.top = `${Math.min(progress, 96)}%`;
        });
      },
      { threshold: 0.45 }
    );

    items.forEach((item) => observer.observe(item));
  });
})();
