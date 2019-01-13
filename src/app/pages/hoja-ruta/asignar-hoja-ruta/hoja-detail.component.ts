import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/api';
import { Hoja, DetalleHoja } from '../hoja-ruta.models';
import { HojaRutaService } from '../hoja-ruta.service';

@Component({
  selector: 'app-hoja-detail',
  templateUrl: './hoja-detail.component.html',
  styleUrls: []
})
export class HojaDetailComponent implements OnInit, OnChanges {

  @Input() hojaDetalle: DetalleHoja [];
  @Input() display: boolean;
  @Output() displayInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}
  ngOnChanges(): void {}

  hideDialog() {
       this.displayInfo.emit(false);
  }
}

