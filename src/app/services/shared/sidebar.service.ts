import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
   {
     titulo: 'Principal',
     icono: 'mdi mdi-gauge',
     submenu: [
       { titulo: 'Home', url: '/home' },
       { titulo: 'Pruebas', url: '/prueba' }
     ]
  }
  ];


  constructor() { }

}
