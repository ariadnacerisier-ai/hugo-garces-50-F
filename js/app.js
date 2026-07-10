(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-scroll]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const selector = link.getAttribute("data-scroll");
        const target = document.querySelector(selector);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

    const form = document.querySelector("#rsvp-form");
    const status = document.querySelector("#form-status");

    if (form && status) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();

          status.textContent =
            "Revisa los campos obligatorios antes de continuar.";

          status.className =
            "form-status is-visible is-error";

          return;
        }

        const name =
          document.querySelector("#name")?.value.trim() || "Invitado";

        status.textContent =
          `${name}, tu asistencia ha sido registrada en esta vista. ` +
          "También puedes enviarla por WhatsApp con el botón inferior.";

        status.className =
          "form-status is-visible is-success";

        form.reset();
      });
    }
  });

  window.addEventListener("load", () => {
    const loader = document.querySelector("#loader");
    if (!loader) return;

    window.setTimeout(() => {
      loader.classList.add("is-hidden");

      window.setTimeout(() => {
        loader.remove();
      }, 900);
    }, 1200);
  });
})();
