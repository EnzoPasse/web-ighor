import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';
import { ContactosNormalizadosComponent } from './contactos-normalizados/contactos-normalizados.component';
import { ComparacionObservacionesComponent } from './comparacion-observaciones/comparacion-observaciones.component';
import { RendimientoAnualComponent } from './rendimiento-anual/rendimiento-anual.component';
import { ComparacionVendedoresComponent } from './comparacion-vendedores/comparacion-vendedores.component';
import { ReportesService } from './reportes.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  declarations: [
    ContactosNormalizadosComponent,
    ComparacionObservacionesComponent,
    RendimientoAnualComponent,
    ComparacionVendedoresComponent
  ],
  exports: [],
  providers: [ReportesService]
})
export class ReportesModule { }
