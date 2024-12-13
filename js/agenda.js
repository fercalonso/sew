class Agenda {
    constructor() {
        this.apiUrl = 'https://api.jolpi.ca/ergast/f1/2024/races/';
    }

    obtenerCarreras() {
        $.ajax({
            url: this.apiUrl,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                this.mostrarCarreras(data.MRData.RaceTable.Races);
            },
            error: (error) => {
                console.error('Error al consultar la API de Fórmula 1:', error);
            }
        });
    }

    mostrarCarreras(carreras) {
        carreras.forEach((carrera) => {
            const nombreCarrera = carrera.raceName;
            const nombreCircuito = carrera.Circuit.circuitName;
            const coordenadas = `${carrera.Circuit.Location.lat}, ${carrera.Circuit.Location.long}`;
            const fechaHora = `${carrera.date} ${carrera.time}`;
            const urlCarrera = carrera.url

            const html = `
                <article class="carrera">
                    <h3>${nombreCarrera}</h3>
                    <img src="multimedia/imagenes/logoCarrera.png" alt="F1 Logo" class="logo">
                    <p><strong>Circuito:</strong> ${nombreCircuito}</p>
                    <p><strong>Coordenadas:</strong> ${coordenadas}</p>
                    <p><strong>Fecha y Hora:</strong> ${fechaHora}</p>
                    <p><a href="${urlCarrera}" target="_blank">Más Información</a></p>
                </article>
            `;

            $('#informacion-carreras').append(html);
        });
    }
}

$(document).ready(function() {
    const agenda = new Agenda();

    $('#mostrar-carreras').click(function() {
        $('#informacion-carreras').empty(); // Limpiar contenido previo
        agenda.obtenerCarreras();
    });
});
