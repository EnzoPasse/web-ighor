import { Provincia } from '../provincia/provincia.model';


export class Localidad {

  constructor(
    public id: string,
    public nombre: string,
    public codigo_postal: number,
    public provincia: Provincia
  ) {}

}
