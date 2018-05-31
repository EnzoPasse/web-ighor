// ANGULAR

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CORE
import { ProvinciaDetailComponent } from './provincia-detail.component';
import { ProvinciasListComponent } from './provincias-list.component';

// SERVICES
import { ProvinciaService } from './provincia.service';

// PRIMENG
import { PrimeNgModule } from '../primeng.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    PrimeNgModule
  ],
  declarations: [
    ProvinciaDetailComponent,
    ProvinciasListComponent
  ],
  providers: [ProvinciaService]
})
export class ProvinciaModule { }
