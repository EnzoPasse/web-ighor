// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// core
import { URL_SERVICIO } from '../../../config/config';
import { Producto } from './producto.model';
import { AlertService } from '../../../services/service.index';

// rxjs
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const ORIGEN = 'ProductoService';

@Injectable()

export class ProductoService {

  constructor(public http: HttpClient, public alert: AlertService) {}

  cargarProducto() {
    const url = `${URL_SERVICIO}/producto/`;
    return this.http.get(url).pipe(
        catchError(this.alert.handleError('cargarProductos', ORIGEN))
    );
  }

  crearProducto(data: Producto): Observable<Producto> {
    const url = `${URL_SERVICIO}/producto/`;
    let body = JSON.stringify(data);

    return this.http.post(url, body, this.getHttpHeaders()).pipe(
      map((resp: Producto) => {
        // this.alert.msjAvisoFugaz('Provincia Creada');
        return resp;
      }),
      catchError(this.alert.handleError('crearProductos', ORIGEN))
    );
  }

  actualizarProducto(data: Producto) {
    const url = `${URL_SERVICIO}/producto/${data.id}/`;
    let body = {
      nombre: data.nombre
    };

    return this.http.put(url, body, this.getHttpHeaders()).pipe(
      map((resp: Producto) => {
        // this.alert.msjAvisoFugaz('Provincia Actualizada');
        return resp;
      }),
      catchError(this.alert.handleError('actualizarProductos', ORIGEN))
    );
  }

  borrarProducto(producto: Producto) {
    const url = `${URL_SERVICIO}/producto/${producto.id}/`;

    return this.http.delete(url).pipe(
      map(resp => {
        // this.alert.msjAvisoFugaz('Provincia Borrada');
        return true;
      }),
      catchError(this.alert.handleError('borrarProductos', ORIGEN))
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
