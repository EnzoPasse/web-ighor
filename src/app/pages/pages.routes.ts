import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PageNoFoundComponent } from '../shared/page-no-found/page-no-found.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProvinciasListComponent } from './provincia/provincias-list.component';
import { LocalidadListComponent } from './localidad/localidad-list.component';
import { SectorListComponent } from './sector/sector-list.component';
import { LoginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home',
        component: HomeComponent,
        data: { titulo: 'Home' } },
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
      { path: '**', component: PageNoFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutes {}

// export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
