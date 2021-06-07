import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
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
    canActivate: [AuthGuard],
  },
  {
    path:'reportes',
    component: ReporteComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'ventas-por-producto',
    component: VentasPorProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'ventas',
    component: VentasComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'promedios-de-precios',
    component: PromediosDePreciosComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'myitems',
    component: MyitemsComponent,
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
