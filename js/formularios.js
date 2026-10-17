document.addEventListener("DOMContentLoaded", () => {
    const formularios = document.querySelectorAll("form[data-netlify]");

    function mostrarEstado(contenedor, mensaje, tipo) {
        if (!contenedor) return;
        contenedor.className = "mt-3 alert alert-" + tipo;
        contenedor.textContent = mensaje;
    }

    formularios.forEach((form) => {
        const estado = form.querySelector("[data-estado]");
        const boton = form.querySelector('button[type="submit"]');

        form.addEventListener("submit", async (evento) => {
            evento.preventDefault();
            if (boton) boton.disabled = true;
            mostrarEstado(estado, "Enviando…", "info");

            try {
                const datos = new URLSearchParams(Array.from(new FormData(form).entries()));
                const respuesta = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: datos.toString(),
                });
                if (!respuesta.ok) throw new Error("Estado " + respuesta.status);

                form.reset();
                mostrarEstado(estado, form.dataset.exito || "¡Gracias! Recibimos tu mensaje.", "success");
            } catch (error) {
                mostrarEstado(
                    estado,
                    "No pudimos enviar el formulario. Inténtalo de nuevo en unos minutos o escríbenos por nuestras redes sociales.",
                    "danger"
                );
            } finally {
                if (boton) boton.disabled = false;
            }
        });
    });

    const asunto = document.getElementById("asunto");
    if (asunto) {
        const opciones = { relato: "Compartir un relato", lugar: "Sugerir un lugar abandonado" };
        const parametro = new URLSearchParams(window.location.search).get("asunto");
        if (parametro && opciones[parametro]) asunto.value = opciones[parametro];
    }
});
