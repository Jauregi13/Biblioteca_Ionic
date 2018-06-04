import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { DescripcionPage } from '../descripcion/descripcion';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // DECLARAMOS PROPIEDAD LIBRO QUE SERA UN OBJETO DE TIPO ARRAY PARA ALMACENAR TODOS LOS LIBROS

  libros : any = [];

  constructor(public navCtrl: NavController, public http : DatabaseProvider, public alert : AlertController) {

  }

  /*
    CON ESTE METODO RECIBIREMOS EL LISTADO DE LIBROS QUE LLEGA DESDE EL METODO CARGAR LIBROS
    SI NO DA NINGUN ERROR EN LA RESPUESTA ENTONCES LOS DATOS SE ALMACENAN EN LA PROPIEDAD LIBROS
    SINO ENVIARA UN ERROR A LA CONSOLA
  */
  ionViewDidLoad(){
    // LLAMAMOS AL METODO CARGAR LIBROS
  	this.http.cargarLibros().subscribe((data) => {
  		this.libros = data;
  	}, (error) => {
  		console.log(error);
  	})
  }
  /*
    METODO PARA RECIBIR LISTADO DE LIBROS SI SON LEIDOS O NO LEIDOS
    RECIBIMOS PARAMETRO DESDE LA VISTA QUE SERA 0 O 1
  */
  listarLeido(leido){

    // INICIALIZAMOS UNA VARIABLE QUE SERA FORMATO JSON Y TENDRA COMO VALOR EL PARAMETRO
    let libroLeido = JSON.stringify({ leido : leido});
    //LLAMAMOS AL METODO LISTAR LEIDO DEL SERVICIO QUE SI NO DA ERROR DEVOLVERA EL LISTADO
    // DE LIBROS SEGUN EL PARAMETRO RECIBIDO
    this.http.listarLeido(libroLeido).subscribe((data) => {
      // METEMOS LOS DATOS QUE ENVIA EL SERVICIO DE RESPUESTA EN LA PROPIEDAD LIBROS
      this.libros = data;
    },(error) => {
      console.log(error);
    })

  }
  /*
    METODO PARA ENVIAR LA DESCRIPCION DEL LIBRO SELECCIONADO
    A LA PAGINA DESCRIPCION
    PARAMETROS DESCRIPCIONPAGE, PARA REDIRIGIR A LA PAGINA DESCRIPCION
               LIBRO, PARAMETRO QUE CONTENDRA LA INFORMACION DEL LIBRO
               SELECCIONADO
  */
  descripcion(libro){
    this.navCtrl.push(DescripcionPage, libro);
  }

  /*
    METODO QUE ABRIRA LA VENTANA DE AVISO
    PARA ELIMINAR EL LIBRO
    LE PASAMOS COMO PARAMETRO EL LIBRO
    PARA SABER QUE LIBRO ELIMINAR
  */

  eliminar(libro){

    this.aviso(libro);

  }
  /*
    METODO QUE CREA LA VENTANA DE AVISO
  */
  aviso(libro) {
    // DECLARAMOS UNA VARIABLE QUE SERA EL ID DEL LIBRO
    // EN FORMATO JSON
  	let id = JSON.stringify({id : libro.id});
    /* CREAMOS LA ALERTA
       TENDRA TITULO, SUBTITULO CON LA PREGUNTA PARA CONFIRMAR
       DOS BOTONES PARA ACEPTAR O CANCELAR
    */
    let alert = this.alert.create({
    title: 'Confirmación',
    subTitle: '¿Estas seguro que quieres eliminar el libro?',
    buttons: [
      // BOTON CANCELAR SALE DEL MENSAJE Y VUELVE AL LISTADO DE LIBROS
      // NO ELIMINA EL LIBRO
      {
        text: 'Cancelar',
        role: 'cancel',
        // CON HANDLER LE DECIMOS QUE ACCION TIENE QUE HACER EL BOTON
        // EN ESTE CASO VOLVER AL LISTADO DE TODOS LOS LIBROS
        handler: () => {
          this.ionViewDidLoad();
        }
      },
      // BOTON ACEPTAR ELIMINA EL LIBRO
      {
        text: 'Aceptar',
        handler: () => {
          // LLAMAMOS AL METODO ELIMINARLIBRO 
          // SI ES CORRECTO MOSTRARA MENSAJE CONFIRMACION
          this.http.eliminarLibro(id).subscribe((data) => {

          	this.confirmacion(libro);


          }, (error) => {
          	console.log(error);
          })
          
        }
      }
    ]
  });
  alert.present();
  }
  /*
    CREAMOS EL METODO CONFIRMACION PARA CREAR LA ALERTA
    CUANDO VAYAMOS A ACEPTAR LA ELIMINACION DEL LIBRO
  */
  confirmacion(libro) {
    let prompt = this.alert.create({
      title: 'Libro eliminado correctamente',
      subTitle: "El libro " + libro.titulo + " se ha eliminado correctamente",
      buttons: [{

      	text : 'Aceptar',
        // VOLVEMOS OTRA VEZ AL LISTADO DE LIBROS
      	handler: () => {
      		this.ionViewDidLoad();
      	}

      }
      ]

    });
    prompt.present();
  }

  /*
    METODO PARA ACTUALIZAR LIBRO A LEIDO
    PASAMOS PARAMETRO DEL LIBRO SELECCIONADO
    EL TITULO DEL LIBRO CONVERTIMOS A JSON
    LLAMAMOS AL METODO LIBRO LEIDO CON EL PARAMETRO
  */

  leido(libro){

  	let titulo = JSON.stringify({titulo : libro.titulo});

  	this.http.libroLeido(titulo).subscribe((data) => {

      this.confirmacionLeido(libro.titulo);

  	},(error) => {
  		console.log(error);
  	})

  }

  /*
    METODO PARA CREAR ALERTA CUANDO SE CONFIRMA QUE ESTA LEIDO
  */

  confirmacionLeido(titulo){
    let alert = this.alert.create({
      title : 'Libro leido!!',
      subTitle : 'Enhorabuena!! Has terminado de leer el libro ' + titulo,
      buttons : ['Aceptar']
    });
    alert.present();
  }

}
