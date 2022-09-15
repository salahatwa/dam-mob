import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { InvoiceListModule } from './invoice-list/invoice-list.module';
import { InvoiceStatusModule } from './invoice-status/invoice-status.module';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';



@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    SharedModule,
    InvoiceListModule,
    InvoicesRoutingModule,
    InvoiceStatusModule
  ],
  exports: [InvoicesComponent],

})
export class InvoicesModule { }
