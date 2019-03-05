import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PageNoFoundComponent } from '../shared/page-no-found/page-no-found.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProvinciasListComponent } from './maestro/provincia/provincias-list.component';
import { LocalidadListComponent } from './maestro/localidad/localidad-list.component';
import { SectorListComponent } from './maestro/sector/sector-list.component';
import { BarrioListComponent } from './maestro/barrio/barrio-list.component';
import { CalleListComponent } from './maestro/calle/calle-list.component';
import { NormaBarrioComponent } from './normalizacion/normalizacion-barrio/norma-barrio.component';
import { LoginGuard } from '../services/service.index';
import { NormaCalleComponent } from './normalizacion/normalizacion-calle/norma-calle.component';
import { GenerarHojaRutaComponent } from './hoja-ruta/generar-hoja-ruta/generar-hoja-ruta.component';
import { AsignarHojaRutaComponent } from './hoja-ruta/asignar-hoja-ruta/asignar-hoja-ruta.component';
import { CargarVisitaHojaRutaComponent } from './hoja-ruta/cargar-visita-hoja-ruta/cargar-visita-hoja-ruta.component';
import { ProductoComponent } from './maestro/producto/producto.component';
import { ObservacionComponent } from './maestro/observacion/observacion.component';
import { ContactosNormalizadosComponent } from './reportes/contactos-normalizados/contactos-normalizados.component';
import { ComparacionObservacionesComponent } from './reportes/comparacion-observaciones/comparacion-observaciones.component';
import { RendimientoAnualComponent } from './reportes/rendimiento-anual/rendimiento-anual.component';
import { ComparacionVendedoresComponent } from './reportes/comparacion-vendedores/comparacion-vendedores.component';
import { NormalizacionReporteComponent } from './reportes/normalizacion-reporte/normalizacion-reporte.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'account-setting',
        component: AccountSettingComponent,
        data: { titulo: 'Ajustes de Cuenta' }
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
        data: { titulo: 'Usuario' }
      },
      {
        path: 'provincia',
        component: ProvinciasListComponent,
        data: { titulo: 'Provincias' }
      },
      {
        path: 'localidad',
        component: LocalidadListComponent,
        data: { titulo: 'Localidades' }
      },
      {
        path: 'sector',
        component: SectorListComponent,
        data: { titulo: 'Sectores' }
      },
      {
        path: 'barrio',
        component: BarrioListComponent,
        data: { titulo: 'Barrios' }
      },
      {
        path: 'calle',
        component: CalleListComponent,
        data: { titulo: 'Calles' }
      },
      {
        path: 'producto',
        component: ProductoComponent,
        data: { titulo: 'Productos' }
      },
      {
        path: 'observacion',
        component: ObservacionComponent,
        data: { titulo: 'Observaciones' }
      },
      {
        path: 'normalizadorBarrios',
        component: NormaBarrioComponent,
        data: { titulo: 'Normalizar Barrio' }
      },
      {
        path: 'normalizadorCalles',
        component: NormaCalleComponent,
        data: { titulo: 'Normalizar Calle' }
      },
      {
        path: 'generarHojaRuta',
        component: GenerarHojaRutaComponent,
        data: { titulo: 'Generar Hoja de Ruta' }
      },
      {
        path: 'asignarHojaRuta',
        component: AsignarHojaRutaComponent,
        data: { titulo: 'Asignar Hoja de Ruta' }
      },
      {
        path: 'cargarHojaRuta',
        component: CargarVisitaHojaRutaComponent,
        data: { titulo: 'Cargar Hoja de Ruta' }
      },
      {
        path: 'contactosNormalizados',
        component: ContactosNormalizadosComponent,
        data: { titulo: 'Contactos Normalizados' }
      },
      {
        path: 'comparacionObservaciones',
        component: ComparacionObservacionesComponent,
        data: { titulo: 'Comparacion de Observaciones' }
      },
      {
        path: 'rendimientoAnual',
        component: RendimientoAnualComponent,
        data: { titulo: 'Rendimiento Anual' }
      },
      {
        path: 'comparacionVendedores',
        component: ComparacionVendedoresComponent,
        data: { titulo: 'Comparacion de Vendedores' }
      },
      {
        path: 'normalizacionReporte',
        component: NormalizacionReporteComponent,
        data: { titulo: 'Reporte Normalizacion' }
      },
      { path: '**', component: PageNoFoundComponent }
    ]
  },
  { path: '**', component: PageNoFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutes {}

// export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
