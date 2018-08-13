// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// core
import { URL_SERVICIO } from '../../config/config';
import { Provincia } from '../provincia/provincia.model';
import { AlertService } from '../../services/shared/alert.service';
import { Localidad } from '../localidad/localidad.model';
import { Sector } from './sector.model';

// rxjs
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

const ORIGEN = 'SectorService';

@Injectable()
export class SectorService {

  constructor(private http: HttpClient, private alert: AlertService) {}
  sector = [new Sector('1', 'Sur', new Localidad('1', 'Cordoba', 5014, new Provincia('1', 'Cordoba')))];



  buscarSectoresPorTexto(arg0: any): any {
     return Observable.of(this.sector);  }

  /* buscarPorTexto(texto: string) {
    // TODO
    const url = `${URL_SERVICIO}/localidad/buscar/${texto}`;
  } */

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

  private getHttpHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    };
    return httpOptions;
  }
}
