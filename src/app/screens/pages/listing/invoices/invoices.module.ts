import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { InvoiceListModule } from './invoice-list/invoice-list.module';
import { InvoiceStatusModule } from './invoice-status/invoice-status.module';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoicesTranslationModule } from './invoices.translation.module';



@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    SharedModule,
    InvoiceListModule,
    InvoicesRoutingModule,
    InvoiceStatusModule,
    InvoicesTranslationModule
  ],
  exports: [InvoicesComponent,
    InvoicesTranslationModule],

})
export class InvoicesModule { }
