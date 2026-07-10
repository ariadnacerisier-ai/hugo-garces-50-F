(() => {
  "use strict";

  window.HGUtils = {
    clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    },

    prefersReducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },

    isMobile() {
      return window.matchMedia("(max-width: 768px)").matches;
    }
  };
})();
