// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CORE
import { LocalidadListComponent } from './localidad-list.component';
import { LocalidadDetailComponent } from './localidad-detail.component';

// SERVICES
import { LocalidadService } from './localidad.service';

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
  declarations: [LocalidadListComponent, LocalidadDetailComponent],
  providers: [LocalidadService]
})
export class LocalidadModule {}
