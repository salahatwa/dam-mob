import { NgModule } from '@angular/core';


import { LoginPageRoutingModule } from './login-routing.module';

import { SharedModule } from '../../shared/component/shared.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    SharedModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
