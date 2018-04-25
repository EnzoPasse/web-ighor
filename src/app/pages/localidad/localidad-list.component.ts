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
  // tablaFiltrada: Localidad [];
  provinciaSelected: Provincia;
  localidadSelected: Localidad;
  localidades: Localidad[];
  cargando: boolean = false;
  msgs: Message[] = [];

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
  }

  newLocalidad() {
    this.localidadSelected = new Localidad(null, '', null, this.provinciaSelected );
  }


  actualizarLocalidad(localidad: Localidad) {}



  borrarLocalidad(localidad: Localidad) {
    this.confirmationService.confirm({
      header: '¿ Estás Seguro?',
      icon: 'fa-exclamation-circle 2x',
      message: `Estás a punto de borrar la Localidad:
                 " ${localidad.nombre} " ? `,
      accept: () => {
        this.localidadService.borrarLocalidad(localidad).
         subscribe((data: any) => {
          this.localidades = this.localidades.filter(c => c !== localidad);
          this.msgs = [{severity: 'error', summary: 'Operación Aceptada', detail: `${localidad.nombre} Eliminada!`}];
        });
      },
      reject: () => {
        this.msgs = [{severity: 'warn', summary: 'Operación Cancelada', detail: `${localidad.nombre} NO Eliminada!`}];
      }
    });
  }


}
