import { Component, OnInit } from '@angular/core';
import { Observacion } from './Observacion.model';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { ObservacionService } from './observacion.service';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: []
})
export class ObservacionComponent implements OnInit {
  observacionSelected: Observacion;
  observaciones: Observacion[];
  cargando: boolean = false;
  msgs: Message[] = [];
  nuevo: boolean = false;
  display: boolean = false;


  constructor(
    public confirmationService: ConfirmationService,
    public observacionService: ObservacionService
  ) {}


  ngOnInit() {
    this.cargarObservaciones();
  }

  onDialogClose(event) {
    this.display = event; // cerrando el modal
  }

  cargarObservaciones() {
    this.cargando = true;
    this.observacionService.cargarObservacion()
      .subscribe((res: Observacion[]) => {
         this.observaciones = res;
         this.cargando = false;
    }, error => {
        this.confirmationService.confirm({
        header: 'ERROR!',
        message: `${error}`,
        accept: () => {},
        reject: () => {}
     });
   });
  }

  selectObservacion( observacion: Observacion ) {
    this.observacionSelected = observacion;
    this.nuevo = false;
    this.display = true;
  }

  newObservacion() {
    this.observacionSelected = new Observacion(null, '');
    this.nuevo = true;
    this.display = true;
  }

  guardarObservacion(event: Observacion) {
    if (this.nuevo) {
      this.observaciones = [...this.observaciones, event];
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

 borrarObservacion(observacion: Observacion) {
    this.confirmationService.confirm({
      header: '¿ Estás Seguro ?',
      icon: 'fa-exclamation-circle 2x',
      message: `Estás a punto de borrar el Producto:
                 "${observacion.nombre}"? `,
      accept: () => {
        this.observacionService.borrarObservacion(observacion)
          .subscribe((data: any) => {
            this.observaciones = this.observaciones.filter(c => c !== observacion);
            this.msgs = [
              {
                severity: 'error',
                summary: 'Operación Aceptada',
                detail: `${observacion.nombre} Eliminada.`
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
        /* this.msgs = [
          {
            severity: 'warn',
            summary: 'Operación Cancelada',
            detail: `${provincia.nombre} NO Eliminada.`
          }
        ]; */
      }
    });
  }
}

