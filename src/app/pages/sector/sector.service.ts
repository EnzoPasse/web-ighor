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

  cargarSectores(locali: Localidad) {
    const url = `${URL_SERVICIO}/cuadrante/localidad/${locali.IdLocalidad}`;

    return this.http.get(url).pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('cargarSectores', ORIGEN))
    );
  }

  /* buscarPorTexto(texto: string) {
    // TODO
    const url = `${URL_SERVICIO}/localidad/buscar/${texto}`;
  } */

  crearSector(sector: Sector) {
    const url = `${URL_SERVICIO}/cuadrante`;
    let body = JSON.stringify(sector);
    console.log('body' + body);
    

    return this.http
      .post(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('crearSectores', ORIGEN)));
  }

  actualizarSector(sector: Sector) {
    const url = `${URL_SERVICIO}/cuadrante/${sector.IdCuadrante}`;
    let body = JSON.stringify(sector);

    return this.http
      .put(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('cargarLocalidades', ORIGEN)));
  }

  borrarSector(sector: Sector) {
    const url = `${URL_SERVICIO}/cuadrante/${sector.IdCuadrante}`;
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
