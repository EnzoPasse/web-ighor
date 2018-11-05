import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { NormalizacionBarrioService } from './normalizacion-barrio.service';
import { Consulta, Filtros } from '../normalizacion.model';
import { Barrio } from '../../maestro/barrio/barrio.model';
import { BarrioService } from '../../maestro/barrio/barrio.service';

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
  grafico1: any;
  grafico2: any;
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
        this.barriosMalSelected = [];
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
    this.cargandoFiltros = false;
    this.actualizarFiltros(event.filtros);
    let consulta: Consulta = new Consulta(
      // tslint:disable-next-line:radix
      parseInt(this.barrioSelected.id),
      true,
      this.barriosMal,
      event.filtros
    );

    this.normalizadorService
      .cargarBarriosMal(consulta)
      .subscribe((res: any) => {
                this.barriosMal = res;
                this.cargandoFiltros = true;
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
            normalizados = res.cantidad_registros_barrio_normalizado;
       this.grafico1 = {
        labels: ['Normalizados', 'Total'],
        datasets: [
          {
            data: [normalizados, total],
            backgroundColor: ['#FF6384', '#FFCE56'], // , '#FFCE56'
            hoverBackgroundColor: ['#FF6384', '#FFCE56'] // , '#FFCE56'
          }
        ]
      };

      this.grafico2 = {
        labels: ['Normalizados', 'Sector'],
        datasets: [
          {
            data: [normalizados, total],
            backgroundColor: ['#DD6535', '#36A2EB'],
            hoverBackgroundColor: ['#DD6535', '#36A2EB']
          }
        ]
      };

    });
  }

  normalizar() {
    const ids: Array<number> = [];
 for (let index = 0; index < this.barriosMalSelected.length; index++) {
      let valor = this.barriosMalSelected[index].id;
      ids.push(valor);
 }

     let consulta: Consulta = new Consulta(
      // tslint:disable-next-line:radix
      parseInt(this.barrioSelected.id),
      true,
      ids,
      this.filtrosSelected
    );

     if (this.barriosMalSelected.length > 0) {
       this.normalizadorService.normalizar(consulta)
       .subscribe(
        (res: any) => {
          this.msgs = [
            {
              severity: 'success',
              summary: 'Operación Aceptada',
              detail: `${res.cant_filas} items Normalizados.`
            }
          ];
        },
        error => {
          this.confirmationService.confirm({
            header: 'ERROR !',
            message: `${error}`,
            accept: () => {}
          });
        }
      );
     }

     setTimeout(() => {
      this.barriosMalSelected = [];
      this.barriosMal = [];
     }, 1500);

  }

}
