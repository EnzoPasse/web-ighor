import { Injectable, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable()
export class SidebarService  {

  munuAdmin: any;
  menuReturnJefe: any;
  menuReturnVendedor: any;
  personal: any = [];

  constructor (public usuarioService: UsuarioService) { }


devolverMenu() {
  if (this.usuarioService.usuario.rol.iso === 'ADM') {
    /* console.log(this.menu);
    return this.menu; */

    this.munuAdmin = [
      {
        titulo: 'Administracion',
        icono: 'mdi mdi-sitemap',
        submenu: [
          { titulo: 'Provincias', url: '/provincia' },
          { titulo: 'Localidades', url: '/localidad' },
          { titulo: 'Sectores', url: '/sector' },
          { titulo: 'Barrios', url: '/barrio' },
          { titulo: 'Calles', url: '/calle' },
          { titulo: 'Productos', url: '/producto' },
          { titulo: 'Observaciones', url: '/observacion' }

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
       { titulo: 'Generar Hojas de Rutas', url: '/generarHojaRuta' },
       { titulo: 'Asignar Hojas de Rutas', url: '/asignarHojaRuta' },
       { titulo: 'Cargar Hojas de Rutas', url: '/cargarHojaRuta' }

     ]
   }
     ];

     return this.munuAdmin;

  }

  if (this.usuarioService.usuario.rol.iso === 'VEN') {
  /*   console.log(this.menu);
    this.menuReturnJefe = null;
    this.menuReturnJefe = Object.assign([], this.menu);    // this.menu.map(x => ({...x}));
      return this.menuReturnJefe.splice(2, 1); */

      this.menuReturnJefe = [
      {
       titulo: 'Hoja de Rutas',
       icono: 'mdi mdi-map',
       submenu: [
         { titulo: 'Generar Hojas de Rutas', url: '/generarHojaRuta' },
         { titulo: 'Asignar Hojas de Rutas', url: '/asignarHojaRuta' }
       //  { titulo: 'Cargar Hojas de Rutas', url: '/cargarHojaRuta' }

       ]
     }
       ];
       return this.menuReturnJefe;
  }

  if (this.usuarioService.usuario.rol.iso === 'UVE') {
    /* console.log(this.menu);
     let submenu;
    this.menuReturnVendedor = Object.assign([], this.menu);
    this.menuReturnVendedor = this.menuReturnVendedor.splice(2, 1);
    submenu = this.menuReturnVendedor[0].submenu.splice(0, 2);
    this.menuReturnVendedor.submenu = submenu;
     return this.menuReturnVendedor; */

     this.menuReturnVendedor = [
      {
       titulo: 'Hoja de Rutas',
       icono: 'mdi mdi-map',
       submenu: [
         { titulo: 'Cargar Hojas de Rutas', url: '/cargarHojaRuta' }
       ]
     }
       ];
       return this.menuReturnVendedor;

   }
 }

}
