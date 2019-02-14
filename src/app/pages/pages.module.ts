// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// RUTAS
import { PagesRoutes } from './pages.routes';

// MODULOS
import { SharedModule } from '../shared/shared.module';
import { MaestroModule } from './maestro/maestro.module';
import { NormalizacionModule } from './normalizacion/normalizacion.module';
import { HojaRutaModule } from './hoja-ruta/hoja-ruta.module';


// PAGINAS
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { UsuarioComponent } from './usuario/usuario.component';


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
    MaestroModule,
    NormalizacionModule,
    HojaRutaModule
  ],
  exports: [],
  providers: []
})
export class PagesModule {}
