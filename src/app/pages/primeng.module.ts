import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { MessageModule } from 'primeng/components/message/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { GrowlModule } from 'primeng/components/growl/growl';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    GrowlModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    GrowlModule
  ],
  providers: []
})
export class PrimeNgModule {}
