// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// RUTAS
import { AppRoutes } from './app.routes';

// MODULOS
import { PagesModule } from './pages/pages.module';
import { ServicesModule } from './services/services.module';


// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


// SERVICIOS


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes, // siempre importar primero las rutas y luego el modulo
    PagesModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
