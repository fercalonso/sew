<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <script src = "js/semaforo.js"></script>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css"/>
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css"/>
    <link rel="stylesheet" type="text/css" href="estilo/layout.css"/>
    <link rel="icon" href="multimedia/imagenes/favicon.ico" type="image/x-icon">
    <title>F1 Desktop: Juegos: Juego de reaccion</title>
</head>
<body>
    <?php
    class Record {
        private $server = "localhost";
        private $user = "DBUSER2024";
        private $pass = "DBPSWD2024";
        private $dbname = "records";
        private $conn;

        public function __construct() {
            // Crear conexión a la base de datos
            $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            if ($this->conn->connect_error) {
                die("Conexión fallida: " . $this->conn->connect_error);
            }
        }

        public function saveRecord($nombre, $apellidos, $nivel, $tiempo) {
            $stmt = $this->conn->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("sssd", $nombre, $apellidos, $nivel, $tiempo);
            $stmt->execute();
            $stmt->close();
        }

        public function getTopRecords($nivel) {
            $stmt = $this->conn->prepare("SELECT nombre, apellidos, nivel, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10");
            $stmt->bind_param("d", $nivel);
            $stmt->execute();
            $result = $stmt->get_result();
            return $result;
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $record = new Record();
        $record->saveRecord($_POST['nombre'], $_POST['apellidos'], $_POST['nivel'], $_POST['tiempo']);
        $records = $record->getTopRecords($_POST['nivel']);
        echo "<h3>Top 10 Récords</h3>";
        echo "<ol>";
        while ($row = $records->fetch_assoc()) {
            echo "<li>{$row['nombre']} {$row['apellidos']} - {$row['tiempo']} segundos</li>";
        }
        echo "</ol>";
    }
    ?>
    <header>
        <h1><a href="index.html" title="inicio">F1 Desktop</a></h1>

        <nav> 
            <a href="index.html" title="inicio">Inicio</a>
            <a href="piloto.html" title="piloto">Piloto</a>
            <a href="noticias.html" title="noticias">Noticias</a>
            <a href="calendario.html" title="calendario">Calendario</a>
            <a href="meteorologia.html" title="meteorologia">Meteorologia</a>
            <a href="circuito.html" title="circuito">Circuito</a>
            <a href="viajes.html" title="viajes">Viajes</a>
            <a class= "active" href="juegos.html" title="juegos">Juegos</a>
            
        </nav>
    </header>
    <p>Estás en: <a href="index.html" title="inicio">Inicio</a> >> <a href="juegos.html" title="juegos">Juegos</a> >> Juego de reaccion</p>

    <main></main>
</body>
</html>
