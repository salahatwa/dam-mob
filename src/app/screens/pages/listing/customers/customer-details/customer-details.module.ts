import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerDetailsRoutingModule } from './customer-details-routing.module';
import { CustomerDetailsComponent } from './customer-details.component';
import { CustomerDtlsTranslationModule } from './customer-details.translation.module';


@NgModule({
  declarations: [CustomerDetailsComponent],
  imports: [SharedModule, CustomerDetailsRoutingModule, CustomerDtlsTranslationModule],
  exports: [CustomerDetailsComponent, CustomerDetailsRoutingModule],
})
export class CustomerDetailsModule { }
