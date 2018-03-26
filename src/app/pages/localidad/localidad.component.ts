import { Component, OnInit } from '@angular/core';
import { Localidad } from '../../models/localidad.model';

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styles: []
})
export class LocalidadComponent implements OnInit {

  localidades: Localidad [];
  cargando: boolean = false;
  totalRegistros: number = 0;

  constructor() { }

  ngOnInit() {
  }

  cargarLocalidades() {}

  crearLocalidad() {}

  actualizarLocalidad(localidad: Localidad) {}

  borrarLocalidad(localidad: Localidad) {}



}
