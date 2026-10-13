// js/abandonados.js

document.addEventListener("DOMContentLoaded", () => {
    const sliderInput = document.getElementById("sliderInput");
    const imgAfter = document.getElementById("imgAfter");
    const sliderLine = document.getElementById("sliderLine");

    if (sliderInput) {
        sliderInput.addEventListener("input", (e) => {
            let valor = e.target.value;
            imgAfter.style.clipPath = `polygon(0 0, ${valor}% 0, ${valor}% 100%, 0 100%)`;
            sliderLine.style.left = `${valor}%`;
        });
    }

    const mapaElement = document.getElementById("mapa-ruinas");

    if (mapaElement) {
        const mapa = L.map("mapa-ruinas").setView([13.7383, -89.2625], 11);

        L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            {
                attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
            },
        ).addTo(mapa);

        const marker = L.marker([13.7383, -89.2625]).addTo(mapa);

        marker.bindPopup(`
            <b style="color: #0047AB;">Ruinas del Boquerón</b><br>
            Antigua finca abandonada tras la erupción.<br>
            <i>Nivel de peligro: Medio</i>
        `);
    }
});
