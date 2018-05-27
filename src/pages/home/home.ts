import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private libros : any = [];

  constructor(public navCtrl: NavController, public http : ApiProvider) {

  }


  ionViewDidLoad(){
  	this.http.cargarLibros().subscribe((data) => {
  		this.libros = data;
  	}, (error) => {
  		console.log(error);
  	})
  }


}
