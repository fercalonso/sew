// Tarea 7: KML - Inicializa el mapa
function initMap() {
    map = new google.maps.Map(document.getElementById('mapaKml'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

$(document).ready(function() {
    // Tarea 6: XML
    $('#xmlInput').on('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const xml = $.parseXML(e.target.result);
                const rootElement = xml.documentElement;
                let htmlContent = `<h3>Elemento raíz: ${rootElement.nodeName}</h3>`;
                htmlContent += parseXMLElement(rootElement);
                $('#xmlContent').html(htmlContent);
            };
            reader.readAsText(file);
        }
    });
    
    function parseXMLElement(element) {
        let htmlContent = '<ul>';
        $(element).children().each(function() {
            const childName = this.nodeName;
            const childText = $(this).clone().children().remove().end().text().trim(); // Text content of the node
            htmlContent += `<li><strong>${childName}:</strong> ${childText ? childText : ''}`;
    
            // If the element has children, parse them recursively
            if ($(this).children().length > 0) {
                htmlContent += parseXMLElement(this);
            }
    
            htmlContent += '</li>';
        });
        htmlContent += '</ul>';
        return htmlContent;
    }
    
    

    let map;

    function loadGoogleMapsAPI() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_fXPjBnFDCe3feRXhNGbYGAxQ5ZWAdY0`;
            script.onload = () => resolve();
            script.onerror = (error) => reject(error);
            document.head.appendChild(script);
        });
    }
    
    $('#kmlInput').on('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            loadGoogleMapsAPI().then(() => {
                initMap();
    
                const reader = new FileReader();
                reader.onload = function(e) {
                    const kml = e.target.result;
                    const parser = new DOMParser();
                    const kmlDoc = parser.parseFromString(kml, 'text/xml');
                    const placemarks = kmlDoc.getElementsByTagName('Placemark');
    
                    const path = [];
    
                    for (let i = 0; i < placemarks.length; i++) {
                        const coordinates = placemarks[i].getElementsByTagName('coordinates')[0].textContent.trim().split(',');
                        const latLng = new google.maps.LatLng(parseFloat(coordinates[1]), parseFloat(coordinates[0]));
                        path.push(latLng);
    
                        // Añadir marcador para cada punto
                        new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: placemarks[i].getElementsByTagName('name')[0].textContent
                        });
                    }
    
                    // Crear la polilínea para conectar los puntos
                    const polyline = new google.maps.Polyline({
                        path: path,
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        map: map
                    });
    
                    // Ajustar el mapa para mostrar todos los puntos
                    const bounds = new google.maps.LatLngBounds();
                    path.forEach(latLng => bounds.extend(latLng));
                    map.fitBounds(bounds);
                };
                reader.readAsText(file);
            }).catch(error => {
                console.error("Error loading Google Maps API: ", error);
            });
        }
    });
    
    function initMap() {
        // Crear el mapa en el div con id 'mapaKml'
        map = new google.maps.Map(document.getElementById('mapaKml'), {
            center: { lat: 43.735288306165586, lng: 7.4212327986237625 },
            zoom: 8
        });
    }
    


    // Tarea 8: SVG
    $('#svgInput').on('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $('#svgContent').html(e.target.result);
            };
            reader.readAsText(file);
        }
    });
});
