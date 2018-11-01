// angular
import { Component, OnInit } from '@angular/core';
// core
import { Localidad } from './localidad.model';
import { Provincia } from '../provincia/provincia.model';
// services
import { LocalidadService } from './localidad.service';
import { ProvinciaService } from '../provincia/provincia.service';
// primeng
import { ConfirmationService, Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad-list.component.html',
  styles: []
})
export class LocalidadListComponent implements OnInit {
  provinciaSelected: Provincia;
  provincias: Provincia[];
  localidadSelected: Localidad;
  localidades: Localidad[];
  results: Provincia[];
  cargando: boolean = false;
  msgs: Message[] = [];
  nuevo: boolean = false;
  display: boolean = false;

  constructor(
    public localidadService: LocalidadService,
    public confirmationService: ConfirmationService,
    public provinciaService: ProvinciaService
  ) {}

  cargarProvincias() {
    this.provinciaService.cargarProvincias().subscribe((res: Provincia[]) => {
      this.provincias = res;
    });
  }

  search(event) {
    let query = event.query;
    let filtrados: any[] = [];
    if (this.provincias) {
      for (let i = 0; i < this.provincias.length; i++) {
        let provin = this.provincias[i];
        if (provin.nombre.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtrados.push(provin);
        }
      }
    }
    this.results = filtrados;
  }

  ngOnInit() {
    this.cargarProvincias();
  }

  onDialogClose(event) {
    this.display = event; // cerrando el modal
  }

  cargarLocalidades(event) {
    this.cargando = true;
    this.provinciaSelected = event;
    this.provinciaService.cargarLocalidades(this.provinciaSelected).subscribe(
      (res: any) => {
        this.localidades = res.localidades;
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

  selectLocalidad(localidad: Localidad) {
    this.localidadSelected = localidad;
    this.localidadSelected.provincia = this.provinciaSelected;
    this.nuevo = false;
    this.display = true;
  }

  newLocalidad() {
    this.localidadSelected = new Localidad(
      null,
      '',
      null,
      this.provinciaSelected
    );
    this.nuevo = true;
    this.display = true;
  }

  guardarLocalidad(event: Localidad) {
    if (this.nuevo) {
      // this.localidades.push(event);
      this.localidades = [...this.localidades, event];
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
                detail: `${localidad.nombre} Eliminada.`
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
