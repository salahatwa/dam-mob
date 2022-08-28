import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { CloudSyncComponent } from './cloud-sync/cloud-sync.component';
import { MonthChooseComponent } from './month-choose/month-choose.component';



@NgModule({
  declarations: [
    CloudSyncComponent,
    MonthChooseComponent,
    BadgeComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,


  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CloudSyncComponent,
    MonthChooseComponent,
    BadgeComponent,
    ButtonComponent,
  ]
})
export class SharedModule { }
