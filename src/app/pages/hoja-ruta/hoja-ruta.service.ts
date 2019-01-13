import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../../services/service.index';
import { URL_SERVICIO } from '../../config/config';
import { Hoja } from './hoja-ruta.models';

const ORIGEN = 'HojaRutaService';

@Injectable()
export class HojaRutaService {

  constructor(private http: HttpClient, private alert: AlertService) {}

  buscarVendedores() {
    const url = `${URL_SERVICIO}/vendedor`;

    return this.http.get(url).pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('vendedores', ORIGEN))
    );
  }

  generarPDF(idBarrio: number, hojas: string[]) {

    let url = `${URL_SERVICIO}/pdf/?barrio=${idBarrio}`;

    if ( hojas.length > 0 ) {
      let newHojas = hojas.toString();
      url += `&hojas=${newHojas}`;
    } else {
      url += `&hojas=all`;
    }

    return this.http.get(url).pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('PDF', ORIGEN))
    );
  }

  buscarHojaRutaDetalle(hoja: Hoja) {
    let url = `${URL_SERVICIO}/hoja_ruta/${hoja.id}`;

    return this.http.get(url).pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('PDF', ORIGEN))
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
