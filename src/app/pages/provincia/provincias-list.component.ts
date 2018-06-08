

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Provincia } from './provincia.model';
import { ProvinciaService } from './provincia.service';

// primeng
import { ConfirmationService, Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias-list.component.html',
  styles: []
})
export class ProvinciasListComponent implements OnInit {
  provinciaSelected: Provincia;
  provincias: Provincia[];
  cargando: boolean = false;
  msgs: Message[] = [];
  nuevo: boolean = false;


  constructor(
    public confirmationService: ConfirmationService,
    public provinciaService: ProvinciaService
  ) {}


  ngOnInit() {
    this.cargarProvincias();
  }

  cargarProvincias() {
    this.cargando = true;
    this.provinciaService.cargarProvincias()
      .subscribe((res: Provincia[]) => {
         this.provincias = res;
         this.cargando = false;
    }, error => {
        this.confirmationService.confirm({
        header: 'ERROR !',
        message: `${error}`,
        accept: () => {},
        reject: () => {}
     });
   });
  }

  selectProvincia( provincia: Provincia ) {
    this.provinciaSelected = provincia;
    this.nuevo = false;
  }

  newProvincia() {
    this.provinciaSelected = new Provincia(null, '');
    this.nuevo = true;
  }

  guardarProvincia(event: Provincia) {
    if (this.nuevo) {
      // this.localidades.push(event);
      this.provincias = [...this.provincias, event];
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

 borrarProvincia(provincia: Provincia) {
    this.confirmationService.confirm({
      header: '¿ Estás Seguro ?',
      icon: 'fa-exclamation-circle 2x',
      message: `Estás a punto de borrar la Provincia:
                 "${provincia.nombre}"? `,
      accept: () => {
        this.provinciaService.borrarProvincia(provincia)
          .subscribe((data: any) => {
            this.provincias = this.provincias.filter(c => c !== provincia);
            this.msgs = [
              {
                severity: 'error',
                summary: 'Operación Aceptada',
                detail: `${provincia.nombre} Eliminada.`
              }
            ];
          });
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'Operación Cancelada',
            detail: `${provincia.nombre} NO Eliminada.`
          }
        ];
      }
    });
  }
}