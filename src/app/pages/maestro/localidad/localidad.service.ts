// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// core
import { URL_SERVICIO } from '../../../config/config';
import { Provincia } from '../provincia/provincia.model';
import { Localidad } from './localidad.model';
import { AlertService } from '../../../services/shared/alert.service';

// rxjs
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';



const ORIGEN = 'LocalidadService';


@Injectable()
export class LocalidadService {


  constructor(private http: HttpClient,
              private alert: AlertService) { }

  cargarLocalidades(prov: Provincia) {
    const url = `${URL_SERVICIO}/localidad/provincia/${prov.id}/`;

    return this.http.get(url)
    .pipe(
      // map((res: any) => res.localidades),
      catchError(this.alert.handleError('cargarLocalidades', ORIGEN))
    );
  }


  buscarLocalidadesPorTexto(texto: string) { // TODO
    const url = `${URL_SERVICIO}/localidad/?search=${texto}`;

    return this.http.get(url)
    .pipe( catchError(this.alert.handleError('buscarLocalidadTexto', ORIGEN)));
  }


 crearLocalidad(localidad: Localidad) {
  const url = `${URL_SERVICIO}/localidad/`;
  let body = JSON.stringify(localidad);

  return this.http.post(url, body, this.getHttpHeaders())
  .pipe(
    catchError(this.alert.handleError('crearLocalidades', ORIGEN))
  );
 }


/** Creando la DOCS
 * @param localidad de tipo Localidad
 * @returns un Observable con la instancia Localidad actualizada
 */

 actualizarLocalidad(localidad: Localidad): Observable<Localidad> {
  const url = `${URL_SERVICIO}/localidad/${localidad.id}/`;
  // elimino del objeto el atributo id, por que el back no lo necesita
  delete localidad.id;
  let body = JSON.stringify(localidad);

/* let body = {
  codigo_postal: localidad.codigo_postal,
  nombre: localidad.nombre,
  provincia: {}
};
 */
  return this.http.put(url, body, this.getHttpHeaders())
  .pipe(
    catchError(this.alert.handleError('actualizarLocalidades', ORIGEN))
  );
 }

 borrarLocalidad(localidad: Localidad) {
  const url = `${URL_SERVICIO}/localidad/${localidad.id}/`;
  let body = JSON.stringify(localidad);

  return this.http.delete(url, this.getHttpHeaders())
  .pipe(
    catchError(this.alert.handleError('borrarLocalidades', ORIGEN))
  );

 }


 cargarSectores(locali: Localidad) {
  const url = `${URL_SERVICIO}/localidad/${locali.id}/cuadrantes/`;

  return this.http.get(url).pipe(
    // map((res: any) => res.localidades),
    catchError(this.alert.handleError('cargarSectores', ORIGEN))
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
