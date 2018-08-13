import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIO } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';


const ORIGEN = 'UsuarioService';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  logueado: boolean = true;
  intento: boolean = false;
  token: any;


  constructor(public http: HttpClient,
              public router: Router,
              public alert: AlertService) {}


  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    this.logueado = false;
    this.intento = true;
     let url = URL_SERVICIO + '/auth/';
     let usuarioDTO = {
       username: usuario.email,
       password: usuario.password
     };

    return this.http.post(url, usuarioDTO).pipe(
      map((response: any) => {
        this.guardarStorage(response);
        this.logueado = true;
        return true;
      }),
       catchError(this.alert.handleError('loginUsuario', ORIGEN))

    );
  }

  logout() {

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.usuario = null;
    this.token = null;
    this.router.navigate(['/login']);
  }

  guardarStorage(usuario: Usuario) {

    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', JSON.stringify(usuario.token));
    this.usuario = usuario;
    this.token = usuario.token;

  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.usuario = null;
    }
  }

}
