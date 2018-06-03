<?php

// CONEXION CON LA BASE DE DATOS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');

$conexion = mysqli_connect('localhost', 'root', '', 'bibliotecaIonic');

// RECIBIR JSON DESDE APLICACIÓN

$datos = file_get_contents("php://input");

$json = json_decode($datos, true);

//DECLARAR LAS VARIABLES 

$leido = $json["leido"];

// EJECUCION A LA BASE DE DATOS
if($conexion){

		if($leido === null){
			$select = "SELECT * FROM libros";
			$result = mysqli_query($conexion, $select);

			

			$libros = array();
			while ($linea = mysqli_fetch_array($result)){

				$id=$linea['id'];
				$titulo=$linea['titulo'];
				$autor=$linea['autor'];
				$paginas=$linea['paginas'];
				$imagen=$linea['imagen'];
				$leido=$linea['leido'];
				$sinopsis=$linea['sinopsis'];

				$libros[] = array('id'=> $id, 'titulo' => $titulo, 'autor' => $autor, 'paginas' => $paginas, 
					'sinopsis' => $sinopsis, 'leido' => $leido, 'imagen' => $imagen);
				}





		}

		else {

			$select = "SELECT * FROM libros WHERE leido = ".$leido;
			$result = mysqli_query($conexion, $select);

			$libros = array();
			while ($linea = mysqli_fetch_array($result)){

				$id=$linea['id'];
				$titulo=$linea['titulo'];
				$autor=$linea['autor'];
				$sinopsis=$linea['sinopsis'];
				$paginas=$linea['paginas'];
				$imagen=$linea['imagen'];

				$libros[] = array('id'=> $id, 'titulo' => $titulo, 'autor' => $autor, 'paginas' => $paginas, 
					'sinopsis' => $sinopsis, 'leido' => $leido, 'imagen' => $imagen);
				}


		}
}


$close = mysqli_close($conexion);

// CREACION DEL JSON

echo json_encode($libros);



















?>