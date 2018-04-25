// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// core
import { URL_SERVICIO } from '../../config/config';
import { Provincia } from '../../models/provincia.model';

// rxjs
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from '../../services/shared/alert.service';
import { Localidad } from './localidad.model';


const ORIGEN = 'LocalidadService';


@Injectable()
export class LocalidadService {


  constructor(private http: HttpClient,
              private alert: AlertService) { }

  cargarLocalidades(prov: Provincia) {
    const url = `${URL_SERVICIO}/localidad/provincia/${prov.IdProvincia}`;

    return this.http.get(url)
    .pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('cargarLocalidades', ORIGEN))
    );
  }


 crearLocalidad(localidad: Localidad) {

  const url = `${URL_SERVICIO}/localidad/localidad`;
  let body = JSON.stringify(localidad);

  return this.http.post(url, body, this.getHttpHeaders())
  .pipe(
    catchError(this.alert.handleError('cargarLocalidades', ORIGEN))
  );
 }

 actualizarLocalidad() {

 }

 borrarLocalidad(localidad: Localidad) {
  const url = `${URL_SERVICIO}/localidad/${localidad.IdLocalidad}`;
  let body = JSON.stringify(localidad);

  return this.http.delete(url, this.getHttpHeaders())
  .pipe(
    catchError(this.alert.handleError('borrarLocalidades', ORIGEN))
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
