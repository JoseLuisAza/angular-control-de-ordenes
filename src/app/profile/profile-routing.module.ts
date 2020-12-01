import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Auth0Guard } from '../services/auth0.guard';
import { Articulo2Component } from './articulo2/articulo2.component';
import { MyitemsComponent } from './myitems/myitems.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ProfileComponent } from './profile/profile.component';
import { PromediosDePreciosComponent } from './promedios-de-precios/promedios-de-precios.component';
import { ReporteComponent } from './reporte/reporte.component';
import { VentasPorProductoComponent } from './ventas-por-producto/ventas-por-producto.component';
import { VentasComponent } from './ventas/ventas.component';


const routes: Routes = [  
  {
    path:'',
    component: ProfileComponent,
    canActivate: [Auth0Guard],
  },
  {
    path:'reportes',
    component: ReporteComponent,
    canActivate: [Auth0Guard],
  },
  {
    path:'ventas-por-producto',
    component: VentasPorProductoComponent,
    canActivate: [Auth0Guard],
  },
  {
    path:'ventas',
    component: VentasComponent,
    canActivate: [Auth0Guard],
  },
  {
    path:'promedios-de-precios',
    component: PromediosDePreciosComponent,
    canActivate: [Auth0Guard],
  },
  {
    path:'myitems',
    component: MyitemsComponent,
    canActivate: [Auth0Guard],
    children:
    [
      {
        path:'articulo2',
        component: Articulo2Component
      },
    ]
  },
  {
    path:'newItem',
    component: NewItemComponent,
    canActivate: [Auth0Guard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
