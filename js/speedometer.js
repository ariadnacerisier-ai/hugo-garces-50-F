(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const valueElement = document.querySelector(".speedometer-value");
    if (!valueElement) return;

    let currentSpeed = 0;
    let targetSpeed = 0;

    const updateTarget = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        maxScroll > 0
          ? window.scrollY / maxScroll
          : 0;

      targetSpeed = Math.round(
        window.HGUtils.clamp(progress * 300, 0, 300)
      );
    };

    const animate = () => {
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      valueElement.textContent =
        String(Math.round(currentSpeed)).padStart(3, "0");

      window.requestAnimationFrame(animate);
    };

    updateTarget();
    animate();

    window.addEventListener("scroll", updateTarget, { passive: true });
  });
})();
