// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// core
import { SectorListComponent } from './sector-list.component';
import { SectorDetailComponent } from './sector-detail.component';

// services
import { SectorService } from './sector.service';

// primeng
import { PrimeNgModule } from '../primeng.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  declarations: [SectorListComponent, SectorDetailComponent],
  providers: [SectorService]
})
export class SectorModule { }
