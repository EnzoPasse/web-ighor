import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

import { Localidad } from '../localidad/localidad.model';
import { LocalidadService } from '../localidad/localidad.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Provincia } from './provincia.model';
import { ProvinciaService } from './provincia.service';

@Component({
  selector: 'app-provincia-detail',
  templateUrl: './provincia-detail.component.html'
})
export class ProvinciaDetailComponent implements OnInit, OnChanges {
  @Input() provincia: Provincia;
  @Input() displayOption: boolean;
  @Input() tituloOption: string;
  @Output()
  provinciaInfo: EventEmitter<Provincia> = new EventEmitter<Provincia>();

  provinciaForm: FormGroup;
  display: boolean;
  titulo: string;

  constructor(
    public provinciaService: ProvinciaService,
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.provinciaForm = this.fb.group({
      nombreProvincia: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    this.cargarDatos();
  }

  cargarDatos() {
    this.provinciaForm.setValue({
      nombreProvincia: this.provincia.nombre
    });
  }

  rebuildForm() {
    this.provinciaForm.reset();
    this.provinciaForm.markAsPristine();
    this.provinciaForm.markAsUntouched();
  }

  ngOnChanges(): void {
    this.display = this.displayOption;
    this.titulo = this.tituloOption;
    if (this.provinciaForm) {
      this.cargarDatos();
    }
  }

  hideDialog() {
    this.display = false;
    this.rebuildForm();
  }

  saveProvincia(loca: Provincia) {
    if (this.provinciaForm.valid) {
      this.provincia.nombre = this.provinciaForm.get('nombreProvincia').value;
      this.provincia.nombre = this.provincia.nombre.toLocaleUpperCase();

      if (this.provincia.IdProvincia === null) {
        this.provinciaService.crearProvincia(this.provincia).subscribe(
          (res: Provincia) => {
            this.provinciaInfo.emit(res);
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
        this.provinciaService.actualizarPronvincia(this.provincia).subscribe(
          (res: Provincia) => {
            this.provinciaInfo.emit(res);
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
  get nombreProvincia() {
    return this.provinciaForm.get('nombreProvincia');
  }
}
