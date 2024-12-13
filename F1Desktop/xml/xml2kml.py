import xml.etree.ElementTree as ET

def extract_place_marks(xml_file):
    """
    Extrae los puntos del archivo XML para generar un archivo KML.
    """
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # Definir el espacio de nombres
    ns = {'ns': 'http://www.uniovi.es'}

    place_marks = []

    for punto in root.findall('.//ns:punto', ns):
        distancia_element = punto.find('./ns:distancia_del_tramo/ns:valor', ns)
        coordenadas = punto.find('./ns:coordenadas', ns)

        if distancia_element is not None and coordenadas is not None:
            try:
                # Acceso usando atributos `valor`
                distancia = float(distancia_element.text.strip())
                longitud = float(coordenadas.find('./ns:longitud', ns).attrib['valor'])
                latitud = float(coordenadas.find('./ns:latitud', ns).attrib['valor'])
                altitud = float(coordenadas.find('./ns:altitud', ns).attrib['valor'])

                # Limpieza de descripción
                descripcion_element = punto.find('./ns:descripcion', ns)
                descripcion = descripcion_element.text.strip() if descripcion_element is not None else "Sin descripción"

                place_marks.append({
                    "nombre": f"Point {distancia}",
                    "descripcion": descripcion,
                    "longitud": longitud,
                    "latitud": latitud,
                    "altitud": altitud
                })
            except Exception as e:
                print(f"Error procesando un punto: {e}")
                continue
        else:
            print(f"Elemento faltante en punto: {ET.tostring(punto, encoding='unicode')}")

    return place_marks

def generate_kml(place_marks, output_file):
    """
    Genera un archivo KML a partir de una lista de puntos.
    """
    # Encabezado del archivo KML
    kml_content = """<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
"""

    # Añadir los PlaceMarks al KML
    for mark in place_marks:
        kml_content += f"""
    <Placemark>
      <name>{mark["nombre"]}</name>
      <description>{mark["descripcion"]}</description>
      <Point>
        <coordinates>{mark["longitud"]},{mark["latitud"]},{mark["altitud"]}</coordinates>
      </Point>
    </Placemark>
"""

    # Cierre del archivo KML
    kml_content += """
  </Document>
</kml>
"""

    # Escribir el contenido en un archivo
    with open(output_file, "w") as file:
        file.write(kml_content)

def main():
    # Nombre del archivo XML y KML
    xml_file = "circuitoEsquema.xml"
    kml_file = "circuito.kml"

    # Extraer los puntos del XML
    place_marks = extract_place_marks(xml_file)

    # Generar el archivo KML
    generate_kml(place_marks, kml_file)
    print(f"Archivo KML generado: {kml_file}")

if __name__ == "__main__":
    main()
