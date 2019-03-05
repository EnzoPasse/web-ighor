import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/api';
import { ReportesService } from '../reportes.service';

@Component({
  selector: 'app-rendimiento-anual',
  templateUrl: './rendimiento-anual.component.html',
  styles: []
})
export class RendimientoAnualComponent implements OnInit {

  anio: SelectItem[];
  currentAnio; any;
  data: any;
  options = {
    scales: {
        yAxes: [{
               ticks: {
                 beginAtZero: true,              }
              }]
        }
  };

  constructor(private reporteService: ReportesService) { }

  ngOnInit() {
    this.anio = [];
    for (let i = 10; i < 30; i++) {
        this.anio.push({label: `20${i}` , value: `20${i}` });
    }
    this.anio.unshift({label: 'Todos los años' , value: ''});
  }

  generarReporte() {
    let params = '';
    if (this.currentAnio) {
         params = `anio=${this.currentAnio}`;
    }
   this.reporteService.rendimientoAnual(params)
   .subscribe((res) => {
    //  console.log(res);
      this.data = res.result;
   });
  }

}
