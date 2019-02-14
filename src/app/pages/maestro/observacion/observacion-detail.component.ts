import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/api';
import { Observacion } from './Observacion.model';
import { ObservacionService } from './observacion.service';

@Component({
  selector: 'app-observacion-detail',
  templateUrl: './observacion-detail.component.html',
  styleUrls: []
})
export class ObservacionDetailComponent implements OnInit, OnChanges {
  @Input() observacion: Observacion;
  @Input() display: boolean;
  @Input() tituloOption: string;
  @Output()
  observacionInfo: EventEmitter<Observacion> = new EventEmitter<Observacion>();
  @Output()
  displayInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  observacionForm: FormGroup;
  titulo: string;

  constructor(
    public observacionService: ObservacionService,
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.observacionForm = this.fb.group({
      nombreObservacion: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    this.cargarDatos();
  }

  cargarDatos() {
    this.observacionForm.setValue({
      nombreObservacion: this.observacion.nombre
    });
  }

  rebuildForm() {
    this.observacionForm.reset();
    this.observacionForm.markAsPristine();
    this.observacionForm.markAsUntouched();
  }

  ngOnChanges(): void {
    this.display = this.display;
    this.titulo = this.tituloOption;
    if (this.observacionForm) {
      this.cargarDatos();
    }
  }

  hideDialog() {
    this.rebuildForm();
    this.displayInfo.emit(false);
  }

  saveObservacion(loca: Observacion) {
    if (this.observacionForm.valid) {
      this.observacion.nombre = this.observacionForm.get('nombreObservacion').value;
     // this.producto.nombre = this.producto.nombre.toLocaleUpperCase();

      if (this.observacion.id === null) {
        this.observacionService.crearObservacion(this.observacion).subscribe(
          (res: Observacion) => {
            this.observacionInfo.emit(res);
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
        this.observacionService.actualizarObservacion(this.observacion).subscribe(
          (res: Observacion) => {
            this.observacionInfo.emit(res);
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
  get nombreObservacion() {
    return this.observacionForm.get('nombreObservacion');
  }
}


