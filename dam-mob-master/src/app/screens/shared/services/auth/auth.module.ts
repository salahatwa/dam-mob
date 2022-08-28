import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NoAuthGuard } from './no-auth-guard.service';
import { ShowAuthedDirective } from './show-authed.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './http.token.interceptor';
import { ListErrorsComponent } from './error-component/list-errors.component';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ShowAuthedDirective,
    ListErrorsComponent
  ],
  exports:[
    ShowAuthedDirective,
    ListErrorsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    NoAuthGuard,
    AuthGuard,
    UserService,
    JwtService
  ]
})
export class AuthModule {}
