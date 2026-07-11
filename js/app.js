(() => {
  "use strict";

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxVO7i3DXBs4sqQ1UsVZCKZWWxXE-TnXrGeep6hwZM4yiDkqPhr9Qf8t5__NjZ08Ihskw/exec";

  function hideLoader() {
    const loader = document.querySelector("#loader");

    if (!loader || loader.dataset.closing === "true") {
      return;
    }

    loader.dataset.closing = "true";
    loader.classList.add("is-hidden");

    window.setTimeout(() => {
      loader.remove();
    }, 900);
  }

  function showStatus(status, message, type) {
    status.textContent = message;
    status.className =
      `form-status is-visible is-${type}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    /* Navegación suave */
    document.querySelectorAll("[data-scroll]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const selector = link.getAttribute("data-scroll");
        const target = document.querySelector(selector);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

    /* Formulario RSVP */
    const form = document.querySelector("#rsvp-form");
    const status = document.querySelector("#form-status");

    if (form && status) {
      /*
       * Refuerzo la URL desde JavaScript. Así el formulario seguirá
       * funcionando aunque el atributo action sea modificado por error.
       */
      form.action = SCRIPT_URL;
      form.method = "POST";

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();

          showStatus(
            status,
            "Revisa los campos obligatorios antes de continuar.",
            "error"
          );

          return;
        }

        const button = form.querySelector(
          'button[type="submit"]'
        );

        if (!button || button.disabled) {
          return;
        }

        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = "Enviando...";

        status.textContent = "";
        status.className = "form-status";

        try {
          /*
           * Apps Script no devuelve encabezados CORS compatibles con
           * GitHub Pages. Por eso se usa no-cors; el envío sí llega a
           * doPost(), aunque el navegador no pueda leer su respuesta.
           */
          await fetch(SCRIPT_URL, {
            method: "POST",
            body: new FormData(form),
            mode: "no-cors"
          });

          showStatus(
            status,
            "Tu asistencia fue enviada correctamente. ¡Gracias!",
            "success"
          );

          form.reset();
        } catch (error) {
          console.error(
            "Error al enviar la confirmación:",
            error
          );

          showStatus(
            status,
            "No fue posible enviar la confirmación. Inténtalo nuevamente o utiliza WhatsApp.",
            "error"
          );
        } finally {
          button.disabled = false;
          button.textContent = originalText;
        }
      });
    }

    /*
     * Respaldo: evita que el sitio se quede detenido en
     * “Lights out” si una imagen tarda demasiado.
     */
    window.setTimeout(hideLoader, 3500);
  });

  /*
   * Cierre habitual del loader cuando termina de cargar la página.
   */
  window.addEventListener("load", () => {
    window.setTimeout(hideLoader, 700);
  });
})();
