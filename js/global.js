document.addEventListener("DOMContentLoaded", () => {
    const flashlight = document.createElement("div");
    flashlight.id = "linterna-overlay";
    document.body.appendChild(flashlight);
    document.addEventListener("mousemove", (e) => {
        flashlight.style.setProperty("--x", e.clientX + "px");
        flashlight.style.setProperty("--y", e.clientY + "px");
    });

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
