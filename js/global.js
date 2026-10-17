document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const CLAVE = "linterna-activa";
        const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function leerPreferencia() {
            try {
                const guardada = localStorage.getItem(CLAVE);
                if (guardada !== null) return guardada === "1";
            } catch (e) {
                console.warn("No se pudo leer la preferencia de la linterna:", e);
            }
            return !reducirMovimiento;
        }

        function guardarPreferencia(valor) {
            try { localStorage.setItem(CLAVE, valor ? "1" : "0"); } catch (e) {
                console.warn("No se pudo guardar la preferencia de la linterna:", e);
            }
        }

        const flashlight = document.createElement("div");
        flashlight.id = "linterna-overlay";
        flashlight.setAttribute("aria-hidden", "true");
        document.body.appendChild(flashlight);

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "linterna-toggle";
        boton.title = "Efecto de linterna";
        boton.setAttribute("aria-label", "Efecto de linterna");
        boton.innerHTML = '<i class="bi" aria-hidden="true"></i>';
        document.body.appendChild(boton);

        let activa = leerPreferencia();

        function aplicar() {
            document.body.classList.toggle("linterna-off", !activa);
            boton.setAttribute("aria-pressed", String(activa));
            boton.firstElementChild.className = "bi " + (activa ? "bi-lightbulb-fill" : "bi-lightbulb");
        }

        aplicar();

        boton.addEventListener("click", () => {
            activa = !activa;
            aplicar();
            guardarPreferencia(activa);
        });

        document.addEventListener("mousemove", (e) => {
            if (!activa) return;
            flashlight.style.setProperty("--x", e.clientX + "px");
            flashlight.style.setProperty("--y", e.clientY + "px");
        });
    }

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("activo");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
});
