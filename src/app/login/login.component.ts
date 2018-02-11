import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// llamda a un script fuera de angular
// esa funcion se encutra dentro de custom.js
// esa funcion inicializa los plugins del template
// se usa en la pagina principal y la del login
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.components.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {
    this.router.navigate(['/home']);
  }

}
