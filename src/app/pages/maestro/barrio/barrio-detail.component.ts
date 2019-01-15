import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Barrio } from './barrio.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BarrioService } from './barrio.service';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-barrio-detail',
  templateUrl: './barrio-detail.component.html',
  styleUrls: []
})
export class BarrioDetailComponent implements OnInit, OnChanges {

  @Input() barrio: Barrio;
  @Input() display: boolean;
  @Input() tituloOption: string;
  @Output() barrioInfo: EventEmitter<Barrio> = new EventEmitter<Barrio>();
  @Output()
  displayInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  barrioForm: FormGroup;
  titulo: string;

  constructor(
    public barrioService: BarrioService,
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.barrioForm = this.fb.group({
      nombreProvincia: new FormControl(''),
      nombreLocalidad: new FormControl(''),
      nombreSector: new FormControl(''),
      nombreBarrio: new FormControl('', [Validators.required, Validators.minLength(3)]),
      codigoPostal: new FormControl('', [Validators.required, Validators.maxLength(10)])
    });
    this.barrioForm.controls['nombreLocalidad'].disable();
    this.barrioForm.controls['nombreProvincia'].disable();
    this.barrioForm.controls['nombreSector'].disable();
    this.cargarDatos();
  }

  cargarDatos() {
    this.barrioForm.setValue({
      nombreProvincia: this.barrio.cuadrante.localidad.provincia.nombre,
      nombreLocalidad: this.barrio.cuadrante.localidad.nombre,
      nombreSector: this.barrio.cuadrante.nombre,
      nombreBarrio: this.barrio.nombre,
      codigoPostal: this.barrio.codigo_postal || 0
    });
  }

  rebuildForm() {
    this.barrioForm.reset();
    this.barrioForm.markAsPristine();
    this.barrioForm.markAsUntouched();
    this.barrioForm.controls['nombreProvincia'].disable();
    this.barrioForm.controls['nombreLocalidad'].disable();
    this.barrioForm.controls['nombreSector'].disable();


  }

  ngOnChanges(): void {

    this.titulo = this.tituloOption;
    if (this.barrioForm) {
      this.cargarDatos();
    }
  }

  hideDialog() {
    this.rebuildForm();
    this.displayInfo.emit(false);
  }

  saveBarrio(barrio: Barrio) {
    if (this.barrioForm.valid) {
      this.barrioForm.controls['nombreProvincia'].enable();
      this.barrioForm.controls['nombreLocalidad'].enable();
      this.barrioForm.controls['nombreSector'].enable();
      this.barrio.nombre = this.barrioForm.get('nombreBarrio').value;
      this.barrio.nombre = this.barrio.nombre.toLocaleUpperCase();
      this.barrio.codigo_postal = this.barrioForm.get('codigoPostal').value;

// HASTA ACA CORREGIDO////////******************* */

      if (this.barrio.id === null) {
        this.barrioService.crearBarrio(this.barrio).subscribe(
          (res: Barrio) => {
            this.barrioInfo.emit(res);
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
        this.barrioService.actualizarBarrio(this.barrio).subscribe(
          (res: Barrio) => {
            this.barrioInfo.emit(res);
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
  get nombreBarrio() {
    return this.barrioForm.get('nombreBarrio');
  }

  get codigoPostal() {
    return this.barrioForm.get('codigoPostal');
  }
}

