import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { ValidatorsModule } from 'src/app/screens/shared/validators/validators.module';
import { InvStatusCancelComponent } from './inv-status-cancel/inv-status-cancel.component';
import { InvStatusPaidPartiallyComponent } from './inv-status-paid-partially/inv-status-paid-partially.component';
import { InvStatusPaidComponent } from './inv-status-paid/inv-status-paid.component';
import { InvStatusReturnsComponent } from './inv-status-returns/inv-status-returns.component';
import { InvoiceStatusDialogComponent } from './invoice-status-dialog/invoice-status-dialog.component';




@NgModule({
  declarations: [InvoiceStatusDialogComponent, InvStatusPaidComponent, InvStatusPaidPartiallyComponent, InvStatusReturnsComponent, InvStatusCancelComponent],
  imports: [
    SharedModule,
    TranslateModule,
    ValidatorsModule
  ],
  exports: [InvoiceStatusDialogComponent, InvStatusPaidComponent, InvStatusPaidPartiallyComponent, InvStatusReturnsComponent, InvStatusCancelComponent,ValidatorsModule],
  providers: [DatePipe]
})
export class InvoiceStatusModule { }
