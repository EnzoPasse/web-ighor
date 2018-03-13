import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
