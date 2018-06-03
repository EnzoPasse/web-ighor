
import { Localidad } from '../localidad/localidad.model';

export class Sector {

  constructor(
    public IdCuadrante: string,
    public nombre: string,
    public localidad: Localidad
  ) {}

}
