import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';
import { BarrioListComponent } from './barrio-list.component';
import { BarrioDetailComponent } from './barrio-detail.component';
import { BarrioService } from './barrio.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  declarations: [BarrioListComponent, BarrioDetailComponent],
  providers: [BarrioService]
})
export class BarrioModule { }
