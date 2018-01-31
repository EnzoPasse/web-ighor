import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    BreadcrumsComponent,
    HeaderComponent,
    PageNoFoundComponent,
    SidebarComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    BreadcrumsComponent,
    HeaderComponent,
    PageNoFoundComponent,
    SidebarComponent
  ],
  providers: []
})
export class SharedModule {}
