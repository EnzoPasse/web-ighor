import { Component, OnInit } from '@angular/core';
import { HojaRutaService } from '../hoja-ruta.service';
import { ConfirmationService, SelectItem, Message } from 'primeng/components/common/api';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../usuario/usuario.model';

@Component({
  selector: 'app-cargar-visita-hoja-ruta',
  templateUrl: './cargar-visita-hoja-ruta.component.html',
  styleUrls: []
})
export class CargarVisitaHojaRutaComponent implements OnInit {

  detalle: any;
  usuario: Usuario;
  nroHoja: number;
  cargando: boolean = false;
  columnas: any;
  observaciones: SelectItem [];
  productos: SelectItem [];
  selectedProduct: any [];
  error: boolean;
  msgs: Message[] = [];

  constructor(
    public hojaRutaService: HojaRutaService,
    public confirmationService: ConfirmationService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.productos = [];
    this.observaciones = [];
    this.usuario = this.usuarioService.usuario;

    this.hojaRutaService.cargarObservaciones()
      .subscribe((res: any) => {
        this.observaciones = res.map((dato: any) => {
         return { label: dato.nombre , value: dato };
      });
  });


  this.hojaRutaService.cargarProductos()
  .subscribe((res: any) => {
     this.productos = res.map((dato: any) => {
       return {label: dato.nombre, value: dato};
     });
  });
}

  buscarHojaRuta() {
    if (this.nroHoja && this.nroHoja > 0) {
    this.cargando = true;
    this.hojaRutaService.buscarHojaRutaDetalle(this.nroHoja)
    .subscribe((res: any) => {
      this.detalle = res;
      this.cargando = false;
    });
    this.columnas = [
        { field: 'numero_orden', header: 'Orden', width: '55px'},
        { field: 'apellido', header: 'Destinatario', width: '180px'},
       // { field: 'calle', header: 'Domicilio', width: '120px' },
        { field: 'altura', header: 'Nro', width: '55px' },
        { field: 'piso', header: 'Piso', width: '55px' },
        { field: 'departamento', header: 'Dpto', width: '55px' },
        { field: 'tipo', header: 'Tipo', width: '50px' },
        { field: 'titular', header: 'Titular', width: '75px' },
        { field: 'producto', header: 'Productos', width: '180px' },
        { field: 'observacion', header: 'Observación', width: '180px' }
    ];
  } else {
    this.detalle = null;
  }
 }

 textVacio(nro: string) {
   if (nro.length === 0) {
       this.detalle = null;
   }
 }

 actualizarHR() {
   this.error = this.detalle.some(x => x.observacion === null);
   if (!this.error) {
     this.hojaRutaService.actualiarHojaRutaDetalle(this.detalle)
     .subscribe(res => {
       this.msgs = [
       {
         severity: 'success',
         summary: 'Operación Aceptada',
         detail: `${res.length} Registros Actualizados.`
       }
     ];
   });
   }
    setTimeout(() => {
      this.error = false;
    }, 4000);
 }

}
