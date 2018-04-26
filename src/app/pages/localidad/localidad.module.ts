// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// prime ng
import { TableModule } from 'primeng/components/table/table';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

// core
import { LocalidadListComponent } from './localidad-list.component';
import { LocalidadService } from './localidad.service';
import { LocalidadDetailComponent } from './localidad-detail.component';
import { ConfirmationService } from 'primeng/components/common/api';
import { GrowlModule } from 'primeng/components/growl/growl';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DataTableModule,
    ButtonModule,
    ProgressSpinnerModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    GrowlModule
  ],
  declarations: [LocalidadListComponent, LocalidadDetailComponent],
  providers: [LocalidadService, ConfirmationService]
})
export class LocalidadModule {}
