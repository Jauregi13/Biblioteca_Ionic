import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient) {


  }
  /*
    CREAMOS METODO CARGARLIBROS PARA LISTAR TODOS LOS LIBROS

  */
  cargarLibros(){
    // CREAMOS LA VARIABLE LISTAR QUE SERA LA RUTA DEL FICHERO PHP
    let listar = 'http://localhost/listar.php';
    //DEVOLVEMOS CON EL MODULO HTTP GET LO QUE RECIBE DEL FICHERO PHP
  	return this.http.get(listar);
  }
  /*
    METODO PARA LISTAR LIBROS LEIDOS O NO LEIDOS
    PARAMETRO LEIDO SERA BOOLEANO
    TRUE(LEIDO) O FALSE(NO LEIDO)
  */
  listarLeido(leido){
    // CREAMOS LA VARIABLE LISTAR QUE SERA LA RUTA DEL FICHERO PHP
    let listar = 'http://localhost/listar.php';
    //DEVOLVEMOS CON HTTP POST LA LISTA QUE RECIBIRA DEL FICHERO PHP
    // EN ESTE CASO QUEREMOS ENVIAR UN PARAMETRO AL SERVIDOR PARA QUE DEVUELVA LISTADO
    // ENTONCES SE USA HTTP POST POR ESO PORQUE QUEREMOS ENVIAR ALGO
    return this.http.post(listar,leido);

  }
  /*
    METODO PARA AÑADIR UN LIBRO
    UTILIZAMOS EL METODO HTTP.POST PORQUE TENEMOS QUE ENVIAR UN PARAMETRO
    LE PASAMOS COMO PARAMETRO LA RUTA DEL FICHERO Y EL LIBRO
  */
  anadirLibro(libro) {
    let insertar = 'http://localhost/insertar.php';

    return this.http.post(insertar, libro);
  }

  /*
    METODO PARA ELIMINAR UN LIBRO
    TAMBIEN EL METODO HTTP.POST PORQUE TENEMOS QUE ENVIAR UN PARAMETRO
    LE PASAMOS COMO PARAMETRO LA RUTA DEL FICHERO E ID DEL LIBRO
  */

  eliminarLibro(id){
  	let eliminar = 'http://localhost/eliminar.php';

  	return this.http.post(eliminar, id);
  }

   /*
    METODO PARA ACTUALIZAR UN LIBRO A LEIDO
    TAMBIEN EL METODO HTTP.POST PORQUE TENEMOS QUE ENVIAR UN PARAMETRO
    LE PASAMOS COMO PARAMETRO LA RUTA DEL FICHERO E ID DEL LIBRO
  */

  libroLeido(titulo){

  	let leido = 'http://localhost/libroLeido.php';

  	return this.http.post(leido,titulo);

  }



}
