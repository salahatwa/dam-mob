import { NgModule } from '@angular/core';
import { GettingStartPage } from './getting-start.page';

import { SharedModule } from '../../shared/component/shared.module';
import { GettingStartPageRoutingModule } from './getting-start-routing.module';


@NgModule({
  imports: [
    SharedModule,
    GettingStartPageRoutingModule
  ],
  declarations: [GettingStartPage]
})
export class GettingStartPageModule { }
