class Pais{
    constructor(nombre, capital, poblacion){
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
    }

    addAttributes(nombre_circuito, forma_de_gobierno, coordenadas_meta_circuito, religion_mayoritaria){
        this.nombre_circuito = nombre_circuito;
        this.forma_de_gobierno = forma_de_gobierno;
        this.coordenadas_meta_circuito = coordenadas_meta_circuito,
        this.religion_mayoritaria = religion_mayoritaria;
    }

    getName(){
        return this.nombre;
    }

    getCapital(){
        return this.capital;
    }

    getInfo(){
        var aux = "<ul>";

        aux += "<li>" + this.nombre_circuito + "</li>";
        aux += "<li>" + this.poblacion + "</li>";
        aux += "<li>" + this.forma_de_gobierno + "</li>";
        aux += "<li>" + this.religión_mayoritaria + "</li>";

        return aux + "</ul>";
    }
    
    writeCoordinates(){
        var aux = "<p>";

        aux += "Latitud: " + this.coordenadas_meta_circuito[0];
        aux += " Longitud: " + this.coordenadas_meta_circuito[1];
        aux += "</p>";

        document.write(aux);
    }
}

var nombre = "Monaco";
var capital = "Montecarlo";
var nombre_circuito = "Monaco";
var población = 38350;
var gobierno = "monarquia constitucional";
var coordenadas_meta = [7.4212327986237625, 43.735288306165586];
var religion = "catolica";

var pais = new Pais(nombre, capital, población);
pais.addAttributes(nombre_circuito, gobierno, coordenadas_meta, religion);


$(document).ready(function() {
    const apiKey = '2775f43ac6e81621ce7fede6f8048d4c';
    const ciudad = 'Montecarlo'; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&lang=es&units=metric&mode=xml&appid=${apiKey}`;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'xml',
        success: function(data) {
            console.log(data);
            procesarDatosMeteorologicos(data);
        },
        error: function(error) {
            console.error('Error en la consulta a OpenWeatherMap:', error);
        }
    });
});

function procesarDatosMeteorologicos(data) {
    const diasPronostico = $(data).find('time').slice(0, 5); // Obtener pronóstico para 5 días
    const fechaActual = new Date();

    diasPronostico.each(function(index, element) {
        const fecha = new Date(fechaActual);
        fecha.setDate(fechaActual.getDate() + index); // Incrementar los días

        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);

        const tempMax = $(element).find('temperature').attr('max');
        const tempMin = $(element).find('temperature').attr('min');
        const humedad = $(element).find('humidity').attr('value');
        const clima = $(element).find('symbol').attr('name');
        const icono = $(element).find('symbol').attr('var');
        const lluvia = $(element).find('precipitation').attr('value') || '0'; // Si no hay valor de lluvia, usar '0'

        mostrarDatos(fechaFormateada, tempMax, tempMin, humedad, clima, icono, lluvia);
    });
}

function mostrarDatos(fecha, tempMax, tempMin, humedad, clima, icono, lluvia) {
    const article = $('<article></article>');

    const html = `
        <h3>${fecha}</h3>
        <p>Temperatura Máxima: ${tempMax}°C</p>
        <p>Temperatura Mínima: ${tempMin}°C</p>
        <p>Humedad: ${humedad}%</p>
        <p>Clima: ${clima}</p>
        <img src="https://openweathermap.org/img/wn/${icono}.png" alt="${clima}">
        <p>Lluvia: ${lluvia}mm</p>
    `;

    article.html(html);
    $('#pronostico').append(article);
}
