import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ButtonModule} from 'primeng/button';
import { TiendaComponent } from './tienda/tienda.component';
import { ArticuloComponent } from './articulo/articulo.component';
import {Card, CardModule} from 'primeng/card';
import { ControlDeOrdenesService } from './services/control-de-ordenes.service';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Auth0Service } from './services/auth0.service';
import { DialogModule } from 'primeng/dialog';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ArticuloComponent,
    HomeComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SplitButtonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    BrowserAnimationsModule,
    TableModule
  ],
  providers: [
    HttpClient,
    ControlDeOrdenesService,
    Auth0Service,
  ],
  exports: [

  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
