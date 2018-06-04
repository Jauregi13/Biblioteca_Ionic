import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DescripcionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-descripcion',
  templateUrl: 'descripcion.html',
})
export class DescripcionPage {

	// PROPIEDAD PARA ALMACENAR EL LIBRO QUE VIENE DE LA PAGINA HOME

	libro : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	// ASIGNAMOS EL PARAMETRO QUE VIENE DE HOME A LIBRO
  	// UTILIZAREMOS NAVPARAMS PARA RECOGER ESE PARAMETRO
  	this.libro = navParams.data;
  }

 

}
