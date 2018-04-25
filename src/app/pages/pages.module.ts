// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// RUTAS
import { PagesRoutes } from './pages.routes';

// MODULOS
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from './primeng.module';
import { NgxPaginationModule } from 'ngx-pagination';


// PAGINAS
import { PagesComponent } from './pages.component';
import { PruebaComponent } from './prueba/prueba.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProvinciasComponent } from './provincia/provincias.component';
import { CargandoComponent } from '../components/cargando/cargando.component';
import { LocalidadModule } from './localidad/localidad.module';


@NgModule({
  declarations: [
    PagesComponent,
    PruebaComponent,
    HomeComponent,
    AccountSettingComponent,
    UsuarioComponent,
    ProvinciasComponent,
    CargandoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PagesRoutes,
    PrimeNgModule,
    NgxPaginationModule,
    LocalidadModule
  ],
  exports: [
    // PagesComponent,

  ],
  providers: []
})
export class PagesModule {}
