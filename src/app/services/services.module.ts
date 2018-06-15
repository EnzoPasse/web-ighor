import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { PrimeNgModule } from '../pages/primeng.module';

import {
  SidebarService,
  SettingsService,
  AlertService,
  UsuarioService
} from './service.index';


@NgModule({
  imports: [CommonModule, HttpClientModule, PrimeNgModule],
  providers: [SidebarService, SettingsService, AlertService, UsuarioService],
  declarations: [],
  exports: []
})
export class ServicesModule {}
