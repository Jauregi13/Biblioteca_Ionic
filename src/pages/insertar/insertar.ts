import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
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

	titulo : string;
	autor : string;
  sinopsis : string;
  paginas : number;
  libros : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api : ApiProvider, public alert : AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertarPage');
  }

  anadirLibro(titulo, autor, sinopsis, paginas){
  	let libro = JSON.stringify({titulo : titulo, autor : autor, sinopsis : sinopsis, paginas : paginas});

    console.log(libro);

    this.api.cargarLibros().subscribe((data) => {
      this.libros = data;
      let existe : boolean;

      for (let i = 0; i < this.libros.length; i++) {
        if(this.libros[i].titulo == titulo){
          existe = true;
          this.error();
          break;
          
        }
        else {
          existe = false;
        }
      }

      if(existe == false){

        this.api.añadirLibro(libro).subscribe((data) => {

          
          this.mostrar();

          

          this.titulo = '';
          this.autor = '';
          this.sinopsis = '';
          this.paginas = 0;

        }, (error) => {
          console.log(error);
          this.rellenarDatos();
        })

      }

     
    })
  	

  }

  mostrar() {
    let alert = this.alert.create({
      title: 'Libro insertado correctamente',
      cssClass: 'exito',
      subTitle: "El libro " + this.titulo + " se ha insertado correctamente",
      buttons: ['Aceptar']

    });
    alert.present();
  }

  error(){
    let alert = this.alert.create({
      title : 'Error al insertar el libro',
      subTitle : "El libro ya existe",
      buttons: ['Aceptar']
    });
    alert.present();
  }

  rellenarDatos(){
    let alert = this.alert.create({
      title: 'Rellena los datos',
      subTitle : 'Tienes que rellenar todos los datos para insertar el libro',
      buttons : ['Aceptar']
    });
    alert.present();
  }






}
