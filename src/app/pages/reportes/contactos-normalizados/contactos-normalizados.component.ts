import { Component, OnInit } from '@angular/core';
import { Localidad } from '../../maestro/localidad/localidad.model';
import { Provincia } from '../../maestro/provincia/provincia.model';
import { Sector } from '../../maestro/sector/sector.model';
import { ProvinciaService } from '../../maestro/provincia/provincia.service';
import { LocalidadService } from '../../maestro/localidad/localidad.service';
import { SectorService } from '../../maestro/sector/sector.service';
import { SelectItem } from 'primeng/components/common/api';
import { ReportesService } from '../reportes.service';

@Component({
  selector: 'app-contactos-normalizados',
  templateUrl: './contactos-normalizados.component.html',
  styles: []
})
export class ContactosNormalizadosComponent implements OnInit {
  localidades: SelectItem[];
  provincias: SelectItem[];
  sectores: SelectItem[];
  barrios: SelectItem[];
  resultado: any;

  currentProvincia: any;
  currentLocalidad: any;
  currentSector: any;
  currentBarrio: any;

  constructor(
    private provinciaService: ProvinciaService,
    private localidadService: LocalidadService,
    private sectorService: SectorService,
    private reporteService: ReportesService
  ) {}

  ngOnInit() {
    this.provinciaService.cargarProvincias().subscribe((res: Provincia[]) => {
      this.provincias = res.map((data: Provincia) => {
        return { label: data.nombre, value: data };
      });
    });
  }

  onProvChange() {
    if (this.currentLocalidad) {
      this.cleanLocalidades();
      this.cleanSectores();
      this.cleanBarrios();
    }

    this.provinciaService
      .cargarLocalidades(this.currentProvincia)
      .subscribe((res: any) => {
        this.localidades = res.localidades.map((data: Localidad) => {
          return { label: data.nombre, value: data };
        });
      });
  }

  onLocalidadChange() {
    if (this.currentSector) {
      this.cleanSectores();
      this.cleanBarrios();
    }
    this.localidadService
      .cargarSectores(this.currentLocalidad)
      .subscribe((res: any) => {
        this.sectores = res.cuadrantes.map((data: Sector) => {
          return { label: data.nombre, value: data };
        });
      });
  }

  onSectorChange() {
    if (this.currentBarrio) {
      this.cleanBarrios();
    }
    this.sectorService
      .cargarBarrios(this.currentSector)
      .subscribe((res: any) => {
        this.barrios = res.barrios.map((data: Sector) => {
          return { label: data.nombre, value: data };
        });
      });
  }

  cleanLocalidades() {
    this.localidades = [];
    this.currentLocalidad = null;
    // this.localidadesOK = false;
  }

  cleanSectores() {
    this.sectores = [];
    this.currentSector = null;
  }

  cleanBarrios() {
    this.barrios = [];
    this.currentBarrio = null;
  }

  generarReporte() {
    let parametro;
    parametro = this.armarParametro();
    this.reporteService.contactosNormalizados(parametro).subscribe(res => {
      this.resultado = res.result;
    });
  }

  armarParametro() {
    let params: string = '';

    if (this.currentBarrio) {
      params = `barrio=${this.currentBarrio.id}`;
      return params;
    }

    if (this.currentSector) {
      params = `cuadrante=${this.currentSector.id}`;
      return params;
    }

    if (this.currentLocalidad) {
      params = `localidad=${this.currentLocalidad.id}`;
      return params;
    }

    if (this.currentProvincia) {
      params = `provincia=${this.currentProvincia.id}`;
      return params;
    }
  }
}
