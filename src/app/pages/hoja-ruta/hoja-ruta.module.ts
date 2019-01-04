import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerarHojaRutaComponent } from './generar-hoja-ruta/generar-hoja-ruta.component';
import { AsignarHojaRutaComponent } from './asignar-hoja-ruta/asignar-hoja-ruta.component';
import { CargarVisitaHojaRutaComponent } from './cargar-visita-hoja-ruta/cargar-visita-hoja-ruta.component';
import { PrimeNgModule } from '../primeng.module';

@NgModule({
  imports: [
    CommonModule, PrimeNgModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [
     GenerarHojaRutaComponent, AsignarHojaRutaComponent, CargarVisitaHojaRutaComponent
  ],
  providers: [DatePipe]
})
export class HojaRutaModule { }
