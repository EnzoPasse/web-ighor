import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/components/common/api';
import { Filtros } from '../normalizacion.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styles: []
})
export class CriterioComponent implements OnChanges {
  listartodo: boolean;
  numeracion: SelectItem[];
  operadores: SelectItem[];
  filtroForm: FormGroup;
  titulo: string;

  @Input()
  display: boolean;
  @Input()
  tituloOption: string;
  @Input()
  barrio: string;

  @Input()
  filtrosIn: Filtros[];
  get filtros(): FormArray {
    return this.filtroForm.get('filtros') as FormArray;
  }
  @Output()
  filtroInfo: EventEmitter<Filtros[]> = new EventEmitter<Filtros[]>();
  @Output()
  displayInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {
    this.numeracion = [
      { label: 'AND', value: 1 },
      { label: 'OR', value: 0 }
    ];
    this.operadores = [
      { label: ' Like', value: 1 },
      { label: 'Not Like', value: 2 },
      { label: '  =', value: 3 },
      { label: '  <>', value: 4 }
    ];
  }

   ngOnChanges() {
    this.titulo = this.barrio + ' - (' + this.tituloOption + ')';
    this.crearForm();
  }

  crearForm() {
    this.filtroForm = this.fb.group({
      filtros: this.fb.array([])
    });
    this.cargarDatos();
  }

  cargarDatos() {
    const filtroFG = this.filtrosIn.map(cri => this.fb.group(cri));
    const filtroFromArray = this.fb.array(filtroFG);
    this.filtroForm.setControl('filtros', filtroFromArray);

    if (this.filtrosIn.length === 0) {
      this.agregarFiltro();
    }
  }

  crearFiltro() {
    return this.fb.group({
      operador: [1, , ],
      parentesis_abierto: [false, , ],
      criterio: [1, , ],
      valor: ['', [Validators.required, Validators.minLength(3)]],
      parentesis_cerrado: [false, , ]
    });
  }

  agregarFiltro() {
    this.filtros.push(this.crearFiltro());
  }

  removerFiltro(i: number) {
    this.filtros.removeAt(i);
  }

  hideDialog() {
    this.rebuildForm();
    this.displayInfo.emit(false);
  }
  rebuildForm() {
    this.filtroForm.reset();
    this.filtroForm.markAsPristine();
    this.filtroForm.markAsUntouched();
  }

  saveCriterios(fil: Filtros[]) {
    if (this.filtroForm.valid) {
      this.filtroInfo.emit(this.filtroForm.value);
    }

    this.hideDialog();
  }

}
