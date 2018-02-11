import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';

import { SettingsService } from './account-setting/settings.service';


// llamda a un script fuera de angular
// esa funcion se encutra dentro de custom.js
// esa funcion inicializa los plugins del template
// se usa en la pagina principal y la del login

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  display = '';
  msgs: Message[] = [];

  constructor(public _settings: SettingsService) {}

  ngOnInit() {
    init_plugins();
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: 'Este es el mensaje',
      detail: 'Detalle del mensaje'
    });
  }
}
