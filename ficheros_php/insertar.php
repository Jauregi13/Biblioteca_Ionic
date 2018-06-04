<?php


// CONEXION CON LA BASE DE DATOS
// NECESITAMOS PONER ESTAS CABECERAS PARA DAR PERMISO A LA CONEXION
// CON LA APP Y EL FICHERO PHP
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
$conexion = mysqli_connect('localhost', 'root', '', 'bibliotecaIonic');


// RECIBIR JSON DESDE APLICACIÓN

$datos = file_get_contents("php://input");

$json = json_decode($datos, true);

//DECLARAR LAS VARIABLES 

$titulo = $json["titulo"];
$autor = $json["autor"];
$sinopsis = $json["sinopsis"];
$paginas = $json["paginas"];

// INSERTAR EL LIBRO EN LA BASE DE DATOS CON LOS PARAMETROS
// QUE SE RECIBEN DESDE LA APP

$sql = 'INSERT INTO libros (titulo, autor, sinopsis, paginas) VALUES 
("'.$titulo.'","'.$autor.'", "'.$sinopsis.'","'.$paginas.'")';

mysqli_query($conexion, $sql);

// CERRAR CONEXION POR SEGURIDAD
$close = mysqli_close($conexion);



