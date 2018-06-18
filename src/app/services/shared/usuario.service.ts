import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { URL_SERVICIO } from '../../config/config';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


const ORIGEN = 'UsuarioService';

@Injectable()
export class UsuarioService {

  usuario: Usuario;

  USUARIOS = [
    new Usuario(null, 'enzo.passetti@gmail.com', '123', 'ADMIN_ROLE'),
    new Usuario(null, 'test1@test', '123', 'USER_ROLE'),
    new Usuario(null, 'test2@test', '123', 'USER_ROLE'),
    new Usuario(null, 'test3@test', '123', 'USER_ROLE'),
    new Usuario(null, 'test4@test', '123', 'USER_ROLE'),
    new Usuario(null, 'test5@test', '123', 'USER_ROLE'),
  ];

  constructor(public http: HttpClient,
              public router: Router,
              public alert: AlertService) {}


  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    // TODO: quitar esto y llamar al servicio
    let usuariotest: Usuario[] = null;
    usuariotest = this.USUARIOS.filter(c => c.email === usuario.email);

    if (usuariotest.length > 0) {
      this.guardarStorage(usuariotest[0]);

      // console.log('usuarioStorage' + JSON.stringify(usuariotest[0]));

      return true;
    } else {
      this.alert.handleError('borrarLocalidades', ORIGEN);
      return false;
    }
    // fin todo

    /* let url = URL_SERVICIO + '/login';
    return this.http.post(url, usuario).pipe(
      map((response: any) => {
        this.guardarStorage(response.usuario);
        return true;
      }),
       catchError(this.alert.handleError('loginUsuario', ORIGEN))

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
