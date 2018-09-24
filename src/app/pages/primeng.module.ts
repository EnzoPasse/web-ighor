// ANGULAR

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PRIME NG COMPONENTS

/* import { MessageModule } from 'primeng/components/message/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { MessageService } from 'primeng/components/common/messageservice';
 */

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { GrowlModule } from 'primeng/components/growl/growl';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/components/progressspinner/progressspinner';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { TableModule } from 'primeng/components/table/table';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { KeyFilterModule } from 'primeng/keyfilter';



// PRIMENG SERVICES

import { ConfirmationService } from 'primeng/components/common/api';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    GrowlModule,
    DataTableModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    DialogModule,
    ConfirmDialogModule,
    CheckboxModule,
    SelectButtonModule,
    KeyFilterModule
    ],
  exports: [
    InputTextModule,
    ButtonModule,
    GrowlModule,
    DataTableModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    DialogModule,
    ConfirmDialogModule,
    CheckboxModule,
    SelectButtonModule,
    KeyFilterModule
  ],
  providers: [ConfirmationService]// settingService
})
export class PrimeNgModule {}
