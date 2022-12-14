import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerSelectDialogsModule } from '../../customers/customer-select-dialog/customer-select-dialog.module';
import { InvoiceFilterRoutingModule } from './invoice-filter-routing.module';
import { InvoiceFilterComponent } from './invoice-filter.component';



@NgModule({
  declarations: [InvoiceFilterComponent],
  imports: [
    SharedModule, InvoiceFilterRoutingModule, CustomerSelectDialogsModule
  ],
  providers: [DatePipe]
})
export class InvoiceFilterModule { }
