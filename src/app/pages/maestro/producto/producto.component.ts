import { Component, OnInit } from '@angular/core';
import { Producto } from './producto.model';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: []
})
export class ProductoComponent implements OnInit {
  productoSelected: Producto;
  productos: Producto[];
  cargando: boolean = false;
  msgs: Message[] = [];
  nuevo: boolean = false;
  display: boolean = false;


  constructor(
    public confirmationService: ConfirmationService,
    public productoService: ProductoService
  ) {}


  ngOnInit() {
    this.cargarProductos();
  }

  onDialogClose(event) {
    this.display = event; // cerrando el modal
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarProducto()
      .subscribe((res: Producto[]) => {
         this.productos = res;
         this.cargando = false;
    }, error => {
        this.confirmationService.confirm({
        header: 'ERROR!',
        message: `${error}`,
        accept: () => {},
        reject: () => {}
     });
   });
  }

  selectProducto( producto: Producto ) {
    this.productoSelected = producto;
    this.nuevo = false;
    this.display = true;
  }

  newProducto() {
    this.productoSelected = new Producto(null, '');
    this.nuevo = true;
    this.display = true;
  }

  guardarProducto(event: Producto) {
    if (this.nuevo) {
      this.productos = [...this.productos, event];
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.nombre} Creada.`
        }
      ];
    } else {
      this.msgs = [
        {
          severity: 'success',
          summary: 'Operación Aceptada',
          detail: `${event.nombre} Actualizada.`
        }
      ];
    }
  }

 borrarProducto(producto: Producto) {
    this.confirmationService.confirm({
      header: '¿ Estás Seguro ?',
      icon: 'fa-exclamation-circle 2x',
      message: `Estás a punto de borrar el Producto:
                 "${producto.nombre}"? `,
      accept: () => {
        this.productoService.borrarProducto(producto)
          .subscribe((data: any) => {
            this.productos = this.productos.filter(c => c !== producto);
            this.msgs = [
              {
                severity: 'error',
                summary: 'Operación Aceptada',
                detail: `${producto.nombre} Eliminada.`
              }
            ];
          });
      },
      reject: () => {
        /* this.msgs = [
          {
            severity: 'warn',
            summary: 'Operación Cancelada',
            detail: `${provincia.nombre} NO Eliminada.`
          }
        ]; */
      }
    });
  }
}
