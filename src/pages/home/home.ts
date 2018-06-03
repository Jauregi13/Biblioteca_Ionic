import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { ApiProvider } from '../../providers/api/api';
import { DescripcionPage } from '../descripcion/descripcion';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private libros : any = [];

  constructor(public navCtrl: NavController, public http : ApiProvider, public alert : AlertController) {

  }


  ionViewDidLoad(){
  	this.http.cargarLibros().subscribe((data) => {
  		this.libros = data;
  	}, (error) => {
  		console.log(error);
  	})
  }

  descripcion(libro){
    this.navCtrl.push(DescripcionPage, libro);
  }

  aviso(libro) {
  	let id = JSON.stringify({id : libro.id});
    let alert = this.alert.create({
    title: 'Confirmación',
    subTitle: '¿Estas seguro que quieres eliminar el libro?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.ionViewDidLoad();
        }
      },
      {
        text: 'Aceptar',
        handler: () => {
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

  eliminar(libro){

  	this.aviso(libro);

  }

  confirmacion(libro) {
    let prompt = this.alert.create({
      title: 'Libro eliminado correctamente',
      subTitle: "El libro " + libro.titulo + " se ha eliminado correctamente",
      buttons: [{

      	text : 'Aceptar',
      	handler: () => {
      		this.ionViewDidLoad();
      	}

      }
      ]

    });
    prompt.present();
  }

  leido(libro){

  	let titulo = JSON.stringify({titulo : libro.titulo});

  	this.http.libroLeido(titulo).subscribe((data) => {

      this.confirmacionLeido(libro.titulo);

  	},(error) => {
  		console.log(error);
  	})

  }

  listarLeido(leido){

  	let libroLeido = JSON.stringify({ leido : leido});

  	this.http.listarLeido(libroLeido).subscribe((data) => {
  		this.libros = data;
  	},(error) => {
  		console.log(error);
  	})

  }

  confirmacionLeido(titulo){
    let alert = this.alert.create({
      title : 'Libro leido!!',
      subTitle : 'Enhorabuena!! Has terminado de leer el libro ' + titulo,
      buttons : ['Aceptar']
    });
    alert.present();
  }

}
