import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/api';
import { HojaRutaService } from '../../hoja-ruta/hoja-ruta.service';
import { ReportesService } from '../reportes.service';

@Component({
  selector: 'app-comparacion-vendedores',
  templateUrl: './comparacion-vendedores.component.html',
  styles: []
})
export class ComparacionVendedoresComponent implements OnInit {
  observaciones: SelectItem[];
  currentObservacion: any;
  fechaDesde: any;
  fechaHasta: Date;
  data: any;
  options = {
    scales: {
        yAxes: [{
               ticks: {
                 beginAtZero: true,              }
              }]
        }
  };

  constructor(
    private hojaRutaService: HojaRutaService,
    private reporteService: ReportesService
  ) {}

  ngOnInit() {
    this.observaciones = [];
    this.hojaRutaService.cargarObservaciones().subscribe((res) => {
      this.observaciones = res.map((data) => {
        return { label: data.nombre, value: data };
      });
      this.observaciones.unshift({ label: 'Todas las Observaciones', value: '' });
    });

  }

  generarReporte() {

    this.reporteService.vendedoresComparacion(this.armarParametros())
    .subscribe((res) => {
      this.data =  res.result;
    });

  }

  armarParametros() {
    let diaHasta;
    let mesHasta;
    let anioHasta;
    let hasta;
    let diaDesde;
    let mesDesde;
    let anioDesde;
    let desde;
    let params: string = '';

    if (this.currentObservacion) {
      params += `observacion=${this.currentObservacion.id}`;
    }

    if (this.fechaDesde) {
      diaDesde = this.fechaDesde.getDate();
      mesDesde = this.fechaDesde.getMonth() + 1;
      anioDesde = this.fechaDesde.getFullYear();
      desde = `${anioDesde}-${mesDesde}-${diaDesde}`;
      if (params !== '') {
        params += `&fecha_desde=${desde}`;
      } else {
        params += `fecha_desde=${desde}`;
      }
    }

    if (this.fechaHasta) {
      diaHasta = this.fechaHasta.getDate();
      mesHasta = this.fechaHasta.getMonth() + 1;
      anioHasta = this.fechaHasta.getFullYear();
      hasta = `${anioHasta}-${mesHasta}-${diaHasta}`;
      if (params !== '') {
        params += `&fecha_hasta=${hasta}`;
      } else {
        params += `fecha_hasta=${hasta}`;
      }
    }

   return params;
  }

}
