import { Sector } from '../sector/sector.model';

export class Barrio {

  constructor(
    public id: string,
    public nombre: string,
    public codigo_postal: string,
    public cuadrante: Sector
  ) {}
}
