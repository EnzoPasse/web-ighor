import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { Barrio } from '../../maestro/barrio/barrio.model';
import { BarrioService } from '../../maestro/barrio/barrio.service';

@Component({
  selector: 'app-asignar-hoja-ruta',
  templateUrl: './asignar-hoja-ruta.component.html',
  styleUrls: []
})
export class AsignarHojaRutaComponent implements OnInit {

  msgs: Message[] = [];
  barrios: Barrio[] = [];
  barrioSelected: Barrio;

  constructor(public barrioService: BarrioService,
    public confirmationService: ConfirmationService) { }

  ngOnInit() {}

  buscarBarrios(event) {
    this.barrioService
      .buscarBarrioPorTexto(event.query)
      .subscribe((res: any) => {
        this.barrios = res.barrios;
      });
  }

  seleccionarBarrio(barrio: Barrio) {
    this.barrioSelected = Object.assign({}, barrio);
    if (this.barrioSelected) {
      this.barrioService
        .cargarHojaRutas(this.barrioSelected)
        .subscribe((res: any) => {
          console.log(res);
        });
    }
  }

  clear() {
    this.barrioSelected = null;
  }


}
