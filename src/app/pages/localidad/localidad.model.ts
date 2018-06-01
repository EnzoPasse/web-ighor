import { Provincia } from '../provincia/provincia.model';


export class Localidad {

  constructor(
    public IdLocalidad: string,
    public nombre: string,
    public CodigoPostal: number,
    public provincia: Provincia
  ) {}

}
