import { CalleSimple } from '../maestro/calle/calle.model';
import { Barrio } from '../maestro/barrio/barrio.model';
import { Usuario } from '../usuario/usuario.model';


export class HojaRuta {
  constructor(
    public id: number,
    public fecha: Date,
    public barrio: Barrio,
    public owner: Usuario,
    public hojas: Hoja []
  ) {}
}

export class Hoja {
  constructor(
    public id: number,
    public numero: string,
    public calle: CalleSimple,
    public altura_desde: string,
    public altura_hasta: string,
    public cant_registros: number,
    public estado: Estado,
    public asignado_a?: string,
    public detalle_hoja_ruta?: DetalleHoja[]
  ) {}
}

export class DetalleHoja {
  constructor(
   public id: number,
   public numero_orden: string,
   public tipo: number,
   public titular: number,
   public apellido: string,
   public nombre: string,
   public provincia: string,
   public localidad: string,
   public barrio: string,
   public calle: string,
   public altura: string,
   public piso?: string,
   public departamento?: string,
   public observaciones?: string,
  ) {}
}

export class Estado {
  constructor(
    public nombre: string,
    public id: number
    ) {}
}
