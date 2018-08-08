// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// RUTAS
import { PagesRoutes } from './pages.routes';

// MODULOS
import { SharedModule } from '../shared/shared.module';


// PAGINAS
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LocalidadModule } from './localidad/localidad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { SectorModule } from './sector/sector.module';
import { BarrioModule } from './barrio/barrio.module';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AccountSettingComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PagesRoutes,
    ProvinciaModule,
    LocalidadModule,
    SectorModule,
    BarrioModule
  ],
  exports: [],
  providers: []
})
export class PagesModule {}
