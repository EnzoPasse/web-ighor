import { Component, OnInit } from '@angular/core';
import { Provincia } from '../../models/provincia.model';
import { LocalidadService } from './localidad.service';
import { Localidad } from './localidad.model';

import { ConfirmationService, Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad-list.component.html',
  styles: []
})
export class LocalidadListComponent implements OnInit {
  provinciaSelected: Provincia;
  localidadSelected: Localidad;
  localidades: Localidad[];
  cargando: boolean = false;
  msgs: Message[] = [];
  nuevo: boolean = false;

  prov: Provincia = {
    IdProvincia: '3',
    nombre: 'Catamarca'
  } as Provincia;

  constructor(
    public localidadService: LocalidadService,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cargarLocalidades();
  }

  cargarLocalidades() {
    this.cargando = true;
    this.localidadService.cargarLocalidades(this.prov).subscribe((res: any) => {
      this.localidades = res.localidades;
      this.provinciaSelected = res.provincia;
      this.cargando = false;
    });
  }

  selectLocalidad(localidad: Localidad) {
    this.localidadSelected = localidad;
    this.localidadSelected.provincia = this.provinciaSelected;
    this.nuevo = false;
  }

  newLocalidad() {
    this.localidadSelected = new Localidad(null, '', null, this.provinciaSelected);
    this.nuevo = true;
  }

  guardarLocalidad(event: Localidad) {
    if (event.IdLocalidad === null) {
      // this.localidades.push(event);
      this.localidades = [...this.localidades, event];
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.nombre} Creada!`
        }
      ];
    } else {
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.nombre} Actualizada!`
        }
      ];
    }
  }

  actualizarLocalidad(localidad: Localidad) {}

  borrarLocalidad(localidad: Localidad) {
    this.confirmationService.confirm({
      header: '¿ Estás Seguro ?',
      icon: 'fa-exclamation-circle 2x',
      message: `Estás a punto de borrar la Localidad:
                 "${localidad.nombre}"? `,
      accept: () => {
        this.localidadService
          .borrarLocalidad(localidad)
          .subscribe((data: any) => {
            this.localidades = this.localidades.filter(c => c !== localidad);
            this.msgs = [
              {
                severity: 'error',
                summary: 'Operación Aceptada',
                detail: `${localidad.nombre} Eliminada!`
              }
            ];
          });
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'Operación Cancelada',
            detail: `${localidad.nombre} NO Eliminada!`
          }
        ];
      }
    });
  }
}
