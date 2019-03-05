import { Component, OnInit } from '@angular/core';
import { NormalizacionBarrioService } from '../../normalizacion/normalizacion-barrio/normalizacion-barrio.service';
import { SelectItem } from 'primeng/components/common/api';
import { NormalizacionCalleService } from '../../normalizacion/normalizacion-calle/normalizacion-calle.service';
import { BarrioService } from '../../maestro/barrio/barrio.service';
import { CalleService } from '../../maestro/calle/calle.service';

@Component({
  selector: 'app-normalizacion-reporte',
  templateUrl: './normalizacion-reporte.component.html',
  styles: []
})
export class NormalizacionReporteComponent implements OnInit {

  grafico1Barrio: any;
  grafico2Barrio: any;
  grafico1Calle: any;
  grafico2Calle: any;
  barrios: SelectItem [];
  calles: SelectItem [];
  currentBarrio: any;
  currentCalle: any;


  constructor(private normalizadorServiceBarrio: NormalizacionBarrioService,
              private normalizacionServiceCalle: NormalizacionCalleService,
              private barrioService: BarrioService,
              private calleService: CalleService) { }

  ngOnInit() {}

  buscarBarrios(event) {
    this.barrioService
      .buscarBarrioPorTexto(event.query)
      .subscribe((res: any) => {
        this.barrios = res.barrios;
      });
  }


  buscarCalles(event) {
    this.calleService
      .buscarCallePorTexto(event.query)
      .subscribe((res: any) => {
        this.calles = res.calles_barrio;
      });
  }

  cargarFiltrosBarrio(event) {
    if (event) {
      this.currentBarrio = event;
      this.graficarBarrio();
    }
  }

  cargarFiltrosCalle(event) {
    if (event) {
      this.currentCalle = event;
      this.graficarCalle();
    }
  }

  graficarBarrio() {
    let total_registros: number;
    let normalizados: number;
    let normalizados_sector: number;
    let usuarios_barrio: number;
    // tslint:disable-next-line:radix
    this.normalizadorServiceBarrio.reporteNormalizacion(parseInt(this.currentBarrio.id))
       .subscribe((res: any) => {
            total_registros = res.cantidad_registros_diccionario;
            normalizados = res.cantidad_registros_normalizados_diccionario;
            normalizados_sector = res.cantidad_registros_normalizados_por_sector_diccionario;
            usuarios_barrio = res.cantidad_registros_barrio_normalizado;
       this.grafico1Barrio = {
        labels: ['Normalizados', 'Total'],
        datasets: [
          {
            data: [normalizados, total_registros],
            backgroundColor: ['#FF6384', '#FFCE56'], // , '#FFCE56'
            hoverBackgroundColor: ['#FF6384', '#FFCE56'] // , '#FFCE56'
          }
        ]
      };

      this.grafico2Barrio = {
        labels: ['Sector', 'Normalizados'],
        datasets: [
          {
            data: [normalizados_sector, normalizados],
            backgroundColor: ['#DD6535', '#36A2EB'],
            hoverBackgroundColor: ['#DD6535', '#36A2EB']
          }
        ]
      };

    });
  }

  graficarCalle() {
    let total_resgistros: number;
    let normalizados: number;
    let normalizados_barrio: number;
    let usuarios_calle: number;
    // tslint:disable-next-line:radix
    this.normalizacionServiceCalle.reporteNormalizacion(parseInt(this.currentCalle.id))
       .subscribe((res: any) => {
            total_resgistros = res.cantidad_registros_diccionario;
            normalizados = res.cantidad_registros_normalizados_diccionario;
            normalizados_barrio = res.cantidad_registros_normalizados_por_barrio_diccionario;
            usuarios_calle = res.cantidad_registros_calle_normalizado;

       this.grafico1Calle = {
        labels: ['Normalizados', 'Total'],
        datasets: [
          {
            data: [normalizados, total_resgistros],
            backgroundColor: ['#FF6384', '#FFCE56'], // , '#FFCE56'
            hoverBackgroundColor: ['#FF6384', '#FFCE56'] // , '#FFCE56'
          }
        ]
      };

      this.grafico2Calle = {
        labels: ['Normalizados', 'Barrio'],
        datasets: [
          {
            data: [normalizados, normalizados_barrio],
            backgroundColor: ['#DD6535', '#36A2EB'],
            hoverBackgroundColor: ['#DD6535', '#36A2EB']
          }
        ]
      };

    });
  }


}
