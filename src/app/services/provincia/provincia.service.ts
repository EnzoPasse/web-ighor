
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Provincia } from '../../models/provincia.model';

import { URL_SERVICIO } from '../../config/config';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import 'rxjs/add/observable/throw';



const ORIGEN = 'ProvinciaService';

@Injectable()
export class ProvinciaService {

  constructor(public http: HttpClient) {}

  cargarProvincias() {
    const url = `${URL_SERVICIO}/provincia`;

    return this.http.get(url).pipe(catchError(this.handleError('cargarProvincias')));
  }


  crearProvincia(nombre: string) {
    const url = `${URL_SERVICIO}/provincia`;


    return this.http.post(url, { nombre } )
      .map((resp: any) => {
        this.msjAvisoFugaz('Provincia Creada');
          return resp;
    }).pipe(catchError(this.handleError('crearProvincias'))) ;
  }


   actualizarPronvincia(provincia: Provincia) {

    const url = `${URL_SERVICIO}/provincia/${provincia.IdProvincia}`;

    let body = JSON.stringify(provincia);

    return this.http.put(url, body, this.getHttpHeaders())
    .map((resp: any) => {
      this.msjAvisoFugaz('Provincia Actualizada');
      console.log(resp);
      return resp;
    }).pipe(catchError(this.handleError('actualizarProvincia')));
   }


  borrarProvincia ( id: string ) {
    const url = `${URL_SERVICIO}/provincia/${id}`;

    return this.http.delete( url )
        .map( resp => {
          this.msjAvisoFugaz('Provincia Borrada');
          return true;
        }).pipe(catchError(this.handleError('borrarProvincias')));
  }


  private handleError(operation: string) {
    return (err: any) => {
      let errMsg = `Operacion: ${ORIGEN}=>${operation}()`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        // you could extract more info about the error if you want, e.g.:
        errMsg += `
                    Mensaje: ${err.error} - ${err.error.message}
                    Estado: ${err.statusText}
                    Ubicacion: ${err.url}`;
      }
      return Observable.throw(errMsg);
    };
  }

private getHttpHeaders() {
   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json; charset=UTF-8'
    })
  };
  return httpOptions;
}


  private msjAvisoFugaz(titulo: string) {
    swal({
      title: `${titulo}`,
      text: ' ',
      icon: 'success',
      buttons: [false],
      timer: 1100
    });
  }

  /*
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error( 'ERROR: ' + JSON.stringify(error)); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
 */
}
