// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// RUTAS
import { AppRoutes } from './app.routes';

// MODULOS

import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './services/shared/http-interceptor.service';
// import { PagesComponent } from './pages/pages.component';
// import { PagesModule } from './pages/pages.module';

// SERVICIOS

@NgModule({
  declarations: [
    AppComponent,
    // PagesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes, // siempre importar primero las rutas y luego el modulo
    // PagesModule,
    ServicesModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
