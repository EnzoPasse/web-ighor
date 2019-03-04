import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../../services/service.index';
import { URL_SERVICIO } from '../../config/config';
import { catchError } from 'rxjs/operators/catchError';

const ORIGEN = 'ReportesServices';

@Injectable()
export class ReportesService {

  constructor(private http: HttpClient, private alert: AlertService) { }


contactosNormalizados( parametro) {
  let url = `${URL_SERVICIO}/reporte_contactos_normalizados/?${parametro}`;

  return this.http.get(url).pipe(
    // map((res: any) => res.localidades),
    catchError(this.alert.handleError('contactosNormalizados', ORIGEN))
  );
}

observacionesComparacion(params) {
  let url = `${URL_SERVICIO}/reporte_observaciones_vendedor/`;

  if (params) {
    url += `?${params}`;
  }
  console.log(url);

  return this.http.get(url).pipe(
    catchError(this.alert.handleError('ObservacionesVendedor', ORIGEN))
  );
}

vendedoresComparacion(params) {
  let url = `${URL_SERVICIO}/reporte_vendedores_observacion/`;

  if (params) {
    url += `?${params}`;
  }
  console.log(url);

  return this.http.get(url).pipe(
    catchError(this.alert.handleError('VendedoresObservacion', ORIGEN))
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
