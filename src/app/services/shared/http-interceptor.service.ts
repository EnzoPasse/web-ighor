import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../service.index';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
       // Authorization: `JWT ${JSON.parse(localStorage.getItem('token'))}`
       Authorization: `JWT ${this.usuarioS.token}`
      }
    });
    return next.handle(request);
  }

// esta es la manera de injectar el servicio para que no de error de llamada ciclica

  protected get usuarioS() {
    return this.injector.get(UsuarioService);
  }
}
