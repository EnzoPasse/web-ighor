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
  cargando: boolean = false;
  hojasSelected: any[] = [];
  ruta: SafeResourceUrl;
  hojaDetalleSelected: DetalleHoja[];
  displayModal: boolean = false;
  displayModalPDF: boolean = false;
  ids: any;

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

  }

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
      this.cargando = true;
      this.barrioService
        .cargarHojaRutas(this.barrioSelected)
        .subscribe((res: HojaRuta) => {
          this.hojaRuta = res;
          this.cargando = false;
        });
    }
  }

  clear() {
    this.barrioSelected = null;
  }

  imprimir() {
    // se extraen solo los ids de aquellas hojas que esten asignasdas
    this.ids = this.hojasSelected
      .filter(datos => datos.asignada_a !== null)
      .map(data => data.id);

    if (this.ids.length > 0) {
      this.ruta = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.generarRutaPDF(this.barrioSelected.id, this.ids)
      );
      this.displayModalPDF = true;
      console.log('displeay' + this.displayModalPDF);
      console.log('RUTA' + this.ruta);
    }
  }


  private generarRutaPDF(idBarrio: any, hojas: any []) {
    let url = `${URL_SERVICIO}/pdf/?barrio=${idBarrio}`;
     url += `&hojas=${hojas}`;
        return url;
  }


  onDialogClosePDF(event) {
    this.displayModalPDF = event;
    this.ruta = null;
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

}
