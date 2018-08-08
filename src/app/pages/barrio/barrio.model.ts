import { Sector } from '../sector/sector.model';

export class Barrio {

  constructor(
    public IdBarrio: string,
    public nombre: string,
    public CodigoPostal: string,
    public sector: Sector
  ) {}
}
