import { NgModule } from '@angular/core';


import { HomePageRoutingModule } from './home-routing.module';

import { SharedModule } from '../../shared/component/shared.module';
import { HomePage } from './home.page';
import { HomeTranslationModule } from './home.translation.module';

@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule,
    HomeTranslationModule
  ],
  declarations: [HomePage],
})
export class HomePageModule { }
