import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';
import { CalleListComponent } from './calle-list.component';
import { CalleDetailComponent } from './calle-detail.component';
import { CalleService } from './calle.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  declarations: [CalleListComponent, CalleDetailComponent],
  providers: [CalleService]
})
export class CalleModule { }
