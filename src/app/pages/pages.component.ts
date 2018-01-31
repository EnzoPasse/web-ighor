import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  display = '';
  msgs: Message[] = [];

  constructor() {}

  ngOnInit() {}

  showSuccess() {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: 'Este es el mensaje',
      detail: 'Detalle del mensaje'
    });
  }
}
