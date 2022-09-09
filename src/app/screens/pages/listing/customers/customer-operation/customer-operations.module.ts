import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerOperationsRoutingModule } from './customer-operations-routing.module';
import { CustomerOperationsComponent } from './customer-operations.component';
import { CustomerOperationsTranslationModule } from './customer-operations.translation.module';


@NgModule({
  declarations: [CustomerOperationsComponent],
  imports: [
    SharedModule, CustomerOperationsRoutingModule, CustomerOperationsTranslationModule
  ],
  exports: [CustomerOperationsComponent, CustomerOperationsRoutingModule]
})
export class CustomerOperationsModule { }
