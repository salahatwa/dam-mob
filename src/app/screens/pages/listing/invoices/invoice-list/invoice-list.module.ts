import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvoiceStatusBadgeModule } from 'src/app/screens/component/invoice-status-badge/invoice-status-badge.module';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { InvoiceListComponent } from './invoice-list.component';


@NgModule({
  declarations: [
    InvoiceListComponent
  ],
  imports: [
    SharedModule,
    InvoiceStatusBadgeModule
  ],
  exports: [
    InvoiceListComponent
  ],
  providers: [DatePipe]
})
export class InvoiceListModule { }
