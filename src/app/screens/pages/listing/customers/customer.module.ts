import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    SharedModule,
    CustomerRoutingModule
  ],
  entryComponents: [],
  exports: [
    CustomerComponent,
    CustomerRoutingModule,
  ]
})
export class CustomerModule { }
