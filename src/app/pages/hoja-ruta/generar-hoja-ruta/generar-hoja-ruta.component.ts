import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { BarrioService } from '../../maestro/barrio/barrio.service';
import { Barrio } from '../../maestro/barrio/barrio.model';
import { HojaRuta } from '../hoja-ruta.models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-generar-hoja-ruta',
  templateUrl: './generar-hoja-ruta.component.html',
  styleUrls: []
})
export class GenerarHojaRutaComponent implements OnInit {
  msgs: Message[] = [];
  barrios: Barrio[] = [];
  barrioSelected: Barrio;
  cargando: boolean = false;
  hojasRutas: any;
  columnas: any;
  display: any;
  cantRegistros: number;

  constructor(
    public barrioService: BarrioService,
    public confirmationService: ConfirmationService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {}

  buscarBarrios(event) {
    this.barrioService
      .buscarBarrioPorTexto(event.query)
      .subscribe((res: any) => {
        this.barrios = res.barrios;
      });
  }

  seleccionarBarrio(barrio: Barrio) {
    this.barrioSelected = Object.assign({}, barrio);
    if (this.barrioSelected) {
      this.barrioService
        .cargarHojaRutas(this.barrioSelected)
        .subscribe((res: HojaRuta) => {
          console.log(res);

          this.caragarDatos(res);
        });
    }
  }

  private caragarDatos(res: HojaRuta) {
    if (JSON.stringify(res) !== '{}') {
      const resultado = {
        registro: res.id,
        barrio: res.barrio.nombre,
        // codigo_postal : res.barrio.codigo_postal,
        cuadrante: res.barrio.cuadrante.nombre,
        localidad: res.barrio.cuadrante.localidad.nombre,
        provincia: res.barrio.cuadrante.localidad.provincia.nombre,
        usuario: res.owner.first_name + ' ' + res.owner.last_name,
        fecha: this.datepipe.transform(res.fecha, 'dd/MM/yyyy , h:mm a'),

      };
      this.display = Array.of(resultado);
      this.cantRegistros = res.hojas.length;
    } else {
      this.display = null;
    }

    this.columnas = [
      { fields: 'registro', headers: 'Registro'},
      { fields: 'barrio', headers: 'Barrio' },
      { fields: 'cuadrante', headers: 'Sector' },
      { fields: 'localidad', headers: 'Localidad' },
      { fields: 'provincia', headers: 'Provincia' },
      { fields: 'usuario', headers: 'Usuario' },
      { fields: 'fecha', headers: 'Fecha' }
    ];
  }

  clear() {
    this.barrioSelected = null;
  }

  cambiardisplay() {
    this.display = null;
  }

  generarHojasRutas() {
    this.cargando = true;
    if (!this.barrioSelected) {
      return;
    }
    this.barrioService
      .generarHojaRutas(this.barrioSelected)
      .subscribe((res: any) => {
        this.caragarDatos(res.historial);
        this.cargando = false;
      });
  }
}
