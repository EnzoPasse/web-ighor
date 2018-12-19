import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormaBarrioComponent } from './normalizacion-barrio/norma-barrio.component';
import { PrimeNgModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NormalizacionBarrioService } from './normalizacion-barrio/normalizacion-barrio.service';
import { CriterioComponent } from './criterio/criterio.component';
import { NormaCalleComponent } from './normalizacion-calle/norma-calle.component';
import { NormalizacionCalleService } from './normalizacion-calle/normalizacion-calle.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  declarations: [NormaBarrioComponent, NormaCalleComponent, CriterioComponent],
  exports: [],
  providers: [NormalizacionBarrioService, NormalizacionCalleService]
})
export class NormalizacionModule {}
