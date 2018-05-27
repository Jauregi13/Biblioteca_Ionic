import { Component } from '@angular/core';
import { HomePage } from '../home/home';
// importando el fichero ts de la página insertar 
//para poder utilizarlo en la clase TabsPage
import { InsertarPage } from '../insertar/insertar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  // añadimos la variable tab2root que se ejecutará el fichero ts
  // de la página insertar que hemos importado para que reconozca
  // en el fichero tabs.html 
  tab2Root = InsertarPage;

  constructor() {

  }
}
