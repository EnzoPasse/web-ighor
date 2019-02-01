
export class Usuario {

  constructor(
      public first_name: string,
      public last_name: string,
      public email: string,
      public password?: string,
      public token?: string,
      public rol?: Rol,
      public id?: number
  ) { }

  toString(): String {
    return this.first_name.toString();
  }

}

export class Rol {
  constructor(
    public iso: string,
    public name: string
  ) { }
}
