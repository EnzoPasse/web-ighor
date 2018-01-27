import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SidebarModule, InputTextModule, ButtonModule, CheckboxModule, MessageModule, MessagesModule, GrowlModule} from 'primeng/primeng';



import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumsComponent } from './shared/breadcrums/breadcrums.component';
import { PageNoFoundComponent } from './shared/page-no-found/page-no-found.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';

import { APP_ROUTES } from './app.routes';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    PageNoFoundComponent,
    PagesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    GrowlModule,
    SidebarModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
