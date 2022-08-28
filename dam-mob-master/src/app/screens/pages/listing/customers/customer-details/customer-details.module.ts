import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerDetailsRoutingModule } from './customer-details-routing.module';
import { CustomerDetailsComponent } from './customer-details.component';


@NgModule({
  declarations: [CustomerDetailsComponent],
  imports: [SharedModule, CustomerDetailsRoutingModule],
  exports: [CustomerDetailsComponent, CustomerDetailsRoutingModule],
})
export class CustomerDetailsModule { }
