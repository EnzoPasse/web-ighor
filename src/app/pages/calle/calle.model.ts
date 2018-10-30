import { Barrio } from '../barrio/barrio.model';

export class Calle {


constructor(
 public id: string,
 public barrio: Barrio,
 public calle: CalleSimple,
 public altura_desde: number,
 public altura_hasta: number,
 public referencia: string,
 public plano: string,
 public ubicacion: string,
 public nomenclado: boolean,
 public tipo_numeracion: string
) { }

}

export class CalleSimple {
  constructor(
   public id: string,
   public nombre: string
  ) { }
}
