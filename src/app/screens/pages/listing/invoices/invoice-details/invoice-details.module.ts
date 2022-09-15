import { NgModule } from '@angular/core';
import { CollapsibleListModule } from 'src/app/screens/component/collapsible-list/collapsible-list.module';
import { CollapsibleViewtModule } from 'src/app/screens/component/stok-quick-view/collapsible-view.module';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { InvoiceDetailsComponent } from './invoice-details.component';


@NgModule({
  declarations: [InvoiceDetailsComponent],
  imports: [SharedModule, InvoiceDetailsRoutingModule, CollapsibleListModule, CollapsibleViewtModule],
  exports: [],
})
export class InvoiceDetailsModule { }
