import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../services/service.index';
import { Observable } from 'rxjs/Observable';
import { Provincia } from '../../models/provincia.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { error } from 'util';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styles: []
})
export class ProvinciasComponent implements OnInit {
  public provincias: Provincia[];
  public cargando: boolean = false;
  public totalRegistros: number = 0;

  constructor(public _prov: ProvinciaService) {}

  ngOnInit() {
    this.cargarProvincias();
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
    this._prov.actualizarPronvincia(provincia).subscribe(
      (resp: any) => {
        this.cargarProvincias();
      },
      error => {
        swal('Error', error, 'error');
      }
    );
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
      let nombreProv = valor.toUpperCase().trim();
      this._prov.crearProvincia(nombreProv).subscribe(
        resp => {
          this.cargarProvincias();
        },
        error => {
          swal('Error', error, 'error');
        }
      );
    });
  }

  borrarProvincia(provincia: Provincia) {
    console.log(provincia);
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
            this.cargarProvincias();
          },
          error => {
            swal('Error', error, 'error');
          }
        );
      }
    });
  }
}
