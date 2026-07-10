(() => {
  "use strict";

  const eventDate = new Date("2027-04-03T14:00:00-06:00").getTime();

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#countdown");
    if (!container) return;

    const elements = {
      days: container.querySelector("[data-days]"),
      hours: container.querySelector("[data-hours]"),
      minutes: container.querySelector("[data-minutes]"),
      seconds: container.querySelector("[data-seconds]")
    };

    const animateNumber = (element, value) => {
      if (!element) return;

      const formatted = String(value).padStart(2, "0");

      if (element.textContent === formatted) return;

      element.classList.add("tick");

      window.setTimeout(() => {
        element.textContent = formatted;
        element.classList.remove("tick");
      }, 120);
    };

    const update = () => {
      const distance = eventDate - Date.now();

      if (distance <= 0) {
        container.innerHTML = `
          <div class="race-mode">
            <h2>Lights out</h2>
            <p>La celebración ha comenzado.</p>
          </div>
        `;

        return false;
      }

      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const minutes = Math.floor((distance % 3600000) / 60000);
      const seconds = Math.floor((distance % 60000) / 1000);

      animateNumber(elements.days, days);
      animateNumber(elements.hours, hours);
      animateNumber(elements.minutes, minutes);
      animateNumber(elements.seconds, seconds);

      return true;
    };

    update();

    const interval = window.setInterval(() => {
      if (!update()) window.clearInterval(interval);
    }, 1000);
  });
})();
