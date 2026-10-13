document.addEventListener("DOMContentLoaded", function() {
    
    const mapaElement = document.getElementById('mapa-ruinas');
    
    if (mapaElement) {
        const mapa = L.map('mapa-ruinas').setView([13.7941, -88.8965], 8);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 18
        }).addTo(mapa);

        const ubicaciones = [
            {
                nombre: "Casona de la Hacienda Santa Bárbara",
                coord: [14.0667, -89.1000],
                desc: "Antigua hacienda con leyendas locales y muros agrietados.",
                estado: "Ruinas (Riesgo estructural)"
            },
            {
                nombre: "Antiguo Casino Militar",
                coord: [13.98860, -89.55647],
                desc: "Inaugurado en 1906, consumido por un incendio en 1981.",
                estado: "Ruinas Históricas"
            },
            {
                nombre: "Antigua Estación del Ferrocarril",
                coord: [13.5067482, -88.8638359],
                desc: "Patrimonio ferroviario de 1917, actualmente cerrado.",
                estado: "Cerrado (Custodia Municipal)"
            },
            {
                nombre: "Mansión Guirola (Restaurante Cadejo)",
                coord: [13.6642, -89.2875],
                desc: "Antigua mansión abandonada, hoy restaurada como zona comercial.",
                estado: "Restaurado (Acceso Público)"
            }
        ];

        ubicaciones.forEach(lugar => {
            const marcador = L.marker(lugar.coord).addTo(mapa);
            
            const popupContent = `
                <div style="text-align: center;">
                    <strong style="color: #0047AB; font-size: 1.1em;">${lugar.nombre}</strong><br>
                    <span style="font-size: 0.9em; color: #555;">${lugar.desc}</span><br>
                    <span style="display: inline-block; margin-top: 8px; padding: 4px 8px; background: #f0f0f0; border-radius: 4px; font-size: 0.8em; font-weight: bold; border: 1px solid #ccc;">
                        Estado: ${lugar.estado}
                    </span>
                </div>
            `;
            
            marcador.bindPopup(popupContent);
        });
    }
});