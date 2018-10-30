import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../../services/service.index';
import { URL_SERVICIO } from '../../config/config';
import { catchError } from 'rxjs/operators';
import { Barrio } from '../barrio/barrio.model';
import { Consulta } from './norma-barrio.model';
import { timingSafeEqual } from 'crypto';

const ORIGEN = 'NormalizacionService';
@Injectable()
export class NormalizacionBarrioService {
  constructor(private http: HttpClient, private alert: AlertService) {}

  buscarFiltros(barrio: Barrio) {
    const url = `${URL_SERVICIO}/normalizadorbarrio/${barrio.id}/`;

    return this.http.get(url).pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('buscaFiltros', ORIGEN))
    );
  }

  cargarBarriosMal(consulta: Consulta) {
    const url = `${URL_SERVICIO}/normalizadorbarrio/`;
    const body = JSON.stringify(consulta);

    return this.http
      .post(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('buscaBarrioMal', ORIGEN)));
  }

  reporteNormalizacion() {
    const url = `${URL_SERVICIO}/reporte_normalizacion/`;

    return this.http.get(url).
     pipe(catchError(this.alert.handleError('reporteNormalizacion', ORIGEN)));
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
