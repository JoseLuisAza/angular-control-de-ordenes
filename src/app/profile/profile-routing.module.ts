import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Auth0Guard } from '../services/auth0.guard';
import { Articulo2Component } from './articulo2/articulo2.component';
import { MyitemsComponent } from './myitems/myitems.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [  
  {
    path:'',
    component: ProfileComponent,
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
