import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// componentes primeng
import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { MessageModule } from 'primeng/components/message/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { GrowlModule } from 'primeng/components/growl/growl';
import { RadioButtonModule } from 'primeng/components/radioButton/radioButton';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataTableModule } from 'primeng/components/datatable/datatable';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    GrowlModule,
    RadioButtonModule,
    CardModule,
    DataTableModule
    ],
  exports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    GrowlModule,
    RadioButtonModule,
    CardModule,
    DataTableModule
  ],
  providers: [MessageService]// settingService
})
export class PrimeNgModule {}
