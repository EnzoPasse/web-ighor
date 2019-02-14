// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// core
import { ProvinciasListComponent } from './provincia/provincias-list.component';
import { ProvinciaDetailComponent } from './provincia/provincia-detail.component';
import { LocalidadListComponent } from './localidad/localidad-list.component';
import { LocalidadDetailComponent } from './localidad/localidad-detail.component';
import { SectorListComponent } from './sector/sector-list.component';
import { SectorDetailComponent } from './sector/sector-detail.component';
import { BarrioListComponent } from './barrio/barrio-list.component';
import { BarrioDetailComponent } from './barrio/barrio-detail.component';
import { CalleListComponent } from './calle/calle-list.component';
import { CalleDetailComponent } from './calle/calle-detail.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoDetailComponent } from './producto/producto-detail.component';
import { ObservacionComponent } from './observacion/observacion.component';
import { ObservacionDetailComponent } from './observacion/observacion-detail.component';

// services
import { ProvinciaService } from './provincia/provincia.service';
import { LocalidadService } from './localidad/localidad.service';
import { SectorService } from './sector/sector.service';
import { BarrioService } from './barrio/barrio.service';
import { CalleService } from './calle/calle.service';
import { ProductoService } from './producto/producto.service';
import { ObservacionService } from './observacion/observacion.service';

// primeng
import { PrimeNgModule } from '../primeng.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  declarations: [
    ProvinciasListComponent,
    ProvinciaDetailComponent,
    LocalidadListComponent,
    LocalidadDetailComponent,
    SectorListComponent,
    SectorDetailComponent,
    BarrioListComponent,
    BarrioDetailComponent,
    CalleListComponent,
    CalleDetailComponent,
    ProductoComponent,
    ProductoDetailComponent,
    ObservacionComponent,
    ObservacionDetailComponent
  ],
  providers: [
    ProvinciaService,
    LocalidadService,
    SectorService,
    BarrioService,
    CalleService,
    ProductoService,
    ObservacionService
  ]
})
export class MaestroModule {}
