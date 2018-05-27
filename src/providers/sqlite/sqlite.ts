import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteProvider {

	private db : SQLiteObject;
	private isOpen : boolean;

  constructor(public http: HttpClient, public storage : SQLite) {

  	if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, identification INTEGER, name TEXT, lastname text)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }


  }

  crearLibro( titulo : string, autor : string){

  	return new Promise((resolve, reject) => {
  		let sql = "INSERT INTO libros (titulo, autor) VALUES (?,?)";
  		this.db.executeSql(sql, [titulo, autor]).then((data) => {
  			resolve(data);
  		}, (error) => {
  			reject(error);
  		});
  	})

  }

  listarLibros(){
  	return new Promise((resolve, reject) => {
  		this.db.executeSql("SELECT * FROM libros", []).then((data) => {
  			let libros = [];
  			if(data.rows.length > 0){

  				for (var i = 0; i < data.rows.length; i++) {
  					libros.push({
  						id : data.rows.item(i).id,
  						titulo : data.rows.item(i).titulo,
  						autor : data.rows.item(i).autor
  					});
  				}

  			}
  			resolve(libros);
  		}, (error) => {
  			reject(error);
  		})
  	})
  } 

}
