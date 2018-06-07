import { Component, OnInit } from '@angular/core';


import { Localidad } from '../localidad/localidad.model';
import { Sector } from './sector.model';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { LocalidadService } from '../localidad/localidad.service';
import { SectorService } from './sector.service';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: []
})
export class SectorListComponent implements OnInit {
  localidadSelected: Localidad;
  localidades: Localidad[];
  sectorSelected: Sector;
  sectores: Sector[];
  results: Localidad[];
  cargando: boolean = false;
  msgs: Message[] = [];
  nuevo: boolean = false;

  constructor(
    public sectorService: SectorService,
    public confirmationService: ConfirmationService,
    public localidadService: LocalidadService
  ) {}

  buscarLocalidades(event) {
    console.log(event);
    this.localidadService.buscarLocalidadesPorTexto(event.query).subscribe((res: Localidad[]) => {
      this.results = res;
      console.log(res);
    });
  }

/*
  search(event) {
    let query = event.query;
    let filtrados: any[] = [];
    if (this.localidades) {
      for (let i = 0; i < this.localidades.length; i++) {
        let provin = this.localidades[i];
        if (provin.nombre.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtrados.push(provin);
        }
      }
    }
    this.results = filtrados;
  } */

  ngOnInit() {
   // this.cargarLocalidades();
  }

  cargarSectores(event) {
    this.cargando = true;
    this.localidadSelected = event;
    console.log(event);

    this.sectorService.cargarSectores(this.localidadSelected).subscribe(
      (res: any) => {
        this.sectores = res.cuadrantes;
        console.log(res);

        this.cargando = false;
      },
      error => {
        this.confirmationService.confirm({
          header: 'ERROR !',
          message: `${error}`,
          accept: () => {},
          reject: () => {}
        });
      }
    );
  }

  selectSector(sector: Sector) {
    this.sectorSelected = sector;
    // this.localidadSelected.provincia = this.provinciaSelected;
    this.nuevo = false;
  }

  newSector() {
    this.sectorSelected = new Sector(null, '', this.localidadSelected );
    this.nuevo = true;
  }

  guardarSector(event: Sector) {
    if (this.nuevo) {
      // this.localidades.push(event);
      this.sectores = [...this.sectores, event];
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.nombre} Creada.`
        }
      ];
    } else {
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.nombre} Actualizada.`
        }
      ];
    }
  }

  borrarSector(sector: Sector) {
    this.confirmationService.confirm({
      header: '¿ Estás Seguro ?',
      icon: 'fa-exclamation-circle 2x',
      message: `Estás a punto de borrar el Sector:
                 "${sector.nombre}"? `,
      accept: () => {
        this.sectorService
          .borrarSector(sector)
          .subscribe((data: any) => {
            this.sectores = this.sectores.filter(c => c !== sector);
            this.msgs = [
              {
                severity: 'error',
                summary: 'Operación Aceptada',
                detail: `${sector.nombre} Eliminada.`
              }
            ];
          });
      },
      reject: () => {
        /*  this.msgs = [
          {
            severity: 'warn',
            summary: 'Operación Cancelada',
            detail: `${localidad.nombre} NO Eliminada.`
          }
        ]; */
      }
    });
  }
}
