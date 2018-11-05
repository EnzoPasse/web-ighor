import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../../../services/service.index';
import { URL_SERVICIO } from '../../../config/config';
import { catchError } from 'rxjs/operators';
import { ConsultaCalle, Consulta } from '../normalizacion.model';
import { Calle } from '../../maestro/calle/calle.model';

const ORIGEN = 'NormalizacionServiceCalle';

@Injectable()
export class NormalizacionCalleService {

  constructor(private http: HttpClient, private alert: AlertService) {}

  buscarFiltros(calle: Calle) {
    const url = `${URL_SERVICIO}/normalizadorcalle/${calle.id}/`;

    return this.http.get(url).pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('buscaFiltros', ORIGEN))
    );
  }

  cargarCallesMal(consulta: ConsultaCalle) {
    const url = `${URL_SERVICIO}/normalizadorcalle/`;
    const body = JSON.stringify(consulta);

    return this.http
      .post(url, body, this.getHttpHeaders())
      .pipe(catchError(this.alert.handleError('buscaCalleMal', ORIGEN)));
  }

  reporteNormalizacion() {
    const url = `${URL_SERVICIO}/reporte_normalizacion/`;

    return this.http.get(url).
     pipe(catchError(this.alert.handleError('reporteNormalizacion', ORIGEN)));
  }

  normalizar(consulta: ConsultaCalle) {
    const url = `${URL_SERVICIO}/normalizadorcalle/${consulta.calle_barrio}/`;
    const body =  JSON.stringify(consulta);

    return this.http.put(url, body, this.getHttpHeaders())
    .pipe(catchError(this.alert.handleError('Normalizacion', ORIGEN)));

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
