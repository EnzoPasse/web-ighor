// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// core
import { URL_SERVICIO } from '../../config/config';
import { AlertService } from '../../services/shared/alert.service';
import { Sector } from './sector.model';
// rxjs
import { catchError } from 'rxjs/operators';

const ORIGEN = 'SectorService';

@Injectable()
export class SectorService {

  constructor(private http: HttpClient, private alert: AlertService) {}



  buscarSectoresPorTexto(texto: string) {

    const url = `${URL_SERVICIO}/cuadrante/?search=${texto}`;
    return this.http.get(url)
        .pipe(catchError(this.alert.handleError('buscarcuadranteTexto', ORIGEN)));
  }

  crearSector(sector: Sector) {
    const url = `${URL_SERVICIO}/cuadrante/`;
    let body = JSON.stringify(sector);
    console.log('body' + body);

    return this.http
      .post(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('crearSectores', ORIGEN)));
  }

  actualizarSector(sector: Sector) {
    const url = `${URL_SERVICIO}/cuadrante/${sector.id}/`;
    let body = JSON.stringify(sector);
    console.log('body' + body);

    return this.http
      .put(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('actualizarSectores', ORIGEN)));
  }

  borrarSector(sector: Sector) {
    const url = `${URL_SERVICIO}/cuadrante/${sector.id}/`;
    let body = JSON.stringify(sector);

    return this.http
      .delete(url, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('borrarLocalidades', ORIGEN)));
  }


cargarBarrios(sector: Sector) {
  const url = `${URL_SERVICIO}/cuadrante/${sector.id}/barrios/`;

  return this.http.get(url)
  .pipe(catchError(this.alert.handleError('cargarBarrios', ORIGEN)));
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
