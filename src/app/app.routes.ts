import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { PageNoFoundComponent } from './shared/page-no-found/page-no-found.component';

const routes: Routes = [
  { path: 'dashboard', component: PagesComponent },
  { path: 'path2', component: PagesComponent },
  { path: 'path3', component: PagesComponent },
  { path: '', redirectTo: '/dashboard', pathMatch : 'full' },
  { path: '**', component: PageNoFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(routes, {useHash: true});
