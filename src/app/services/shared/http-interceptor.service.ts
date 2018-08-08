import { Injectable } from '@angular/core';
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
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    return next.handle(request);
  }
}
