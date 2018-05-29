<?php


// CONEXION CON LA BASE DE DATOS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
$conexion = mysqli_connect('localhost', 'root', '', 'bibliotecaIonic');


// RECIBIR JSON DESDE APLICACIÓN

$datos = file_get_contents("php://input");

$json = json_decode($datos, true);

//DECLARAR LA VARIABLE DEL TITULO RECIBIDO

$id = $json["id"];

// ELIMINAR EL LIBRO DE LA BASE DE DATOS

$sql = 'DELETE FROM libros WHERE id = '. $id;

mysqli_query($conexion, $sql);





?>