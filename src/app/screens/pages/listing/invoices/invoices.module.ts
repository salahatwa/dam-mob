import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';



@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    SharedModule,
    InvoicesRoutingModule
  ],
  exports: [InvoicesComponent],

})
export class InvoicesModule { }
