document.addEventListener("DOMContentLoaded", function() {

    const lista = document.getElementById('lista-eventos');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroDepartamento = document.getElementById('filtro-departamento');
    const sinEventos = document.getElementById('sin-eventos');
    const DURACION_HORAS = 4;

    const tarjetas = Array.from(document.querySelectorAll('.tarjeta-evento'))
        .sort((a, b) => new Date(a.dataset.inicio) - new Date(b.dataset.inicio));
    tarjetas.forEach(tarjeta => lista.appendChild(tarjeta));

    function formatoCalendario(fecha) {
        return fecha.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    }

    function prepararTarjetas() {
        const ahora = new Date();

        tarjetas.forEach(tarjeta => {
            const inicio = new Date(tarjeta.dataset.inicio);
            const fin = new Date(inicio.getTime() + DURACION_HORAS * 60 * 60 * 1000);
            const estado = tarjeta.querySelector('.estado-evento');
            const diasFaltantes = Math.ceil((inicio - ahora) / (1000 * 60 * 60 * 24));

            if (ahora > fin) {
                estado.textContent = 'Finalizado';
                estado.className = 'estado-evento badge bg-secondary';
                tarjeta.classList.add('evento-pasado');
            } else if (ahora >= inicio) {
                estado.textContent = '¡En curso!';
                estado.className = 'estado-evento badge bg-rojo-sangre';
            } else if (inicio.toDateString() === ahora.toDateString()) {
                estado.textContent = '¡Hoy!';
                estado.className = 'estado-evento badge bg-amarillo-farol text-dark';
            } else if (diasFaltantes <= 1) {
                estado.textContent = '¡Mañana!';
                estado.className = 'estado-evento badge bg-amarillo-farol text-dark';
            } else {
                estado.textContent = `Faltan ${diasFaltantes} días`;
                estado.className = 'estado-evento badge bg-plata-luna text-dark';
            }

            const titulo = tarjeta.querySelector('h3').textContent.trim();
            const descripcion = tarjeta.querySelector('.card-text').textContent.replace(/\s+/g, ' ').trim();
            const params = new URLSearchParams({
                action: 'TEMPLATE',
                text: titulo,
                dates: `${formatoCalendario(inicio)}/${formatoCalendario(fin)}`,
                details: descripcion + ' (Vía RutaMisterioSV)',
                location: tarjeta.dataset.lugar + ', El Salvador'
            });
            tarjeta.querySelector('.btn-calendario').href = 'https://calendar.google.com/calendar/render?' + params.toString();
        });
    }

    function filtrarEventos() {
        const categoria = filtroCategoria.value;
        const departamento = filtroDepartamento.value;
        let visibles = 0;

        tarjetas.forEach(tarjeta => {
            const coincideCategoria = (categoria === 'todos') || (tarjeta.dataset.categoria === categoria);
            const coincideDepartamento = (departamento === 'todos') || (tarjeta.dataset.departamento === departamento);

            if (coincideCategoria && coincideDepartamento) {
                tarjeta.style.display = '';
                visibles++;
            } else {
                tarjeta.style.display = 'none';
            }
        });

        sinEventos.classList.toggle('d-none', visibles > 0);
    }

    function iniciarCuentaRegresiva() {
        const proximo = tarjetas.find(t => new Date(t.dataset.inicio) > new Date());
        if (!proximo) return;

        const seccion = document.getElementById('proximo-evento');
        const inicio = new Date(proximo.dataset.inicio);
        const fechaTexto = inicio.toLocaleDateString('es-SV', { weekday: 'long', day: 'numeric', month: 'long' });

        document.getElementById('proximo-nombre').textContent = proximo.querySelector('h3').textContent.trim();
        document.getElementById('proximo-detalle').textContent = `${fechaTexto} · ${proximo.dataset.lugar}`;
        seccion.classList.remove('d-none');

        const campos = {
            dias: document.getElementById('cd-dias'),
            horas: document.getElementById('cd-horas'),
            minutos: document.getElementById('cd-minutos'),
            segundos: document.getElementById('cd-segundos')
        };

        function actualizar() {
            const restante = Math.max(0, inicio - new Date());
            campos.dias.textContent = Math.floor(restante / 86400000);
            campos.horas.textContent = Math.floor(restante / 3600000) % 24;
            campos.minutos.textContent = Math.floor(restante / 60000) % 60;
            campos.segundos.textContent = Math.floor(restante / 1000) % 60;

            if (restante === 0) {
                clearInterval(intervalo);
                prepararTarjetas();
                iniciarCuentaRegresiva();
            }
        }

        const intervalo = setInterval(actualizar, 1000);
        actualizar();
    }

    filtroCategoria.addEventListener('change', filtrarEventos);
    filtroDepartamento.addEventListener('change', filtrarEventos);

    prepararTarjetas();
    iniciarCuentaRegresiva();
});
