import { NgModule } from '@angular/core';


import { HomePageRoutingModule } from './home-routing.module';

import { SharedModule } from '../../shared/component/shared.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
})
export class HomePageModule { }
