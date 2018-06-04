<?php


// CONEXION CON LA BASE DE DATOS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
$conexion = mysqli_connect('localhost', 'root', '', 'bibliotecaIonic');


// RECIBIR JSON DESDE APLICACIÓN

$datos = file_get_contents("php://input");

$json = json_decode($datos, true);

//DECLARAR LAS VARIABLES QUE VIENEN DE LA APP

$titulo = $json["titulo"];

// ACTUALIZAR EL LIBRO A LEIDO

$sql = 'UPDATE libros SET leido = true WHERE titulo = "'.$titulo.'"';

mysqli_query($conexion, $sql);





?>