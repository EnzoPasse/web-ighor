import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
   {
     titulo: 'Maestros',
     icono: 'mdi mdi-sitemap',
     submenu: [
       { titulo: 'Home', url: '/home' },
      // { titulo: 'Usuarios', url: '/usuario' },
       { titulo: 'Provincias', url: '/provincia' },
       { titulo: 'Localidades', url: '/localidad' },
       { titulo: 'Sectores', url: '/sector' },
       { titulo: 'Barrios', url: '/barrio' },
       { titulo: 'Calles', url: '/calle' }

     ]
  },
  {
    titulo: 'Normalizacion',
    icono: 'mdi mdi-database',
    submenu: [
      { titulo: 'Barrios', url: '/normalizadorBarrios' },
      { titulo: 'Calles', url: '/normalizadorCalles' }
    ]
 }
  ];

  constructor() { }

}
