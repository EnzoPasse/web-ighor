// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

// core
import { URL_SERVICIO } from '../../config/config';
import { Provincia } from './provincia.model';
import { AlertService } from '../../services/service.index';

// rxjs
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';



const ORIGEN = 'ProvinciaService';

@Injectable()
export class ProvinciaService {


  constructor(public http: HttpClient,
              public alert: AlertService ) {}

  cargarProvincias() {
    const url = `${URL_SERVICIO}/provincia`;
    return this.http
      .get(url)
      .pipe(
        map((res: any) => res.provincias),
        catchError(this.alert.handleError('cargarProvincias', ORIGEN))
      );
  }

  crearProvincia(data: Provincia): Observable<Provincia> {
    const url = `${URL_SERVICIO}/provincia`;
    let body = JSON.stringify(data);

    return this.http.post(url, body, this.getHttpHeaders()).pipe(
      map((resp: Provincia) => {
        // this.alert.msjAvisoFugaz('Provincia Creada');
        return resp;
      }),
      catchError(this.alert.handleError('crearProvincias', ORIGEN))
    );
  }

  actualizarPronvincia(data: Provincia) {
    const url = `${URL_SERVICIO}/provincia/${data.IdProvincia}`;
    let body = JSON.stringify(data);

    return this.http.put(url, body, this.getHttpHeaders()).pipe(
      map((resp: Provincia) => {
        // this.alert.msjAvisoFugaz('Provincia Actualizada');
        return resp;
      }),
      catchError(this.alert.handleError('actualizarProvincia', ORIGEN))
    );
  }

  borrarProvincia(provincia: Provincia) {
    const url = `${URL_SERVICIO}/provincia/${provincia.IdProvincia}`;

    return this.http.delete(url).pipe(
      map(resp => {
        // this.alert.msjAvisoFugaz('Provincia Borrada');
        return true;
      }),
      catchError(this.alert.handleError('borrarProvincias', ORIGEN))
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
