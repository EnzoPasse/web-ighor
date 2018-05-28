import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { ConfirmationService, Message } from 'primeng/components/common/api';

import { Localidad } from './localidad.model';
import { LocalidadService } from './localidad.service';

@Component({
  selector: 'app-localidad-detail',
  templateUrl: './localidad-detail.component.html',
  styles: []
})
export class LocalidadDetailComponent implements OnInit, OnChanges {
  @Input() localidad: Localidad;
  @Input() displayOption: boolean;
  @Input() tituloOption: string;
  @Output() localidadInfo: EventEmitter<Localidad> = new EventEmitter<Localidad>();

  localidadForm: FormGroup;
  display: boolean;
  titulo: string;

  constructor(
    public localidadService: LocalidadService,
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.localidadForm = this.fb.group({
      nombreProvincia: new FormControl(''),
      nombreLocalidad: new FormControl('', [Validators.required, Validators.minLength(3)]),
      codigoPostal: new FormControl('', Validators.required)
    });
    this.localidadForm.controls['nombreProvincia'].disable();
    this.cargarDatos();
  }

  cargarDatos() {
    this.localidadForm.setValue({
      nombreProvincia: this.localidad.provincia.nombre,
      nombreLocalidad: this.localidad.nombre,
      codigoPostal: this.localidad.CodigoPostal
    });
  }

  rebuildForm() {
    this.localidadForm.reset();
    this.localidadForm.markAsPristine();
    this.localidadForm.markAsUntouched();
    this.localidadForm.controls['nombreProvincia'].disable();
  }

  ngOnChanges(): void {

    this.display = this.displayOption;
    this.titulo = this.tituloOption;
    if (this.localidadForm) {
      this.cargarDatos();
    }
  }

  hideDialog() {
    this.display = false;
    this.rebuildForm();
  }

  saveLocalidad(loca: Localidad) {
    if (this.localidadForm.valid) {
      this.localidadForm.controls['nombreProvincia'].enable();
      this.localidad.nombre = this.localidadForm.get('nombreLocalidad').value;
      this.localidad.nombre = this.localidad.nombre.toLocaleUpperCase();
      this.localidad.CodigoPostal = this.localidadForm.get('codigoPostal').value;

      if (this.localidad.IdLocalidad === null) {
        this.localidadService.crearLocalidad(this.localidad).subscribe(
          (res: Localidad) => {
            this.localidadInfo.emit(res);
          },
          error => {
            this.confirmationService.confirm({
              header: 'ERROR !',
              message: `${error}`,
              accept: () => {}
            });
          }
        );
      } else {
        this.localidadService.actualizarLocalidad(this.localidad).subscribe(
          (res: Localidad) => {
            this.localidadInfo.emit(res);
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
    }
    this.display = false;
    this.rebuildForm();
  }

  // para ponerlo como propiedad del Component y poder hacer el binding con el HTML
  get nombreLocalidad() {
    return this.localidadForm.get('nombreLocalidad');
  }
  get codigoPostal() {
    return this.localidadForm.get('codigoPostal');
  }
}
