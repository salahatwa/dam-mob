import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerTranslationModule } from './customer.translation.module';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    SharedModule,
    CustomerRoutingModule,
    CustomerTranslationModule
  ],
  entryComponents: [],
  exports: [
    CustomerComponent,
    CustomerRoutingModule,
  ]
})
export class CustomerModule { }
