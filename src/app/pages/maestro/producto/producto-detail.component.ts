import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Producto } from './producto.model';
import { ConfirmationService } from 'primeng/components/common/api';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: []
})
export class ProductoDetailComponent implements OnInit, OnChanges {
  @Input() producto: Producto;
  @Input() display: boolean;
  @Input() tituloOption: string;
  @Output()
  productoInfo: EventEmitter<Producto> = new EventEmitter<Producto>();
  @Output()
  displayInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  productoForm: FormGroup;
  titulo: string;

  constructor(
    public productoService: ProductoService,
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.productoForm = this.fb.group({
      nombreProducto: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    this.cargarDatos();
  }

  cargarDatos() {
    this.productoForm.setValue({
      nombreProducto: this.producto.nombre
    });
  }

  rebuildForm() {
    this.productoForm.reset();
    this.productoForm.markAsPristine();
    this.productoForm.markAsUntouched();
  }

  ngOnChanges(): void {
    this.display = this.display;
    this.titulo = this.tituloOption;
    if (this.productoForm) {
      this.cargarDatos();
    }
  }

  hideDialog() {
    this.rebuildForm();
    this.displayInfo.emit(false);
  }

  saveProducto(loca: Producto) {
    if (this.productoForm.valid) {
      this.producto.nombre = this.productoForm.get('nombreProducto').value;
     // this.producto.nombre = this.producto.nombre.toLocaleUpperCase();

      if (this.producto.id === null) {
        this.productoService.crearProducto(this.producto).subscribe(
          (res: Producto) => {
            this.productoInfo.emit(res);
          },
          error => {
            this.confirmationService.confirm({
              header: 'Intenta Nuevamente !',
              message: `${error}`,
              accept: () => {}
            });
          }
        );
      } else {
        this.productoService.actualizarProducto(this.producto).subscribe(
          (res: Producto) => {
            this.productoInfo.emit(res);
          },
          error => {
            this.confirmationService.confirm({
              header: 'Intenta Nuevamente !',
              message: `${error}`,
              accept: () => {}
            });
          }
        );
      }
    }
    this.hideDialog();
  }

  // para ponerlo como propiedad del Component y poder hacer el binding con el HTML
  get nombreProducto() {
    return this.productoForm.get('nombreProducto');
  }
}
