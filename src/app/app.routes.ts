import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { PageNoFoundComponent } from './shared/page-no-found/page-no-found.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/service.index';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: './pages/pages.module#PagesModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
