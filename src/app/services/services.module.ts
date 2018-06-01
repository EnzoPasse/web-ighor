import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { PrimeNgModule } from '../pages/primeng.module';

import {
  SidebarService,
  SettingsService,
  AlertService
} from './service.index';


@NgModule({
  imports: [CommonModule, HttpClientModule, PrimeNgModule],
  providers: [SidebarService, SettingsService, AlertService],
  declarations: [],
  exports: []
})
export class ServicesModule {}
