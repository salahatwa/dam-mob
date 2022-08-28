import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { InvoiceFilterRoutingModule } from './invoice-filter-routing.module';
import { InvoiceFilterComponent } from './invoice-filter.component';



@NgModule({
  declarations: [InvoiceFilterComponent],
  imports: [
    SharedModule, InvoiceFilterRoutingModule
  ],
  exports: [InvoiceFilterComponent],
  providers: [DatePipe]
})
export class InvoiceFilterModule { }
