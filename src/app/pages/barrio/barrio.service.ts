import { Injectable } from '@angular/core';
import { Barrio } from './barrio.model';
import { Sector } from '../sector/sector.model';
import { Localidad } from '../localidad/localidad.model';
import { Provincia } from '../provincia/provincia.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BarrioService {

  // tslint:disable-next-line:max-line-length
   barrios = [new Barrio('1' , 'San Pablo', '5014', new Sector('1', 'Sur', new Localidad('1', 'Cordoba', 5014, new Provincia('1', 'Cordoba'))))];

  borrarBarrio(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  cargarBarrios(arg0: any): any {
    return Observable.of(this.barrios);
  }
  constructor() { }
}
