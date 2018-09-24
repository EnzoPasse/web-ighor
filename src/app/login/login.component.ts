import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

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
  email: string;
  recuerdame: boolean = false;
  msjError: any;

  constructor(public usuarioService: UsuarioService, public router: Router) {}

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 3) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(
      null,
      null,
      forma.value.email,
      forma.value.password,
      null
    );

    this.usuarioService.login(usuario, this.recuerdame)
    .subscribe(
      (correcto: any) => {
        this.router.navigate(['/home']);
      },
      error => {
        this.msjError = <any>error;
        setTimeout(() => {this.msjError = null; }, 7000);
      }
    );
  }
}
