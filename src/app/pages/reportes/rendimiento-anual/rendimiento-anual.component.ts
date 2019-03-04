import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-rendimiento-anual',
  templateUrl: './rendimiento-anual.component.html',
  styles: []
})
export class RendimientoAnualComponent implements OnInit {

  anio: SelectItem[];
  currentAnio; any;
  constructor() { }

  ngOnInit() {
    this.anio = [];
    for (let i = 10; i < 30; i++) {
        this.anio.push({label: `20${i}` , value: `20${i}` });
    }
  }

  generarReporte() {}

}
