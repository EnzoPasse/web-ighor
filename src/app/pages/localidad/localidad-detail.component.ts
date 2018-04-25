import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Localidad } from './localidad.model';
import { LocalidadService } from './localidad.service';

@Component({
  selector: 'app-localidad-detail',
  templateUrl: './localidad-detail.component.html',
  styles: []
})
export class LocalidadDetailComponent implements OnInit, OnChanges {

  //   VERRRRRRRR no anda el open again del modal

  @Input() localidad: Localidad;
  @Input () displayOption: boolean;

   display: boolean;


  constructor( public localidadService: LocalidadService ) { }

  ngOnInit() {
    // this.display = true;
    console.log(this.display);

  }
  ngOnChanges(): void {
    this.display = this.displayOption;
  }

 hideDialog($event) {
   this.display = false;
 }

  saveLocalidad(localidad: Localidad) {
    console.log('guardar: ' + JSON.stringify(localidad));
    this.display = false;
    console.log(this.display);
  }

}
