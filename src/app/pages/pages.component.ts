import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/components/common/api';

import { SettingsService } from '../services/service.index';





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

  constructor(public _settings: SettingsService) {}

  ngOnInit() {
    init_plugins();
  }
}
