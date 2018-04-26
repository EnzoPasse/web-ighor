import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { Localidad } from './localidad.model';
import { LocalidadService } from './localidad.service';

@Component({
  selector: 'app-localidad-detail',
  templateUrl: './localidad-detail.component.html',
  styles: []
})
export class LocalidadDetailComponent implements OnInit, OnChanges {
  //   VERRRRRRRR no anda el open again del modal

  @Input() localidad: Localidad;
  @Input() displayOption: boolean;

  localidadForm: FormGroup;
  display: boolean;

  constructor(
    public localidadService: LocalidadService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.crearForm();
  }
    crearForm() {
      this.localidadForm = this.fb.group({
        nombreProvincia: new FormControl(this.localidad.provincia.nombre),
        nombreLocalidad: new FormControl(
          this.localidad.nombre,
          Validators.required
        ),
        codigoPostal: new FormControl(
          this.localidad.CodigoPostal,
          Validators.required
        )
      });
      this.localidadForm.controls['nombreProvincia'].disable();
    }

    rebuildForm() {
      this.localidadForm.reset({
        nombreProvincia: '',
        nombreLocalidad: '',
        codigoPostal: ''
      });
    }

  ngOnChanges(): void {
    this.display = this.displayOption;
    this.crearForm();
  }

  hideDialog($event) {
    this.display = false;
  }

  saveLocalidad(localidad: Localidad) {
    console.log('guardar: ' + JSON.stringify(localidad));
    this.display = false;
    console.log(this.display);
  }

  guardar(localidad: string) {
    console.log(localidad);
    this.rebuildForm();
  }


}
