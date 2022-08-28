import { NgModule } from '@angular/core';


import { HomePageRoutingModule } from './home-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/component/shared.module';
import { HomePage } from './home.page';
import { TranslationModule } from '../../shared/component/translation.module';

@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule,
    TranslationModule
  ],
  declarations: [HomePage],
})
export class HomePageModule { }
