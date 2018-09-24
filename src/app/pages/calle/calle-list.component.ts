import { Component, OnInit } from '@angular/core';
import { Calle } from './calle.model';
import { Barrio } from '../barrio/barrio.model';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { CalleService } from './calle.service';
import { BarrioService } from '../barrio/barrio.service';

@Component({
  selector: 'app-calle-list',
  templateUrl: './calle-list.component.html',
  styleUrls: []
})
export class CalleListComponent implements OnInit {

  barrios: Barrio[];
  barrioSelected: Barrio;
  calles: Calle[];
  calleSelected: Calle;
  cargando: boolean = false;
  msgs: Message[] = [];
  nuevo: boolean = false;

  constructor(
    public calleService: CalleService,
    public barrioService: BarrioService,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  buscarBarrios(event) {
    this.barrioService.buscarBarrioPorTexto(event.query)
        .subscribe((res: any) => {
         this.barrios = res.barrios;
      });
  }

  cargarCalles(event) {
    this.cargando = true;
    this.barrioSelected = event;

    this.barrioService.cargarCalles(this.barrioSelected).subscribe(
      (res: any) => {
        this.calles = res.calles;
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

  selectCalle(calle: Calle) {
    this.calleSelected = calle;
    this.calleSelected.barrio = this.barrioSelected;
    this.nuevo = false;
  }

  newCalle() {
    this.calleSelected = new Calle(null, this.barrioSelected, null, 0, 0, '', '', '', true, '1' );
    this.nuevo = true;
  }

  guardarCalle(event: Calle) {
    if (this.nuevo) {
      // this.localidades.push(event);
      this.calles = [...this.calles, event];
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.calle.nombre} Creado.`
        }
      ];
    } else {
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.calle.nombre} Actualizado.`
        }
      ];
    }
  }



  borrarCalle(calle: Calle) {
    this.confirmationService.confirm({
      header: '¿ Estás Seguro ?',
      icon: 'fa-exclamation-circle 2x',
      message: `Estás a punto de borrar la Calle :
                 "${calle.calle.nombre}"? `,
      accept: () => {
        this.calleService
          .borrarCalle(calle)
          .subscribe((data: any) => {
            this.calles = this.calles.filter(c => c !== calle);
            this.msgs = [
              {
                severity: 'error',
                summary: 'Operación Aceptada',
                detail: `${calle.calle.nombre} Eliminada.`
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
