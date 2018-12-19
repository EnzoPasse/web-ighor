import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  personal: any = [
  ];

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
 },
 {
  titulo: 'Hoja de Rutas',
  icono: 'mdi mdi-map',
  submenu: [
    { titulo: 'Generar Hoja de Rutas', url: '/generarHojaRuta' },
    { titulo: 'Asignar Hojas de Rutas', url: '/asignarHojaRuta' }
  ]
}
  ];

  constructor() { }

}
