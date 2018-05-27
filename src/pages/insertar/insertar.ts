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

  constructor(public navCtrl: NavController, public navParams: NavParams, public api : ApiProvider, public alert : AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertarPage');
  }

  mostrar() {
    let prompt = this.alert.create({
      title: 'Libro insertado correctamente',
      subTitle: "El libro " + this.titulo + " se ha insertado correctamente",
      buttons: ['Aceptar']

    });
    prompt.present();
  }

  anadirLibro(){
  	let libro = JSON.stringify({titulo : this.titulo, autor : this.autor});

  	this.api.añadirLibro(libro).subscribe((data) => {

  		console.log(libro);

  		this.mostrar();

  		this.titulo = '';
  		this.autor = '';

  	}, (error) => {
  		console.log(error);
  	})

  }

}
