import { Provincia } from './provincia.model';

export class Localidad {

  constructor(
    public IdLocalidad: string,
    public nombre: string,
    public codPostal: number,
    public provincia: Provincia
  ) {}

}
