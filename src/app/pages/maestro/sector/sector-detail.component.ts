import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Sector } from './sector.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/api';
import { SectorService } from './sector.service';

@Component({
  selector: 'app-sector-detail',
  templateUrl: './sector-detail.component.html',
  styleUrls: []
})
export class SectorDetailComponent implements OnInit, OnChanges {
  @Input() sector: Sector;
  @Input() display: boolean;
  @Input() tituloOption: string;
  @Output() sectorInfo: EventEmitter<Sector> = new EventEmitter<Sector>();
  @Output()
  displayInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  sectorForm: FormGroup;
  titulo: string;

  constructor(
    public sectorService: SectorService,
    private fb: FormBuilder,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.sectorForm = this.fb.group({
      nombreProvincia: new FormControl(''),
      nombreLocalidad: new FormControl(''),
      nombreSector: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    this.sectorForm.controls['nombreLocalidad'].disable();
    this.sectorForm.controls['nombreProvincia'].disable();
    this.cargarDatos();
  }

  cargarDatos() {
    this.sectorForm.setValue({
      nombreProvincia: this.sector.localidad.provincia.nombre,
      nombreLocalidad: this.sector.localidad.nombre,
      nombreSector: this.sector.nombre
    });
  }

  rebuildForm() {
    this.sectorForm.reset();
    this.sectorForm.markAsPristine();
    this.sectorForm.markAsUntouched();
    this.sectorForm.controls['nombreProvincia'].disable();
    this.sectorForm.controls['nombreLocalidad'].disable();

  }

  ngOnChanges(): void {

    this.titulo = this.tituloOption;
    if (this.sectorForm) {
      this.cargarDatos();
    }
  }

  hideDialog() {
    this.rebuildForm();
    this.displayInfo.emit(false);
  }

  saveSector(secto: Sector) {
    if (this.sectorForm.valid) {
      this.sectorForm.controls['nombreProvincia'].enable();
      this.sectorForm.controls['nombreLocalidad'].enable();
      this.sector.nombre = this.sectorForm.get('nombreSector').value;
      this.sector.nombre = this.sector.nombre.toLocaleUpperCase();

      if (this.sector.id === null) {
        this.sectorService.crearSector(this.sector).subscribe(
          (res: Sector) => {
            this.sectorInfo.emit(res);
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
        this.sectorService.actualizarSector(this.sector).subscribe(
          (res: Sector) => {
            this.sectorInfo.emit(res);
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
  get nombreSector() {
    return this.sectorForm.get('nombreSector');
  }
}
