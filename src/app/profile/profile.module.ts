import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { NewItemComponent } from './new-item/new-item.component';
import { MyitemsComponent } from './myitems/myitems.component';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import { ProfileComponent } from './profile/profile.component';
import { Loading2Component } from './loading2/loading2.component';
import { Articulo2Component } from './articulo2/articulo2.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    NewItemComponent,
    MyitemsComponent,
    ProfileComponent,
    Loading2Component,
    Articulo2Component
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    ProgressBarModule,
    SplitButtonModule,
    ButtonModule,
    CardModule,
  ],
  exports:[
  ]
})
export class ProfileModule { }
