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
import { ProfileModule } from './profile/profile.module';
import { LoadingComponent } from './loading/loading.component';
import { CommonModule } from '@angular/common';

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
  ],
  providers: [
    HttpClient,
    ControlDeOrdenesService
  ],
  exports: [

  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
