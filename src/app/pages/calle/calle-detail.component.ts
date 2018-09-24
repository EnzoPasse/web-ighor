import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

import { Calle, CalleSimple } from './calle.model';
import { CalleService } from './calle.service';
import { ConfirmationService, SelectItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-calle-detail',
  templateUrl: './calle-detail.component.html'
})
export class CalleDetailComponent implements OnInit, OnChanges {
  @Input()
  calle: Calle;
  @Input()
  displayOption: boolean;
  @Input()
  tituloOption: string;
  @Output()
  calleInfo: EventEmitter<Calle> = new EventEmitter<Calle>();

  calleForm: FormGroup;
  display: boolean;
  titulo: string;
  callesSimples: CalleSimple[];
  nomenclado: boolean;
  numeracion: SelectItem[];

  // tipo: string;

  constructor(
    public calleService: CalleService,
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {
    this.numeracion = [
      { label: 'Pares', value: '2' },
      { label: 'Impares', value: '3' },
      { label: 'Todos', value: '1' }
    ];
  }

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.calleForm = this.fb.group({
      nombreProvincia: new FormControl(''),
      nombreLocalidad: new FormControl(''),
      nombreSector: new FormControl(''),
      nombreBarrio: new FormControl(''),
      nombreCalle: new FormControl('', [Validators.required, Validators.minLength(3)]),
      altura_desde: new FormControl('', [Validators.required]),
      altura_hasta: new FormControl('', [Validators.required]),
      referencia: new FormControl(''),
      plano: new FormControl(''),
      ubicacion: new FormControl(''),
      tipo: new FormControl('')
    });
    this.calleForm.controls['nombreLocalidad'].disable();
    this.calleForm.controls['nombreProvincia'].disable();
    this.calleForm.controls['nombreSector'].disable();
    this.calleForm.controls['nombreBarrio'].disable();
    this.cargarDatos();
  }

  cargarDatos() {
    this.calleForm.setValue({
      nombreProvincia: this.calle.barrio.cuadrante.localidad.provincia.nombre,
      nombreLocalidad: this.calle.barrio.cuadrante.localidad.nombre,
      nombreSector: this.calle.barrio.cuadrante.nombre,
      nombreBarrio: this.calle.barrio.nombre,
      nombreCalle: this.calle.calle,
      altura_desde: this.calle.altura_desde || 0,
      altura_hasta: this.calle.altura_hasta || 0,
      referencia: this.calle.referencia,
      plano: this.calle.plano,
      ubicacion: this.calle.ubicacion,
      tipo: this.calle.tipoNumeracion || 1
    });
    this.nomenclado = this.calle.nomenclado;
  }

  rebuildForm() {
    this.calleForm.reset();
    this.calleForm.markAsPristine();
    this.calleForm.markAsUntouched();
    this.calleForm.controls['nombreProvincia'].disable();
    this.calleForm.controls['nombreLocalidad'].disable();
    this.calleForm.controls['nombreSector'].disable();
    this.calleForm.controls['nombreBarrio'].disable();
  }

  ngOnChanges(): void {
    this.display = this.displayOption;
    this.titulo = this.tituloOption;
    if (this.calleForm) {
      this.cargarDatos();
    }
  }

  hideDialog() {
    this.display = false;
    this.rebuildForm();
  }

  saveCalle(calle: Calle) {
    if (this.calleForm.valid) {
      this.calleForm.controls['nombreProvincia'].enable();
      this.calleForm.controls['nombreLocalidad'].enable();
      this.calleForm.controls['nombreSector'].enable();
      this.calleForm.controls['nombreBarrio'].enable();

      this.calle.calle = this.calleForm.get('nombreCalle').value;
      // this.calle.calle.nombre = this.calle.calle.nombre.toLocaleUpperCase();
      this.calle.altura_desde = this.calleForm.get('altura_desde').value;
      this.calle.altura_hasta = this.calleForm.get('altura_hasta').value;
      this.calle.referencia = this.calleForm.get('referencia').value;
      this.calle.plano = this.calleForm.get('plano').value;
      this.calle.ubicacion = this.calleForm.get('ubicacion').value;
      this.calle.tipoNumeracion = this.calleForm.get('tipo').value;
      this.calle.nomenclado = this.nomenclado;

      console.log('CALLE' + JSON.stringify(this.calle));

      if (this.calle.id === null) {
        this.calleService.crearCalle(this.calle).subscribe(
          (res: Calle) => {
            this.calleInfo.emit(res);
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
        this.calleService.actualizarCalle(this.calle).subscribe(
          (res: Calle) => {
            this.calleInfo.emit(res);
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
  get nombreCalle() {
    return this.calleForm.get('nombreCalle');
  }
  get altura_desde() {
    return this.calleForm.get('altura_desde');
  }
  get altura_hasta() {
    return this.calleForm.get('altura_hasta');
  }
  get referencia() {
    return this.calleForm.get('referencia');
  }
  get plano() {
    return this.calleForm.get('plano');
  }
  get ubicacion() {
    return this.calleForm.get('ubicacion');
  }
  get tipo() {
    return this.calleForm.get('tipo');
  }

  buscarCallesSimples(event) {
    this.calleService
      .buscarCallesSimplesPorTexto(event.query)
      .subscribe((res: any) => {
        this.callesSimples = res.calles;
      });
  }

  calleSimpleSelected(event) {
    this.calle.calle = Object.assign({}, event);
  }
}
