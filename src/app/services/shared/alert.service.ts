import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class AlertService {
  constructor() {}

  public handleError(operation: string, origen: string) {
    return (err: any) => {
      let errMsg = `Operacion: ${origen}=>${operation}()`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 0:
            errMsg = ` Mensaje: Servidor Inactivo
                          Estado: ${err.statusText}`;
            break;

          case 400:
            if (err.error.non_field_errors) {
               errMsg = `${err.error.non_field_errors} `;
            } else {
               errMsg = ` ${JSON.stringify(err.error)} `;
            }
            break;

          case 401:
            errMsg = `Motivo: ${err.statusText}
                      Mensaje: ${err.error.detail}`;
            break;

          default:
            errMsg = `Mensaje: ${err.error.mensaje}
                              Estado: ${err.statusText}`;
        }
      }
      return Observable.throw(errMsg);
    };
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
