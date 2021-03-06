// angular
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// core
import { Barrio } from './barrio.model';
import { URL_SERVICIO } from '../../../config/config';
import { AlertService } from '../../../services/service.index';
// rxjs
import { catchError } from 'rxjs/operators';

const ORIGEN = 'BarrioService';

@Injectable()
export class BarrioService {

  constructor(private http: HttpClient, private alert: AlertService) {}

  cargarBarrios() {
    let url = `${URL_SERVICIO}/barrio`;

    return this.http
     .get(url, this.getHttpHeaders())
     .pipe(catchError(this.alert.handleError('cargarBarrios', ORIGEN)));
  }

  buscarBarrioPorTexto(texto: string) {
    const url = `${URL_SERVICIO}/barrio/?search=${texto}`;
    return this.http.get(url)
        .pipe(catchError(this.alert.handleError('buscarcuadranteTexto', ORIGEN)));
  }


  crearBarrio(barrio: Barrio) {
    let url = `${URL_SERVICIO}/barrio/`;
    let body = JSON.stringify(barrio);

    return this.http
      .post(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('crearBarrios', ORIGEN)));
  }

  actualizarBarrio(barrio: Barrio) {
    let url = `${URL_SERVICIO}/barrio/${barrio.id}/`;
    let body = JSON.stringify(barrio);

    return this.http
      .put(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('actualizarBarrios', ORIGEN)));
  }

  borrarBarrio(barrio: Barrio) {
    let url = `${URL_SERVICIO}/barrio/${barrio.id}/`;
    let body = JSON.stringify(barrio);

    return this.http
      .delete(url, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('borrarBarrios', ORIGEN)));
  }

  cargarCalles(barrio: Barrio) {
    const url = `${URL_SERVICIO}/barrio/${barrio.id}/calles/`;

    return this.http.get(url)
    .pipe(catchError(this.alert.handleError('cargarCalles', ORIGEN)));
  }


  generarHojaRutas(barrio: Barrio) {
   let url = `${URL_SERVICIO}/barrio/${barrio.id}/generar_hoja_ruta/`;
   let body = {}; // JSON.stringify(barrio);

   return this.http.put( url, body, this.getHttpHeaders())
    .pipe(catchError(this.alert.handleError('generarHojaRuta', ORIGEN)));
  }

  cargarHojaRutas(barrio: Barrio) {
  let url = `${URL_SERVICIO}/barrio/${barrio.id}/hojas_ruta/`;
  let body = JSON.stringify(barrio);

   return this.http.get(url)
    .pipe(catchError(this.alert.handleError('cargarHojaRuta', ORIGEN)));
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
