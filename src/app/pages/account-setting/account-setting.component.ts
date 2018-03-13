import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';



@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  constructor(public _settings: SettingsService) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this._settings.aplicarTema(tema);
  }

  // Esta funcion se trabaja aca, por que manipulamos objetos del DOM directamente
  aplicarCheck(link) {
    // se trae a todos los objetos 'selector'
    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    // solo se le aplica la clae 'working a aquella que sea el link parameter'
    link.classList.add('working');
  }
  // Esta funcion se trabaja aca, por que manipulamos objetos del DOM directamente
  colocarCheck() {

    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._settings.ajustes.tema;

    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
