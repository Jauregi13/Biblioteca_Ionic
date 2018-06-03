<?php


// CONEXION CON LA BASE DE DATOS
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

// INSERTAR EL LIBRO EN LA BASE DE DATOS

if($titulo != null && $autor != null){

	$sql = 'INSERT INTO libros (titulo, autor, sinopsis, paginas) VALUES 
	("'.$titulo.'","'.$autor.'", "'.$sinopsis.'","'.$paginas.'")';

	mysqli_query($conexion, $sql);
}



