import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/component/shared.module';
import { InvoiceStatusBadgeComponent } from './invoice-status-badge.component';



@NgModule({
  declarations: [InvoiceStatusBadgeComponent],
  imports: [
    SharedModule,TranslateModule
  ],
  exports: [InvoiceStatusBadgeComponent]
})
export class InvoiceStatusBadgeModule { }
