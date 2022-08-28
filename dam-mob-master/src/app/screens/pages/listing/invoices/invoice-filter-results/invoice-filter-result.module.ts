import { NgModule } from '@angular/core';
import { CollapsibleListModule } from 'src/app/screens/component/collapsible-list/collapsible-list.module';
import { CollapsibleViewtModule } from 'src/app/screens/component/stok-quick-view/collapsible-view.module';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { InvoiceFilterResultRoutingModule } from './invoice-filter-result-routing.module';
import { InvoiceFilterResultComponent } from './invoice-filter-result.component';



@NgModule({
  declarations: [InvoiceFilterResultComponent],
  imports: [
    SharedModule, InvoiceFilterResultRoutingModule,CollapsibleListModule,CollapsibleViewtModule
  ],
  exports: [InvoiceFilterResultComponent]
})
export class InvoiceFilterResultModule { }
