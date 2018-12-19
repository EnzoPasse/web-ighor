
export class Usuario {

  constructor(
      public first_name: string,
      public last_name: string,
      public email: string,
      public password?: string,
      public token?: string,
      public role?: Rol,
      public id?: number
  ) { }

}

export class Rol {
  constructor(
    public iso: string,
    public name: string
  ) { }
}
