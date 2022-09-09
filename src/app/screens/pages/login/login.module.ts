import { NgModule } from '@angular/core';


import { LoginPageRoutingModule } from './login-routing.module';

import { SharedModule } from '../../shared/component/shared.module';
import { LoginPage } from './login.page';
import { LoginTranslationModule } from './login.translation.module';



@NgModule({
  imports: [
    SharedModule,
    LoginPageRoutingModule,
    LoginTranslationModule
  ],
  exports: [],
  declarations: [LoginPage]
})
export class LoginPageModule { }
