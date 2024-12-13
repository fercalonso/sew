class Fondo {
    constructor(pais, capital, circuito) {
        this.pais = pais;
        this.capital = capital;
        this.circuito = circuito;
    }

    consultaImagen() {
        const apiKey = 'df7a8a1e7048c72b201a7f1df91279a2';
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.circuito}&tags=ferrari&format=json&nojsoncallback=1`
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log(data); // Para depuración: imprimir la respuesta completa de la API
                if (data.photos.photo.length > 0) {
                    const photo = data.photos.photo[0];
                    const imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                    this.establecerFondo(imageUrl);
                } else {
                    console.error('No se encontraron fotos.');
                }
            },
            error: (error) => {
                console.error('Error en la consulta a Flickr:', error);
            }
        });
    }

    establecerFondo(imageUrl) {
        $('body').css({
            'background-image': `url(${imageUrl})`,
            'background-repeat': 'no-repeat',
            'background-size': 'cover', // Hace que la imagen cubra todo el fondo
        });
    }
}

// Ejecuta la función cuando el documento esté listo
$(document).ready(() => {
    const fondo = new Fondo('Monaco', 'Montecarlo', 'Circuito de Montecarlo');
    fondo.consultaImagen();
});
