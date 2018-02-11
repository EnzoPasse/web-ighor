import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PruebaComponent } from './prueba/prueba.component';
import { PageNoFoundComponent } from '../shared/page-no-found/page-no-found.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'prueba',
        component: PruebaComponent,
        data: { titulo: 'Pruebas' }
      },
      { path: 'home', component: HomeComponent, data: { titulo: 'Home' } },
      {
        path: 'account-setting',
        component: AccountSettingComponent,
        data: { titulo: 'Ajustes de Cuenta' }
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
