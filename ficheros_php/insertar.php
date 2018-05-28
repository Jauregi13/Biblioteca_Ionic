<?php


// CONEXION CON LA BASE DE DATOS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
$conexion = mysqli_connect('localhost', 'root', '', 'Biblioteca');


// RECIBIR JSON DESDE APLICACIÓN

$datos = file_get_contents("php://input");

$json = json_decode($datos, true);

//DECLARAR LAS VARIABLES 

$titulo = $json["titulo"];
$autor = $json["autor"];

// INSERTAR EL LIBRO EN LA BASE DE DATOS

$sql = 'INSERT INTO libros (titulo, autor) VALUES ("'.$titulo.'","'.$autor.'")';

mysqli_query($conexion, $sql);





?>