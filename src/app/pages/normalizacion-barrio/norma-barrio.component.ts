import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { BarrioService } from '../barrio/barrio.service';
import { Barrio } from '../barrio/barrio.model';
import { NormalizacionBarrioService } from './normalizacion-barrio.service';
import { Consulta, Filtros } from './norma-barrio.model';
import { log } from 'util';

@Component({
  selector: 'app-norma-barrio',
  templateUrl: './norma-barrio.component.html',
  styles: []
})
export class NormaBarrioComponent implements OnInit {
  barrios: Barrio[] = [];
  barriosMal: number[];
  barriosMalSelected: any [] = [];
  msgs: Message[] = [];
  mensajeError: any = '';
  filtrosSelected: Filtros[] = [];
  cargandoFiltros: boolean = false;
  data: any;
  columnas: any;
  nuevo: boolean = false;
  display: boolean = false;
  barrioSelected: Barrio;
  nombreBarrio: string;
  tituloboton: string;

  constructor(
    public barrioService: BarrioService,
    public confirmationService: ConfirmationService,
    public normalizadorService: NormalizacionBarrioService
  ) {}

  ngOnInit() {
    this.cargarGraficos();
  }

  onDialogClose(event) {
    this.display = event; // cerrando el modal
  }

  buscarBarrios(event) {
    this.barrioService
      .buscarBarrioPorTexto(event.query)
      .subscribe((res: any) => {
        this.barrios = res.barrios;
        this.cargandoFiltros = false;
        this.barriosMal = [];
      });
  }

  cargarFiltros(event: Barrio) {
    if (event) {
      this.barrioSelected = event;
      this.nombreBarrio = event.nombre;
      this.normalizadorService.buscarFiltros(event).subscribe(
        (data: Consulta) => {
          this.actualizarFiltros(data.filtros);
          this.cargandoFiltros = true;
        },
        error => {
          this.mensajeError = <any>error;
        }
      );
    }
  }

  actualizarFiltros(param: Filtros[]) {
    this.filtrosSelected = param;
    this.barriosMalSelected = [];
     if (param.length > 0) {
         this.tituloboton = ' Ver Filtros';
        this.nuevo = false;
      } else {
        this.tituloboton = 'Agregar Filtros';
        this.nuevo = true;
      }
  }

  filtrosSelectedChangue() {
    this.display = true;
  }

  guardarFiltro(event) {
    this.actualizarFiltros(event.filtros);
    let consulta: Consulta = new Consulta(
      // tslint:disable-next-line:radix
      parseInt(this.barrioSelected.id),
      false,
      this.barriosMal,
      event.filtros
    );
console.log('CONSULTA:' +  JSON.stringify(consulta));

    this.normalizadorService
      .cargarBarriosMal(consulta)
      .subscribe((res: any) => {
                this.barriosMal = res;
                console.log('RESPUESTA: ' + JSON.stringify(res));

              });

    this.columnas = [
      { fields: 'nombre', headers: 'Nombre Incorrecto'},
      { fields: 'barrio', headers: 'Nombre Correcto'},
    ];
  }

  cargarGraficos() {
    let total: number;
    let normalizados: number;
    this.normalizadorService.reporteNormalizacion()
       .subscribe((res: any) => {
            total = res.cantidad_registros_total;
            normalizados = res.cantidad_registros_barrio_calle_normalizado;
       this.data = {
        labels: ['Normalizados', 'Total'],
        datasets: [
          {
            data: [normalizados, total],
            backgroundColor: ['#FF6384', '#36A2EB'], // , '#FFCE56'
            hoverBackgroundColor: ['#FF6384', '#36A2EB'] // , '#FFCE56'
          }
        ]
      };

    });
  }

}
