import { Component, OnInit } from '@angular/core';
import { Sector } from '../sector/sector.model';
import { Barrio } from './barrio.model';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { SectorService } from '../sector/sector.service';
import { BarrioService } from './barrio.service';

@Component({
  selector: 'app-barrio-list',
  templateUrl: './barrio-list.component.html',
  styleUrls: []
})
export class BarrioListComponent implements OnInit {
  sectores: Sector[];
  sectorSelected: Sector;
  barrios: Barrio[];
  barrioSelected: Barrio;
  cargando: boolean = false;
  msgs: Message[] = [];
  nuevo: boolean = false;
  display: boolean = false;

  constructor(
    public sectorService: SectorService,
    public barrioService: BarrioService,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  onDialogClose(event) {
    this.display = event; // cerrando el modal
  }


  buscarSectores(event) {
    this.sectorService.buscarSectoresPorTexto(event.query)
        .subscribe((res: any) => {
         this.sectores = res.cuadrantes;
      });
  }

  cargarBarrios(event) {
    this.cargando = true;
    this.sectorSelected = event;

    this.sectorService.cargarBarrios(this.sectorSelected).subscribe(
      (res: any) => {
        this.barrios = res.barrios;
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

  selectBarrio(barrio: Barrio) {
    this.barrioSelected = barrio;
    this.barrioSelected.cuadrante = this.sectorSelected;
    this.nuevo = false;
    this.display = true;
  }

  newBarrio() {
    this.barrioSelected = new Barrio(null, '', '', this.sectorSelected );
    this.nuevo = true;
    this.display = true;
  }

  guardarBarrio(event: Barrio) {
    if (this.nuevo) {
      // this.localidades.push(event);
      this.barrios = [...this.barrios, event];
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.nombre} Creado.`
        }
      ];
    } else {
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.nombre} Actualizado.`
        }
      ];
    }
  }



  borrarBarrio(barrio: Barrio) {
    this.confirmationService.confirm({
      header: '¿ Estás Seguro ?',
      icon: 'fa-exclamation-circle 2x',
      message: `Estás a punto de borrar el Barrio:
                 "${barrio.nombre}"? `,
      accept: () => {
        this.barrioService
          .borrarBarrio(barrio)
          .subscribe((data: any) => {
            this.barrios = this.barrios.filter(c => c !== barrio);
            this.msgs = [
              {
                severity: 'error',
                summary: 'Operación Aceptada',
                detail: `${barrio.nombre} Eliminada.`
              }
            ];
          },
          error => {
            this.confirmationService.confirm({
              header: 'Acción Denegada !',
              message: `${error}`,
              accept: () => {}
            });
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
