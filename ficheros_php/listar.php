<?php

// CONEXION CON LA BASE DE DATOS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');

$conexion = mysqli_connect('localhost', 'root', '', 'bibliotecaIonic');

// RECIBIR JSON DESDE APLICACIÓN

$datos = file_get_contents("php://input");

$json = json_decode($datos, true);

//DECLARAR EL PARAMETRO POR SI QUEREMOS LISTAR SOLO LOS LIBROS LEIDOS O SOLO NO LEIDOS

$leido = $json["leido"];

// EJECUCION A LA BASE DE DATOS

// SI LA CONEXION ES CORRECTA ENTRARA EN EL IF
if($conexion){
		// SI EL PARAMETRO QUE LLEGARA DE LA APLICACION ES NULL ENTONCES HARA EL SELECT DE TODOS LOS LIBROS
		if($leido === null){
			$select = "SELECT * FROM libros";
			$result = mysqli_query($conexion, $select);

			
			// DECLARAMOS EL ARRAY QUE ALMACENARA TODA LA INFORMACION
			// DE TODOS LOS LIBROS
			$libros = array();
			// HACEMOS EL BUCLE PARA ITERAR CADA LIBRO Y METER EN EL ARRAY CADA LIBRO
			while ($linea = mysqli_fetch_array($result)){

				// DECLARAMOS VARIABLES TANTAS COMO TIENE DE CAMPOS LA BASE DE DATOS
				// A LAS VARIABLES LES DAMOS EL VALOR DEL CAMPO CORRESPONDIENTE
				// DE LA BASE DE DATOS
				$id=$linea['id'];
				$titulo=$linea['titulo'];
				$autor=$linea['autor'];
				$paginas=$linea['paginas'];
				$imagen=$linea['imagen'];
				$leido=$linea['leido'];
				$sinopsis=$linea['sinopsis'];

				// ESOS VALORES LOS METEMOS EN EL ARRAY
				$libros[] = array('id'=> $id, 'titulo' => $titulo, 'autor' => $autor, 'paginas' => $paginas, 
					'sinopsis' => $sinopsis, 'leido' => $leido, 'imagen' => $imagen);
				}





		}
		// SI LA VARIABLE LEIDO NO ES NULL ENTONCES TENEMOS QUE FILTRAR LA LISTA
		// A LEIDOS O NO LEIDOS, SEGUN EL VALOR DE LA VARIABLE
		// SI ES 0(FALSE) ENTONCES MOSTRARA LIBROS NO LEIDOS
		// SI ES 1(TRUE) ENTONCES MOSTRARA LIBROS LEIDOS
		else {
			// HAZ EL SELECT PONIENDO EN EL WHERE EL PARAMETRO LLEGADO DE LA APLICACION
			$select = "SELECT * FROM libros WHERE leido = ".$leido;
			$result = mysqli_query($conexion, $select);

			$libros = array();
			//ITERAMOS CON WHILE LOS LIBROS CORRESPONDIENTES DEL SELECT
			while ($linea = mysqli_fetch_array($result)){

				//METEMOS LOS VALORES DE LOS CAMPOS EN LAS VARIABLES
				$id=$linea['id'];
				$titulo=$linea['titulo'];
				$autor=$linea['autor'];
				$sinopsis=$linea['sinopsis'];
				$paginas=$linea['paginas'];
				$imagen=$linea['imagen'];

				// LAS VARIABLES LOS AÑADIMOS AL ARRAY
				$libros[] = array('id'=> $id, 'titulo' => $titulo, 'autor' => $autor, 'paginas' => $paginas, 
					'sinopsis' => $sinopsis, 'leido' => $leido, 'imagen' => $imagen);
				}


		}
}

// CERRAMOS LA CONEXION DE MYSQL POR SEGURIDAD
$close = mysqli_close($conexion);

// CONVERTIMOS EL ARRAY DE TODOS LOS LIBROS,
// DE LOS LIBROS LEIDOS O NO LEIDOS A UN FORMATO
// JSON PARA ENVIAR A LA APLICACION PARA INTERPRETARLO
echo json_encode($libros);



















?>