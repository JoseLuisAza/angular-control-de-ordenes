import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TiendaComponent } from './tienda/tienda.component';


const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'store',
    component: TiendaComponent
  },
  {
    path:'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
