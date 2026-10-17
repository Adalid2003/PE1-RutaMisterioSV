document.addEventListener("DOMContentLoaded", function() {

    const buscador = document.getElementById('buscador');
    const filtroUbicacion = document.getElementById('filtro-ubicacion');

    const tarjetas = document.querySelectorAll('.tarjeta-lugar');

    function filtrarLugares() {
        const textoBusqueda = buscador.value.toLowerCase();
        const ubicacionSeleccionada = filtroUbicacion.value;

        tarjetas.forEach(tarjeta => {
            const titulo = tarjeta.querySelector('.card-title').textContent.toLowerCase();
            const ubicacionTarjeta = tarjeta.getAttribute('data-ubicacion');

            const coincideTexto = titulo.includes(textoBusqueda);
            const coincideUbicacion = (ubicacionSeleccionada === 'todos') || (ubicacionTarjeta === ubicacionSeleccionada);

            // Ocultar o mostrar según los filtros
            if (coincideTexto && coincideUbicacion) {
                tarjeta.style.display = ''; // Vuelve al display original (block/flex)
            } else {
                tarjeta.style.display = 'none'; // Oculta la tarjeta
            }
        });
    }

    // Ejecutar la función cada vez que el usuario escriba o cambie el select
    buscador.addEventListener('input', filtrarLugares);
    filtroUbicacion.addEventListener('change', filtrarLugares);
    
    const mapaElement = document.getElementById('mapa-ruinas');
    
    if (mapaElement) {
        const mapa = L.map('mapa-ruinas').setView([13.7941, -88.8965], 8);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
            maxZoom: 16
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
