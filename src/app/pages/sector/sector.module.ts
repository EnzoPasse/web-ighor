import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorListComponent } from './sector-list.component';
import { SectorDetailComponent } from './sector-detail.component';
import { SectorService } from './sector.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SectorListComponent, SectorDetailComponent],
  providers: [SectorService]
})
export class SectorModule { }
