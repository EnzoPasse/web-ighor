import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Calle } from './calle.model';
import { URL_SERVICIO } from '../../config/config';
import { catchError } from 'rxjs/operators/catchError';
import { AlertService } from '../../services/service.index';

const ORIGEN = 'CalleService';

@Injectable()
export class CalleService {
  constructor(private http: HttpClient, private alert: AlertService) {}



  crearCalle(calle: Calle) {
    let url = `${URL_SERVICIO}/barrio_calle/`;
//    delete calle.tipoNumeracion;

    let body = JSON.stringify(calle);

    return this.http
      .post(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('crearCalles', ORIGEN)));
  }

  actualizarCalle(calle: Calle) {
    let url = `${URL_SERVICIO}/barrio_calle/${calle.id}/`;
  //  delete calle.tipoNumeracion;

    let body = JSON.stringify(calle);

    return this.http
      .put(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('actualizarCalle', ORIGEN)));
  }

  borrarCalle(calle: Calle) {
    let url = `${URL_SERVICIO}/barrio_calle/${calle.id}/`;
    let body = JSON.stringify(calle);

    return this.http
      .delete(url, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('borrarBarrios', ORIGEN)));
  }

  buscarCallesSimplesPorTexto(texto: string) {
    const url = `${URL_SERVICIO}/calle/?search=${texto}`;
    return this.http.get(url)
        .pipe(catchError(this.alert.handleError('buscarCalleSimpleTexto', ORIGEN)));
  }


  private getHttpHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    };
    return httpOptions;
  }
}
