import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
   {
     titulo: 'Principal',
     icono: 'mdi mdi-gauge',
     submenu: [
       { titulo: 'Home', url: '/home' },
       { titulo: 'Usuarios', url: '/usuario' },
       { titulo: 'Provincias', url: '/provincia' },
       { titulo: 'Localidades', url: '/localidad' }
     ]
  }
  ];

  constructor() { }

}
