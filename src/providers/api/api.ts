import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {


  }

  cargarLibros(){
    let listar = 'http://localhost/listar.php';
  	return this.http.get(listar);
  }

  añadirLibro(libro) {
    let insertar = 'http://localhost/insertar.php';

    return this.http.post(insertar, libro);
  }

}
