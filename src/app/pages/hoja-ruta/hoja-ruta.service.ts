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

  buscarHojaRutaClientes(hoja: Hoja) {
    let url = `${URL_SERVICIO}/hoja_ruta/${hoja.id}`;

    return this.http.get(url).pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('DetalleClientes', ORIGEN))
    );
  }

  actualizarHojaRuta(hojas: Hoja []) {
   let url = `${URL_SERVICIO}/actualizar_hoja_ruta/`;

   return this.http.post(url, hojas, this.getHttpHeaders()).
    pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('Actualizar HR', ORIGEN))
    );
  }

buscarHojaRutaDetalle(numero?: number) {
  let url = `${URL_SERVICIO}/vendedor_detalle_hoja_ruta/`;

  if ( numero > 0) {
     url = url + `?numero=${numero}`;
  }

  return this.http.get(url).pipe(
    // map((res: any) => res.localidades),
    catchError(this.alert.handleError('DetalleHojaRuta', ORIGEN))
  );
}

actualiarHojaRutaDetalle(detalle: any[]) {
  let url = `${URL_SERVICIO}/vendedor_detalle_hoja_ruta/`;

  return this.http.post(url, detalle, this.getHttpHeaders()).
   pipe(
     catchError(this.alert.handleError('ActualiarDetalleHR', ORIGEN))
   );
}

cargarObservaciones() {
  let url = `${URL_SERVICIO}/observacion/`;

  return this.http.get(url).pipe(
    catchError(this.alert.handleError('Observaciones', ORIGEN))
  );
}

cargarProductos() {
 let url = `${URL_SERVICIO}/producto/`;

 return this.http.get(url).pipe(
    catchError(this.alert.handleError('Productos', ORIGEN))
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
