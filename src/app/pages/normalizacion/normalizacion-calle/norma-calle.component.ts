import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { NormalizacionCalleService } from './normalizacion-calle.service';
import { ConsultaCalle, Consulta, Filtros } from '../normalizacion.model';
import { Calle } from '../../maestro/calle/calle.model';
import { CalleService } from '../../maestro/calle/calle.service';

@Component({
  selector: 'app-norma-calle',
  templateUrl: './norma-calle.component.html',
  styles: []
})
export class NormaCalleComponent implements OnInit {
  calles: Calle[] = [];
  callesMal: number[];
  callesMalSelected: any [] = [];
  msgs: Message[] = [];
  mensajeError: any = '';
  filtrosSelected: Filtros[] = [];
  cargandoFiltros: boolean = false;
  grafico1: any;
  grafico2: any;
  columnas: any;
  nuevo: boolean = false;
  display: boolean = false;
  calleSelected: Calle;
  nombreCalle: string;
  tituloboton: string;


  constructor(
    public calleService: CalleService,
    public confirmationService: ConfirmationService,
    public normalizadorService: NormalizacionCalleService
  ) {}

  ngOnInit() {
  }

  onDialogClose(event) {
    this.display = event; // cerrando el modal
  }

  buscarCalles(event) {
    this.calleService
      .buscarCallePorTexto(event.query)
      .subscribe((res: any) => {
        this.calles = res.calles_barrio; ////// VER SI VIENE ASI EL DATO
        console.log(this.calles);
        this.cargandoFiltros = false;
        this.callesMal = [];
        this.callesMalSelected = [];
      });
  }

  cargarFiltros(event: Calle) {

    if (event) {
      this.calleSelected = event;
      this.nombreCalle = event.calle.nombre;
      this.normalizadorService.buscarFiltros(event).subscribe(
        (data: ConsultaCalle) => {
          this.actualizarFiltros(data.filtros);
            this.cargandoFiltros = true;
            this.cargarGraficos();

        },
        error => {
          this.mensajeError = <any>error;
        }
      );
    }
  }

  actualizarFiltros(param: Filtros[]) {
    this.filtrosSelected = param;
    this.callesMalSelected = [];
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
    let consulta: ConsultaCalle = new ConsultaCalle(
      // tslint:disable-next-line:radix
      parseInt(this.calleSelected.id),
      true,
      this.callesMal,
      event.filtros
    );

    console.log('CONSULTA:' + consulta);

    this.normalizadorService
      .cargarCallesMal(consulta)
      .subscribe((res: any) => {
               console.log(res);
                this.callesMal = res;
                this.cargandoFiltros = true;
              });

    this.columnas = [
      { fields: 'nombre', headers: 'Nombre Incorrecto'},
      { fields: 'calle', headers: 'Nombre Correcto'},
    ];
  }

  cargarGraficos() {
    let total_resgistros: number;
    let barrios_calle: number;
    let usuarios_barrio: number;
    let usuarios_calle: number;
    // tslint:disable-next-line:radix
    this.normalizadorService.reporteNormalizacion(parseInt(this.calleSelected.id))
       .subscribe((res: any) => {
            total_resgistros = res.cantidad_registros_total;
            barrios_calle = res.cantidad_calles_por_barrio;
            usuarios_barrio = res.cantidad_registros_calle_normalizado_por_barrio;
            usuarios_calle = res.cantidad_registros_calle_normalizado;

       this.grafico1 = {
        labels: ['Calles/Barrio', 'Total'],
        datasets: [
          {
            data: [barrios_calle, total_resgistros],
            backgroundColor: ['#FF6384', '#FFCE56'], // , '#FFCE56'
            hoverBackgroundColor: ['#FF6384', '#FFCE56'] // , '#FFCE56'
          }
        ]
      };

      this.grafico2 = {
        labels: ['Calle', 'Barrio'],
        datasets: [
          {
            data: [usuarios_calle, usuarios_barrio],
            backgroundColor: ['#DD6535', '#36A2EB'],
            hoverBackgroundColor: ['#DD6535', '#36A2EB']
          }
        ]
      };

    });
  }

  normalizar() {
    const ids: Array<number> = [];
 for (let index = 0; index < this.callesMalSelected.length; index++) {
      let valor = this.callesMalSelected[index].id;
      ids.push(valor);
 }

     let consulta: ConsultaCalle = new ConsultaCalle(
      // tslint:disable-next-line:radix
      parseInt(this.calleSelected.id),
      true,
      ids,
      this.filtrosSelected
    );

     if (this.callesMalSelected.length > 0) {
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
      this.callesMalSelected = [];
      this.callesMal = [];
      this.cargarGraficos();
     }, 1500);

  }

}
