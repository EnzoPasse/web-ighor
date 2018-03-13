import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';

import 'rxjs/add/observable/throw';

import { Provincia } from '../../models/provincia.model';


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
    let nombre: string = provincia.nombre.toUpperCase();

    return this.http.put(url, nombre)
    .map((resp: any) => {
      this.msjAvisoFugaz('Provincia Actualizada');
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
                    Estado: ${err.statusText}
                    Mensaje: ${err.error}
                    Ubicacion: ${err.url}`;
      }
      return Observable.throw(errMsg);
    };
  }


  private msjAvisoFugaz(titulo: string) {
    swal({
      title: `${titulo}`,
      text: ' ',
      icon: 'success',
      buttons: [false],
      timer: 1000
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
