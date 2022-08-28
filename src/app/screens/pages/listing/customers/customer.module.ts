import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerFilterDialogComponent } from './customer-filter-dialog/customer-filter-dialog.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';



@NgModule({
  declarations: [CustomerComponent, CustomerFilterDialogComponent],
  imports: [
    SharedModule,
    CustomerRoutingModule,

  ],
  entryComponents: [CustomerFilterDialogComponent],
  exports: [
    CustomerComponent,
    CustomerRoutingModule,
  ]
})
export class CustomerModule { }
