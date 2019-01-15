import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerarHojaRutaComponent } from './generar-hoja-ruta/generar-hoja-ruta.component';
import { AsignarHojaRutaComponent } from './asignar-hoja-ruta/asignar-hoja-ruta.component';
import { CargarVisitaHojaRutaComponent } from './cargar-visita-hoja-ruta/cargar-visita-hoja-ruta.component';
import { PrimeNgModule } from '../primeng.module';
import { HojaRutaService } from './hoja-ruta.service';
import { HojaDetailComponent } from './asignar-hoja-ruta/hoja-detail.component';
import { PdfModalComponent } from './asignar-hoja-ruta/pdf-modal.component';

@NgModule({
  imports: [
    CommonModule, PrimeNgModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [
     GenerarHojaRutaComponent, AsignarHojaRutaComponent, CargarVisitaHojaRutaComponent, HojaDetailComponent, PdfModalComponent
  ],
  providers: [DatePipe, HojaRutaService]
})
export class HojaRutaModule { }
