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

// services
import { ProvinciaService } from './provincia/provincia.service';
import { LocalidadService } from './localidad/localidad.service';
import { SectorService } from './sector/sector.service';
import { BarrioService } from './barrio/barrio.service';
import { CalleService } from './calle/calle.service';

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
    CalleDetailComponent
  ],
  providers: [
    ProvinciaService,
    LocalidadService,
    SectorService,
    BarrioService,
    CalleService
  ]
})
export class MaestroModule {}
