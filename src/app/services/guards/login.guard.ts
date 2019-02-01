import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../shared/usuario.service';

@Injectable()
export class LoginGuard implements CanActivate {

constructor(public usuarioService: UsuarioService,
            public router: Router) {}

  canActivate() {

   // console.log(JSON.stringify(this.usuarioService.usuario));
    if ( this.usuarioService.usuario !== undefined) {
      return true;
    } else {
       console.error('Bloquedo por el guard! para esta accion debe estar logueado');
       this.router.navigate(['/login']);
       return false;
    }
  }
}
