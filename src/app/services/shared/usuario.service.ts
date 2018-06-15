import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { URL_SERVICIO } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioService {

  usuario: Usuario;

  USUARIOS = [
    new Usuario(null, 'enzo.passetti@gmail.com', '123'),
    new Usuario(null, 'test1@test', '123'),
    new Usuario(null, 'test2@test', '123'),
    new Usuario(null, 'test3@test', '123'),
    new Usuario(null, 'test4@test', '123'),
    new Usuario(null, 'test5@test', '123'),
  ];

  constructor(public http: HttpClient, public router: Router) {}


  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let usuariotest: any = null;
    usuariotest = this.USUARIOS.filter(c => c === usuario);
    if (usuariotest) {
      return true;
    } else {
      return false;
    }

    /* let url = URL_SERVICIO + '/login';
    return this.http.post(url, usuario).pipe(
      map((response: any) => {
        this.guardarStorage(response.usuario);
        return true;
      })
    ); */
  }

  logout() {

    localStorage.removeItem('usuario');
    this.usuario = null;
    this.router.navigate(['/login']);
  }

  guardarStorage(usuario: Usuario) {

    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;

  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.usuario = null;
    }
  }

}
