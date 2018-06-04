import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the InsertarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insertar',
  templateUrl: 'insertar.html',
})
export class InsertarPage {

  /*
    DECLARAMOS LAS PROPIEDADES PARA ALMACENAR LA INFORMACION
    DE LOS INPUT DEL FORMULARIO
  */

	titulo : string;
	autor : string;
  sinopsis : string;
  paginas : number;
  /*
    ESTA PROPIEDAD DE TIPO ARRAY PARA ALMACENAR LOS LIBROS
    PARA LA COMPROBACIÓN SI EXISTE EL LIBRO O NO
  */ 
  libros : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public database : DatabaseProvider, public alert : AlertController) {

  }
  /*
    ESTE METODO PARA GUARDAR LOS DATOS DEL LIBRO EN FORMATO JSON
    Y ENVIARLO AL SERVICIO DATABASE
  */

  anadirLibro(){
    // DECLARAMOS UNA VARIABLE QUE GUARDAREMOS LOS DATOS DEL LIBRO EN FORMATO JSON
  	let libro = JSON.stringify({titulo : this.titulo, autor : this.autor, sinopsis : this.sinopsis, paginas : this.paginas});

    // LLAMAMOS AL METODO CARGARLIBROS PARA CONSEGUR TODO EL LISTADO DE LIBROS
    // PARA COMPROBAR SI EXISTE EL TITULO DEL LIBRO O ES NUEVO
    this.database.cargarLibros().subscribe((data) => {
      // GUARDAMOS EL LISTADO DE LIBROS EN LA PROPIEDAD LIBROS
      this.libros = data;
      let existe : boolean;
      // CON UN BUCLE FOR ITERAMOS TODOS LOS LIBROS
      for (let i = 0; i < this.libros.length; i++) {
        // COMPROBAMOS CADA TITULO DEL LIBRO SI COINCIDE CON EL INSERTADO O NO
        // SI SON IGUALES ENTONCES LA VARIABLE EXISTE SE DEJA EN TRUE
        // SE MUESTRA UNA VENTANA DE ERROR QUE SERA UN ALERTCONTROLLER
        if(this.libros[i].titulo == this.titulo){
          existe = true;
          this.error();
          break;
          
        }
        // SI NO EXISTE ENTONCES LA VARIABLE EXISTE ES FALSE
        else {
          existe = false;
        }
      }
      /* SI LA VARIABLE EXISTE SE MANTIENE EN FALSE
         ENTONCES INSERTAREMOS EL LIBRO
      */
      if(existe == false){
        // LLAMAMOS AL METODO ANADIR LIBRO
        // LE PASAMOS COMO PARAMETRO EL JSON QUE HEMOS CREADO
        // AL PRINCIPIO DEL METODO 
        this.database.anadirLibro(libro).subscribe((data) => {
          // SI LOS VALORES DE LOS INPUT NO ESTAN VACIOS ENTONCES
          // MOSTRAR MENSAJE INSERTADO
          if(this.titulo != '' && this.autor != '' && this.sinopsis != '' && this.paginas != 0){
            this.insertado();
          }
          // SI NO MOSTRARA MENSAJE RELLENAR DATOS Y NO INSERTARA EN LA BASE DE DATOS
          else {
            this.rellenarDatos();
          }
          // TODAS LAS PROPIEDADES LAS DEJAMOS VACIOS
          this.titulo = '';
          this.autor = '';
          this.sinopsis = '';
          this.paginas = 0;
          // SI HA HABIDO ALGUN ERROR CON LA RESPUESTA DEL SERVICIO
          // NOS ENVIARA AQUI Y MOSTRARA EL MISMO MENSAJE DE RELLENAR DATOS
        }, (error) => {
          this.rellenarDatos();
        })

      }

     
    })
  	

  }
  // METODO QUE CREA UN POP UP (ALERTA) A LA HORA DE INSERTAR CORRECTAMENTE
  insertado() {
    let alert = this.alert.create({
      title: 'Libro insertado correctamente',
      subTitle: "El libro " + this.titulo + " se ha insertado correctamente",
      buttons: ['Aceptar']

    });
    alert.present();
  }
  // METODO QUE CREA UN POP UP (ALERTA) CUANDO EXISTA EL LIBRO EN LA BASE DE DATOS
  error(){
    let alert = this.alert.create({
      title : 'Error al insertar el libro',
      subTitle : "El libro ya existe",
      buttons: ['Aceptar']
    });
    alert.present();
  }
  // METODO QUE CREA UN POP UP (ALERTA) CUANDO NO SE RELLENAN TODOS LOS DATOS
  rellenarDatos(){
    let alert = this.alert.create({
      title: 'Rellena los datos',
      subTitle : 'Tienes que rellenar todos los datos para insertar el libro',
      buttons : ['Aceptar']
    });
    alert.present();
  }






}
