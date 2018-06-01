// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// RUTAS
import { PagesRoutes } from './pages.routes';

// MODULOS
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


// PAGINAS
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { CargandoComponent } from '../components/cargando/cargando.component';

import { LocalidadModule } from './localidad/localidad.module';
import { ProvinciaModule } from './provincia/provincia.module';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AccountSettingComponent,
    UsuarioComponent,
    CargandoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PagesRoutes,
    NgxPaginationModule,
    ProvinciaModule,
    LocalidadModule
  ],
  exports: [
    // PagesComponent,

  ],
  providers: []
})
export class PagesModule {}
