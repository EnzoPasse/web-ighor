

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Provincia } from './provincia.model';
import { ProvinciaService } from './provincia.service';

import {Message} from 'primeng/components/common/api';


import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import { error } from 'util';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias-list.component.html',
  styles: []
})
export class ProvinciasListComponent implements OnInit {

  msgs: Message[] = [];

  public provincias: Provincia[];
  public cargando: boolean = false;
  public totalRegistros: number = 0;
  public editProv: Provincia;

  constructor(public _prov: ProvinciaService) {}

  ngOnInit() {
    this.cargarProvincias();
  }

edit(prov: Provincia) {
 this.editProv = prov;
}

  cargarProvincias() {
    this.cargando = true;
    this._prov.cargarProvincias().subscribe(
      (resp: any) => {
        console.log(resp);
        this.provincias = resp;
        this.cargando = false;
        this.totalRegistros = resp.length;
      },
      error => {
        swal('Error', error, 'error');
      }
    );
  }

  actualizarProvincia(provincia: Provincia) {

    if (!provincia) {
      return;
    }

    let newProv = { ...provincia, nombre: provincia.nombre.toUpperCase() };

    this._prov.actualizarPronvincia(newProv).subscribe(
      (resp: Provincia) => {
         const ix = resp ? this.provincias.findIndex(h => h.IdProvincia === resp.IdProvincia) : -1;
         if (ix > -1) {
            this.provincias[ix] = resp;
         }
         this.msgs = [];
          this.msgs.push({severity: 'info', summary: 'Provincia Actualizada', detail: `${resp.nombre}`});
        // this.cargarProvincias();
      },
      error => {
        swal('Error', error, 'error');
      });
       this.editProv = undefined;
  }

  crearProvincia() {
    swal({
      title: 'Crear hospital',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Introduzca el nombre de la provincia'
        }
      },
      icon: 'info',
      buttons: ['Cancelar', 'Guardar']
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      let newProv: Provincia = {nombre: valor.toUpperCase().trim()} as Provincia;
      this._prov.crearProvincia(newProv).subscribe(
        resp => {
          this.msgs = [];
          this.msgs.push({severity: 'info', summary: 'Provincia Creada', detail: `${resp.nombre}`});

          this.provincias.push(resp);
          this.totalRegistros += 1;
          // this.cargarProvincias();
        },
        error => {
          swal('Error', error, 'error');
        }
      );
    });
  }

  borrarProvincia(provincia: Provincia) {
    swal({
      title: '¿ Estás seguro ?',
      text: `Estás a punto de borrar ${provincia.nombre}`,
      icon: 'warning',
      buttons: ['Cancelar', 'Borrar'],
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._prov.borrarProvincia(provincia.IdProvincia).subscribe(
          (borrado: Boolean) => {
            this.provincias = this.provincias.filter(h => h !== provincia);
            this.totalRegistros -= 1;
            this.msgs = [];
            this.msgs.push({severity: 'info', summary: 'Provincia Eliminada', detail: `${provincia.nombre}`});
            // this.cargarProvincias();
          },
          error => {
            swal('Error', error, 'error');
          }
        );
      }
    });
  }
}
