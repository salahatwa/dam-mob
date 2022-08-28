import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerOperationsRoutingModule } from './customer-operations-routing.module';
import { CustomerOperationsComponent } from './customer-operations.component';



@NgModule({
  declarations: [CustomerOperationsComponent],
  imports: [
    SharedModule, CustomerOperationsRoutingModule
  ],
  exports: [CustomerOperationsComponent, CustomerOperationsRoutingModule]
})
export class CustomerOperationsModule { }
