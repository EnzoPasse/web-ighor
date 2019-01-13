import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
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
  vendedores: any = [];
  cargando: boolean = false;
  hojasSelected: any[] = [];
  ruta: SafeResourceUrl;
  hojaDetalleSelected: DetalleHoja[];
  displayModal: boolean = false;

  constructor(
    public hojaRutaService: HojaRutaService,
    public barrioService: BarrioService,
    public confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.hojaRutaService.buscarVendedores().subscribe((res: Usuario[]) => {
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
    this.hojasSelected = this.hojasSelected.filter(
      data => data.asignada_a !== null );

    this.ruta = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.generarRutaPDF(this.barrioSelected.id, this.hojasSelected));

    console.log('URL' + this.ruta);

  }


 private generarRutaPDF(idBarrio: any, hojas: string[]) {
    let url = `${URL_SERVICIO}/pdf/?barrio=${idBarrio}`;

    if (hojas.length > 0) {
      let newHojas = hojas.toString();
      url += `&hojas=${newHojas}`;
    } else {
      url += `&hojas=all`;
    }
    return url;
  }

 detalle(event: Hoja) {

   this.hojaRutaService.buscarHojaRutaDetalle(event).
   subscribe((res: Hoja) => {
    this.hojaDetalleSelected = res.detalle_hoja_ruta;
    console.log(this.hojaDetalleSelected);
   });
   this.displayModal = true;
 }

 onDialogClose(event) {
  this.displayModal = event;
  this.hojaDetalleSelected = []; // cerrando el modal
}
}
