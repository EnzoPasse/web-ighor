// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// RUTAS
import { PagesRoutes } from './pages.routes';

// MODULOS
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from './primeng.module';

// PAGINAS
import { PagesComponent } from './pages.component';
import { PruebaComponent } from './prueba/prueba.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    PagesComponent,
    PruebaComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutes,
    PrimeNgModule
  ],
  exports: [
    // PagesComponent,
    PruebaComponent,
    HomeComponent
  ],
  providers: [
  ]
})
export class PagesModule {}
