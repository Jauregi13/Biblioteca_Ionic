<?php

// CONEXION CON LA BASE DE DATOS
header('Access-Control-Allow-Origin: *'); 
$conexion = mysqli_connect('localhost', 'root', '', 'bibliotecaIonic');


// EJECUCION A LA BASE DE DATOS

$select = "SELECT * FROM libros";
$result = mysqli_query($conexion, $select);

if($conexion){

	$libros = array();
	while ($linea = mysqli_fetch_array($result)){

		$id=$linea['id'];
		$titulo=$linea['titulo'];
		$autor=$linea['autor'];
		$paginas=$linea['paginas'];
		$imagen=$linea['imagen'];

		$libros[] = array('id'=> $id, 'titulo' => $titulo, 'autor' => $autor, 'paginas' => $paginas, 'imagen' => $imagen);
	}




}

$close = mysqli_close($conexion);

// CREACION DEL JSON

echo json_encode($libros);



















?>