import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/component/shared.module';
import { InvoiceStatusBadgeComponent } from './invoice-status-badge.component';



@NgModule({
  declarations: [InvoiceStatusBadgeComponent],
  imports: [
    SharedModule
  ],
  exports: [InvoiceStatusBadgeComponent]
})
export class InvoiceStatusBadgeModule { }
