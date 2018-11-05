
export class Filtros {

constructor(
  public operador: number,
  public parentesis_abierto: boolean,
  public criterio: number,
  public valor: string,
  public parentesis_cerrado: boolean
) {}
}


export class Consulta {

  constructor(
    public barrio: number,
    public all: boolean,
    public barrios_mal: number[],
    public filtros: Filtros[]
  ) {}
}

export class BarriosMal {

  constructor (
    public id: number,
    public descripcion_mal: string,
    public barrio: string
  ) {}
}

export class ConsultaCalle {

  constructor(
    public calle_barrio: number,
    public all: boolean,
    public calles_mal: number[],
    public filtros: Filtros[]
  ) {}
}

export class CalleMal {

  constructor (
    public id: number,
    public descripcion_mal: string,
    public barrio: string
  ) {}
}

