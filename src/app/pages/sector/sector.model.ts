
import { Localidad } from '../localidad/localidad.model';

export class Sector {

  constructor(
    public id: string,
    public nombre: string,
    public localidad: Localidad
  ) {}

}
