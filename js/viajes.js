class Viajes {
    constructor() {
        this.latitud = 0;
        this.longitud = 0;
        this.obtenerPosicion();
    }

    obtenerPosicion() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.mostrarPosicion.bind(this),
                this.mostrarError.bind(this)
            );
        } else {
            alert("La geolocalización no es soportada por este navegador.");
        }
    }

    mostrarPosicion(position) {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
        this.mostrarMapaEstatico();
        this.mostrarMapaDinamico();

    }

    mostrarError(error) {
        let mensajeError;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                mensajeError = "Permiso denegado por el usuario.";
                break;
            case error.POSITION_UNAVAILABLE:
                mensajeError = "La posición no está disponible.";
                break;
            case error.TIMEOUT:
                mensajeError = "La solicitud ha expirado.";
                break;
            case error.UNKNOWN_ERROR:
                mensajeError = "Un error desconocido ocurrió.";
                break;
        }
        alert(mensajeError);
    }

    mostrarMapaDinamico() {
        const map = new google.maps.Map(document.getElementById("mapa"), {
            center: { lat: this.latitud, lng: this.longitud },
            zoom: 14,
            mapId: "13d3447e213504c9" 
        });

        const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: this.latitud, lng: this.longitud },
            map: map,
        });
    }

    mostrarMapaEstatico() {
        const urlMapaEstatico = `https://maps.googleapis.com/maps/api/staticmap?center=${this.latitud},${this.longitud}&zoom=14&size=600x400&markers=color:red%7C${this.latitud},${this.longitud}&key=AIzaSyA_fXPjBnFDCe3feRXhNGbYGAxQ5ZWAdY0`;
        document.getElementById("mapa-estatico").innerHTML = `<img src="${urlMapaEstatico}" alt="Mapa Estático">`;
    }
    
}

function cargarApiGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_fXPjBnFDCe3feRXhNGbYGAxQ5ZWAdY0&libraries=marker&callback=inicializarMapa`;
    script.async = true;
    script.defer = true; 
    script.onerror = function() {
        console.error("Error al cargar la API de Google Maps.");
    };
    document.head.appendChild(script);
}


function inicializarMapa() {
    new Viajes();
}

$(document).ready(function() {
    cargarApiGoogleMaps();
});
