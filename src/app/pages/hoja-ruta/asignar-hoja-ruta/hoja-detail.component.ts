import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DetalleHoja } from '../hoja-ruta.models';


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

