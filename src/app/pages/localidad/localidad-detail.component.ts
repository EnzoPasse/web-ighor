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


  @Input() localidad: Localidad;
  @Input() displayOption: boolean;
  @Input() tituloOption: string;

  localidadForm: FormGroup;
  display: boolean;
  titulo: string;

  constructor(
    public localidadService: LocalidadService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.crearForm();
  }

    crearForm() {
      this.localidadForm = this.fb.group({
        'nombreProvincia': new FormControl(this.localidad.provincia.nombre),
        'nombreLocalidad': new FormControl(this.localidad.nombre, [Validators.required, Validators.minLength(3)]),
        'codigoPostal': new FormControl(
          this.localidad.CodigoPostal,
          Validators.required
        )
      });
       this.localidadForm.controls['nombreProvincia'].disable();
    }

    rebuildForm() {
      this.localidadForm.reset({
        'nombreProvincia': '',
        'nombreLocalidad': '',
        'codigoPostal': ''
      });
      this.localidadForm.markAsPristine();
      this.localidadForm.markAsUntouched();
    }

  ngOnChanges(): void {
    this.display = this.displayOption;
    this.titulo = this.tituloOption;
    this.crearForm();
  }

  hideDialog($event) {
    this.display = false;
  }

  saveLocalidad(loca: Localidad) {

   if ( this.localidadForm.valid) {
     this.localidadForm.controls['nombreProvincia'].enable();

       //  console.log('guardar: ' + JSON.stringify(loca));
       //  console.log('objeto : ' +  JSON.stringify(this.localidad));
       //  console.log(this.display);

       console.log(this.localidadForm.value);

      }
      this.display = false;
      this.localidadForm.reset();
  }

  guardar() {
    console.log(this.localidad);
    this.display = false;
    this.rebuildForm();
  }


  // para ponerlo como propiedad del Component y poder hacer el binding con el HTML
  get nombreLocalidad() { return this.localidadForm.get('nombreLocalidad'); }
  get codigoPostal() { return this.localidadForm.get('codigoPostal'); }


}


///// verrrrrrrrrrr--- como se empieza de nuevo con el formunlario
