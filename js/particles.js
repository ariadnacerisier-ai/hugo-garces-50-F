(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".background-particles");

    if (
      !container ||
      window.HGUtils.prefersReducedMotion() ||
      window.HGUtils.isMobile()
    ) {
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let index = 0; index < 26; index += 1) {
      const particle = document.createElement("span");
      const size = Math.random() * 2 + 1;
      const duration = Math.random() * 10 + 8;
      const delay = Math.random() * -18;

      particle.style.position = "absolute";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = "50%";
      particle.style.background =
        index % 6 === 0
          ? "rgba(201, 162, 39, .55)"
          : "rgba(255, 255, 255, .32)";
      particle.style.animation =
        `particleFloat ${duration}s linear ${delay}s infinite`;

      fragment.appendChild(particle);
    }

    container.appendChild(fragment);
  });
})();
