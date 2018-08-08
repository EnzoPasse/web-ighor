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

  constructor(
    public sectorService: SectorService,
    public barrioService: BarrioService,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  buscarSectores(event) {
    this.sectorService
      .buscarSectoresPorTexto(event.query).subscribe((res: Sector[]) => {
        console.log(res);
        this.sectores = res;
      });
  }

  cargarBarrios(event) {
    this.cargando = true;
    this.barrioSelected = event;

    this.barrioService.cargarBarrios(this.barrioSelected).subscribe(
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
    this.barrioSelected.sector = this.sectorSelected;
    console.log('SELECT :' + JSON.stringify(this.barrioSelected));
    this.nuevo = false;
  }

  newBarrio() {
    this.barrioSelected = new Barrio(null, '', '', this.sectorSelected );
    console.log('Sector SELECTED:' + JSON.stringify(this.barrioSelected));
    this.nuevo = true;
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
