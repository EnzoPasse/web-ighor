import { Component, OnInit } from '@angular/core';
import { HojaRutaService } from '../../hoja-ruta/hoja-ruta.service';
import { Usuario } from '../../usuario/usuario.model';
import { SelectItem } from 'primeng/components/common/api';
import { ReportesService } from '../reportes.service';

@Component({
  selector: 'app-comparacion-observaciones',
  templateUrl: './comparacion-observaciones.component.html',
  styles: []
})
export class ComparacionObservacionesComponent implements OnInit {
  vendedores: SelectItem[];
  currentVendedor: Usuario;
  fechaDesde: any;
  fechaHasta: Date;
  data: any;
  options = {
    scales: {
        xAxes: [{
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
    this.vendedores = [];
    this.hojaRutaService.buscarVendedores().subscribe((res: Usuario[]) => {
      this.vendedores = res.map((data: Usuario) => {
        return { label: data.first_name + ', ' + data.last_name, value: data };
      });
      this.vendedores.unshift({ label: 'Todos los vendedores', value: '' });
    });

  }

  generarReporte() {

    this.reporteService.observacionesComparacion(this.armarParametros())
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

    if (this.currentVendedor) {
      params += `vendedor=${this.currentVendedor.id}`;
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
