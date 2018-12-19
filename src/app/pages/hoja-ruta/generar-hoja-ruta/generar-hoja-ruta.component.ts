import { Component, OnInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { BarrioService } from '../../maestro/barrio/barrio.service';
import { Barrio } from '../../maestro/barrio/barrio.model';

@Component({
  selector: 'app-generar-hoja-ruta',
  templateUrl: './generar-hoja-ruta.component.html',
  styleUrls: []
})
export class GenerarHojaRutaComponent implements OnInit {
  msgs: Message[] = [];
  barrios: Barrio[] = [];
  barrioSelected: Barrio;
  cargando: boolean = false;


  constructor(
    public barrioService: BarrioService,
    public confirmationService: ConfirmationService
  ) {}

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
   // console.log('GENERAR LA HOJA DE RUTA' + JSON.stringify(this.barrioSelected));

  }

  generarHojasRutas() {
     this.cargando = true;
     setTimeout(() => {
       this.cargando = false;
     }, 5000);
  }
}
