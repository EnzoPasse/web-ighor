import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-no-found',
  templateUrl: './page-no-found.component.html',
  styles: []
})
export class PageNoFoundComponent implements OnInit {

  year = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
