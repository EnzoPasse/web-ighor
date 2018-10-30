import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriterioComponent } from './criterio/criterio.component';
import { NormaBarrioComponent } from './norma-barrio.component';
import { PrimeNgModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NormalizacionBarrioService } from './normalizacion-barrio.service';

@NgModule({
  imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            PrimeNgModule],
  declarations: [NormaBarrioComponent, CriterioComponent],
  exports: [],
providers: [NormalizacionBarrioService]
})
export class NormalizacionBarrioModule {}
