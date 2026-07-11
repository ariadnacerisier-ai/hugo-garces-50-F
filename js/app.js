const form = document.querySelector("#rsvp-form");
const status = document.querySelector("#form-status");

if (form && status) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();

      status.textContent =
        "Revisa los campos obligatorios antes de continuar.";

      status.className =
        "form-status is-visible is-error";

      return;
    }

    const button = form.querySelector(
      'button[type="submit"]'
    );

    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Enviando...";

    try {
      await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors"
      });

      status.textContent =
        "Tu asistencia fue enviada correctamente. ¡Gracias!";

      status.className =
        "form-status is-visible is-success";

      form.reset();

    } catch (error) {
      status.textContent =
        "No fue posible enviar la confirmación. Utiliza el botón de WhatsApp.";

      status.className =
        "form-status is-visible is-error";

    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}
