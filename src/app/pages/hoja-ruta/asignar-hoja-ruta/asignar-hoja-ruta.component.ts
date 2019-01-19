import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService, SelectItem } from 'primeng/components/common/api';
import { Barrio } from '../../maestro/barrio/barrio.model';
import { BarrioService } from '../../maestro/barrio/barrio.service';
import { HojaRuta, Hoja, DetalleHoja } from '../hoja-ruta.models';
import { HojaRutaService } from '../hoja-ruta.service';
import { Usuario } from '../../usuario/usuario.model';
import { URL_SERVICIO } from '../../../config/config';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-asignar-hoja-ruta',
  templateUrl: './asignar-hoja-ruta.component.html',
  styleUrls: []
})
export class AsignarHojaRutaComponent implements OnInit {
  msgs: Message[] = [];
  barrios: Barrio[] = [];
  barrioSelected: Barrio;
  hojaRuta: HojaRuta;
  vendedores: SelectItem [];
  estados: SelectItem [];
  cargando: boolean = false;
  hojasSelected: any[] = [];
  ruta: SafeResourceUrl;
  hojaDetalleSelected: DetalleHoja[];
  displayModal: boolean = false;
  displayModalPDF: boolean = false;
  columnas: any;

  constructor(
    public hojaRutaService: HojaRutaService,
    public barrioService: BarrioService,
    public confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
 /*    this.hojaRutaService.buscarVendedores().subscribe((res: Usuario[]) => {
      let vende: Usuario[];
      vende = res;
      if (vende.length > 0) {
        for (let i = 0; i < vende.length; i++) {
          this.vendedores.push({
            label: vende[i].first_name + ', ' + vende[i].last_name,
            value: vende[i]
          });
        }
      }
    }); */
this.vendedores = [];
this.hojaRutaService.buscarVendedores().subscribe((res: Usuario []) => {
  this.vendedores = res.map((data: Usuario) => {
    return {label: data.first_name + ', ' +  data.last_name, value: data};
  });
});

this.estados = [];
this.estados.push({label: 'Sin Asignar' , value: 1});
this.estados.push({label: 'Asignada' , value: 2});
this.estados.push({label: 'Cerrada' , value: 3});

  }

  buscarBarrios(event) {
    this.barrioService
      .buscarBarrioPorTexto(event.query)
      .subscribe((res: any) => {
        this.barrios = res.barrios;
      });
  }

  cargarHojasRuta(barrio: Barrio) {
    this.barrioSelected = Object.assign({}, barrio);
    if (this.barrioSelected) {
      this.cargando = true;
      this.barrioService
        .cargarHojaRutas(this.barrioSelected)
        .subscribe((res: HojaRuta) => {
          this.hojaRuta = res;
          this.cargando = false;
          this.hojasSelected = [];
        });

        this.columnas = [
          { field: 'numero', headers: 'Nro'},
          { field: 'calle.nombre', header: 'Calle' },
          { field: 'altura_desde', header: 'Altura Desde' },
          { field: 'altura_hasta', header: 'Altura Hasta' },
          { field: 'cant_registros', header: 'Registros' },
          { field: 'asignada_a', header: 'Vendedor' },
          { field: 'estado', header: 'Estado' }
        ];
    }
  }

  clear() {
    this.barrioSelected = null;
  }

isAsignada() {
  let isnotNull = this.hojasSelected.findIndex(datos => datos.asignada_a !== null);
  if (isnotNull === -1) {
     return false;
    }
     return true;
}



  imprimir() {
    // se extraen solo los ids de aquellas hojas que esten asignasdas
    let ids = this.hojasSelected
      .filter(datos => datos.asignada_a !== null)
      .map(data => data.id);

    if (ids.length > 0) {
      this.ruta = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.generarRutaPDF(this.barrioSelected.id, ids)
      );
     this.displayModalPDF = true;
    }
  }

  actualizarHR(imprimir?: boolean) {
    this.hojaRutaService.actualizarHojaRuta(this.hojasSelected)
     .subscribe(res => {
       this.cargarHojasRuta(this.barrioSelected);
       this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${res.length} Vendedores Asignados.`
        }
      ];
       if (imprimir) {
         this.imprimir();
       }
    });
  }

  AsignarImprimir() {
    this.actualizarHR(true);
  }

  private generarRutaPDF(idBarrio: any, hojas: any []) {
    let url = `${URL_SERVICIO}/pdf/?barrio=${idBarrio}`;
     url += `&hojas=${hojas}`;
        return url;
  }

  detalle(event: Hoja) {
    this.hojaRutaService.buscarHojaRutaDetalle(event).subscribe((res: Hoja) => {
      this.hojaDetalleSelected = res.detalle_hoja_ruta;
    });
    this.displayModal = true;
  }

  onDialogClose(event) {
    this.displayModal = event;
    this.hojaDetalleSelected = []; // cerrando el modal
  }

  onDialogClosePDF(event) {
    this.displayModalPDF = event;
    this.ruta = null;
  }


}
