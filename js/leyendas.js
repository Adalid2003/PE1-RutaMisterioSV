document.addEventListener("DOMContentLoaded", function() {

    const buscador = document.getElementById('buscador-leyendas');
    const filtroTipo = document.getElementById('filtro-tipo');
    const sinResultados = document.getElementById('sin-resultados');
    const tarjetas = document.querySelectorAll('.tarjeta-leyenda');

    function filtrarLeyendas() {
        const textoBusqueda = buscador.value.toLowerCase();
        const tipoSeleccionado = filtroTipo.value;
        let visibles = 0;

        tarjetas.forEach(tarjeta => {
            const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
            const tipoTarjeta = tarjeta.getAttribute('data-tipo');

            const coincideTexto = titulo.includes(textoBusqueda);
            const coincideTipo = (tipoSeleccionado === 'todos') || (tipoTarjeta === tipoSeleccionado);

            if (coincideTexto && coincideTipo) {
                tarjeta.style.display = '';
                visibles++;
            } else {
                tarjeta.style.display = 'none';
            }
        });

        // Mensaje cuando ninguna tarjeta coincide
        sinResultados.classList.toggle('d-none', visibles > 0);
    }

    buscador.addEventListener('input', filtrarLeyendas);
    filtroTipo.addEventListener('change', filtrarLeyendas);

    // Cambia el texto del botón "Leer más" / "Leer menos"
    document.querySelectorAll('.tarjeta-leyenda .collapse').forEach(bloque => {
        const boton = document.querySelector(`[data-bs-target="#${bloque.id}"]`);
        bloque.addEventListener('shown.bs.collapse', () => boton.textContent = 'Leer menos');
        bloque.addEventListener('hidden.bs.collapse', () => boton.textContent = 'Leer más');
    });

    const mapaElement = document.getElementById('mapa-leyendas');

    if (mapaElement) {
        const mapa = L.map('mapa-leyendas').setView([13.75, -89.05], 9);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
            maxZoom: 16
        }).addTo(mapa);

        const ubicaciones = [
            {
                nombre: "Puerta del Diablo",
                coord: [13.6365, -89.1905],
                leyenda: "Rocas partidas por el diablo, según la tradición.",
                lugar: "Panchimalco, San Salvador"
            },
            {
                nombre: "Izalco",
                coord: [13.7447, -89.6731],
                leyenda: "Tierra de la Cuyancúa, mitad serpiente y mitad cerdo.",
                lugar: "Sonsonate"
            },
            {
                nombre: "Lago de Ilopango",
                coord: [13.6700, -89.0500],
                leyenda: "El lago que, según la creencia, se cobra una vida cada año.",
                lugar: "San Salvador, Cuscatlán y La Paz"
            },
            {
                nombre: "Suchitoto",
                coord: [13.9381, -89.0278],
                leyenda: "Calles empedradas donde se cuenta de la Carreta Chillona.",
                lugar: "Cuscatlán"
            },
            {
                nombre: "Laguna de Alegría",
                coord: [13.4920, -88.4950],
                leyenda: "Laguna en el cráter del Tecapa, hogar de una sirena.",
                lugar: "Alegría, Usulután"
            }
        ];

        ubicaciones.forEach(punto => {
            const marcador = L.marker(punto.coord).addTo(mapa);

            const popupContent = `
                <div style="text-align: center;">
                    <strong style="color: #301934; font-size: 1.1em;">${punto.nombre}</strong><br>
                    <span style="font-size: 0.9em; color: #555;">${punto.leyenda}</span><br>
                    <span style="display: inline-block; margin-top: 8px; padding: 4px 8px; background: #f0f0f0; border-radius: 4px; font-size: 0.8em; font-weight: bold; border: 1px solid #ccc;">
                        ${punto.lugar}
                    </span>
                </div>
            `;

            marcador.bindPopup(popupContent);
        });

        // Ajusta el zoom para que se vean todos los puntos
        mapa.fitBounds(ubicaciones.map(p => p.coord), { padding: [30, 30] });
    }
});
