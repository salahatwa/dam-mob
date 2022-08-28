import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { BadgeModule } from '../../component/badge/badge.module';
import { ButtonModule } from '../../component/button/button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    BadgeModule,
    ButtonModule
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
