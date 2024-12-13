class Noticias {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            console.log('La API de archivos está soportada por este navegador.');
        } else {
            alert('La API de archivos no es totalmente soportada en este navegador.');
        }
    }

    readInputFile(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contenido = e.target.result;
                this.mostrarNoticias(contenido);
            };
            reader.readAsText(file);
        } else {
            alert('No se ha seleccionado ningún archivo.');
        }
    }

    mostrarNoticias(contenido) {
        const lineas = contenido.split('\n');
        lineas.forEach((linea) => {
            const [titulo, entradilla, autor] = linea.split('_');
            const html = `
                <article class="noticia">
                    <h3>${titulo}</h3>
                    <p>${entradilla}</p>
                    <p><strong>Autor:</strong> ${autor}</p>
                </article>
            `;
            $('#noticias').append(html);
        });
    }

    agregarNoticia(titulo, entradilla, autor) {
        const html = `
            <article class="noticia">
                <h3>${titulo}</h3>
                <p>${entradilla}</p>
                <p><strong>Autor:</strong> ${autor}</p>
            </article>
        `;
        $('#noticias').append(html);
    }
}

$(document).ready(function() {
    const noticias = new Noticias();

    $('#fileInput').on('change', function(event) {
        noticias.readInputFile(event);
    });

    $('#agregarNoticia').on('click', function() {
        const titulo = $('#titulo').val();
        const entradilla = $('#entradilla').val();
        const autor = $('#autor').val();
        noticias.agregarNoticia(titulo, entradilla, autor);
    });
});
