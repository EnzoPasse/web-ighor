import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../../../services/service.index';
import { URL_SERVICIO } from '../../../config/config';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Observacion } from './Observacion.model';

const ORIGEN = 'ObservacionService';

@Injectable()
export class ObservacionService {

  constructor(public http: HttpClient, public alert: AlertService) {}

  cargarObservacion() {
    const url = `${URL_SERVICIO}/observacion/`;
    return this.http.get(url).pipe(
        catchError(this.alert.handleError('cargarObservacion', ORIGEN))
    );
  }

  crearObservacion(data: Observacion): Observable<Observacion> {
    const url = `${URL_SERVICIO}/observacion/`;
    let body = JSON.stringify(data);

    return this.http.post(url, body, this.getHttpHeaders()).pipe(
      map((resp: Observacion) => {
        // this.alert.msjAvisoFugaz('Provincia Creada');
        return resp;
      }),
      catchError(this.alert.handleError('crearObservacion', ORIGEN))
    );
  }

  actualizarObservacion(data: Observacion) {
    const url = `${URL_SERVICIO}/observacion/${data.id}/`;
    let body = {
      nombre: data.nombre
    };

    return this.http.put(url, body, this.getHttpHeaders()).pipe(
      map((resp: Observacion) => {
        // this.alert.msjAvisoFugaz('Provincia Actualizada');
        return resp;
      }),
      catchError(this.alert.handleError('actualizarObservacion', ORIGEN))
    );
  }

  borrarObservacion(observacion: Observacion) {
    const url = `${URL_SERVICIO}/observacion/${observacion.id}/`;

    return this.http.delete(url).pipe(
      map(resp => {
        // this.alert.msjAvisoFugaz('Provincia Borrada');
        return true;
      }),
      catchError(this.alert.handleError('borrarObservacion', ORIGEN))
    );
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
