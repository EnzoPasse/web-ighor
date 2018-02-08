import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: `assets/css/colors/default.css`,
    tema: 'default'
  };

  constructor(@Inject (DOCUMENT) public _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      // tslint:disable-next-line:quotemark
      console.log("cargando ajustes");
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    } else {
      // tslint:disable-next-line:quotemark
      console.log("cargando valores por defecto");
    }
    this.aplicarTema(this.ajustes.tema);
  }


  aplicarTema(tema: string) {

    // se hace en javascript puro... se trae al DOM se busca elemento su atributo y se cambioa
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.temaUrl = url;
    this.ajustes.tema = tema;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
